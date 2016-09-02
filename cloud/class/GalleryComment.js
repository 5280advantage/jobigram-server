'use strict';
const Image           = require('../helpers/image');
const User            = require('./../class/User');
const GalleryActivity = require('./../class/GalleryActivity');
const ParseObject     = Parse.Object.extend('GalleryComment');
const MasterKey       = {useMasterKey: true};


module.exports = {
    beforeSave: beforeSave,
    afterSave : afterSave
};

function beforeSave(req, res) {
    const comment = req.object;
    const user    = req.user;
    const gallery = comment.get('gallery');

    if (!user) {
        return res.error('Not Authorized');
    }

    if (!comment.existed()) {
        var acl = new Parse.ACL();
        acl.setPublicReadAccess(true);
        acl.setRoleWriteAccess('Admin', true);
        acl.setWriteAccess(user, true);
        comment.setACL(acl);
        comment.set('isInappropriate', false);

        new Parse.Query('UserData').equalTo('user', user).first(MasterKey).then(profile => {

            comment.set('user', user);
            comment.set('profile', profile);
            return res.success();
        });
    } else {
        return res.success();
    }

}

function afterSave(req, res) {
    const comment = req.object;

    if (req.object.existed()) {
        return
    }
    new Parse.Query('Gallery')
        .equalTo('objectId', comment.get('gallery').id)
        .first(MasterKey)
        .then(gallery => {

            // Relation
            let relation = gallery.relation('comments');
            relation.add(req.object);
            gallery.save();

            let activity = {
                action  : 'comment',
                fromUser: req.user,
                comment : comment,
                toUser  : gallery.attributes.user,
                gallery : gallery
            };

            return Parse.Promise.when([
                GalleryActivity.create(activity),
                User.incrementComment(req.user)
            ]);

        })


}