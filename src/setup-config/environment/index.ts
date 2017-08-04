/**********************************************************************/

import * as interfaces from "../../interfaces/index";

/**********************************************************************/

let temp : any = {};

if ( process.env.node_env === "production" ) {
  temp.production = true;
  temp.host = "allthings263.herokuapp.com";
} else {
  temp.production = false;
  temp.host = "127.0.0.1:1111";
}

let environment : interfaces.setupConfig.Environment = {

  applicationName : "AllThings263" ,
  applicationDescription : "Empowering the lives of our community members through technology" ,
  contactDetails : {
    emailAddress : "allthings263@gmail.com" ,
    phoneNumber : "+263779528194"
  } ,
  copyrightMessage : "Copyright © 2017 AllThings263.com Limited. All rights reserved." ,
  production : temp.production ,
  host : temp.host

};

export default environment;

/**********************************************************************/
