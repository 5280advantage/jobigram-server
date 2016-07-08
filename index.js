'use strict';
const express              = require('express');
const cors                 = require('cors');
const ParseServer          = require('parse-server').ParseServer;
const expressLayouts       = require('express-ejs-layouts');
const path                 = require('path');
const OneSignalPushAdapter = require('parse-server-onesignal-push-adapter');
const FSFilesAdapter       = require('parse-server-fs-adapter');
const S3Adapter            = require('parse-server').S3Adapter;

// Parse configuration
const PORT            = process.env.PORT || 1337;
const DATABASE_URI    = process.env.DATABASE_URI || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/dev';
const SERVER_URL      = process.env.SERVER_URL || 'http://localhost:1337';
const APP_ID          = process.env.APP_ID || 'myAppId';
const MASTER_KEY      = process.env.MASTER_KEY || 'myMasterKey';
const MASTER_REST_KEY = process.env.MASTER_REST_KEY || 'myRestApiKey';
const APP_NAME        = process.env.APP_NAME || 'photogram';
const PARSE_MOUNT     = process.env.PARSE_MOUNT || '/parse';
const CLOUD_CODE_MAIN = 'app/' + process.env.FOLDER + '/cloud/main.js';
const EJS_FOLDER      = 'app/' + process.env.FOLDER + '/' + process.env.EJS_FOLDER;
const SERVER_HOST     = process.env.SERVER_HOST || SERVER_URL + ':' + PORT + PARSE_MOUNT;
const LIVE_QUERY      = process.env.LIVE_QUERY;

// Database Ecosystem file
if (!DATABASE_URI) {
    console.log('DATABASE_URI not specified, falling back to localhost.');
}

let ServerConfig = {
    databaseURI     : DATABASE_URI,
    cloud           : CLOUD_CODE_MAIN,
    appId           : APP_ID,
    masterKey       : MASTER_KEY,
    serverURL       : SERVER_HOST,
    restAPIKey      : MASTER_REST_KEY,
    verifyUserEmails: false,
    publicServerURL : SERVER_URL,
    appName         : APP_NAME,
    logLevel        : 'VERBOSE'
};

// Live Query
if (LIVE_QUERY) {
    ServerConfig.liveQuery = {
        classNames: JSON.parse(LIVE_QUERY)
    }
}

// File Local
const UPLOAD_LOCAL = process.env.UPLOAD_LOCAL;
if (UPLOAD_LOCAL) {
    ServerConfig.filesAdapter = new FSFilesAdapter({
        filesSubDirectory: 'app/' + process.env.FOLDER + '/upload/'
    });
}

// AWS S3 configuration
const AWS_ACCESS_KEY_ID     = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME           = process.env.BUCKET_NAME;
if (AWS_ACCESS_KEY_ID) {
    ServerConfig.filesAdapter = new S3Adapter(
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY,
        BUCKET_NAME,
        {directAccess: true}
    );
}


// Mailgun configuration
const MAILGUN_API_KEY      = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN       = process.env.MAILGUN_DOMAIN;
const MAILGUN_FROM_ADDRESS = process.env.MAILGUN_FROM_ADDRESS;
if (MAILGUN_API_KEY) {
    ServerConfig.emailAdapter = {
        module : 'parse-server-simple-mailgun-adapter',
        options: {
            apiKey     : MAILGUN_API_KEY,
            fromAddress: MAILGUN_DOMAIN,
            domain     : MAILGUN_FROM_ADDRESS,
        }
    };
}


// Push OneSignal
const ONE_SIGNAL_APP_ID       = process.env.ONE_SIGNAL_APP_ID;
const ONE_SIGNAL_REST_API_KEY = process.env.ONE_SIGNAL_REST_API_KEY;
if (ONE_SIGNAL_APP_ID) {
    ServerConfig.push = {
        adapter: new OneSignalPushAdapter({
            oneSignalApiKey: ONE_SIGNAL_APP_ID,
            oneSignalAppId : ONE_SIGNAL_REST_API_KEY,
        })
    };
}

// Start Parse Server
const api = new ParseServer(ServerConfig);
const app = express();

// Cors
app.use(cors());

//
app.use((req, res, next) => {
    res.locals.appId     = APP_ID;
    res.locals.serverUrl = SERVER_HOST;
    next();
});

// EJS Template
if (EJS_FOLDER) {
    app.set('view engine', 'ejs');
    app.set('views', EJS_FOLDER);
    app.use(expressLayouts);
    app.use(express.static(EJS_FOLDER));
    app.get('/', (req, res) => res.render('index'));
}

// Serve the Parse API on the /parse URL prefix
const mountPath = PARSE_MOUNT;
app.use(mountPath, api);


const httpServer = require('http').createServer(app);
httpServer.listen(PORT, () => console.log(APP_NAME + ' server running on ' + SERVER_HOST + '.'));

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);