'use strict';
const _ = require('lodash');
const User = require('./../class/User');
const ParseObject = Parse.Object.extend('GalleryActivity');
const UserFollow = Parse.Object.extend('UserFollow');

module.exports = {
    afterSave: afterSave,
    create: create,
    feed: feed,
};

function afterSave(req, res) {
    //if (req.object.existed()) {
    //    return
    //}

    if (!req.object.get('toUser')) {
        throw 'Undefined toUser. Skipping push for Activity ' + req.object.get('action') + ' : ' + req.object.id;
        return;
    }

    console.log('afterSave', req);


    Parse.Promise.when([
        new Parse.Query('User').equalTo('objectId', req.object.get('fromUser').id).first({
            useMasterKey: true
        }),
        new Parse.Query('User').equalTo('objectId', req.object.get('toUser').id).first({
            useMasterKey: true
        })
    ]).then(result => {
        const fromUser = result[0];
        const toUser = result[1];
        const action = req.object.get('action');
        let channel = toUser.attributes.username;

        Parse.Push.send({
                channels: [channel],
                data: {
                    alert: alertMessage(action, result[0].attributes.name), // Set our alert message.
                    badge: 'Increment', // Increment the target device's badge count.
                    // The following keys help Anypic load the correct photo in response to this push notification.
                    p: 'a', // Payload Type: Activity
                    t: 'c', // Activity Type: Comment
                    fu: fromUser.id, // From User
                    pid: toUser.id // Photo Id
                }
            }, {
                useMasterKey: true
            })
            .then(function() {
                console.log('push sent. args received: ' + JSON.stringify(arguments) + '\n');
                res.success({
                    status: 'push sent',
                    ts: Date.now()
                });
            }, function(error) {
                console.log('push failed. ' + JSON.stringify(error) + '\n');
                res.error(error);
            });
    });
}

function alertMessage(action, userName) {

    let message = '';
    console.log('alertMessage', action)

    if (action === 'comment') {
        message = userName + ' commented on your photo.';
    } else if (action === 'like') {
        message = userName + ' likes your photo.';
    } else if (action === 'followUser') {
        message = userName + ' is now following you.';
    }

    // Trim our message to 140 characters.
    if (message.length > 140) {
        message = message.substring(0, 140);
    }

    console.log('message', action, message)
    return message;
}

function create(obj, acl) {

    let newActivity = new ParseObject()
        .set('action', obj.action)
        .set('isApproved', true)
        .set('fromUser', obj.fromUser);

    if (obj.toUser) {
        newActivity.set('toUser', obj.toUser);
    }

    if (acl) {
        newActivity.setACL(acl);
    }

    return newActivity.save(null, {
        useMasterKey: true
    });
}

function feed(req, res, next) {
    const _page = req.params.page || 1;
    const _limit = req.params.limit || 10;

    console.log('Start feed', req.params);

    new Parse.Query(ParseObject)
        .descending('createdAt')
        .limit(_limit)
        .include('gallery')
        .equalTo('toUser', req.user)
        .skip((_page * _limit) - _limit)
        .find({
            useMasterKey: true
        })
        .then(data => {
            let _result = [];

            if (!data.length) {
                res.success(_result);
            }

            let cb = _.after(data.length, () => {
                res.success(_result);
            });

            _.each(data, item => {

                let userGet = item.get('fromUser');
                new Parse.Query('UserData').equalTo('user', userGet).first().then(user => {

                    let obj = {
                        item: item,
                        action: item.get('action'),
                        createdAt: item.get('createdAt'),
                    };

                    if (user) {


                        new Parse.Query(UserFollow)
                            .equalTo('from', req.user)
                            .equalTo('to', user)
                            .count()
                            .then(isFollow => {
                                console.log(isFollow);
                                obj.user = {
                                    obj: user,
                                    id: user.id,
                                    name: user.get('name'),
                                    username: user.get('username'),
                                    status: user.get('status'),
                                    photo: user.get('photo'),
                                    isFollow: isFollow > 0 ? true : false
                                };
                                _result.push(obj);
                                cb();

                            }, res.error);
                    } else {

                        // Comments
                        _result.push(obj);
                        cb();
                    }

                }, err => console.log);

            });


        }, error => res.error(error.message));
}