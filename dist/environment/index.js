"use strict";
/**********************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
/**********************************************************************/
var temp = {};
if (process.env.node_env === "production") {
    temp.production = true;
    temp.host = "athena-resources.herokuapp.com";
}
else {
    temp.production = false;
    temp.host = "127.0.0.1:1111";
}
var environment = {
    applicationName: "Athena Resources",
    applicationDescription: "Providers of streamlined technological solutions",
    contactDetails: {
        emailAddress: "athenaresources@gmail.com",
        phoneNumber: "+263779528194"
    },
    copyrightMessage: "Copyright © 2017 Athena Resources.",
    production: temp.production,
    host: temp.host
};
exports.default = environment;
/**********************************************************************/
