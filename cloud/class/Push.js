'use strict';

module.exports = {
    pushChannelTest   : pushChannelTest,
    iosPushTest       : iosPushTest,
    subscribeToChannel: subscribeToChannel,
    sendPush          : sendPush,
}
// Android push test
function pushChannelTest(request, response) {

    // request has 2 parameters: params passed by the client and the authorized user
    var params = request.params;
    var user   = request.user;

    // To be used with:
    // https://github.com/codepath/ParsePushNotificationExample
    // See https://github.com/codepath/ParsePushNotificationExample/blob/master/app/src/main/java/com/test/MyCustomReceiver.java
    var customData = params.customData;
    var launch     = params.launch;
    var broadcast  = params.broadcast;

    // use to custom tweak whatever payload you wish to send
    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo("deviceType", "android");

    var payload = {};

    if (customData) {
        payload.customdata = customData;
    }
    else if (launch) {
        payload.launch = launch;
    }
    else if (broadcast) {
        payload.broadcast = broadcast;
    }

    // Note that useMasterKey is necessary for Push notifications to succeed.

    Parse.Push.send({
        where: pushQuery,      // for sending to a specific channel
        data : payload,
    }, {
        success     : function () {
            console.log("#### PUSH OK");
        },
        error       : function (error) {
            console.log("#### PUSH ERROR" + error.message);
        },
        useMasterKey: true
    });

    response.success('success');
}

// iOS push testing
function iosPushTest(request, response) {

    // request has 2 parameters: params passed by the client and the authorized user
    var params = request.params;
    var user   = request.user;

    // Our "Message" class has a "text" key with the body of the message itself
    var messageText = params.text;

    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only

    Parse.Push.send({
        where: pushQuery, // Set our Installation query
        data : {
            alert: "Message: " + messageText
        }
    }, {
        success     : function () {
            console.log("#### PUSH OK");
        },
        error       : function (error) {
            console.log("#### PUSH ERROR" + error.message);
        },
        useMasterKey: true
    });

    response.success('success');
}

function sendPush(request, response) {

    var userQuery = new Parse.Query(Parse.User);
    userQuery.equalTo('username', request.params.targetUsername);

    var pushQuery = new Parse.Query(Parse.Installation);
    pushQuery.matchesQuery('user', userQuery);


    Parse.Push.send({
        where    : pushQuery,
        data     : {
            alert: 'You have a new message from ' + request.params.fromUsername + '!'
        },
        push_time: request.params.date
    }, {
        success: function () {
            // Push was successful
            response.success('push successful')
        },
        error  : function (error) {
            // Handle error
            response.error('push failed')
        }
    });

}


function subscribeToChannel(req, res) {
    const user        = req.user;
    const channelName = req.params.channel;

    if (!channelName) {
        res.error('Missing parameter: channel')
        return;
    }

    if (!user) {
        res.error('Missing parameter: userId')
        return;
    }

    // Need the Master Key to update Installations
    Parse.Cloud.useMasterKey();

    // A user might have more than one Installation
    new Parse.Query(Parse.Installation)
        .equalTo('user', user) // Match Installations with a pointer to this User
        .find({useMasterKey: true})
        .then(installations=> {
            for (var i = 0; i < installations.length; ++i) {
                // Add the channel to all the installations for this user
                installations[i].addUnique('channels', channel);
            }

            // Save all the installations
            Parse.Object.saveAll(installations, {
                success: function (installations) {
                    // All the installations were saved.
                    res.success('All the installations were updated with this channel.');
                },
                error  : function (error) {
                    // An error occurred while saving one of the objects.
                    console.error(error);
                    res.error('An error occurred while updating this user\'s installations.')
                },
            });
        })
        .catch(error => {
            console.error(error);
            res.error('An error occurred while looking up this user\'s installations.')
        });
}
