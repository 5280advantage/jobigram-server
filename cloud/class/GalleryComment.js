'use strict';
const Image = require('../helpers/image');
const User = require('./../class/User');
const GalleryActivity = require('./../class/GalleryActivity');
const ParseObject = Parse.Object.extend('GalleryComment');
module.exports = {
    beforeSave: beforeSave,
    afterSave: afterSave
};

function beforeSave(req, res) {
    var comment = req.object;
    var user = req.user;
    var gallery = comment.get('gallery');

    if (!user) {
        return res.error('Not Authorized');
    }

    comment.set('user', user);

    if (!comment.existed()) {
        var acl = new Parse.ACL();
        acl.setPublicReadAccess(true);
        acl.setRoleWriteAccess('Admin', true);
        acl.setWriteAccess(user, true);
        comment.setACL(acl);
        comment.set('isInappropriate', false);
    }

    return res.success();
}

function afterSave(req, res) {
    const comment = req.object;

    if (req.object.existed()) {
        return
    }
    new Parse.Query('Gallery')
        .equalTo('objectId', comment.get('gallery').id)
        .first({useMasterKey: true})
        .then(gallery => {

            let activity = {
                action: 'comment',
                fromUser: req.user,
                comment: comment,
                toUser: gallery.attributes.user,
                gallery: gallery
            };

            return Parse.Promise.when([
                GalleryActivity.create(activity),
                User.incrementComment(req.user)
            ]);

        })


}