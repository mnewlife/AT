/**********************************************************************/

import * as interfaces from "../../interfaces";

/**********************************************************************/

let temp : any = {};

if ( process.env.node_env === "production" ) {
  temp.production = true;
  temp.host = "parrogate.herokuapp.com";
} else {
  temp.production = false;
  temp.host = "127.0.0.1:1111";
}

let environment : interfaces.setupConfig.Environment = {

  applicationName : "Parrogate" ,
  applicationDescription : "Parrogate Ordering Platform" ,
  contactDetails : {
    emailAddress : "allthings263@gmail.com" ,
    phoneNumber : "+263779528194"
  } ,
  copyrightMessage : "Copyright © 2017 Parrogate." ,
  production : temp.production ,
  host : temp.host

};

export default environment;

/**********************************************************************/
