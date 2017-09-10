"use strict";
/******************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var generic_model_class_1 = require("../../generic-model-class");
var generic_event_class_1 = require("../../generic-event-class");
var model_1 = require("./model");
/*******************************************************************************/
exports.default = function (emitEvent, mapDetails, checkThrow) {
    var models = new generic_event_class_1.default(emitEvent, "Core|User");
    return new generic_model_class_1.default(models, model_1.MongooseModel, mapDetails, checkThrow, makeConditions, makeSortCriteria, generateAddDetails, generateUpdateDetails, convertToAbstract);
};
/******************************************************************************/
function makeConditions(filtrationCriteria) {
    return new Promise(function (resolve, reject) {
        var conditions = {};
        if (filtrationCriteria.emailAddress) {
            conditions["emailAddress"] = filtrationCriteria.emailAddress;
        }
        if (filtrationCriteria.accessLevel) {
            conditions["accessLevel"] = filtrationCriteria.accessLevel;
        }
        if (filtrationCriteria.verification) {
            if (filtrationCriteria.verification.verified) {
                conditions["verification.verified"] = filtrationCriteria.verification.verified;
            }
            if (filtrationCriteria.verification.numVerAttempts) {
                conditions["verification.numVerAttempts"] = {};
                if (filtrationCriteria.verification.numVerAttempts.min) {
                    conditions["verification.numVerAttempts"].$gte = filtrationCriteria.verification.numVerAttempts.min;
                }
                if (filtrationCriteria.verification.numVerAttempts.max) {
                    conditions["verification.numVerAttempts"].$lte = filtrationCriteria.verification.numVerAttempts.max;
                }
            }
        }
        if (filtrationCriteria.personalDetails) {
            if (filtrationCriteria.personalDetails.firstName) {
                conditions["personalDetails.firstName"] = filtrationCriteria.personalDetails.firstName;
            }
            if (filtrationCriteria.personalDetails.lastName) {
                conditions["personalDetails.lastName"] = filtrationCriteria.personalDetails.lastName;
            }
            if (filtrationCriteria.personalDetails.dateOfBirth) {
                conditions["personalDetails.dateOfBirth"] = {};
                if (filtrationCriteria.personalDetails.dateOfBirth.min) {
                    conditions["personalDetails.dateOfBirth"].$gte = filtrationCriteria.personalDetails.dateOfBirth.min;
                }
                if (filtrationCriteria.personalDetails.dateOfBirth.max) {
                    conditions["personalDetails.dateOfBirth"].$lte = filtrationCriteria.personalDetails.dateOfBirth.max;
                }
            }
            if (filtrationCriteria.personalDetails.gender) {
                conditions["personalDetails.gender"] = filtrationCriteria.personalDetails.gender;
            }
        }
        if (filtrationCriteria.contactDetails) {
            if (filtrationCriteria.contactDetails.phoneNumbers) {
                conditions["contactDetails.phoneNumbers"] = { $all: filtrationCriteria.contactDetails.phoneNumbers };
            }
        }
        if (filtrationCriteria.activeApps) {
            conditions["activeApps"] = { $all: filtrationCriteria.activeApps };
        }
        if (filtrationCriteria.residentialDetails) {
            if (filtrationCriteria.residentialDetails.country) {
                conditions["residentialDetails.country"] = filtrationCriteria.residentialDetails.country;
            }
            if (filtrationCriteria.residentialDetails.province) {
                conditions["residentialDetails.province"] = filtrationCriteria.residentialDetails.province;
            }
            if (filtrationCriteria.residentialDetails.address) {
                conditions["residentialDetails.address"] = filtrationCriteria.residentialDetails.address;
            }
        }
        if (filtrationCriteria.textSearch) {
            conditions.$text = { $search: filtrationCriteria.textSearch };
        }
        if (filtrationCriteria.textSearch) {
            conditions.$text = { $search: filtrationCriteria.textSearch };
        }
        resolve(conditions);
    });
}
/******************************************************************************/
function makeSortCriteria(sortCriteria) {
    return new Promise(function (resolve, reject) {
        var sortString;
        if (sortCriteria.criteria === "numVerAttempts") {
            sortString = "verification.numVerAttempts";
        }
        else {
            sortString = sortCriteria.criteria;
        }
        if (sortCriteria.order === "Descending") {
            sortString = "-" + sortString;
        }
        resolve(sortString);
    });
}
/******************************************************************************/
function generateAddDetails(models) {
    var returnDetails = [];
    models.forEach(function (model) {
        var details = {
            emailAddress: model.emailAddress,
            password: model.password,
            accessLevel: model.accessLevel,
            verification: {
                verified: model.verification.verified,
                numVerAttempts: model.verification.numVerAttempts,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            activeApps: []
        };
        if (model.resetCode) {
            details.resetCode = model.resetCode;
        }
        if (model.verification.verificationCode) {
            details.verification.verificationCode = model.verification.verificationCode;
        }
        if (model.personalDetails) {
            details.personalDetails = {
                firstName: model.personalDetails.firstName,
                lastName: model.personalDetails.lastName,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        }
        if (model.contactDetails) {
            details.contactDetails = {
                phoneNumbers: model.contactDetails.phoneNumbers,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        }
        if (model.residentialDetails) {
            details.residentialDetails = {
                country: model.residentialDetails.country,
                province: model.residentialDetails.province,
                address: model.residentialDetails.address,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        }
        returnDetails.push(details);
    });
    return returnDetails;
}
/******************************************************************************/
function generateUpdateDetails(document, details) {
    return new Promise(function (resolve, reject) {
        if (details.emailAddress) {
            document.emailAddress = details.emailAddress;
        }
        if (details.accessLevel) {
            document.accessLevel = details.accessLevel;
        }
        if (details.password) {
            document.password = details.password;
        }
        if (details.resetCode) {
            document.resetCode = details.resetCode;
        }
        if (details.verification) {
            if (details.verification.verified) {
                document.verification.verified = details.verification.verified;
            }
            if (details.verification.verificationCode) {
                document.verification.verificationCode = details.verification.verificationCode;
            }
            if (details.verification.numVerAttemptsMinus) {
                document.verification.numVerAttempts -= details.verification.numVerAttemptsMinus;
            }
            if (details.verification.numVerAttemptsPlus) {
                document.verification.numVerAttempts += details.verification.numVerAttemptsPlus;
            }
            if (details.verification.numVerAttempts) {
                document.verification.numVerAttempts = details.verification.numVerAttempts;
            }
        }
        if (details.personalDetails) {
            if (details.personalDetails.firstName || details.personalDetails.lastName) {
                if (!document.personalDetails) {
                    document.personalDetails = {
                        firstName: "",
                        lastName: "",
                        createdAt: new Date(),
                        updatedAt: new Date()
                    };
                }
                if (details.personalDetails.firstName) {
                    document.personalDetails.firstName = details.personalDetails.firstName;
                }
                if (details.personalDetails.lastName) {
                    document.personalDetails.lastName = details.personalDetails.lastName;
                }
            }
        }
        if (details.contactDetails) {
            if (details.contactDetails.phoneNumbersToAdd || details.contactDetails.phoneNumbersToRemove) {
                if (!document.contactDetails) {
                    document.contactDetails = {
                        phoneNumbers: [],
                        createdAt: new Date(),
                        updatedAt: new Date()
                    };
                }
                if (details.contactDetails.phoneNumbersToRemove) {
                    details.contactDetails.phoneNumbersToRemove.forEach(function (phoneNumber) {
                        var matches = document.contactDetails.phoneNumbers.filter(function (subject) {
                            return (subject === phoneNumber);
                        });
                        if (matches.length) {
                            document.contactDetails.phoneNumbers.splice(document.contactDetails.phoneNumbers.indexOf(matches[0], 1));
                        }
                    });
                }
                if (details.contactDetails.phoneNumbersToAdd) {
                    details.contactDetails.phoneNumbersToAdd.forEach(function (phoneNumber) {
                        document.contactDetails.phoneNumbers.push(phoneNumber);
                    });
                }
            }
        }
        if (details.residentialDetails) {
            if (details.residentialDetails.country || details.residentialDetails.province || details.residentialDetails.address) {
                if (!document.residentialDetails) {
                    document.residentialDetails = {
                        country: "",
                        province: "",
                        address: ""
                    };
                }
                if (details.residentialDetails.country) {
                    document.residentialDetails.country = details.residentialDetails.country;
                }
                if (details.residentialDetails.province) {
                    document.residentialDetails.province = details.residentialDetails.province;
                }
                if (details.residentialDetails.address) {
                    document.residentialDetails.address = details.residentialDetails.address;
                }
            }
        }
        if (details.activeAppsToAdd) {
            if (!document.activeApps) {
                document.activeApps = [];
            }
            details.activeAppsToAdd.forEach(function (app) {
                document.activeApps.push(app);
            });
        }
        if (details.activeAppsToRemove) {
            if (!document.activeApps) {
                document.activeApps = [];
            }
            details.activeAppsToRemove.forEach(function (app) {
                var matches = document.activeApps.filter(function (subject) {
                    return (subject == app);
                });
                if (matches.length) {
                    document.activeApps.splice(document.activeApps.indexOf(matches[0]), 1);
                }
            });
        }
        resolve(document);
    });
}
/******************************************************************************/
function convertToAbstract(models, forceThrow) {
    if (forceThrow === void 0) { forceThrow = false; }
    return this.checkThrow(forceThrow)
        .then(function (response) {
        return new Promise(function (resolve, reject) {
            var returnModels = [];
            models.forEach(function (model) {
                var returnModel = {
                    id: model._id.toHexString(),
                    emailAddress: model.emailAddress,
                    accessLevel: model.accessLevel,
                    password: model.password,
                    verification: {
                        id: model.verification._id.toHexString(),
                        verified: model.verification.verified,
                        numVerAttempts: model.verification.numVerAttempts,
                        createdAt: model.verification.createdAt,
                        updatedAt: model.verification.updatedAt
                    },
                    activeApps: model.activeApps,
                    createdAt: model.createdAt,
                    updatedAt: model.updatedAt
                };
                if (model.resetCode) {
                    returnModel.resetCode = model.resetCode;
                }
                if (model.verification.verificationCode) {
                    returnModel.verification.verificationCode = model.verification.verificationCode;
                }
                if (model.personalDetails) {
                    returnModel.personalDetails = {
                        id: model.personalDetails._id.toHexString(),
                        firstName: model.personalDetails.firstName,
                        lastName: model.personalDetails.lastName,
                        dateOfBirth: model.personalDetails.dateOfBirth,
                        gender: model.personalDetails.gender,
                        createdAt: model.personalDetails.createdAt,
                        updatedAt: model.personalDetails.updatedAt
                    };
                }
                if (model.contactDetails) {
                    returnModel.contactDetails = {
                        id: model.contactDetails._id.toHexString(),
                        phoneNumbers: model.contactDetails.phoneNumbers,
                        createdAt: model.contactDetails.createdAt,
                        updatedAt: model.contactDetails.updatedAt
                    };
                }
                if (model.residentialDetails) {
                    returnModel.residentialDetails = {
                        id: model.residentialDetails._id.toHexString(),
                        country: model.residentialDetails.country,
                        province: model.residentialDetails.province,
                        address: model.residentialDetails.address,
                        createdAt: model.residentialDetails.createdAt,
                        updatedAt: model.residentialDetails.updatedAt
                    };
                }
                returnModels.push(returnModel);
            });
            resolve(returnModels);
        });
    });
}
/******************************************************************************/ 
