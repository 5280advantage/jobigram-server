!function () {
    "use strict";
    angular.module("photogram", ["ngAnimate", "ngCookies", "ngSanitize", "ngMessages", "ngAria", "ui.router", "ngMaterial", "toastr", "md.data.table", "ngFileUpload", "ngMap", "angularMoment", "mdFormValidator", "validatorEquals", "validatorAsync", "pascalprecht.translate", "tmh.dynamicLocale", "ionic", "admin", "public"])
}(), function () {
    "use strict";
    angular.module("admin", ["photogram"])
}(), function () {
    "use strict";
    angular.module("public", ["photogram"])
}(), function () {
    "use strict";
    function e(e, t, n) {e.debugEnabled(!0), n.allowHtml = !0, n.timeOut = 3e3, n.positionClass = "toast-top-right", n.preventDuplicates = !0, n.progressBar = !0, e.debugEnabled(!0), t.useLoader("$translatePartialLoader", {urlTemplate: "{part}/i18n/{lang}.json"}), t.preferredLanguage("en"), t.useSanitizeValueStrategy("sanitize")}

    e.$inject = ["$logProvider", "$translateProvider", "toastrConfig"], angular.module("photogram").config(e)
}(), function () {
    "use strict";
    angular.module("photogram").constant("malarkey", malarkey).constant("moment", moment).constant("AppConfig", {
        app            : {
            name : "Photogram",
            url  : "http://photogramapp.com",
            image: "http://photogramapp.com/social-share.jpg"
        },
        routes         : {
            home : "photogram.home",
            login: "user.intro"
        },
        color          : "#00796B",
        facebook       : "1024016557617380",
        parse          : {
            appId : "myAppId",
            server: "./parse/"
        },
        locales        : [{
            translation: "LANG.PORTUGUES",
            code       : "pt"
        }, {
            translation: "LANG.ENGLISH",
            code       : "en"
        }, {
            translation: "LANG.TURKISH",
            code       : "tr"
        }, {
            translation: "LANG.PERSIAN",
            code       : "fa"
        }, {
            translation: "LANG.GERMAN",
            code       : "de"
        }],
        preferredLocale: "en"
    })
}(), function () {
    "use strict";
    function e(e, t) {t.otherwise("/")}

    e.$inject = ["$stateProvider", "$urlRouterProvider"], angular.module("photogram").config(e)
}(), function () {
    "use strict";
    function e(e, t, n) { n.currentUser = Parse.User.current()}

    function t(e) {e.debug("runBlock end")}

    t.$inject = ["$log"], e.$inject = ["AppConfig", "Install", "$rootScope"], angular.module("photogram").run(e).run(t)
}(), function () {
    "use strict";
    angular.module("photogram").config(["$mdThemingProvider", function (e) {
        e.definePalette("Photogram", {
            50                  : "#858585",
            100                 : "#5e5e5e",
            200                 : "#424242",
            300                 : "#1f1f1f",
            400                 : "#0f0f0f",
            500                 : "#FFFFFF",
            600                 : "#000000",
            700                 : "#000000",
            800                 : "#000000",
            900                 : "#000000",
            A100                : "#858585",
            A200                : "#5e5e5e",
            A400                : "#0f0f0f",
            A700                : "#000000",
            contrastDefaultColor: "dark",
            contrastDarkColors  : "50 A100"
        }), e.theme("default").primaryPalette("Photogram")
    }])
}(), function () {
    "use strict";
    function e(e) {
        e.state("admin", {
            url       : "/admin",
            "abstract": !0,
            views     : {
                main            : {
                    templateUrl: "app/admin/views/admin.html",
                    controller : "AdminCtrl"
                },
                "toolbar@app"   : {templateUrl: "app/public/views/toolbar.html"},
                "quickPanel@app": {template: ""}
            }
        }).state("admin.home", {
            url        : "home",
            templateUrl: "app/admin/views/admin.home.html",
            controller : "AdminHomeCtrl"
        }).state("admin.gallery", {
            url        : "gallery",
            templateUrl: "app/admin/views/admin.gallery.html",
            controller : "AdminGalleryCtrl"
        }).state("admin.user", {
            url        : "user",
            templateUrl: "app/admin/views/admin.user.html",
            controller : "AdminUserCtrl"
        }).state("admin.activity", {
            url        : "activity",
            templateUrl: "app/admin/views/admin.activity.html",
            controller : "AdminActivityCtrl"
        }).state("admin.feedback", {
            url        : "feedback",
            templateUrl: "app/admin/views/admin.feedback.html",
            controller : "AdminFeedbackCtrl"
        }).state("admin.comment", {
            url        : "comment",
            templateUrl: "app/admin/views/admin.comment.html",
            controller : "AdminCommentCtrl"
        }).state("admin.setting", {
            url        : "setting",
            templateUrl: "app/admin/views/admin.setting.html",
            controller : "AdminSettingCtrl"
        })
    }

    e.$inject = ["$stateProvider"], angular.module("admin").config(e)
}(), function () {
    "use strict";
    angular.module("photogram").directive("actualSrc", function () {
        return {
            link: function (e, t, n) {
                n.$observe("actualSrc", function (e) {
                    if (void 0 !== e) {
                        var a = new Image;
                        a.src = n.actualSrc, angular.element(a).bind("load", function () {t.attr("src", n.actualSrc)})
                    }
                })
            }
        }
    })
}(), function () {
    "use strict";
    function e(e, t) {
        function n(n, a, o) {
            a.bind("click", function (a) {
                var o = e.confirm().title("Confirm action").content("Are you sure you want to delete this item?")
                         .ok("Delete").cancel("Cancel").targetEvent(a);
                e.show(o).then(function () {
                    n.Model.destroy(item)
                     .then(function (e) {t.simple("Item deleted."), n.onDelete()}, function (e) {t.simple(e.message)})
                })
            })
        }

        return {
            restrict: "A",
            link    : n,
            scope   : {
                model   : "=",
                item    : "=",
                onDelete: "="
            }
        }
    }

    e.$inject = ["$mdDialog", "Toast"], angular.module("photogram").directive("deleteItem", e)
}(), function () {
    "use strict";
    angular.module("photogram").directive("numbersOnly", function () {
        return {
            require: "ngModel",
            link   : function (e, t, n, a) {
                function o(e) {
                    if (e) {
                        var t = e.replace(/[^0-9]/g, "");
                        return t !== e && (a.$setViewValue(t), a.$render()), t
                    }
                    return void 0
                }

                a.$parsers.push(o)
            }
        }
    })
}(), function () {
    "use strict";
    function e() {
        function e(e, t, n) {
            t.bind("click", function () {
                var e = angular.element('<input type="file" accept="image/x-png, image/gif, image/jpeg" max-size="2048" />');
                e[0].click(), e.on("change", function (e) {
                    var t = e.currentTarget.files[0], n = new FileReader;
                    n.onload = function (e) {defer.resolve(e.target.result)}, n.readAsDataURL(t)
                })
            })
        }

        return {
            restrict: "A",
            link    : e
        }
    }

    angular.module("photogram").directive("uploadImage", e)
}(), function () {
    "use strict";
    function e(e) {
        e.state("app", {
            "abstract": !0,
            views     : {
                main         : {templateUrl: "app/public/views/main.html"},
                "toolbar@app": {
                    templateUrl: "app/public/views/toolbar.html",
                    controller : "ToolbarCtrl"
                },
                "sidenav@app": {template: ""}
            }
        }).state("app.feed", {
            url        : "/",
            templateUrl: "app/public/views/feed.html",
            controller : "FeedCtrl"
        }).state("app.activity", {
            url         : "/activity",
            templateUrl : "app/public/views/activity.html",
            controller  : "ActivityCtrl",
            controllerAs: "vm"
        }).state("app.search", {
            url        : "/search",
            templateUrl: "app/public/views/search.html",
            controller : "FeedCtrl"
        }).state("app.logout", {
            url       : "/logout",
            template  : "<div></div>",
            controller: "UserLogoutCtrl"
        }).state("app.install", {
            url         : "/install",
            templateUrl : "app/public/views/install.html",
            controller  : "InstallCtrl",
            controllerAs: "vm"
        }).state("app.register", {
            url         : "/register",
            templateUrl : "app/public/views/register.html",
            controller  : "UserRegisterCtrl",
            controllerAs: "vm"
        }).state("app.login", {
            url         : "/login",
            templateUrl : "app/public/views/login.html",
            controller  : "UserLoginCtrl",
            controllerAs: "vm"
        }).state("app.reset", {
            url        : "/reset",
            templateUrl: "app/public/views/reset.html",
            controller : "UserResetPasswordCtrl"
        }).state("app.editProfile", {
            "abstract" : !0,
            url        : "/account",
            templateUrl: "app/public/views/editprofile.sidenav.html",
            controller : "EditProfileSidenavCtrl"
        }).state("app.editProfile.account", {
            url        : "/edit",
            templateUrl: "app/public/views/editprofile.html"
        }).state("app.editProfile.password", {
            url        : "/password",
            templateUrl: "app/public/views/editprofile.html"
        }).state("app.docs", {
            url        : "/docs",
            templateUrl: "app/public/views/docs.html"
        }).state("app.profile", {
            url        : "/:username",
            templateUrl: "app/public/views/profile.html",
            controller : "ProfileCtrl",
            resolve    : {
                profile: ["$stateParams", "User", function (e, t) {
                    return t.findUserByUsername({username: e.username})
                            .then(function (e) {return e})["catch"](function () {return console.log("State", e), e.username})
                }]
            }
        })
    }

    e.$inject = ["$stateProvider"], angular.module("public").config(e)
}(), function () {
    "use strict";
    angular.module("photogram").factory("Auth", ["$q", function (e) {
        function t() {return new Parse.User.current}

        function n(e) {d = e}

        function a() {
            var t = e.defer();
            return null === d ? (t.reject("Session token invalid"), t.promise) : (Parse.User.current() ? t.resolve(Parse.User.current()) : Parse.User.become(d)
                                                                                                                                                .then(t.resolve, t.reject), t.promise)
        }

        function o(t) {
            var n = e.defer();
            return Parse.User.requestPasswordReset(t, {
                success: n.resolve,
                error  : n.reject
            }), n.promise
        }

        function i(t) {
            var n = e.defer();
            return Parse.User.requestPasswordReset(t, {
                success: n.resolve,
                error  : n.reject
            }), n.promise
        }

        function r(t) {
            var n = e.defer();
            return Parse.User.logIn(t.username, t.password, {
                success: n.resolve,
                error  : n.reject
            }), n.promise
        }

        function l() {
            var t = e.defer();
            return Parse.User.logOut().then(t.resolve, t.reject), t.promise
        }

        var d = null;
        return {
            getLoggedUser  : t,
            setSessionToken: n,
            ensureLoggedIn : a,
            recoverPassword: o,
            resetPassword  : i,
            logIn          : r,
            logOut         : l
        }
    }])
}(), function () {
    "use strict";
    angular.module("photogram").factory("GalleryActivity", ["$q", "ParseCloud", "moment", function (e, t, n) {
        var a = Parse.Object.extend("GalleryActivity", {getStatus: function () {return this.isApproved ? "Approved" : this.isApproved === !1 ? "Rejected" : "Pending"}}, {
            update : function (t) {
                var n = e.defer();
                return t.save(null, {
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            destroy: function (t) {
                var n = e.defer();
                return t.destroy({
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            feed   : function (e) {return t.run("feedActivity", e)},
            all    : function (t) {
                var a = e.defer(), o = new Parse.Query(this);
                if ("" != t.filter && o.contains("words", t.filter), t.order && (t.order.indexOf("-") < -1 ? o.ascending(t.order) : o.descending(t.order.replace("-"))), t.date && null !== t.date) {
                    var i = n(t.date).startOf("day"), r = n(t.date).endOf("day");
                    o.greaterThanOrEqualTo("createdAt", i.toDate()), o.lessThanOrEqualTo("createdAt", r.toDate())
                }
                return t.status && null !== t.status && ("pending" === t.status ? o.doesNotExist("isApproved") : "rejected" === t.status ? o.equalTo("isApproved", !1) : "approved" === t.status && o.equalTo("isApproved", !0)), o.include("gallery"), o.include("user"), o.limit(t.limit), o.skip(t.page * t.limit - t.limit), o.find({
                    success: a.resolve,
                    error  : a.reject
                }), a.promise
            },
            count  : function (t) {
                var a = e.defer(), o = new Parse.Query(this);
                if ("" != t.filter && o.contains("words", t.filter), t.date && null !== t.date) {
                    var i = n(t.date).startOf("day"), r = n(t.date).endOf("day");
                    o.greaterThanOrEqualTo("createdAt", i.toDate()), o.lessThanOrEqualTo("createdAt", r.toDate())
                }
                return t.status && null !== t.status && ("pending" === t.status ? o.doesNotExist("isApproved") : "rejected" === t.status ? o.equalTo("isApproved", !1) : "approved" === t.status && o.equalTo("isApproved", !0)), o.count({
                    success: function (e) {a.resolve(e)},
                    error  : function (e) {a.reject(e)}
                }), a.promise
            }
        });
        return Object.defineProperty(a.prototype, "fromUser", {
            get: function () {return this.get("fromUser")},
            set: function (e) {this.set("fromUser", e)}
        }), Object.defineProperty(a.prototype, "toUser", {
            get: function () {return this.get("toUser")},
            set: function (e) {this.set("toUser", e)}
        }), Object.defineProperty(a.prototype, "gallery", {
            get: function () {return this.get("gallery")},
            set: function (e) {this.set("gallery", e)}
        }), Object.defineProperty(a.prototype, "title", {
            get: function () {return this.get("title")},
            set: function (e) {this.set("title", e)}
        }), Object.defineProperty(a.prototype, "hashtags", {
            get: function () {return this.get("hashtags")},
            set: function (e) {this.set("hashtags", e)}
        }), Object.defineProperty(a.prototype, "words", {
            get: function () {return this.get("words")},
            set: function (e) {this.set("words", e)}
        }), Object.defineProperty(a.prototype, "address", {
            get: function () {return this.get("address")},
            set: function (e) {this.set("address", e)}
        }), Object.defineProperty(a.prototype, "image", {
            get: function () {return this.get("image")},
            set: function (e) {this.set("image", e)}
        }), Object.defineProperty(a.prototype, "imageThumb", {
            get: function () {return this.get("imageThumb")},
            set: function (e) {this.set("imageThumb", e)}
        }), Object.defineProperty(a.prototype, "location", {
            get: function () {return this.get("location")},
            set: function (e) {
                this.set("location", new Parse.GeoPoint({
                    latitude : e.latitude,
                    longitude: e.longitude
                }))
            }
        }), Object.defineProperty(a.prototype, "isApproved", {
            get: function () {return this.get("isApproved")},
            set: function (e) {this.set("isApproved", e)}
        }), Object.defineProperty(a.prototype, "expiresAt", {
            get: function () {return this.get("expiresAt")},
            set: function (e) {this.set("expiresAt", e)}
        }), a
    }])
}(), function () {
    "use strict";
    function e(e, t, n) {
        const a = Parse.Object.extend("Gallery", {getStatus: function () {return this.isApproved ? "Approved" : this.isApproved === !1 ? "Rejected" : "Pending"}}, {
            create : function (t) {
                var n = e.defer(), o = new a;
                return o.save(t, {
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            feed   : function (e) {return t.run("feedGallery", e)},
            update : function (t) {
                var n = e.defer();
                return t.save(null, {
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            destroy: function (t) {
                var n = e.defer();
                return t.destroy({
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            all    : function (t) {
                var a = e.defer(), o = new Parse.Query(this);
                if ("" != t.filter && o.contains("words", t.filter), t.order && (t.order.indexOf("-") < -1 ? o.ascending(t.order) : o.descending(t.order.replace("-"))), t.date && null !== t.date) {
                    var i = n(t.date).startOf("day"), r = n(t.date).endOf("day");
                    o.greaterThanOrEqualTo("createdAt", i.toDate()), o.lessThanOrEqualTo("createdAt", r.toDate())
                }
                return t.status && null !== t.status && ("pending" === t.status ? o.doesNotExist("isApproved") : "rejected" === t.status ? o.equalTo("isApproved", !1) : "approved" === t.status && o.equalTo("isApproved", !0)), o.include("users"), o.limit(t.limit), o.skip(t.page * t.limit - t.limit), o.find({
                    success: a.resolve,
                    error  : a.reject
                }), a.promise
            },
            count  : function (t) {
                var a = e.defer(), o = new Parse.Query(this);
                if ("" != t.filter && o.contains("words", t.filter), t.date && null !== t.date) {
                    var i = n(t.date).startOf("day"), r = n(t.date).endOf("day");
                    o.greaterThanOrEqualTo("createdAt", i.toDate()), o.lessThanOrEqualTo("createdAt", r.toDate())
                }
                return t.status && null !== t.status && ("pending" === t.status ? o.doesNotExist("isApproved") : "rejected" === t.status ? o.equalTo("isApproved", !1) : "approved" === t.status && o.equalTo("isApproved", !0)), o.count({
                    success: function (e) {a.resolve(e)},
                    error  : function (e) {a.reject(e)}
                }), a.promise
            }
        });
        return Object.defineProperty(a.prototype, "user", {
            get: function () {return this.get("user")},
            set: function (e) {this.set("user", e)}
        }), Object.defineProperty(a.prototype, "title", {
            get: function () {return this.get("title")},
            set: function (e) {this.set("title", e)}
        }), Object.defineProperty(a.prototype, "hashtags", {
            get: function () {return this.get("hashtags")},
            set: function (e) {this.set("hashtags", e)}
        }), Object.defineProperty(a.prototype, "words", {
            get: function () {return this.get("words")},
            set: function (e) {this.set("words", e)}
        }), Object.defineProperty(a.prototype, "address", {
            get: function () {return this.get("address")},
            set: function (e) {this.set("address", e)}
        }), Object.defineProperty(a.prototype, "image", {
            get: function () {return this.get("image")},
            set: function (e) {this.set("image", e)}
        }), Object.defineProperty(a.prototype, "imageThumb", {
            get: function () {return this.get("imageThumb")},
            set: function (e) {this.set("imageThumb", e)}
        }), Object.defineProperty(a.prototype, "location", {
            get: function () {return this.get("location")},
            set: function (e) {
                this.set("location", new Parse.GeoPoint({
                    latitude : e.latitude,
                    longitude: e.longitude
                }))
            }
        }), Object.defineProperty(a.prototype, "isApproved", {
            get: function () {return this.get("isApproved")},
            set: function (e) {this.set("isApproved", e)}
        }), Object.defineProperty(a.prototype, "expiresAt", {
            get: function () {return this.get("expiresAt")},
            set: function (e) {this.set("expiresAt", e)}
        }), a
    }

    e.$inject = ["$q", "ParseCloud", "moment"], angular.module("photogram").factory("Gallery", e)
}(), function () {
    "use strict";
    angular.module("photogram").factory("GalleryFeedback", ["$q", "moment", function (e, t) {
        var n = Parse.Object.extend("GalleryFeedback", {getStatus: function () {return this.isApproved ? "Approved" : this.isApproved === !1 ? "Rejected" : "Pending"}}, {
            create : function (t) {
                var a = e.defer(), o = new n;
                return t.user = Parse.User.current(), o.save(t, {
                    success: a.resolve,
                    error  : a.reject
                }), a.promise
            },
            update : function (t) {
                var n = e.defer();
                return t.save(null, {
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            destroy: function (t) {
                var n = e.defer();
                return t.destroy({
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            all    : function (n) {
                var a = e.defer(), o = new Parse.Query(this);
                if ("" != n.filter && o.contains("words", n.filter), n.date && null !== n.date) {
                    var i = t(n.date).startOf("day"), r = t(n.date).endOf("day");
                    o.greaterThanOrEqualTo("createdAt", i.toDate()), o.lessThanOrEqualTo("createdAt", r.toDate())
                }
                return n.status && null !== n.status && ("pending" === n.status ? o.doesNotExist("isApproved") : "rejected" === n.status ? o.equalTo("isApproved", !1) : "approved" === n.status && o.equalTo("isApproved", !0)), o.include("gallery"), o.include("User"), o.descending("createdAt"), o.limit(n.limit), o.skip(n.page * n.limit - n.limit), o.find({
                    success: a.resolve,
                    error  : a.reject
                }), a.promise
            },
            count  : function (n) {
                var a = e.defer(), o = new Parse.Query(this);
                if ("" != n.filter && o.contains("words", n.filter), n.date && null !== n.date) {
                    var i = t(n.date).startOf("day"), r = t(n.date).endOf("day");
                    o.greaterThanOrEqualTo("createdAt", i.toDate()), o.lessThanOrEqualTo("createdAt", r.toDate())
                }
                return n.order && (n.order.indexOf("-") < -1 ? o.ascending(n.order) : o.descending(n.order.replace("-"))), n.status && null !== n.status && ("pending" === n.status ? o.doesNotExist("isApproved") : "rejected" === n.status ? o.equalTo("isApproved", !1) : "approved" === n.status && o.equalTo("isApproved", !0)), o.count({
                    success: function (e) {a.resolve(e)},
                    error  : function (e) {a.reject(e)}
                }), a.promise
            }
        });
        return Object.defineProperty(n.prototype, "user", {
            get: function () {return this.get("user")},
            set: function (e) {this.set("user", e)}
        }), Object.defineProperty(n.prototype, "subject", {
            get: function () {return this.get("subject")},
            set: function (e) {this.set("subject", e)}
        }), Object.defineProperty(n.prototype, "title", {
            get: function () {return this.get("title")},
            set: function (e) {this.set("title", e)}
        }), Object.defineProperty(n.prototype, "hashtags", {
            get: function () {return this.get("hashtags")},
            set: function (e) {this.set("hashtags", e)}
        }), Object.defineProperty(n.prototype, "words", {
            get: function () {return this.get("words")},
            set: function (e) {this.set("words", e)}
        }), Object.defineProperty(n.prototype, "isApproved", {
            get: function () {return this.get("isApproved")},
            set: function (e) {this.set("isApproved", e)}
        }), Object.defineProperty(n.prototype, "expiresAt", {
            get: function () {return this.get("expiresAt")},
            set: function (e) {this.set("expiresAt", e)}
        }), n
    }])
}(), function () {
    "use strict";
    angular.module("photogram").factory("GallerySetting", ["$q", "moment", function (e, t) {
        var n = Parse.Object.extend("GallerySetting", {
            getStatus: function () {
                return t()
                    .toDate() >= this.expiresAt ? "Expired" : this.isApproved ? "Approved" : this.isApproved === !1 ? "Rejected" : "Pending"
            }
        }, {
            create : function (t) {
                var a = e.defer(), o = new n;
                return o.save(t, {
                    success: a.resolve,
                    error  : a.reject
                }), a.promise
            },
            update : function (t) {
                var n = e.defer();
                return t.save(null, {
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            destroy: function (t) {
                var n = e.defer();
                return t.destroy({
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            all    : function (t) {
                var n = e.defer(), a = new Parse.Query(this);
                return "" != t.filter && a.contains("canonical", t.filter), a.descending("createdAt"), a.limit(t.limit), a.skip(t.page * t.limit - t.limit), a.find({
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            count  : function (t) {
                var n = e.defer(), a = new Parse.Query(this);
                return a.count({
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            }
        });
        return Object.defineProperty(n.prototype, "key", {
            get: function () {return this.get("key")},
            set: function (e) {this.set("key", e)}
        }), Object.defineProperty(n.prototype, "value", {
            get: function () {return this.get("value")},
            set: function (e) {this.set("value", e)}
        }), n
    }])
}(), function () {
    "use strict";
    function e(e) {
        function t(t) {return e.run("install", t)}

        function n(t) {return e.run("status", t)}

        return {
            start : t,
            status: n
        }
    }

    e.$inject = ["ParseCloud"], angular.module("photogram").factory("Install", e)
}(), function () {
    "use strict";
    function e(e) {
        function t(t, n) {
            var a = e.defer();
            return Parse.Cloud.run(t, n, {
                success: a.resolve,
                error  : a.reject
            }), a.promise
        }

        return {run: t}
    }

    e.$inject = ["$q"], angular.module("photogram").factory("ParseCloud", e)
}(), function () {
    "use strict";
    angular.module("photogram").factory("ParseFile", ["$q", function (e) {
        function t(t, n) {
            var a = e.defer(), o = "file.jpg";
            return n && o.replace(".jpg", n), new Parse.File(o, t).save({
                success: a.resolve,
                error  : a.reject
            }), a.promise
        }

        return {upload: t}
    }])
}(), function () {
    "use strict";
    function e(e, t) {
        function n(t) {return e.show(e.simple().textContent(t))}

        function a(e, n) {
            t.show(t.alert().parent(angular.element(document.body)).clickOutsideToClose(!0).title(title)
                    .content(message).ariaLabel(e).ok("Ok").targetEvent(n))
        }

        return {
            simple: n,
            dialog: a
        }
    }

    e.$inject = ["$mdToast", "$mdDialog"], angular.module("photogram").factory("Toast", e)
}(), function () {
    "use strict";
    function e(e, t) {
        var n = Parse.User.extend({}, {
            signIn                : function (t) {
                var n = e.defer();
                return Parse.User.logIn(t.email, t.password, {
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            signUp                : function (t) {
                var n = e.defer(), a = new Parse.User;
                a.set({name: t.name}), a.set({username: t.email}), a.set({email: t.email}), a.set({password: t.password}), a.set({roleName: "User"});
                var o = new Parse.ACL;
                return o.setPublicReadAccess(!1), o.setPublicWriteAccess(!1), a.setACL(o), a.save(null, {
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            signInViaFacebook     : function (t) {
                var n = new Date;
                n.setSeconds(n.getSeconds() + t.authResponse.expiresIn), n = n.toISOString();
                var a = {
                    id             : t.authResponse.userID,
                    access_token   : t.authResponse.accessToken,
                    expiration_date: n
                }, o  = e.defer();
                return Parse.FacebookUtils.logIn(a, {
                    success: o.resolve,
                    error  : o.reject
                }), o.promise
            },
            findByEmail           : function (t) {
                var n = e.defer();
                return Parse.Cloud.run("findUserByEmail", {email: t}, {
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            updateWithFacebookData: function (t) {
                var n = e.defer();
                return Parse.Cloud.run("saveFacebookPicture", {}, {
                    success: function () {
                        var e = Parse.User.current();
                        e.set({email: t.email}), e.set({username: t.email}), e.set({name: t.name}), e.setACL(new Parse.ACL(e)), e.save(null, {
                            success: function () {
                                e.fetch().then(function (e) {n.resolve(e)}, function (e) {n.reject(e)})
                            },
                            error  : function (e, t) {n.reject(t)}
                        })
                    },
                    error  : n.reject
                }), n.promise
            },
            findUserByUsername    : function (e) {return t.run("findUserByUsername", e)},
            getPublicData         : function () {
                var t = e.defer();
                return new Parse.Query("UserData").equalTo("user", Parse.User.current()).first().then(function (e) {
                    e ? t.resolve(e) : t.reject(Parse.Promise.error({
                        code   : 1,
                        message: "User Data not found"
                    }))
                }, t.reject), t.promise
            },
            recoverPassword       : function (t) {
                var n = e.defer();
                return Parse.User.requestPasswordReset(t, {
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            destroy               : function () {
                var t = e.defer();
                return Parse.User.current().destroy().then(t.resolve, t.reject), t.promise
            },
            setPhoto              : function (t) {
                var n = e.defer(), a = Parse.User.current();
                return a.set({photo: t}), a.save(null, {
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            follow                : function (e) {
                var t = new Parse.Object("UserFolow");
                t.set("from", Parse.User.current()), t.set("to", e), t.set("date", Date()), t.save()
            },
            all                   : function (e) {return t.run("getUsers", e)},
            create                : function (e) {return t.run("createUser", e)},
            validateUsername      : function (t) {
                var n = e.defer();
                return n.resolve(!0), n.promise
            },
            validateEmail         : function (t) {
                var n = e.defer();
                return n.resolve(!0), n.promise
            },
            findUsername          : function (t) {
                var n = e.defer();
                return new Parse.Query(this).equalTo("username", t).first({
                    success: n.resolve,
                    error  : n.reject
                }), n.promise
            },
            update                : function (e) {
                var n = {
                    id      : e.id,
                    name    : e.name,
                    email   : e.email,
                    username: e.email,
                    password: e.password,
                    gender  : e.gender,
                    photo   : e.photo,
                    roleName: e.roleName
                };
                return t.run("updateUser", n)
            },
            "delete"              : function (e) {return t.run("destroyUser", e)},
            fetch                 : function () {
                var t = e.defer();
                return Parse.User.current() ? Parse.User.current().fetch()
                                                   .then(t.resolve, t.reject) : t.reject(), t.promise
            }
        });
        return Object.defineProperty(n.prototype, "name", {
            get: function () {return this.get("name")},
            set: function (e) {this.set("name", e)}
        }), Object.defineProperty(n.prototype, "username", {
            get: function () {return this.get("username")},
            set: function (e) {this.set("username", e)}
        }), Object.defineProperty(n.prototype, "gender", {
            get: function () {return this.get("gender")},
            set: function (e) {this.set("gender", e)}
        }), Object.defineProperty(n.prototype, "email", {
            get: function () {return this.get("email")},
            set: function (e) {this.set("email", e)}
        }), Object.defineProperty(n.prototype, "photo", {
            get: function () {return this.get("photo")},
            set: function (e) {this.set("photo", e)}
        }), Object.defineProperty(n.prototype, "photoThumb", {
            get: function () {return this.get("photoThumb")},
            set: function (e) {this.set("photoThumb", e)}
        }), Object.defineProperty(n.prototype, "roleName", {
            get: function () {return this.get("roleName")},
            set: function (e) {this.set("roleName", e)}
        }), n
    }

    e.$inject = ["$q", "ParseCloud"], angular.module("photogram").factory("User", e)
}(), function () {
    "use strict";
    function e(e, t, n, a) {
        function o(e) {n.show(n.simple().content(e).action("OK").hideDelay(3e3))}

        function i() {
            e.promise = a.all(e.query)
                         .then(function (t) {e.items = t, t.map(function (e) {console.log(e), console.log(e.attributes)})})
        }

        function r() {a.count(e.query).then(function (t) {e.query.total = t})}

        e.rowOptions = [10, 20, 40], e.query = {
            filter: "",
            limit : 40,
            page  : 1,
            total : 0,
            order : "-createdAt",
            status: "",
            date  : null
        }, e.items = [], e.openMenu = function (e, t) {e(t)}, i(), r(), e.onQueryChange = function () {e.query.page = 1, e.query.total = 0, i(), r()}, e.onCreateGalleryActivity = function (e) {
            t.show({
                controller         : "AdminGalleryActivityModalController",
                templateUrl        : "app/admin/views/modal/admin.activity.modal.html",
                parent             : angular.element(document.body),
                targetEvent        : e,
                locals             : {item: null},
                clickOutsideToClose: !0
            }).then(function (e) {i(), r()})
        }, e.onPaginationChange = function (t, n) {e.query.page = t, e.query.limit = n, i()}, e.isDate = function (e) {return angular.isDate(e)}, e.updateItem = function (e, n) {
            var a = angular.copy(n);
            t.show({
                controller         : "AdminGalleryActivityModalController",
                templateUrl        : "app/admin/views//modal/admin.activity.modal.html",
                parent             : angular.element(document.body),
                targetEvent        : e,
                locals             : {item: a},
                clickOutsideToClose: !0
            })
        }, e.destroyItem = function (e, n) {
            var l = t.confirm().title("Confirm action").content("Are you sure you want to delete this place?")
                     .ok("Delete").cancel("Cancel").targetEvent(e);
            t.show(l).then(function () {
                a.destroy(n).then(function (e) {o("GalleryActivity deleted."), i(), r()}, function (e) {o(e.message)})
            })
        }, e.aproveItem = function (e, t) {
            e.isApproved = t, e.unset("expiresAt"), a.update(e)
                                                     .then(function (e) {o("GalleryActivity updated")})["catch"](function (e) {o("There was an error")})
        }
    }

    e.$inject = ["$scope", "$mdDialog", "$mdToast", "GalleryActivity"], angular.module("admin")
                                                                               .controller("AdminActivityCtrl", e)
}(), function () {
    "use strict";
    angular.module("admin")
           .controller("AdminCommentCtrl", ["$scope", "$mdToast", "$mdDialog", "Comment", "Auth", function (e, t, n, a, o) {
               e.rowOptions = [10, 20, 40], e.query = {
                   limit : 40,
                   page  : 1,
                   total : 0,
                   status: null
               }, e.comments = [];
               var i = function () {e.promise = a.all(e.query).then(function (t) {e.comments = t})};
               i();
               var r = function () {a.count(e.query).then(function (t) {e.query.total = t})};
               r();
               var l = function (e) {t.show(t.simple().content(e).action("OK").hideDelay(3e3))};
               e.onQueryChange = function () {e.query.page = 1, i(), r()}, e.onPaginationChange = function (t, n) {e.query.page = t, e.query.limit = n, i()}, e.onUpdateIsInappropriate = function (e, t) {
                   var n = angular.copy(e);
                   n.isInappropriate = t, a.update(n)
                                           .then(function (e) {l("Comment updated")}, function (e) {l("There was an error")})
               }, e.openMenu = function (e, t) {e(t)}
           }])
}(), function () {
    "use strict";
    function e(e, t, n, a, o) {
        e.menus = [{
            title: "Dashboard",
            icon : "icon-newspaper",
            link : "admin.home"
        }, {
            title: "Gallery",
            icon : "icon-image",
            link : "admin.gallery"
        }, {
            title: "Comments",
            icon : "icon-message-text",
            link : "admin.comment"
        }, {
            title: "Activity",
            icon : "icon-heart",
            link : "admin.activity"
        }, {
            title: "Feedback",
            icon : "icon-message-text",
            link : "admin.feedback"
        }, {
            title: "Users",
            icon : "icon-account",
            link : "admin.user"
        }], e.toggle = function () {o("leftMenu").toggle()}
    }

    e.$inject = ["$scope", "Auth", "$rootScope", "$state", "$mdSidenav"], angular.module("admin")
                                                                                 .controller("AdminCtrl", e)
}(), function () {
    "use strict";
    function e(e, t, n, a) {
        function o(e) {n.show(n.simple().content(e).action("OK").hideDelay(3e3))}

        function i() {e.promise = a.all(e.query).then(function (t) {e.galleries = t})}

        function r() {a.count(e.query).then(function (t) {e.query.total = t})}

        e.rowOptions = [10, 20, 40], e.query = {
            filter  : "",
            limit   : 40,
            page    : 1,
            total   : 0,
            status  : null,
            category: null,
            date    : null
        }, e.places = [], e.openMenu = function (e, t) {e(t)}, i(), r(), e.onQueryChange = function () {e.query.page = 1, e.query.total = 0, i(), r()}, e.onCreateGalleryFeedback = function (e) {
            t.show({
                controller         : "AdminGalleryFeedbackModalController",
                templateUrl        : "app/admin/views/modal/admin.GalleryFeedback.modal.html",
                parent             : angular.element(document.body),
                targetEvent        : e,
                locals             : {item: null},
                clickOutsideToClose: !0
            }).then(function (e) {i(), r()})
        }, e.onPaginationChange = function (t, n) {e.query.page = t, e.query.limit = n, i()}, e.isDate = function (e) {return angular.isDate(e)}, e.onUpdateGalleryFeedback = function (e, n) {
            var a = angular.copy(n);
            t.show({
                controller         : "AdminGalleryFeedbackModalController",
                templateUrl        : "app/admin/views//modal/admin.GalleryFeedback.modal.html",
                parent             : angular.element(document.body),
                targetEvent        : e,
                locals             : {item: a},
                clickOutsideToClose: !0
            })
        }, e.onDestroyGalleryFeedback = function (e, n) {
            var l = t.confirm().title("Confirm action").content("Are you sure you want to delete this place?")
                     .ok("Delete").cancel("Cancel").targetEvent(e);
            t.show(l).then(function () {
                a.destroy(n).then(function (e) {o("GalleryFeedback deleted."), i(), r()}, function (e) {o(e.message)})
            })
        }, e.onUpdateIsApproved = function (e, t) {
            e.isApproved = t, e.unset("expiresAt"), a.update(e)
                                                     .then(function (e) {o("GalleryFeedback updated")})["catch"](function (e) {o("There was an error")})
        }
    }

    e.$inject = ["$scope", "$mdDialog", "$mdToast", "GalleryFeedback"], angular.module("admin")
                                                                               .controller("AdminFeedbackCtrl", e)
}(), function () {
    "use strict";
    function e(e, t, n, a) {
        function o() {
            e.promise = a.all(e.query).then(function (t) {t.map(function (e) {console.log(e)}), e.galleries = t})
        }

        function i() {a.count(e.query).then(function (t) {e.query.total = t})}

        e.Model = a, e.rowOptions = [10, 20, 40], e.query = {
            filter: "",
            limit : 10,
            page  : 1,
            total : 0,
            order : "-createdAt",
            status: "",
            date  : null
        }, e.items = [], e.openMenu = function (e, t) {e(t)}, e.init = function () {o(), i()}, e.init(), e.onQueryChange = function () {e.query.page = 1, e.query.total = 0, console.log(e.query), e.init()}, e.onCreateGallery = function (n) {
            t.show({
                controller         : "AdminGalleryModalController",
                templateUrl        : "app/admin/views/modal/admin.gallery.modal.html",
                parent             : angular.element(document.body),
                targetEvent        : n,
                locals             : {item: null},
                clickOutsideToClose: !0
            }).then(e.init)
        }, e.onPaginationChange = function (t, n) {e.query.page = t, e.query.limit = n, o()}, e.isDate = function (e) {return angular.isDate(e)}, e.onUpdateGallery = function (e, n) {
            var a = angular.copy(n);
            t.show({
                controller         : "AdminGalleryModalController",
                templateUrl        : "app/admin/views/modal/admin.gallery.modal.html",
                parent             : angular.element(document.body),
                targetEvent        : e,
                locals             : {item: a},
                clickOutsideToClose: !0
            })
        }, e.onUpdateIsApproved = function (e, t) {
            e.isApproved = t, e.unset("expiresAt"), a.update(e)
                                                     .then(function (e) {n.simple("Gallery updated")})["catch"](function (e) {n.simple("There was an error")})
        }
    }

    e.$inject = ["$scope", "$mdDialog", "Toast", "Gallery"], angular.module("admin").controller("AdminGalleryCtrl", e)
}(), function () {
    "use strict";
    function e() {}

    angular.module("admin").controller("AdminHomeCtrl", e)
}(), function () {
    "use strict";
    angular.module("admin")
           .controller("AdminSettingCtrl", ["$scope", "$mdDialog", "$mdToast", "GallerySetting", "Category", function (e, t, n, a, o) {
               console.log("teste"), e.rowOptions = [10, 20, 40], e.query = {
                   filter  : "",
                   limit   : 40,
                   page    : 1,
                   total   : 0,
                   status  : null,
                   category: null,
                   date    : null
               }, e.places = [];
               var i = function (e) {
                   n.show(n.simple().content(e).action("OK").hideDelay(3e3))
               }, r  = function () {e.promise = a.all(e.query).then(function (t) {e.galleries = t})};
               r();
               var l = function () {a.count(e.query).then(function (t) {e.query.total = t})};
               l(), e.onQueryChange = function () {e.query.page = 1, e.query.total = 0, console.log(e.query), r(), l()}, e.onCreateGallerySetting = function (e) {
                   t.show({
                       controller         : "AdminGallerySettingModalController",
                       templateUrl        : "app/admin/views/modal/admin.gallery.modal.html",
                       parent             : angular.element(document.body),
                       targetEvent        : e,
                       locals             : {gallery: null},
                       clickOutsideToClose: !0
                   }).then(function (e) {r(), l()})
               }, e.onPaginationChange = function (t, n) {e.query.page = t, e.query.limit = n, r()}, e.openMenu = function (e, t) {e(t)}, e.isDate = function (e) {return angular.isDate(e)}, e.onUpdateExpiresAt = function (e, n) {
                   t.show({
                       controller         : "DialogGallerySettingExpiresAtController",
                       templateUrl        : "app/admin/views//modal/admin.gallery.modal.html",
                       parent             : angular.element(document.body),
                       targetEvent        : e,
                       clickOutsideToClose: !0,
                       locals             : {place: n}
                   })
               }, e.onUpdateGallerySetting = function (e, n) {
                   var a = angular.copy(n);
                   t.show({
                       controller         : "DialogGallerySettingController",
                       templateUrl        : "app/admin/views//partials/place.html",
                       parent             : angular.element(document.body),
                       targetEvent        : e,
                       locals             : {place: a},
                       clickOutsideToClose: !0
                   })
               }, e.onDestroyGallerySetting = function (e, n) {
                   var o = t.confirm().title("Confirm action").content("Are you sure you want to delete this place?")
                            .ok("Delete").cancel("Cancel").targetEvent(e);
                   t.show(o).then(function () {
                       a.destroy(n)
                        .then(function (e) {i("GallerySetting deleted."), r(), l()}, function (e) {i(e.message)})
                   })
               }, e.onUpdateIsApproved = function (e, t) {
                   e.isApproved = t, e.unset("expiresAt"), a.update(e)
                                                            .then(function (e) {i("GallerySetting updated")}, function (e) {i("There was an error")})
               }
           }])
           .controller("DialogGallerySettingExpiresAtController", ["$scope", "$mdDialog", "$mdToast", "GallerySetting", "place", function (e, t, n, a, o) {
               e.place = o, e.formData = {};
               var i = function (e) {n.show(n.simple().content(e).action("OK").hideDelay(3e3))};
               e.isDayInvalid = function () {
                   var t = e.formData.days;
                   return t ? (t = parseInt(t, 10), 1 > t) : !0
               }, e.onUpdateExpiresAt = function () {
                   var t = moment().add(e.formData.days, "days").toDate();
                   o.expiresAt = t, o.isApproved = !0, e.isSavingExpiresAt = !0, a.update(o)
                                                                                  .then(function (t) {e.isSavingExpiresAt = !1, i("GallerySetting updated"), e.hide()}, function (t) {e.isSavingExpiresAt = !1, i("There was an error")})
               }, e.hide = function () {t.hide()}
           }])
}(), function () {
    "use strict";
    function e(e, t, n, a, o) {
        t.rowOptions = [10, 20, 40], t.query = {
            filter: "",
            order : "-createdAt",
            limit : 40,
            page  : 1,
            total : 0
        }, t.users = [];
        var i = function (e) {a.show(a.simple().content(e).action("OK").hideDelay(3e3))};
        e.fetch().then(function (e) {t.loggedUser = e});
        var r = function () {
            t.promise = e.all(t.query).then(function (e) {t.users = e.users, t.query.total = e.total})
        };
        r(), t.onSearch = function () {t.query.page = 1, r()}, t.onPaginationChange = function (e, n) {t.query.page = e, t.query.limit = n, r()}, t.openMenu = function (e, t) {e(t)}, t.onSaveUser = function (e) {
            n.show({
                controller         : "DialogUserController",
                templateUrl        : "app/admin/views/modal/admin.user.modal.html",
                parent             : angular.element(document.body),
                targetEvent        : e,
                locals             : {user: null},
                clickOutsideToClose: !0
            }).then(function (e) {r()})
        }, t.onUpdateUser = function (e, t) {
            var a = angular.copy(t);
            n.show({
                controller         : "DialogUserController",
                templateUrl        : "app/admin/views/modal/admin.user.modal.html",
                parent             : angular.element(document.body),
                targetEvent        : e,
                locals             : {user: a},
                clickOutsideToClose: !0
            }).then(function (e) {r()})
        }, t.onDeleteUser = function (t, a) {
            var o = n.confirm().title("Are you sure you want to delete the user?").ok("Delete").cancel("Cancel")
                     .targetEvent(t);
            n.show(o).then(function () {
                e["delete"]({id: a.id})
                    .then(function () {r(), i("User " + a.getUsername() + " deleted")}, function (e) {console.log(e), i(e.message)})
            })
        }
    }

    function t(e, t, n, a, o, i) {
        n.imageFilename = "", n.objUser = {roleName: "User"}, i && (n.objUser = i, n.objUser.photo && (n.imageFilename = n.objUser.photo.name()));
        var r = function (e) {o.show(o.simple().content(e).action("OK").hideDelay(3e3))};
        n.uploadImage = function (e) {
            return null !== e ? null === e.type.match(/image.*/) ? void r("File not supported") : void(e.$error ? r("File too large. Max 2MB") : (n.imageFilename = e.name, n.isUploading = !0, t.upload(e)
                                                                                                                                                                                                 .then(function (e) {n.objUser.photo = e, n.isUploading = !1, r("File uploaded")}, function (e) {r(e.message), n.isUploading = !1, n.objUser.photo = null}))) : void 0
        }, n.onEventSaveUser = function (t) {
            t ? n.objUser.password ? n.objUser.password.length < 6 ? r("Password should be at least 6 characters") : (n.isSavingUser = !0, e.create(n.objUser)
                                                                                                                                            .then(function (e) {r("User saved"), a.hide(), n.isSavingUser = !1}, function (e) {r(e.message), n.isSavingUser = !1})) : r("Password required") : r("Please correct all highlighted errors and try again")
        }, n.onEventUpdateUser = function (t) {
            if (t) {
                if (n.objUser.password && n.objUser.password.length < 6)return void r("Password should be at least 6 characters");
                n.isSavingUser = !0, e.update(n.objUser)
                                      .then(function (e) {r("User updated"), a.hide(), n.isSavingUser = !1}, function (e) {r(e.message), n.isSavingUser = !1})
            } else r("Please correct all highlighted errors and try again")
        }, n.hide = function () {a.cancel()}, n.cancel = function () {a.cancel()}
    }

    e.$inject = ["User", "$scope", "$mdDialog", "$mdToast", "Auth"], t.$inject = ["User", "ParseFile", "$scope", "$mdDialog", "$mdToast", "user"], angular.module("admin")
                                                                                                                                                          .controller("AdminUserCtrl", e)
                                                                                                                                                          .controller("DialogUserController", t)
}(), function () {
    "use strict";
    function e(e, t, n, a, o, i, r, l) {
        var d, s;
        e.gallery = {title: ""}, e.input = {}, e.isCreating = !0, e.isImageOneUploading = !1, e.isImageTwoUploading = !1, e.isImageThreeUploading = !1, e.isImageFourUploading = !1, l && (e.gallery = l, e.gallery.image && (e.imageOneFilename = e.gallery.image.name()), e.input.latitude = l.location.latitude, e.input.longitude = l.location.longitude, e.isCreating = !1);
        var m = function (e) {n.show(n.simple().content(e).action("OK").hideDelay(3e3))};
        e.onAddressChanged = function () {
            r.geocode({address: e.gallery.address}).then(function (t) {
                if (s) {
                    var n = t[0].geometry.location;
                    n = new google.maps.LatLng(n.lat(), n.lng()), s.setCenter(n), s.setZoom(15), d.setPosition(n), e.gallery.location = new Parse.GeoPoint({
                        latitude : n.lat(),
                        longitude: n.lng()
                    }), e.input.latitude = n.lat(), e.input.longitude = n.lng()
                }
            })
        }, i.getMap().then(function (e) {
            if (s = e, d = s.markers[0], google.maps.event.trigger(s, "resize"), l) {
                var t = new google.maps.LatLng(l.location.latitude, l.location.longitude);
                s.setCenter(t), d.setPosition(t), s.setZoom(15)
            } else s.setZoom(1), s.setCenter(new google.maps.LatLng(0, 0))
        }), e.onMarkerDragEnd = function (t) {
            var n = t.latLng.lat(), a = t.latLng.lng();
            e.gallery.location = new Parse.GeoPoint({
                latitude : n,
                longitude: a
            }), e.input.latitude = n, e.input.longitude = a
        }, e.onInputLocationChanged = function () {
            e.input.latitude && e.input.longitude && s && (e.gallery.location = new Parse.GeoPoint({
                latitude : e.input.latitude,
                longitude: e.input.longitude
            }), d.setPosition(new google.maps.LatLng(e.input.latitude, e.input.longitude)), s.setCenter(new google.maps.LatLng(e.input.latitude, e.input.longitude)), s.setZoom(12))
        }, e.uploadImageOne = function (t, n) {
            t ? (e.isImageOneUploading = !0, e.imageOneFilename = t.name, o.upload(t)
                                                                           .then(function (t) {e.gallery.image = t, e.isImageOneUploading = !1, m("Image uploaded")}, function (t) {e.isImageOneUploading = !1, m(t.message)})) : n && "maxSize" === n.$error && m("Image too big. Max " + n.$errorParam)
        }, e.hide = function () {t.cancel()}, e.cancel = function () {t.cancel()}, e.onSaveGallery = function (n) {
            n ? e.gallery.image ? e.gallery.location ? (e.isSavingGallery = !0, a.create(e.gallery)
                                                                                 .then(function (n) {m("Gallery saved"), t.hide(), e.isSavingGallery = !1}, function (t) {m(t.message), e.isSavingGallery = !1})) : m("Ubication is required") : m("Upload at least the first image") : m("Please correct all highlighted errors and try again")
        }, e.onUpdateGallery = function (n) {
            n ? (e.isSavingGallery = !0, a.update(e.gallery)
                                          .then(function (n) {m("Gallery updated"), t.hide(), e.isSavingGallery = !1}, function (t) {m(t.message), e.isSavingGallery = !1})) : m("Please correct all highlighted errors and try again")
        }
    }

    e.$inject = ["$scope", "$mdDialog", "$mdToast", "Gallery", "ParseFile", "NgMap", "GeoCoder", "item"], angular.module("admin")
                                                                                                                 .controller("AminGalleryActivityModalController", e)
}(), function () {
    "use strict";
    function e(e, t, n, a, o, i, r, l) {
        var d, s;
        e.gallery = {title: ""}, e.input = {}, e.isCreating = !0, e.isImageOneUploading = !1, e.isImageTwoUploading = !1, e.isImageThreeUploading = !1, e.isImageFourUploading = !1, l && (e.gallery = l, e.gallery.image && (e.imageOneFilename = e.gallery.image.name()), e.input.latitude = l.location.latitude, e.input.longitude = l.location.longitude, e.isCreating = !1), e.onAddressChanged = function () {
            r.geocode({address: e.gallery.address}).then(function (t) {
                if (s) {
                    var n = t[0].geometry.location;
                    n = new google.maps.LatLng(n.lat(), n.lng()), s.setCenter(n), s.setZoom(15), d.setPosition(n), e.gallery.location = new Parse.GeoPoint({
                        latitude : n.lat(),
                        longitude: n.lng()
                    }), e.input.latitude = n.lat(), e.input.longitude = n.lng()
                }
            })
        }, i.getMap().then(function (e) {
            if (s = e, d = s.markers[0], google.maps.event.trigger(s, "resize"), l) {
                var t = new google.maps.LatLng(l.location.latitude, l.location.longitude);
                s.setCenter(t), d.setPosition(t), s.setZoom(15)
            } else s.setZoom(1), s.setCenter(new google.maps.LatLng(0, 0))
        }), e.onMarkerDragEnd = function (t) {
            var n = t.latLng.lat(), a = t.latLng.lng();
            e.gallery.location = new Parse.GeoPoint({
                latitude : n,
                longitude: a
            }), e.input.latitude = n, e.input.longitude = a
        }, e.onInputLocationChanged = function () {
            e.input.latitude && e.input.longitude && s && (e.gallery.location = new Parse.GeoPoint({
                latitude : e.input.latitude,
                longitude: e.input.longitude
            }), d.setPosition(new google.maps.LatLng(e.input.latitude, e.input.longitude)), s.setCenter(new google.maps.LatLng(e.input.latitude, e.input.longitude)), s.setZoom(12))
        }, e.uploadImageOne = function (t, a) {
            t ? (e.isImageOneUploading = !0, e.imageOneFilename = t.name, o.upload(t)
                                                                           .then(function (t) {e.gallery.image = t, e.isImageOneUploading = !1, n.simple("Image uploaded")}, function (t) {e.isImageOneUploading = !1, n.simple(t.message)})) : a && "maxSize" === a.$error && n.simple("Image too big. Max " + a.$errorParam)
        }, e.hide = function () {t.cancel()}, e.cancel = function () {t.cancel()}, e.onSaveGallery = function (o) {
            o ? e.gallery.image ? e.gallery.location ? (e.isSavingGallery = !0, console.log(e.gallery), a.create(e.gallery)
                                                                                                         .then(function (a) {n.simple("Gallery saved"), t.hide(), e.isSavingGallery = !1}, function (t) {n.simple(t.message), e.isSavingGallery = !1})) : n.simple("Ubication is required") : n.simple("Upload at least the first image") : n.simple("Please correct all highlighted errors and try again")
        }, e.onUpdateGallery = function (o) {
            o ? (e.isSavingGallery = !0, a.update(e.gallery)
                                          .then(function (a) {n.simple("Gallery updated"), t.hide(), e.isSavingGallery = !1}, function (t) {n.simple(t.message), e.isSavingGallery = !1})) : n.simple("Please correct all highlighted errors and try again")
        }
    }

    e.$inject = ["$scope", "$mdDialog", "Toast", "Gallery", "ParseFile", "NgMap", "GeoCoder", "item"], angular.module("admin")
                                                                                                              .controller("AdminGalleryModalController", e)
}(), function () {
    "use strict";
    function e(e, t) {
        function n() {c = !0, u = !1, p = !1, g = !1}

        function a() {u = !0, c = !1, p = !1, g = !1}

        function o() {p = !0, u = !1, c = !1, g = !1}

        function i() {g = !0, p = !1, u = !1, c = !1}

        function r(e) {f = !1, e > 0 && (f = !0)}

        function l(e) {for (var t = 0; t < e.length; t++)m.data.push(e[t])}

        function d(e) {m.params.page = e}

        function s() {
            t.feed(m.params)
             .then(function (t) {r(t.length), d(m.params.page + 1), l(t), 0 === m.data.length ? i() : a(), e.$broadcast("scroll.infiniteScrollComplete"), e.$broadcast("scroll.refreshComplete")})["catch"](function () {0 === m.data.length && o(), f = !1, e.$broadcast("scroll.refreshComplete")})
        }

        var m = this;
        m.params = {}, m.params.page = 1, m.data = [], s();
        var c = !1, u = !1, p = !1, g = !1, f = !1;
        m.onLoadMore = function () {s()}, m.moreDataCanBeLoaded = function () {return f}, m.showLoadingView = function () {return c}, m.showGalleries = function () {return u}, m.showErrorView = function () {return p}, m.showEmptyView = function () {return g}, m.onReload = function () {m.params.page = 0, m.data = [], n(), s(), e.$broadcast("scroll.refreshComplete")}
    }

    e.$inject = ["$scope", "GalleryActivity"], angular.module("public").controller("ActivityCtrl", e)
}(), function () {
    "use strict";
    function e(e, t) {
        e.menus = [{
            icon : "icon-user",
            title: "Edit profile",
            link : "app.editProfile.account"
        }, {
            icon : "icon-lock",
            title: "Change password",
            link : "app.editProfile.password"
        }], e.goLink = function (e) {t.go(e)}
    }

    e.$inject = ["$scope", "$state"], angular.module("public").controller("EditProfileSidenavCtrl", e)
}(), function () {
    "use strict";
    function e(e, t, n) {
        function a() {
            o.loading = !0, e.status()
                             .then(function (e) {console.log(e), o.loading = !1})["catch"](function (e) {n.simple(e.message), o.loading = !1})
        }

        var o = this;
        o.form = {
            name                : "",
            username            : "",
            password            : "",
            passwordConfirmation: ""
        }, a(), o.onSubmit = function (a, i) {
            console.log(i), o.loading = !0, a.invalid || e.start(angular.copy(i))
                                                          .then(function (e) {console.log(e), n.simple("Server Installed"), t.go("admin.login"), o.loading = !1})["catch"](function (e) {n.simple(e.message), o.loading = !1})
        }
    }

    e.$inject = ["Install", "$state", "Toast"], angular.module("admin").controller("InstallCtrl", e)
}(), function () {
    "use strict";
    function e(e, t, n, a, o) {
        var i     = this;
        i.onLogin = function (r, l) {
            r.$invalid ? n.simple("All inputs required") : (i.loading = !0, o.signIn({
                email   : l.username,
                password: l.password
            })
                                                                             .then(function (n) {i.loading = !1, e.currentUser = a.getLoggedUser(), console.log(n.attributes), t.go("app.feed")})["catch"](function (e) {console.log(e), n.simple("Invalid login"), i.loading = !1}))
        }
    }

    e.$inject = ["$rootScope", "$state", "Toast", "Auth", "User"], angular.module("public")
                                                                          .controller("UserLoginCtrl", e)
}(), function () {
    "use strict";
    function e(e, t) {console.log(Parse.User.current()), t.currentUser = Parse.User.current()}

    e.$inject = ["$state", "$rootScope"], angular.module("public").controller("MainCtrl", e)
}(), function () {
    "use strict";
    function e(e, t, n, a, o) {
        function i() {p = !0, g = !1, f = !1, h = !1}

        function r() {g = !0, p = !1, f = !1, h = !1}

        function l() {f = !0, g = !1, p = !1, h = !1}

        function d() {h = !0, f = !1, g = !1, p = !1}

        function s(e) {v = !1, e > 0 && (v = !0)}

        function m(e) {for (var n = 0; n < e.length; n++)t.data.push(e[n])}

        function c(e) {t.params.page = e}

        function u() {
            e.feed(t.params)
             .then(function (e) {s(e.length), c(t.params.page + 1), m(e), 0 === t.data.length ? d() : r(), t.$broadcast("scroll.infiniteScrollComplete"), t.$broadcast("scroll.refreshComplete")})["catch"](function () {0 === t.data.length && l(), v = !1, t.$broadcast("scroll.refreshComplete")})
        }

        console.log(o), t.user = o.attributes, t.params = {}, t.params.page = 1, t.params.username = o.attributes.username, t.data = [], t.openMenu = function (e) {
            a.show(a.confirm().title("Logout?").ariaLabel("Logout").targetEvent(e).ok("Yes").cancel("Cancel"))
             .then(function () {n.go("app.logout")})
        }, u();
        var p = !1, g = !1, f = !1, h = !1, v = !1;
        t.onLoadMore = function () {u()}, t.moreDataCanBeLoaded = function () {return v}, t.showLoadingView = function () {return p}, t.showGalleries = function () {return g}, t.showErrorView = function () {return f}, t.showEmptyView = function () {return h}, t.onReload = function () {t.params.page = 0, t.data = [], i(), u(), t.$broadcast("scroll.refreshComplete")}
    }

    e.$inject = ["Gallery", "$scope", "$state", "$mdDialog", "profile"], angular.module("public")
                                                                                .controller("ProfileCtrl", e)
}(), function () {
    "use strict";
    function e() {}

    angular.module("public").controller("SearchCtrl", e)
}(), function () {
    "use strict";
    function e(e, t, n) {
        var a = t.getLoggedUser();
        console.log(a), e.profile = function () {a.username ? n.go("app.profile", {username: a.username}) : n.go("app.login")}
    }

    e.$inject = ["$scope", "Auth", "$state"], angular.module("public").controller("ToolbarCtrl", e)
}(), function () {
    "use strict";
    angular.module("public")
           .controller("UserCtrl", ["User", "$scope", "$mdDialog", "$mdToast", "Auth", function (e, t, n, a, o) {
               t.rowOptions = [10, 20, 40], t.query = {
                   filter: "",
                   limit : 40,
                   page  : 1,
                   order : "-createdAt",
                   total : 0
               }, t.users = [];
               var i = function (e) {a.show(a.simple().content(e).action("OK").hideDelay(3e3))};
               e.fetch().then(function (e) {t.loggedUser = e});
               var r = function () {
                   t.promise = e.all(t.query)
                                .then(function (e) {console.log(e), t.users = e.users, t.query.total = e.total})
               };
               r(), t.onSearch = function () {t.query.page = 1, r()}, t.onPaginationChange = function (e, n) {t.query.page = e, t.query.limit = n, r()}, t.openMenu = function (e, t) {e(t)}, t.onSaveUser = function (e) {
                   n.show({
                       controller         : "DialogUserController",
                       templateUrl        : "app/admin/views/modal/admin.user.modal.html",
                       parent             : angular.element(document.body),
                       targetEvent        : e,
                       locals             : {user: null},
                       clickOutsideToClose: !0
                   }).then(function (e) {r()})
               }, t.onUpdateUser = function (e, t) {
                   var a = angular.copy(t);
                   n.show({
                       controller         : "DialogUserController",
                       templateUrl        : "app/admin/views/modal/admin.user.modal.html",
                       parent             : angular.element(document.body),
                       targetEvent        : e,
                       locals             : {user: a},
                       clickOutsideToClose: !0
                   }).then(function (e) {r()})
               }, t.onDeleteUser = function (t, a) {
                   var o = n.confirm().title("Are you sure you want to delete the user?").ok("Delete").cancel("Cancel")
                            .targetEvent(t);
                   n.show(o).then(function () {
                       e["delete"]({id: a.id})
                           .then(function () {r(), i("User " + a.getUsername() + " deleted")}, function (e) {console.log(e), i(e.message)})
                   })
               }
           }])
           .controller("DialogUserController", ["User", "ParseFile", "$scope", "$mdDialog", "$mdToast", "user", function (e, t, n, a, o, i) {
               n.imageFilename = "", n.objUser = {roleName: "User"}, i && (n.objUser = i, n.objUser.photo && (n.imageFilename = n.objUser.photo.name()));
               var r = function (e) {o.show(o.simple().content(e).action("OK").hideDelay(3e3))};
               n.uploadImage = function (e) {
                   return null !== e ? null === e.type.match(/image.*/) ? void r("File not supported") : void(e.$error ? r("File too large. Max 2MB") : (n.imageFilename = e.name, n.isUploading = !0, t.upload(e)
                                                                                                                                                                                                        .then(function (e) {n.objUser.photo = e, n.isUploading = !1, r("File uploaded")}, function (e) {r(e.message), n.isUploading = !1, n.objUser.photo = null}))) : void 0
               }, n.onEventSaveUser = function (t) {
                   t ? n.objUser.password ? n.objUser.password.length < 6 ? r("Password should be at least 6 characters") : (n.isSavingUser = !0, e.create(n.objUser)
                                                                                                                                                   .then(function (e) {r("User saved"), a.hide(), n.isSavingUser = !1}, function (e) {r(e.message), n.isSavingUser = !1})) : r("Password required") : r("Please correct all highlighted errors and try again")
               }, n.onEventUpdateUser = function (t) {
                   if (t) {
                       if (n.objUser.password && n.objUser.password.length < 6)return void r("Password should be at least 6 characters");
                       n.isSavingUser = !0, e.update(n.objUser)
                                             .then(function (e) {r("User updated"), a.hide(), n.isSavingUser = !1}, function (e) {r(e.message), n.isSavingUser = !1})
                   } else r("Please correct all highlighted errors and try again")
               }, n.hide = function () {a.cancel()}, n.cancel = function () {a.cancel()}
           }])
}(), function () {
    "use strict";
    function e(e, t, n, a) {
        e.logOut().then(function () {
            t.currentUser = null, n.go("app.feed"), console.log(t.currentUser), a("leftMenu").toggle()
        })
    }

    e.$inject = ["Auth", "$rootScope", "$state", "$mdSidenav"], angular.module("public").controller("UserLogoutCtrl", e)
}(), function () {
    "use strict";
    function e(e, t, n) {
        var a = this;
        a.form = {
            name                : "",
            username            : "",
            password            : "",
            passwordConfirmation: ""
        }, a.genders = [{
            text : "USER.FORM.MAN",
            value: "man"
        }, {
            text : "USER.FORM.WOMAN",
            value: "woman"
        }], a.validateUsername = function (t) {return e.validateUsername({input: t})}, a.validateEmail = function (t) {return e.validateEmail({input: t})}, a.onSubmit = function (o, i) {
            console.log(o, i), a.loading = !0, o.$invalid || e.create(angular.copy(i))
                                                              .then(function (e) {console.log(e), n.simple("Server Installed"), t.go("admin.login"), a.loading = !1})["catch"](function (e) {n.simple(e.message), a.loading = !1})
        }
    }

    e.$inject = ["User", "$state", "Toast"], angular.module("public").controller("UserRegisterCtrl", e)
}(), function () {
    "use strict";
    function e(e, t, n, a) {
        e.isLoading = !1;
        var o       = function (e, t, a) {
            n.show(n.alert().parent(angular.element(document.body)).clickOutsideToClose(!0).title(e).content(t)
                    .ariaLabel("Alert Dialog").ok("Ok").targetEvent(a))
        };
        e.onReset   = function (t, n, i) {
            t.$invalid || (e.isLoading = !0, a.resetPassword(e.email)
                                              .then(function (t) {e.isLoading = !1, o("Success", "Check your email to reset your password", i)}, function (t) {e.isLoading = !1, o("Error", t.message, i)}))
        }
    }

    e.$inject = ["$scope", "Toast", "$mdDialog", "Auth"], angular.module("admin").controller("UserResetPasswordCtrl", e)
}(), function () {
    "use strict";
    function e(e, t) {
        function n() {m = !0, c = !1, u = !1, p = !1}

        function a() {c = !0, m = !1, u = !1, p = !1}

        function o() {u = !0, c = !1, m = !1, p = !1}

        function i() {p = !0, u = !1, c = !1, m = !1}

        function r(e) {g = !1, e > 0 && (g = !0)}

        function l(e) {for (var n = 0; n < e.length; n++)t.data.push(e[n])}

        function d(e) {t.params.page = e}

        function s() {
            e.feed(t.params)
             .then(function (e) {r(e.length), d(t.params.page + 1), l(e), 0 === t.data.length ? i() : a(), t.$broadcast("scroll.infiniteScrollComplete"), t.$broadcast("scroll.refreshComplete")})["catch"](function () {0 === t.data.length && o(), g = !1, t.$broadcast("scroll.refreshComplete")})
        }

        console.log("Feed Controller"), t.params = {}, t.params.page = 1, t.data = [], s();
        var m = !1, c = !1, u = !1, p = !1, g = !1;
        t.onLoadMore = function () {s()}, t.moreDataCanBeLoaded = function () {return g}, t.showLoadingView = function () {return m}, t.showGalleries = function () {return c}, t.showErrorView = function () {return u}, t.showEmptyView = function () {return p}, t.onReload = function () {t.params.page = 0, t.data = [], n(), s(), t.$broadcast("scroll.refreshComplete")}
    }

    e.$inject = ["Gallery", "$scope"], angular.module("public").controller("FeedCtrl", e)
}(), angular.module("photogram").run(["$templateCache", function (e) {
    e.put("app/admin/views/admin.activity.html", '<h1>Activity</h1><md-card><md-table-toolbar><div layout="row"><md-content flex-gt-md="65" flex="100" style="overflow: hidden"><br><div layout-gt-sm="row" class="filter-bar"><md-input-container class="md-block" flex-gt-xs=""><label>Search by Title</label> <input type="text" ng-model="query.filter" ng-model-options="{ debounce: 1000 }" ng-change="onQueryChange()"></md-input-container><md-input-container class="md-block" flex-gt-xs=""><label>Status</label><md-select ng-model="query.status" ng-change="onQueryChange()"><md-option value="">All</md-option><md-option value="approved">Approved</md-option><md-option value="rejected">Rejected</md-option></md-select></md-input-container><md-datepicker ng-model="query.date" ng-change="onQueryChange()" md-itemholder="Enter date" flex-gt-xs=""></md-datepicker></div></md-content></div></md-table-toolbar><md-table-container><table md-table="" md-progress="promise"><thead md-head="" md-order="query.order" md-on-reorder="onQueryChange"><tr md-row=""><th md-column="">Avatar</th><th md-column="">From User</th><th md-column="">Action</th><th md-column="">To User</th><th md-column="">Gallery</th><th md-column="">Status</th><th md-column="" md-order-by="createdAt">Created At</th><th name="Actions"></th></tr></thead><tbody md-body=""><tr md-row="" ng-repeat="item in items"><td md-cell=""><img class="img-thumb img-circle" ng-src="/assets/images/placeholder.png" actual-src="{{ item.fromUser.attributes.photo._url }}"></td><td md-cell="">{{:: item.fromUser.attributes.name}}</td><td md-cell="">{{:: item.attributes.action }}</td><td md-cell="">{{:: item.toUser.attributes.name}}</td><td md-cell=""><img class="img-thumb img-circle" ng-src="/assets/images/placeholder.png" actual-src="{{ item.attributes.gallery.attributes.image._url }}"></td><td md-cell=""><span class="label" ng-class="{ \'green\': item.getStatus() === \'Approved\', \'red\': item.getStatus() === \'Rejected\' }">{{ item.getStatus() }}</span></td><td md-cell="">{{ item.createdAt | date:\'mediumDate\' }}</td><td md-cell=""><md-menu><md-button aria-label="Open menu" class="md-icon-button" ng-click="openMenu($mdOpenMenu, $event)"><md-icon md-menu-origin="" md-font-icon="icon-dots-vertical" layout="row" layout-align="start center"></md-icon></md-button><md-menu-content width="3"><md-menu-item><md-button aria-label="Edit item" ng-click="updateItem($event, item)">Edit</md-button></md-menu-item><md-menu-item aria-label="Delete item"><md-button aria-label="Delete item" ng-click="destroyItem($event, item)">Delete</md-button></md-menu-item><md-divider></md-divider><md-menu-item><md-button aria-label="Approve item" ng-click="aproveItem(item, true)">Approve</md-button></md-menu-item><md-menu-item><md-button aria-label="Reject item" ng-click="aproveItem(item, false)">Reject</md-button></md-menu-item></md-menu-content></md-menu></td></tr></tbody></table></md-table-container><md-table-pagination md-options="rowOptions" md-limit="query.limit" md-limit-options="rowOptions" md-page="query.page" md-page-select="" md-total="{{query.total}}" md-on-paginate="onPaginationChange"></md-table-pagination><md-button class="md-fab md-fab md-fab-bottom-right" aria-label="New Gallery" ng-click="onCreateGallery($event)"><md-icon class="icon-add" md-font-icon="icon-plus" layout="column" layout-align="center center"></md-icon></md-button></md-card>'), e.put("app/admin/views/admin.comment.html", '<h1>Comment</h1><md-card><md-table-toolbar><div layout="row"><md-content flex-gt-md="65" flex="100"><br><div layout-gt-sm="row" class="filter-bar"><md-input-container class="md-block"><label>Status</label><md-select ng-model="query.status" ng-change="onQueryChange()"><md-option value="">All</md-option><md-option value="inappropriate">Inappropriate</md-option><md-option value="appropriate">Appropriate</md-option></md-select></md-input-container></div></md-content></div></md-table-toolbar><md-table-container><table md-table="" md-progress="promise"><thead md-head="" md-order="query.order" md-on-reorder="onQueryChange"><tr md-row=""><th md-column=""></th><th md-column="">Name</th><th md-column="">Comment</th><th md-column="">Rating</th><th md-column="">Place</th><th md-column="" md-order-by="createdAt">Created At</th><th md-column=""></th></tr></thead><tbody md-body=""><tr md-row="" ng-repeat="comment in comments"><td md-cell=""><img class="img-thumb img-circle" ng-src="assets/images/placeholder.png" actual-src="{{ comment.userData.get(\'photo\').url() }}"></td><td md-cell="">{{ comment.userData.get(\'name\') }}</td><td md-cell=""><span><md-tooltip md-direction="top">{{ comment.comment }}</md-tooltip>{{ comment.comment }}</span></td><td md-cell="">{{ comment.place.get(\'title\') }}</td><td md-cell=""><span class="label" ng-class="{ \'red\': comment.getStatus() === \'Inappropriate\' }">{{ comment.getStatus() }}</span></td><td md-cell="">{{ item.createdAt | date:\'mediumDate\' }}</td><td md-cell=""><md-menu><md-button aria-label="Open menu" class="md-icon-button" ng-click="openMenu($mdOpenMenu, $event)"><ng-md-icon md-menu-origin="" icon="more_vert" layout="row" layout-align="start center"></ng-md-icon></md-button><md-menu-content width="3"><md-menu-item><md-button aria-label="Mark as appropriate" ng-click="onUpdateIsInappropriate(comment, false)">Flag as appropriate</md-button></md-menu-item><md-menu-item><md-button aria-label="Mark as inappropriate" ng-click="onUpdateIsInappropriate(comment, true)">Flag as inappropriate</md-button></md-menu-item></md-menu-content></md-menu></td></tr></tbody></table></md-table-container><md-table-pagination md-options="rowOptions" md-limit="query.limit" md-limit-options="rowOptions" md-page="query.page" md-page-select="" md-total="{{query.total}}" md-on-paginate="onPaginationChange"></md-table-pagination></md-card>'), e.put("app/admin/views/admin.feedback.html", '<h1>Feedback</h1><md-card><md-table-toolbar><div layout="row"><md-content flex-gt-md="65" flex="100" style="overflow: hidden"><br><div layout-gt-sm="row" class="filter-bar"><md-input-container class="md-block" flex-gt-xs=""><label>Search by Title</label> <input type="text" ng-model="query.filter" ng-model-options="{ debounce: 1000 }" ng-change="onQueryChange()"></md-input-container><md-input-container class="md-block" flex-gt-xs=""><label>Status</label><md-select ng-model="query.status" ng-change="onQueryChange()"><md-option value="">All</md-option><md-option value="approved">Approved</md-option><md-option value="rejected">Rejected</md-option></md-select></md-input-container><md-datepicker ng-model="query.date" ng-change="onQueryChange()" md-galleryholder="Enter date" flex-gt-xs=""></md-datepicker></div></md-content></div></md-table-toolbar><md-table-container><table md-table="" md-progress="promise"><thead md-head=""><tr md-row=""><th md-column="">Image</th><th md-column="">Title</th><th md-column="">User</th><th md-column="">Avatar</th><th md-column="">Hashtags</th><th md-column="">Status</th><th md-column="">Created At</th><th name="Actions"></th></tr></thead><tbody md-body=""><tr md-row="" ng-repeat="gallery in galleries"><td md-cell=""><img class="img-thumb img-circle" ng-src="/assets/images/placeholder.png" actual-src="{{ gallery.attributes.imageThumb._url }}"></td><td md-cell="">{{:: gallery.title }}</td><td md-cell="">{{:: gallery.user.attributes.name}}</td><td md-cell=""><img class="img-thumb img-circle" ng-src="/assets/images/placeholder.png" actual-src="{{ gallery.user.attributes.photo._url }}"></td><td md-cell="">{{:: gallery.hashtags }}</td><td md-cell=""><span class="label" ng-class="{ \'green\': gallery.getStatus() === \'Approved\', \'red\': gallery.getStatus() === \'Rejected\' }">{{ gallery.getStatus() }}</span></td><td md-cell="">{{ gallery.createdAt | date:\'mediumDate\' }}</td><td md-cell=""><md-menu><md-button aria-label="Open menu" class="md-icon-button" ng-click="openMenu($mdOpenMenu, $event)"><md-icon md-menu-origin="" md-font-icon="icon-dots-vertical" layout="row" layout-align="start center"></md-icon></md-button><md-menu-content width="3"><md-menu-item><md-button aria-label="Edit gallery" ng-click="onUpdateGallery($event, gallery)">Edit</md-button></md-menu-item><md-menu-item aria-label="Delete gallery"><md-button aria-label="Delete gallery" ng-click="onDestroyGallery($event, gallery)">Delete</md-button></md-menu-item><md-divider></md-divider><md-menu-item><md-button aria-label="Approve gallery" ng-click="onUpdateIsApproved(gallery, true)">Approve</md-button></md-menu-item><md-menu-item><md-button aria-label="Reject gallery" ng-click="onUpdateIsApproved(gallery, false)">Reject</md-button></md-menu-item></md-menu-content></md-menu></td></tr></tbody></table></md-table-container><md-table-pagination md-options="rowOptions" md-limit="query.limit" md-limit-options="rowOptions" md-page="query.page" md-page-select="" md-total="{{query.total}}" md-on-paginate="onPaginationChange"></md-table-pagination><md-button class="md-fab md-fab md-fab-bottom-right" aria-label="New Gallery" ng-click="onCreateGallery($event)"><md-icon class="icon-add" md-font-icon="icon-plus" layout="column" layout-align="center center"></md-icon></md-button></md-card>'), e.put("app/admin/views/admin.gallery.html", '<h1>Gallery</h1><md-card><md-table-toolbar><div layout="row"><md-content flex="100" style="overflow: hidden"><br><div layout-gt-sm="row" class="filter-bar"><md-input-container class="md-block" flex-gt-xs=""><label>Search by Title</label> <input type="text" ng-model="query.filter" ng-model-options="{ debounce: 1000 }" ng-change="onQueryChange()"></md-input-container><md-input-container class="md-block" flex-gt-xs=""><label>Status</label><md-select ng-model="query.status" ng-change="onQueryChange()"><md-option value="">All</md-option><md-option value="approved">Approved</md-option><md-option value="rejected">Rejected</md-option></md-select></md-input-container><md-datepicker ng-model="query.date" ng-change="onQueryChange()" md-galleryholder="Enter date" flex-gt-xs=""></md-datepicker></div></md-content></div></md-table-toolbar><md-table-container><table md-table="" md-progress="promise"><thead md-head="" md-order="query.order" md-on-reorder="onQueryChange"><tr md-row=""><th md-column="">Image</th><th md-column="" md-order-by="title">Title</th><th md-column="">User</th><th md-column="">Avatar</th><th md-column="">Words</th><th md-column="">Hashtags</th><th md-column="">Status</th><th md-column="" md-order-by="createdAt">Created At</th><th name="Actions"></th></tr></thead><tbody md-body=""><tr md-row="" ng-repeat="gallery in galleries"><td md-cell=""><img class="img-thumb img-circle" ng-src="/assets/images/placeholder.png" actual-src="{{ gallery.attributes.imageThumb._url }}"></td><td md-cell="">{{:: gallery.title }}</td><td md-cell="">{{:: gallery.user.attributes.name}}</td><td md-cell=""><img class="img-thumb img-circle" ng-src="/assets/images/placeholder.png" actual-src="{{ gallery.user.attributes.photo._url }}"></td><td md-cell="">{{:: gallery.words }}</td><td md-cell="">{{:: gallery.hashtags }}</td><td md-cell=""><span class="label" ng-class="{ \'green\': gallery.getStatus() === \'Approved\', \'red\': gallery.getStatus() === \'Rejected\' }">{{ gallery.getStatus() }}</span></td><td md-cell="">{{ gallery.createdAt | date:\'mediumDate\' }}</td><td md-cell=""><md-menu><md-button aria-label="Open menu" class="md-icon-button" ng-click="openMenu($mdOpenMenu, $event)"><md-icon md-menu-origin="" md-font-icon="icon-dots-vertical" layout="row" layout-align="start center"></md-icon></md-button><md-menu-content width="3"><md-menu-item><md-button aria-label="Edit gallery" ng-click="onUpdateGallery($event, gallery)">Edit</md-button></md-menu-item><md-menu-item aria-label="Delete gallery"><md-button aria-label="Delete gallery" delete-item="" model="Model" item="gallery" on-delete="init">Delete</md-button></md-menu-item><md-divider></md-divider><md-menu-item><md-button aria-label="Approve gallery" ng-click="onUpdateIsApproved(gallery, true)">Approve</md-button></md-menu-item><md-menu-item><md-button aria-label="Reject gallery" ng-click="onUpdateIsApproved(gallery, false)">Reject</md-button></md-menu-item></md-menu-content></md-menu></td></tr></tbody></table></md-table-container><md-table-pagination md-options="rowOptions" md-limit="query.limit" md-limit-options="rowOptions" md-page="query.page" md-page-select="" md-total="{{query.total}}" md-on-paginate="onPaginationChange"></md-table-pagination><md-button class="md-fab md-fab md-fab-bottom-right" aria-label="New Gallery" ng-click="onCreateGallery($event)"><md-icon class="icon-add" md-font-icon="icon-plus" layout="column" layout-align="center center"></md-icon></md-button></md-card>'), e.put("app/admin/views/admin.home.html", '<md-content><md-table-toolbar><div layout="row"><md-content flex-gt-md="65" flex="100" style="overflow: hidden"><br><div layout-gt-sm="row" class="filter-bar"><md-input-container class="md-block" flex-gt-xs=""><label>Search by Title</label> <input type="text" ng-model="query.filter" ng-model-options="{ debounce: 1000 }" ng-change="onQueryChange()"></md-input-container><md-input-container class="md-block" flex-gt-xs=""><label>Categories</label><md-select ng-model="query.category" ng-change="onQueryChange()"><md-option value="">All</md-option><md-option ng-value="category" value="{{ category }}" ng-repeat="category in categories">{{ category.title }}</md-option></md-select></md-input-container><md-input-container class="md-block" flex-gt-xs=""><label>Status</label><md-select ng-model="query.status" ng-change="onQueryChange()"><md-option value="">All</md-option><md-option value="pending">Pending</md-option><md-option value="approved">Approved</md-option><md-option value="rejected">Rejected</md-option><md-option value="expired">Expired</md-option><md-option value="expireInTenDays">Expires in 10 days</md-option><md-option value="expireInThirtyDays">Expires in 30 days</md-option></md-select></md-input-container><md-datepicker ng-model="query.date" ng-change="onQueryChange()" md-placeholder="Enter date" flex-gt-xs=""></md-datepicker></div></md-content></div></md-table-toolbar><md-table-container><table md-table="" md-progress="promise"><thead md-head=""><tr md-row=""><th md-column=""></th><th md-column="">Title</th><th md-column="">Category</th><th md-column="">Status</th><th md-column="">Expires At</th><th md-column="">Created At</th><th name="Actions"></th></tr></thead><tbody md-body=""><tr md-row="" ng-repeat="place in places"><td md-cell=""><img class="img-thumb img-circle" ng-src="/images/placeholder.png" actual-src="{{ place.imageThumb.url() }}"></td><td md-cell="">{{:: place.title }}</td><td md-cell="">{{:: place.category.get(\'title\') }}</td><td md-cell=""><span class="label" ng-class="{ \'green\': place.getStatus() === \'Approved\', \'red\': place.getStatus() === \'Rejected\', \'orange\': place.getStatus() === \'Expired\', \'yellow\': place.getStatus() === \'Pending\' }">{{ place.getStatus() }}</span></td><td md-cell=""><span ng-if="isDate(place.expiresAt)">{{ place.expiresAt | date:\'medium\' }}</span></td><td md-cell="">{{ place.createdAt | date:\'mediumDate\' }}</td><td md-cell=""><md-menu><md-button aria-label="Open menu" class="md-icon-button" ng-click="openMenu($mdOpenMenu, $event)"><ng-md-icon md-menu-origin="" icon="more_vert" layout="row" layout-align="start center"></ng-md-icon></md-button><md-menu-content width="3"><md-menu-item><md-button aria-label="Edit place" ng-click="onUpdatePlace($event, place)">Edit</md-button></md-menu-item><md-menu-item aria-label="Delete place"><md-button aria-label="Delete place" ng-click="onDestroyPlace($event, place)">Delete</md-button></md-menu-item><md-divider></md-divider><md-menu-item><md-button aria-label="Approve place" ng-click="onUpdateIsApproved(place, true)">Approve</md-button></md-menu-item><md-menu-item><md-button aria-label="Approve place for # days" ng-click="onUpdateExpiresAt($event, place)">Approve # days</md-button></md-menu-item><md-menu-item><md-button aria-label="Reject place" ng-click="onUpdateIsApproved(place, false)">Reject</md-button></md-menu-item></md-menu-content></md-menu></td></tr></tbody></table></md-table-container><md-table-pagination md-options="rowOptions" md-limit="query.limit" md-page="query.page" md-total="{{query.total}}" md-on-paginate="onPaginationChange"></md-table-pagination><md-button class="md-fab md-fab md-fab-bottom-right" aria-label="New Place" ng-click="onCreatePlace($event)"><md-icon class="icon-add" md-font-icon="icon-plus" layout="column" layout-align="center center"></md-icon></md-button></md-content>'),
        e.put("app/admin/views/admin.html", '<section layout="row" flex=""><md-sidenav class="md-sidenav-left md-whiteframe-z2" md-component-id="leftMenu" md-is-locked-open="$mdMedia(\'gt-lg\')"><md-toolbar class="md-tall md-hue-2"><span flex=""></span><div layout="column" class="md-toolbar-tools-bottom inset"><h5>Hi, {{currentUser.attributes.name}}</h5></div></md-toolbar><md-content><md-list-item md-no-ink="" ng-repeat="item in menus" ui-sref="{{item.link}}" aria-label="{{item.title}}" ng-click="toggle()"><div class="inset"><md-icon md-font-icon="{{item.icon}}" layout="column" layout-align="start center"></md-icon></div><div class="inset" ng-bind="item.title"></div></md-list-item><md-divider></md-divider><md-list-item ui-sref="app.logout"><div class="inset"><md-icon layout="column" md-font-icon="icon-exit-to-app" layout-align="start center"></md-icon></div><div class="inset">Log Out</div></md-list-item></md-content></md-sidenav><md-content layout="column" flex=""><md-toolbar layout="row" layout-align="start center"><div class="md-toolbar-tools md-whiteframe-1dp"><md-button class="md-icon-button" ng-click="toggle()" hide-gt-lg="" aria-label="Menu" ng-if="currentUser.id"><md-icon md-font-icon="icon-menu"></md-icon></md-button><h3>Photogram</h3></div></md-toolbar><md-content flex="" class="content" layout-padding=""><div flex="" layout-fill="" ui-view=""></div></md-content></md-content></section>'), e.put("app/admin/views/admin.layout.html", '<md-content flex="" layout-fill=""><div class="view-login bg-animate" layout="column" layout-align="center center" ui-view=""></div></md-content>'), e.put("app/admin/views/admin.setting.html", '<h1>Settings</h1><md-setting><md-table-toolbar><div layout="row"><md-content flex-gt-md="65" flex="100" style="overflow: hidden"><br><div layout-gt-sm="row" class="filter-bar"><md-input-container class="md-block" flex-gt-xs=""><label>Search by Title</label> <input type="text" ng-model="query.filter" ng-model-options="{ debounce: 1000 }" ng-change="onQueryChange()"></md-input-container><md-input-container class="md-block" flex-gt-xs=""><label>Status</label><md-select ng-model="query.status" ng-change="onQueryChange()"><md-option value="">All</md-option><md-option value="pending">Pending</md-option><md-option value="approved">Approved</md-option><md-option value="rejected">Rejected</md-option><md-option value="expired">Expired</md-option><md-option value="expireInTenDays">Expires in 10 days</md-option><md-option value="expireInThirtyDays">Expires in 30 days</md-option></md-select></md-input-container><md-datepicker ng-model="query.date" ng-change="onQueryChange()" md-galleryholder="Enter date" flex-gt-xs=""></md-datepicker></div></md-content></div></md-table-toolbar><md-table-container><table md-table="" md-progress="promise"><thead md-head=""><tr md-row=""><th md-column="">Key</th><th md-column="">Value</th><th md-column="">Created At</th><th name="Actions"></th></tr></thead><tbody md-body=""><tr md-row="" ng-repeat="gallery in galleries"><td md-cell="">{{:: gallery.key }}</td><td md-cell="">{{:: gallery.value }}</td><td md-cell=""><md-menu><md-button aria-label="Open menu" class="md-icon-button" ng-click="openMenu($mdOpenMenu, $event)"><md-icon md-menu-origin="" md-font-icon="icon-dots-vertical" layout="row" layout-align="start center"></md-icon></md-button><md-menu-content width="3"><md-menu-item><md-button aria-label="Edit gallery" ng-click="onUpdateGallery($event, gallery)">Edit</md-button></md-menu-item><md-menu-item aria-label="Delete gallery"><md-button aria-label="Delete gallery" ng-click="onDestroyGallery($event, gallery)">Delete</md-button></md-menu-item></md-menu-content></md-menu></td></tr></tbody></table></md-table-container><md-table-pagination md-options="rowOptions" md-limit="query.limit" md-page="query.page" md-total="{{query.total}}" md-on-paginate="onPaginationChange"></md-table-pagination><md-button class="md-fab md-fab md-fab-bottom-right" aria-label="New Gallery" ng-click="onCreateGallery($event)"><md-icon class="icon-add" md-font-icon="icon-plus" layout="column" layout-align="center center"></md-icon></md-button></md-setting>'), e.put("app/admin/views/admin.user.html", '<h1>User</h1><md-card><md-table-toolbar><div layout="row" flex=""><md-content flex="100"><md-input-container class="md-block" flex-gt-xs=""><input type="text" placeholder="Search by email..." ng-model="query.filter" ng-change="onSearch()" ng-model-options="{ debounce: 1000 }"></md-input-container></md-content></div></md-table-toolbar><md-table-container><table md--table="" md-progress="promise"><thead md-head="" md-order="query.order" md-on-reorder="onSearch"><tr md-row=""><th md-column=""></th><th md-column="" md-order-by="name">Name</th><th md-column="" md-order-by="username">Username</th><th md-column="" md-order-by="email">Email</th><th md-column="" md-order-by="gender">Gender</th><th md-column="" md-order-by="createdAt">Created At</th></tr></thead><tbody md-body=""><tr md-row="" ng-repeat="user in users"><td md-cell=""><img class="img-thumb img-circle" ng-src="/assets/images/placeholder.png" actual-src="{{:: user.photo.url() }}"></td><td md-cell="">{{:: user.name }}</td><td md-cell="">{{:: user.username }}</td><td md-cell="">{{:: user.email }}</td><td md-cell="">{{:: user.gender }}</td><td md-cell="">{{ user.createdAt | date:\'mediumDate\' }}</td><td md-cell=""><md-menu><md-button class="md-icon-button" aria-label="Open menu" ng-click="openMenu($mdOpenMenu, $event)"><md-icon md-menu-origin="" md-font-icon="icon-dots-vertical" layout="row" layout-align="start center"></md-icon></md-button><md-menu-content width="3"><md-menu-item><md-button aria-label="Edit user" ng-click="onUpdateUser($event, user)">Edit</md-button></md-menu-item><md-menu-item ng-if="loggedUser.id !== user.id"><md-button aria-label="Delete user" ng-click="onDeleteUser($event, user)">Delete</md-button></md-menu-item></md-menu-content></md-menu></td></tr></tbody></table></md-table-container><md-table-pagination md-options="rowOptions" md-limit="query.limit" md-limit-options="rowOptions" md-page="query.page" md-page-select="" md-total="{{query.total}}" md-on-paginate="onPaginationChange"></md-table-pagination><md-button class="md-fab md-fab md-fab-bottom-right" aria-label="New user" ng-click="onSaveUser($event)"><md-icon class="icon-add" md-font-icon="icon-plus" layout="column" layout-align="center center"></md-icon></md-button></md-card>'), e.put("app/public/views/activity.html", '<ion-content><div class="list-activity container"><div class="center padding" ng-if="vm.showErrorView()"><div class="error"><i class="icon icon-large ion-ios-cloud-download-outline"></i><p>{{ "errorText" | translate }}</p><button class="button button-{{theme}}" ng-click="vm.onReload()">{{ "tryAgainText" | translate }}</button></div></div><div class="center padding" ng-if="vm.showEmptyView()"><div class="error"><i class="icon icon-large ion-android-alert"></i><p>{{ "placesNotFoundText" | translate }}</p></div></div><ion-refresher pulling-text="{{\'loadingText\'| translate}}" on-refresh="onReload()"></ion-refresher><div class="list"><div class="item item-avatar item-animate1" ng-repeat="item in vm.data"><img ng-src="/assets/images/placeholder.png" actual-src="{{ item.user.photo._url }}"><h2>{{ item.user.name}}</h2><div class="text">{{ item.action }}</div><p>{{ item.createdAt | amTimeAgo }}</p><div class="img-right" ng-if="item.item.gallery"><img ng-src="/assets/images/placeholder.png" actual-src="{{ item.item.gallery.attributes.imageThumb._url }}"></div></div></div><ion-infinite-scroll on-infinite="onLoadMore()" ng-if="vm.moreDataCanBeLoaded()" spinner="" distance="1%"></ion-infinite-scroll></div></ion-content>'), e.put("app/public/views/docs.html", "Documentation"), e.put("app/public/views/editprofile.html", "campos do perfil asdadas"), e.put("app/public/views/editprofile.sidenav.html", '<div layout="row" layout-fill="" flex=""><md-sidenav layout="column" class="md-sidenav-left" md-component-id="left" md-is-locked-open="$mdMedia(\'gt-sm\')" md-disable-backdrop="" md-whiteframe="4"><md-content flex=""><md-list><md-list-item ng-repeat="item in menus"><a ng-click="goLink(item.link)"><md-item-content md-ink-ripple="" layout="row" layout-align="start center"><div class="inset"><md-icon md-font-icon="{{item.icon}}"></md-icon></div><div class="inset">{{ item.title}}</div></md-item-content></a></md-list-item></md-list></md-content></md-sidenav><md-content class="container" flex="" layout-padding=""><div layout="column" layout-fill="" layout-align="top center"><p>The left sidenav will \'lock open\' on a medium (>=960px wide) device.</p><p>The right sidenav will focus on a specific child element.</p><div><md-button ng-click="toggleLeft()" class="md-primary" hide-gt-md="">Toggle left</md-button></div><div><md-button ng-click="toggleRight()" ng-hide="isOpenRight()" class="md-primary">Toggle right</md-button></div></div></md-content></div>'), e.put("app/public/views/feed.html", '<ion-content><div class="container"><div class="center padding" ng-if="showErrorView()"><div class="error"><i class="icon icon-large ion-ios-cloud-download-outline"></i><p>{{ "errorText" | translate }}</p><button class="button button-primary" ng-click="onReload()">{{ "tryAgainText" | translate }}</button></div></div><div class="center padding" ng-if="showEmptyView()"><div class="error"><i class="icon icon-large ion-android-alert"></i><p>{{ "placesNotFoundText" | translate }}</p></div></div><ion-refresher pulling-text="{{\'loadingText\'| translate}}" on-refresh="onReload()"></ion-refresher><md-card class="item-animate1" ng-repeat="item in data"><md-card-header><md-card-avatar><img ng-src="/assets/images/placeholder.png" actual-src="{{item.user.photo._url}}" style="border-radius: 50%"></md-card-avatar><md-card-header-text><span class="md-title" layout="row"><span>{{item.user.name}}</span> <span flex=""></span> <span>{{item.createdAt | amTimeAgo}}</span></span> <span class="md-subhead">{{item.user.status}}</span></md-card-header-text></md-card-header><img ng-src="/assets/images/placeholder-image.jpg" actual-src="{{item.image._url}}" class="md-card-image" alt="Washed Out"><md-card-content><p><b>{{item.user.username}}</b> {{item.title}}</p><p ng-repeat="comment in item.comments"><b>{{comment.user.username}}</b> {{comment.text}}</p></md-card-content></md-card><ion-infinite-scroll on-infinite="onLoadMore()" ng-if="moreDataCanBeLoaded()" spinner="" distance="1%"></ion-infinite-scroll></div></ion-content><md-button ng-if="currentUser" class="md-fab md-accent fadeIn" upload-image="" aria-label="{ \'PLUS\'|translate}"><md-icon md-font-icon="micon-plus"></md-icon></md-button>'), e.put("app/public/views/install.html", '<md-content flex="" layout-fill=""><div layout="column" layout-align="center center"><md-card class="step2" style="width: 300px; max-height: 500px"><md-card-content><form name="rForm" ng-submit="vm.onSubmit(rForm, vm.form)" novalidate=""><h1 class="md-title">Install</h1><md-input-container class="md-block"><label>Name</label> <input md-autofocus="" autofocus="" type="text" ng-model="vm.form.name" ng-disabled="vm.loading" required=""></md-input-container><md-input-container class="md-block"><label>Email</label> <input md-type="email" ng-model="vm.form.username" ng-disabled="vm.loading" required=""></md-input-container><md-input-container class="md-block"><label>Password</label> <input type="password" ng-model="vm.form.password" ng-disabled="vm.loading" required=""></md-input-container><md-input-container class="md-block"><label>Password Confirm</label> <input type="password" ng-model="vm.form.passwordConfirmation" ng-disabled="vm.loading" required=""></md-input-container><div layout="row"><md-button type="submit" flex="" ng-disabled="vm.form.$invalid || vm.loading" class="md-raised md-primary md-block"><span ng-hide="vm.loading">Submit</span><md-progress-circular ng-show="vm.loading" style="margin:0 auto;"></md-progress-circular></md-button></div></form></md-card-content></md-card></div></md-content>'), e.put("app/public/views/login.html", '<ion-content><div layout="column" layout-align="center center"><form name="rForm" ng-submit="vm.onLogin(rForm, vm.form)" novalidate=""><md-card class="step2" style="width: 300px; max-height: 350px"><md-card-content><h1 class="md-title">Login</h1><md-input-container class="md-block"><label>Username</label> <input md-autofocus="" autofocus="" type="text" ng-model="vm.form.username" ng-disabled="vm.loading" required=""></md-input-container><md-input-container class="md-block"><label>Password</label> <input type="password" ng-model="vm.form.password" ng-disabled="vm.loading" required=""></md-input-container></md-card-content><div layout="row" class="md-actions layout-row"><md-button type="submit" ui-sref="app.reset">Forgot</md-button><span flex=""></span><md-button type="submit" ng-disabled="rForm.$invalid || vm.loading" class="md-raised md-primary md-block"><span ng-hide="vm.loading">LOG IN</span><md-progress-circular ng-show="vm.loading" style="margin:0 auto;"></md-progress-circular></md-button></div></md-card></form></div></ion-content>'), e.put("app/public/views/main.html", '<header><md-toolbar md-whiteframe="4" ui-view="toolbar"></md-toolbar></header><md-content class="main-content" layout="column" flex=""><md-sidenav id="quick-panel" class="md-sidenav-right md-whiteframe-4dp" md-component-id="quick-panel" ui-view="sidenav"></md-sidenav><div class="main" layout="column" flex=""><section flex="none"><div class="ui-view-container" ui-view=""></div></section><div flex=""></div><footer flex="none">Rodapé</footer></div></md-content>'), e.put("app/public/views/profile.html", '<ion-content><div class="container"><div layout="row"><div flex="30"><img class="img-circle" ng-src="/assets/images/placeholder.png" actual-src="{{ user.photo._url }}"></div><div layout="column" flex=""><div layout="row"><h1>{{user.username}}</h1><span flex=""></span><md-button ui-sref="app.editProfile.account" class="md-raised" aria-label="{ \'EDIT\'|translate}">{{ \'Edit Profile\' | translate }}</md-button><md-button ng-click="openMenu($event)" class="md-icon-button" aria-label="{ \'EDIT\'|translate}"><md-icon md-font-icon="ion-android-more-vertical"></md-icon></md-button></div><h2><b>{{user.name}}</b> {{user.status}}</h2><div layout="row"><div flex="">{{user.galleriesTotal}} photos</div><div flex="">{{user.followersTotal}} follower</div><div flex="">{{user.followingsTotal}} following</div></div></div></div><div class="center padding" ng-if="showErrorView()"><div class="error"><i class="icon icon-large ion-ios-cloud-download-outline"></i><p>{{ "errorText" | translate }}</p><button class="button button-primary" ng-click="onReload()">{{ "tryAgainText" | translate }}</button></div></div><div class="center padding" ng-if="showEmptyView()"><div class="error"><i class="icon icon-large ion-android-alert"></i><p>{{ "placesNotFoundText" | translate }}</p></div></div><ion-refresher pulling-text="{{\'loadingText\'| translate}}" on-refresh="onReload()"></ion-refresher><md-card class="item-animate1" ng-repeat="item in data"><md-card-header><md-card-avatar><img ng-src="{{item.user.photo._url}}" style="border-radius: 50%"></md-card-avatar><md-card-header-text><span class="md-title" layout="row"><span>{{item.user.name}}</span> <span flex=""></span> <span>{{item.createdAt | amTimeAgo}}</span></span> <span class="md-subhead">{{item.user.status}}</span></md-card-header-text></md-card-header><img ng-src="{{item.image._url}}" class="md-card-image" alt="Washed Out"><md-card-content><p><b>{{item.user.username}}</b> {{item.title}}</p><p ng-repeat="comment in item.comments"><b>{{comment.user.username}}</b> {{comment.text}}</p></md-card-content></md-card><ion-infinite-scroll on-infinite="onLoadMore()" ng-if="moreDataCanBeLoaded()" spinner="" distance="1%"></ion-infinite-scroll></div></ion-content><md-button class="md-fab md-accent fadeIn" upload-image="" aria-label="{ \'PLUS\'|translate}"><md-icon md-font-icon="micon-plus"></md-icon></md-button>'), e.put("app/public/views/register.html", '<md-content flex="" layout-fill=""><div layout="column" layout-align="center center"><md-card class="step2" style="width: 300px; max-height: 500px"><md-card-content><form name="userForm" ng-submit="vm.onSubmit(userForm, vm.form)" novalidate=""><h1 class="md-title">Install</h1><md-input-container md-no-float="" flex=""><md-icon md-font-icon="icon-account"></md-icon><input type="text" name="name" ng-model="vm.form.name" ng-pattern="/^[a-zA-Z\'. -]+$/" placeholder="Seu nome" ng-minlength="6" required=""><div ng-if="userForm.name.$dirty" ng-messages="userForm.name.$error" role="alert"><div ng-message="required" class="my-message" translate="ERROR.NAME_REQUIRED"></div><div ng-message="minlength" translate="ERROR.NAME_MIN"></div></div></md-input-container><md-input-container md-no-float="" flex=""><md-icon md-font-icon="icon-clipboard-account"></md-icon><input name="username" type="text" ng-model="vm.form.username" validator-async="vm.validateUsername($value)" ng-pattern="/^[a-zA-Z\'. -]+$/" ng-model-options="{ debounce: 1000 }" placeholder="Login" required="" ng-minlength="6"><div ng-if="userForm.username.$dirty" ng-messages="userForm.username.$error" role="alert"><div ng-message="required" class="my-message" translate="ERROR.USERNAME_REQUIRED"></div><div ng-message="pattern" class="my-message" translate="ERROR.USERNAME_INVALID"></div><div ng-message="async" class="my-message" translate="ERROR.USERNAME_INVAILABLE"></div></div></md-input-container><md-input-container md-no-float="" flex=""><md-icon md-font-icon="icon-email"></md-icon><input required="" type="email" name="email" ng-model="vm.form.email" ng-model-options="{ debounce: 1000 }" validator-async="vm.validateEmail($value)" ng-pattern="/^[_a-z0-9-+]+(\\.[_a-z0-9-+]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$/" placeholder="someone@example.com"><div ng-if="userForm.email.$dirty" ng-messages="userForm.email.$error" role="alert"><div ng-message="required" class="my-message" translate="ERROR.EMAIL_REQUIRED"></div><div ng-message="pattern" class="my-message" translate="ERROR.EMAIL_INVALID"></div><div ng-message="async" class="my-message" translate="ERROR.EMAIL_INVAILABLE"></div></div></md-input-container><div layout="row" flex=""><mdp-date-picker mdp-placeholder="Nascimento" ng-model="vm.form.birthday" flex=""></mdp-date-picker><md-input-container md-no-float="" flex=""><md-icon md-font-icon="icon-gender-male-female"></md-icon><md-select ng-model="vm.form.gender" name="gender" required="" placeholder="Sexo"><md-option ng-repeat="gender in vm.genders" value="{{gender.value}}">{{gender.text | translate}}</md-option></md-select><div ng-if="userForm.gender.$dirty" ng-messages="userForm.gender.$error" role="alert"><div ng-message="required" class="my-message" translate="ERROR.EMAIL_REQUIRED"></div><div ng-message="pattern" class="my-message" translate="ERROR.EMAIL_INVALID"></div><div ng-message="async" class="my-message" translate="ERROR.EMAIL_INVAILABLE"></div></div></md-input-container></div><div layout="row" layout-sm="column"><md-input-container md-no-float="" flex=""><md-icon md-font-icon="icon-account-key"></md-icon><input name="password" ng-model="vm.form.password" type="password" minlength="6" maxlength="12" ng-pattern="/(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/" required="" placeholder="********"><div ng-if="userForm.password.$dirty" ng-messages="userForm.password.$error" role="alert" multiple=""><div ng-message="required" translate="ERROR.PASSWORD_REQUIRED"></div><div ng-message="pattern" translate="ERROR.PASSWORD_INVALID"></div><div ng-message="minlength" translate="ERROR.PASSWORD_MIN"></div><div ng-message="maxlength" translate="ERROR.PASSWORD_MAX"></div></div></md-input-container><md-input-container md-no-float="" flex=""><input name="confmPassword" ng-model="vm.passwordConfirmation" type="password" minlength="6" maxlength="12" ng-pattern="/(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/" required="" compare-to="vm.form.password" placeholder="********"><div ng-if="userForm.confmPassword.$dirty" ng-messages="userForm.confmPassword.$error" role="alert"><div ng-message="required" translate="ERROR.PASSWORD_CONFIRM"></div><div ng-message="compareTo" translate="ERROR.PASSWORD_CONFIRM_INVALID"></div></div></md-input-container></div><div layout="row"><md-button type="submit" flex="" ng-disabled="vm.form.$invalid || vm.loading" class="md-raised md-primary md-block"><span ng-hide="vm.loading">Submit</span><md-progress-circular ng-show="vm.loading" style="margin:0 auto;"></md-progress-circular></md-button></div></form></md-card-content></md-card></div></md-content>'), e.put("app/public/views/reset.html", '<ion-content><div layout="column" layout-align="center center"><form name="rForm" novalidate=""><md-card class="step2" style="width: 300px; max-height: 350px"><md-card-content><h1 class="md-title">Reset your password</h1><md-input-container class="md-block"><label>Email</label> <input md-autofocus="" autofocus="" type="email" ng-model="form.username" ng-disabled="loading" required=""></md-input-container></md-card-content><div layout="row" class="md-actions layout-row"><md-button type="submit" ui-sref="app.login">LOgin</md-button><span flex=""></span><md-button ng-click="onReset(rForm, form, $event)" ng-disabled="rForm.$invalid || loading" class="md-raised md-primary md-block"><span ng-hide="loading">Reset Pass</span><md-progress-circular ng-show="loading" style="margin:0 auto;"></md-progress-circular></md-button></div></md-card></form></div></ion-content>'), e.put("app/public/views/search.html", '<ion-content><div style="max-width: 600px; display: block; margin:0 auto;"><div class="center padding" ng-if="showErrorView()"><div class="error"><i class="icon icon-large ion-ios-cloud-download-outline"></i><p>{{ "errorText" | translate }}</p><button class="button button-primary" ng-click="onReload()">{{ "tryAgainText" | translate }}</button></div></div><div class="center padding" ng-if="showEmptyView()"><div class="error"><i class="icon icon-large ion-android-alert"></i><p>{{ "placesNotFoundText" | translate }}</p></div></div><ion-refresher pulling-text="{{\'loadingText\'| translate}}" on-refresh="onReload()"></ion-refresher><md-card ng-repeat="item in data"><md-card-header><md-card-avatar><img ng-src="{{item.user.photo._url}}" style="border-radius: 50%"></md-card-avatar><md-card-header-text><span class="md-title" layout="row"><span>{{item.user.name}}</span> <span flex=""></span> <span>{{item.createdAt | amTimeAgo}}</span></span> <span class="md-subhead">{{item.user.status}}</span></md-card-header-text></md-card-header><img ng-src="{{item.image._url}}" class="md-card-image" alt="Washed Out"><md-card-content><p><b>{{item.user.username}}</b> {{item.title}}</p><p ng-repeat="comment in item.comments"><b>{{comment.user.username}}</b> {{comment.text}}</p></md-card-content></md-card><ion-infinite-scroll on-infinite="onLoadMore()" ng-if="moreDataCanBeLoaded()" spinner="" distance="1%"></ion-infinite-scroll></div></ion-content><md-button class="md-fab md-accent fadeIn" upload-image="" aria-label="{ \'PLUS\'|translate}"><md-icon md-font-icon="micon-plus"></md-icon></md-button>'), e.put("app/public/views/toolbar.html", '<div layout="row" layout-align="start center"><md-button class="md-clear" ui-sref="app.feed" style="margin-left: 20px; font-size: 54px"><i class="photogram-logo"></i></md-button><span flex=""></span><md-button class="md-icon-button" aria-label="{ \'Search\'|translate}" ui-sref="app.search"><md-icon md-font-icon="ion-ios-world-outline"></md-icon></md-button><md-button class="md-icon-button" aria-label="{ \'Login\'|translate}" ng-click="profile()"><md-icon md-font-icon="ion-ios-person-outline"></md-icon></md-button><md-button class="md-icon-button" ng-if="currentUser" aria-label="{ \'Activity\'|translate}" ui-sref="app.activity"><md-icon md-font-icon="ion-ios-heart-outline"></md-icon></md-button><md-button class="md-icon-button" aria-label="{ \'PAYPAL\'|translate}" ui-sref="app.docs"><md-icon md-font-icon="ion-ios-cloud-download-outline"></md-icon></md-button></div>'), e.put("app/admin/views/modal/admin.activity.modal.html", '<md-dialog flex="100" flex-gt-xs="40" aria-label="Gallery Dialog"><form name="form" role="form" novalidate=""><md-toolbar><div class="md-toolbar-tools"><h2 ng-show="isCreating">New entry</h2><h2 ng-show="!isCreating">Edit {{::gallery.title }}</h2><span flex=""></span><ng-md-icon icon="close" class="icon-close" ng-click="cancel()" aria-label="Close dialog"></ng-md-icon></div></md-toolbar><md-dialog-content layout-padding=""><md-content layout="column"><md-input-container md-no-float="" class="md-block md-icon-right"><label>Title *</label><md-icon md-font-icon="icon-account"></md-icon><input type="text" required="" name="title" ng-model="gallery.title"><div ng-messages="form.title.$error" ng-show="form.$submitted"><div ng-message="required">Title required</div></div></md-input-container><md-input-container md-no-float="" class="md-block md-icon-right"><label>Address</label><md-icon md-font-icon="icon-map"></md-icon><input type="text" name="address" ng-model="gallery.address" ng-model-options="{ debounce: 2000 }" ng-change="onAddressChanged()"></md-input-container><md-input-container><ng-map class="map" scrollwheel="false" map-type-control="false" street-view-control="false"><marker draggable="true" on-dragend="onMarkerDragEnd()"></marker></ng-map></md-input-container><div layout="row" layout-align="start center"><md-input-container flex=""><label>Latitude</label> <input type="number" name="latitude" ng-change="onInputLocationChanged()" ng-model-options="{debounce:1000}" ng-model="input.latitude"></md-input-container><md-input-container flex=""><label>Longitude</label> <input type="number" name="longitude" ng-change="onInputLocationChanged()" ng-model-options="{debounce:1000}" ng-model="input.longitude"></md-input-container></div><div layout="row" layout-align="start center"><md-input-container md-no-float=""><label>Upload image *</label> <input type="text" ng-model="imageOneFilename" disabled=""></md-input-container><md-icon md-font-icon="icon-camera" ng-class="{ \'photo-active\': gallery.image.url() }" ngf-select="uploadImageOne($file, $invalidFile)" ngf-max-size="2MB" ngf-pattern="\'image/*\'" accept="image/*"><md-tooltip>Add image</md-tooltip></md-icon><md-progress-circular class="md-primary" md-diameter="30" ng-if="isImageOneUploading"></md-progress-circular></div></md-content></md-dialog-content><md-dialog-actions layout="row"><span flex=""></span><md-button class="md-raised" md-raised="" md-primary="" ng-click="cancel()">Cancel</md-button><md-button type="submit" class="md-raised md-primary" ng-click="onSaveGallery(form.$valid)" ng-disabled="isSavingGallery" ng-show="isCreating">{{ !isSavingGallery ? \'Save\' : \'Saving...\' }}</md-button><md-button type="submit" class="md-raised md-primary" ng-click="onUpdateGallery(form.$valid)" ng-disabled="isSavingGallery" ng-show="!isCreating">{{ !isSavingGallery ? \'Update\' : \'Updating...\' }}</md-button></md-dialog-actions></form></md-dialog>'), e.put("app/admin/views/modal/admin.category.modal.html", '<md-dialog flex="100" flex-gt-xs="40" aria-label="Dialog Category"><form name="form" role="form" novalidate=""><md-toolbar><div class="md-toolbar-tools"><h2 ng-show="isCreating">New category</h2><h2 ng-show="!isCreating">Edit {{::objCategory.title }}</h2><span flex=""></span><ng-md-icon icon="close" class="icon-close" ng-click="cancel()" aria-label="Close dialog"></ng-md-icon></div></md-toolbar><md-dialog-content layout-padding=""><md-content layout="column"><md-input-container><label>Title *</label> <input required="" name="title" ng-model="objCategory.title"><div ng-messages="form.title.$error" ng-show="form.$submitted"><div ng-message="required">Title required</div></div></md-input-container><md-input-container><label>Order *</label> <input type="number" name="order" min="0" ng-model="objCategory.order" required=""><div ng-messages="form.order.$error" ng-show="form.$submitted"><div ng-message="required">Order required</div></div></md-input-container><div layout="row" layout-align="start center"><md-input-container md-no-float=""><label>Upload Image</label> <input type="text" ng-model="imageFilename" disabled=""></md-input-container><ng-md-icon icon="photo_camera" class="photo-camera" ng-class="{ \'photo-active\': objCategory.image.url() }" ngf-select="uploadImage($file, $invalidFile)" ngf-max-size="4MB" ngf-pattern="\'image/*\'" accept="image/*"><md-tooltip>Add an Image</md-tooltip></ng-md-icon><md-progress-circular class="md-primary" md-diameter="30" ng-if="isUploading"></md-progress-circular></div><div layout="row" layout-align="start center"><md-input-container md-no-float=""><label>Upload Icon</label> <input type="text" ng-model="iconFilename" disabled=""></md-input-container><ng-md-icon icon="photo_camera" class="photo-camera" ng-class="{ \'photo-active\': objCategory.icon.url() }" ngf-dimensions="$width === 64 && $height === 64" ngf-select="uploadIcon($file, $invalidFile)" ngf-max-size="1MB" ngf-pattern="\'image/*\'" accept="image/*"><md-tooltip>Add an Icon</md-tooltip></ng-md-icon><md-progress-circular class="md-primary" md-diameter="30" ng-if="isUploadingIcon"></md-progress-circular></div><div class="hint">* The icon image\'s dimensions should be 64x64 px</div></md-content></md-dialog-content><md-dialog-actions layout="row"><span flex=""></span><md-button class="md-raised" md-raised="" md-primary="" ng-click="cancel()">Cancel</md-button><md-button type="submit" class="md-raised md-primary" ng-show="isCreating" ng-disabled="isSavingCategory" ng-click="onSaveCategory(form.$valid)">{{ !isSavingCategory ? \'Save\' : \'Saving...\' }}</md-button><md-button type="submit" class="md-raised md-primary" ng-show="!isCreating" ng-disabled="isSavingCategory" ng-click="onUpdateCategory(form.$valid)">{{ !isSavingCategory ? \'Update\' : \'Updating...\' }}</md-button></md-dialog-actions></form></md-dialog>'), e.put("app/admin/views/modal/admin.gallery.modal.html", '<md-dialog flex="100" flex-gt-xs="40" aria-label="Gallery Dialog"><form name="form" role="form" novalidate=""><md-toolbar><div class="md-toolbar-tools"><h2 ng-show="isCreating">New entry</h2><h2 ng-show="!isCreating">Edit {{::gallery.title }}</h2><span flex=""></span><ng-md-icon icon="close" class="icon-close" ng-click="cancel()" aria-label="Close dialog"></ng-md-icon></div></md-toolbar><md-dialog-content layout-padding=""><md-content layout="column"><md-input-container md-no-float="" class="md-block md-icon-right"><label>Title *</label><md-icon md-font-icon="icon-account"></md-icon><input type="text" required="" name="title" ng-model="gallery.title"><div ng-messages="form.title.$error" ng-show="form.$submitted"><div ng-message="required">Title required</div></div></md-input-container><md-input-container md-no-float="" class="md-block md-icon-right"><label>Address</label><md-icon md-font-icon="icon-map"></md-icon><input type="text" name="address" ng-model="gallery.address" ng-model-options="{ debounce: 2000 }" ng-change="onAddressChanged()"></md-input-container><md-input-container><ng-map class="map" scrollwheel="false" map-type-control="false" street-view-control="false"><marker draggable="true" on-dragend="onMarkerDragEnd()"></marker></ng-map></md-input-container><div layout="row" layout-align="start center"><md-input-container flex=""><label>Latitude</label> <input type="number" name="latitude" ng-change="onInputLocationChanged()" ng-model-options="{debounce:1000}" ng-model="input.latitude"></md-input-container><md-input-container flex=""><label>Longitude</label> <input type="number" name="longitude" ng-change="onInputLocationChanged()" ng-model-options="{debounce:1000}" ng-model="input.longitude"></md-input-container></div><div layout="row" layout-align="start center"><md-input-container md-no-float=""><label>Upload image *</label> <input type="text" ng-model="imageOneFilename" disabled=""></md-input-container><md-icon md-font-icon="icon-camera" ng-class="{ \'photo-active\': gallery.image.url() }" ngf-select="uploadImageOne($file, $invalidFile)" ngf-max-size="2MB" ngf-pattern="\'image/*\'" accept="image/*"><md-tooltip>Add image</md-tooltip></md-icon><md-progress-circular class="md-primary" md-diameter="30" ng-if="isImageOneUploading"></md-progress-circular></div></md-content></md-dialog-content><md-dialog-actions layout="row"><span flex=""></span><md-button class="md-raised" md-raised="" md-primary="" ng-click="cancel()">Cancel</md-button><md-button type="submit" class="md-raised md-primary" ng-click="onSaveGallery(form.$valid)" ng-disabled="isSavingGallery" ng-show="isCreating">{{ !isSavingGallery ? \'Save\' : \'Saving...\' }}</md-button><md-button type="submit" class="md-raised md-primary" ng-click="onUpdateGallery(form.$valid)" ng-disabled="isSavingGallery" ng-show="!isCreating">{{ !isSavingGallery ? \'Update\' : \'Updating...\' }}</md-button></md-dialog-actions></form></md-dialog>'),
        e.put("app/admin/views/modal/admin.setting.modal.html", '<md-dialog flex="100" flex-gt-xs="40" aria-label="Dialog Category"><form name="form" role="form" novalidate=""><md-toolbar><div class="md-toolbar-tools"><h2 ng-show="isCreating">New category</h2><h2 ng-show="!isCreating">Edit {{::objCategory.title }}</h2><span flex=""></span><ng-md-icon icon="close" class="icon-close" ng-click="cancel()" aria-label="Close dialog"></ng-md-icon></div></md-toolbar><md-dialog-content layout-padding=""><md-content layout="column"><md-input-container><label>Title *</label> <input required="" name="title" ng-model="objCategory.title"><div ng-messages="form.title.$error" ng-show="form.$submitted"><div ng-message="required">Title required</div></div></md-input-container><md-input-container><label>Order *</label> <input type="number" name="order" min="0" ng-model="objCategory.order" required=""><div ng-messages="form.order.$error" ng-show="form.$submitted"><div ng-message="required">Order required</div></div></md-input-container><div layout="row" layout-align="start center"><md-input-container md-no-float=""><label>Upload Image</label> <input type="text" ng-model="imageFilename" disabled=""></md-input-container><ng-md-icon icon="photo_camera" class="photo-camera" ng-class="{ \'photo-active\': objCategory.image.url() }" ngf-select="uploadImage($file, $invalidFile)" ngf-max-size="4MB" ngf-pattern="\'image/*\'" accept="image/*"><md-tooltip>Add an Image</md-tooltip></ng-md-icon><md-progress-circular class="md-primary" md-diameter="30" ng-if="isUploading"></md-progress-circular></div><div layout="row" layout-align="start center"><md-input-container md-no-float=""><label>Upload Icon</label> <input type="text" ng-model="iconFilename" disabled=""></md-input-container><ng-md-icon icon="photo_camera" class="photo-camera" ng-class="{ \'photo-active\': objCategory.icon.url() }" ngf-dimensions="$width === 64 && $height === 64" ngf-select="uploadIcon($file, $invalidFile)" ngf-max-size="1MB" ngf-pattern="\'image/*\'" accept="image/*"><md-tooltip>Add an Icon</md-tooltip></ng-md-icon><md-progress-circular class="md-primary" md-diameter="30" ng-if="isUploadingIcon"></md-progress-circular></div><div class="hint">* The icon image\'s dimensions should be 64x64 px</div></md-content></md-dialog-content><md-dialog-actions layout="row"><span flex=""></span><md-button class="md-raised" md-raised="" md-primary="" ng-click="cancel()">Cancel</md-button><md-button type="submit" class="md-raised md-primary" ng-show="isCreating" ng-disabled="isSavingCategory" ng-click="onSaveCategory(form.$valid)">{{ !isSavingCategory ? \'Save\' : \'Saving...\' }}</md-button><md-button type="submit" class="md-raised md-primary" ng-show="!isCreating" ng-disabled="isSavingCategory" ng-click="onUpdateCategory(form.$valid)">{{ !isSavingCategory ? \'Update\' : \'Updating...\' }}</md-button></md-dialog-actions></form></md-dialog>'), e.put("app/admin/views/modal/admin.user.modal.html", '<md-dialog flex="100" flex-gt-xs="40" aria-label="User dialog"><form name="form" role="form" novalidate=""><md-toolbar><div class="md-toolbar-tools"><h2>{{ objUser.id ? \'Edit\' : \'New\' }} User</h2><span flex=""></span><ng-md-icon aria-label="Close dialog" icon="close" class="icon-close" ng-click="cancel()"></ng-md-icon></div></md-toolbar><md-dialog-content layout-padding=""><md-content layout="column"><md-input-container><label>Name *</label> <input type="text" name="name" ng-model="objUser.name" required=""><div ng-messages="form.name.$error" ng-show="form.$submitted"><div ng-message="required">Name required</div></div></md-input-container><md-input-container><label>Username *</label> <input type="text" name="username" ng-model="objUser.username" required=""><div ng-messages="form.username.$error" ng-show="form.$submitted"><div ng-message="required">Username required</div></div></md-input-container><md-input-container><label>Email *</label> <input type="email" name="email" ng-model="objUser.email" required=""><div ng-messages="form.email.$error" ng-show="form.$submitted"><div ng-message="required">Email required</div><div ng-message="email">Invalid email</div></div></md-input-container><md-input-container><label>Password</label> <input type="password" name="Password" ng-model="objUser.password"></md-input-container><md-input-container class="md-block" ng-if="!objUser.id"><label>Role *</label><md-select name="role" required="" ng-model="objUser.roleName"><md-option value="Admin">Admin</md-option><md-option value="User">User</md-option></md-select><div ng-messages="form.role.$error" ng-show="form.$submitted"><div ng-message="required">Role required</div></div></md-input-container><div layout="row" layout-align="start center"><md-input-container md-no-float=""><label>Upload photo</label> <input type="text" ng-model="imageFilename" disabled=""></md-input-container><md-icon class="photo-camera" md-font-icon="icon-camera" ng-class="{ \'photo-active\': objUser.photo.url() }" ngf-select="uploadImage($file)" ngf-max-size="2MB" ngf-pattern="\'image/*\'" accept="image/*"><md-tooltip>Add an image</md-tooltip></md-icon><md-progress-circular class="md-primary" md-diameter="30" ng-if="isUploading"></md-progress-circular></div></md-content></md-dialog-content><md-dialog-actions layout="row"><span flex=""></span><md-button class="md-raised" md-primary="" md-raised="" ng-click="cancel()">Cancel</md-button><md-button type="submit" class="md-raised md-primary" ng-disabled="isSavingUser" ng-click="onEventSaveUser(form.$valid)" ng-show="!objUser.id">{{ !isSavingUser ? \'Save\' : \'Saving...\' }}</md-button><md-button type="submit" class="md-raised md-primary" ng-disabled="isSavingUser" ng-click="onEventUpdateUser(form.$valid)" ng-show="objUser.id">{{ !isSavingUser ? \'Update\' : \'Updating...\' }}</md-button></md-dialog-actions></form></md-dialog>')
}]);
//# sourceMappingURL=../maps/scripts/app-5aac17b02a.js.map
