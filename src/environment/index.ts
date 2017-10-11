/**********************************************************************/

import * as interfaces from "./interfaces";

/**********************************************************************/

let temp: any = {};
if ( process.env.node_env === "production" ) {
  temp.production = true;
  temp.host = "athena-resources.herokuapp.com";
} else {
  temp.production = false;
  //temp.host = "http://127.0.0.1:1111";
  temp.host = "http://athena-resources.herokuapp.com";
}

let environment: interfaces.Environment = {
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

export default environment;

/**********************************************************************/
