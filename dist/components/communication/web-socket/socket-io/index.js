"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var IO = require("socket.io");
/******************************************************************************/
var SocketIO = (function () {
    /*****************************************************************/
    function SocketIO(events, checkThrow, getUserById, production, httpServer) {
        var _this = this;
        this.events = events;
        this.checkThrow = checkThrow;
        this.getUserById = getUserById;
        this.production = production;
        /*****************************************************************/
        this.getUserSocket = function (userId) {
            return new Promise(function (resolve, reject) {
                var ns = _this.io.of("/");
                for (var id in ns.connected) {
                    var ref = ns.connected[id];
                    if (ref.userId && String(ref.userId) === String(userId)) {
                        return resolve(ref);
                    }
                }
                return reject({
                    identifier: "SocketNotFound",
                    data: {}
                });
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.getUserSocketFailed({
                        userId: userId,
                        reason: reason
                    });
                    resolve();
                });
                if (reason.identifier && reason.identifier === "SocketNotFound") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "GetUserSocketFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.pushToOtherUsers = function (userId, identifier, payload, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.getUserSocket(userId);
            })
                .then(function (socket) {
                socket.broadcast.emit(identifier, payload);
                return Promise.resolve();
            })
                .then(function (response) {
                new Promise(function (resolve, reject) {
                    _this.events.pushedToOtherUsers({
                        userId: userId,
                        identifier: identifier,
                        payload: payload
                    });
                    resolve();
                });
                return Promise.resolve();
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.pushToOtherUsersFailed({
                        userId: userId,
                        identifier: identifier,
                        payload: payload,
                        reason: reason
                    });
                    resolve();
                });
                if (reason.identifier && reason.identifier === "SocketNotFound") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "PushToOtherUsersFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.pushToCurrentUser = function (userId, identifier, payload, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.getUserSocket(userId);
            })
                .then(function (socket) {
                socket.emit(identifier, payload);
                return Promise.resolve();
            })
                .then(function (response) {
                new Promise(function (resolve, reject) {
                    _this.events.pushedToCurrentUser({
                        userId: userId,
                        identifier: identifier,
                        payload: payload
                    });
                    resolve();
                });
                return Promise.resolve();
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.pushToCurrentUserFailed({
                        userId: userId,
                        identifier: identifier,
                        payload: payload,
                        reason: reason
                    });
                    resolve();
                });
                if (reason.identifier && reason.identifier === "SocketNotFound") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "PushToCurrentUserFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.pushToChannels = function (channels, payload, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return new Promise(function (resolve, reject) {
                    channels.forEach(function (channel) {
                        _this.io.sockets.in(channel).emit(channel, payload);
                        new Promise(function (resolve, reject) {
                            _this.events.pushedToChannel({
                                channel: channel,
                                payload: payload
                            });
                            resolve();
                        });
                    });
                    resolve();
                });
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.pushToChannelsFailed({
                        channels: channels,
                        payload: payload,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "PushToChannelsFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.joinChannels = function (userId, channels, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.getUserSocket(userId);
            })
                .then(function (socket) {
                channels.forEach(function (channel) {
                    socket.join(channel);
                    new Promise(function (resolve, reject) {
                        _this.events.joinedChannel({
                            channel: channel,
                            userId: userId
                        });
                        resolve();
                    });
                });
                return Promise.resolve();
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.joinChannelsFailed({
                        channels: channels,
                        userId: userId,
                        reason: reason
                    });
                    resolve();
                });
                if (reason.identifier && reason.identifier === "SocketNotFound") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "JoinChannelsFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.leaveChannels = function (userId, channels, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return _this.getUserSocket(userId);
            })
                .then(function (socket) {
                channels.forEach(function (channel) {
                    socket.leave(channel);
                    new Promise(function (resolve, reject) {
                        _this.events.leftChannel({
                            channel: channel,
                            userId: userId
                        });
                        resolve();
                    });
                });
                return Promise.resolve();
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.leaveChannelsFailed({
                        channels: channels,
                        userId: userId,
                        reason: reason
                    });
                    resolve();
                });
                if (reason.identifier && reason.identifier === "SocketNotFound") {
                    return Promise.reject(reason);
                }
                return Promise.reject({
                    identifier: "LeaveChannelsFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        /*****************************************************************/
        this.setMware = function () {
            _this.io.use(function (socket, next) {
                if (!socket || !socket.handshake || !socket.handshake.query) {
                    return;
                }
                if (socket.handshake.query.userData) {
                    var user_1 = socket.handshake.query.userData;
                    if (!user_1._id) {
                        return;
                    }
                    socket.userId = user_1.id;
                    _this.getUserById(user_1.id)
                        .then(function (user) {
                        return Promise.resolve(user.subscriptions);
                    })
                        .then(function (channels) {
                        channels.forEach(function (channel) {
                            socket.join(channel);
                            new Promise(function (resolve, reject) {
                                _this.events.joinedChannel({
                                    channel: channel,
                                    userId: user_1._id
                                });
                            });
                        });
                    })
                        .catch(function (reason) {
                        new Promise(function (resolve, reject) {
                            _this.events.getUserSubscriptionsFailed({
                                userId: user_1._id,
                                reason: reason
                            });
                            resolve();
                        });
                    });
                }
                return next();
            });
        };
        this.io = (this.production) ? IO.listen(httpServer) : IO(httpServer);
    }
    return SocketIO;
}());
exports.default = SocketIO;
/******************************************************************************/ 
