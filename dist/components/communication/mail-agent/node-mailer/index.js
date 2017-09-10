"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var nodemailer = require("nodemailer");
/******************************************************************************/
var NodeMailer = (function () {
    /*****************************************************************/
    function NodeMailer(events, checkThrow, sendingAddress, password) {
        var _this = this;
        this.events = events;
        this.checkThrow = checkThrow;
        this.sendingAddress = sendingAddress;
        this.password = password;
        /*****************************************************************/
        this.sendEmail = function (from, to, subject, html, forceThrow) {
            if (forceThrow === void 0) { forceThrow = false; }
            return _this.checkThrow(forceThrow)
                .then(function (response) {
                return new Promise(function (resolve, reject) {
                    var mailOptions = {
                        from: from,
                        to: to,
                        subject: subject,
                        html: html
                    };
                    _this.transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            new Promise(function (resolve, reject) {
                                _this.events.emailSent({
                                    from: from,
                                    to: to,
                                    subject: subject,
                                    html: html
                                });
                                resolve();
                            });
                            resolve();
                        }
                    });
                });
            })
                .catch(function (reason) {
                new Promise(function (resolve, reject) {
                    _this.events.sendEmailFailed({
                        from: from,
                        to: to,
                        subject: subject,
                        html: html,
                        reason: reason
                    });
                    resolve();
                });
                return Promise.reject({
                    identifier: "SendEmailFailed",
                    data: {
                        reason: reason
                    }
                });
            });
        };
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: this.sendingAddress,
                pass: this.password
            }
        });
    }
    return NodeMailer;
}());
exports.default = NodeMailer;
/******************************************************************************/ 
