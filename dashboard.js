'use strict';
const ParseDashboard    = require('parse-dashboard');
const fs                = require('fs')
const stripJsonComments = require('strip-json-comments');
const express           = require('express');

// Load ecosystem.json file
const json    = fs.readFileSync('./ecosystem.json', 'utf8');
let ecosystem = JSON.parse(stripJsonComments(json));

// PM2 Envs
const PORT               = process.env.PORT || 2000;
const DASHBOARD_URL      = process.env.DASHBOARD_URL;
const DASHBOARD_USER     = process.env.DASHBOARD_USER;
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;
var apps                 = [];

// Delete Parse Dashboard in ecosystem.json
delete ecosystem.apps[0];
ecosystem.apps.map(app=> {
    apps.push({
        appName  : app.env.APP_NAME,
        serverURL: app.env.SERVER_URL + ':' + app.env.PORT + app.env.PARSE_MOUNT,
        appId    : app.env.APP_ID,
        masterKey: app.env.MASTER_KEY,
        iconName : app.env.FOLDER + '/icon.png'
    });
});

// Start Parse Dashboard with apps
const dashboard = new ParseDashboard({
    apps       : apps,
    users      : [
        {
            user: DASHBOARD_USER, // Used to log in to your Parse Dashboard
            pass: DASHBOARD_PASSWORD
        }
    ],
    iconsFolder: 'app'
}, true);

// Start Express
const app = express();
// make the Parse Dashboard available at /dashboard
app.use(DASHBOARD_URL, dashboard);

const httpServer = require('http').createServer(app);
httpServer.listen(PORT, () => console.log('Parse Dashboard running on ' + PORT + '.'));