/******************************************************************************/

import * as Promise from "bluebird";
import * as bCrypt from "bcrypt-nodejs";

import * as src from "../../../../../../../src/src/index";

/******************************************************************************/

export default () : dataModel.core.user[] => {

  let adminAccessLevel : dataModel.core.user.AccessLevel = "admin";
  let developerAccessLevel : dataModel.core.user.AccessLevel = "developer";
  let consumerAccessLevel : dataModel.core.user.AccessLevel = "consumer";

  return [

    /**************************************************************************/

    {
      emailAddress : "allansimoyi@gmail.com" ,
      password : bCrypt.hashSync( "function@6781" , bCrypt.genSaltSync( 10 ) ) ,
      accessLevel : developerAccessLevel ,
      verification : {
        verified : false , verificationCode : "234567890fghj3456789" , numVerAttempts : 2
      } ,
      personalDetails : {
        firstName : "Allan" , lastName : "Simoyi" ,
        dateOfBirth : new Date( "1995-02-03" ) ,
        age : 21 , gender : "Male"
      } ,
      activeApps : [ "Call263" , "GrocRound" ]
    } ,

    /**************************************************************************/

    {
      emailAddress : "arterm@gmail.com" ,
      password : bCrypt.hashSync( "function@6781" , bCrypt.genSaltSync( 10 ) ) ,
      accessLevel : adminAccessLevel ,
      verification : {
        verified : true , verificationCode : "" , numVerAttempts : 4
      } ,
      personalDetails : {
        firstName : "Artem" , lastName : "Dedekian" ,
        dateOfBirth : new Date( "1985-02-03" ) ,
        age : 31 , gender : "Male"
      } ,
      activeApps : [ "GrocRound" ]
    } ,

    /**************************************************************************/

    {
      emailAddress : "moriarty@gmail.com" ,
      password : bCrypt.hashSync( "function@6781" , bCrypt.genSaltSync( 10 ) ) ,
      accessLevel : consumerAccessLevel ,
      verification : {
        verified : true , verificationCode : "" , numVerAttempts : 6
      } ,
      personalDetails : {
        firstName : "Jamie" , lastName : "Moriarty" ,
        dateOfBirth : new Date( "1994-02-03" ) ,
        age : 22 , gender : "Female"
      } ,
      activeApps : [ "Call263" ]
    } ,

    /**************************************************************************/

    {
      emailAddress : "holmes@gmail.com" ,
      password : bCrypt.hashSync( "function@6781" , bCrypt.genSaltSync( 10 ) ) ,
      accessLevel : consumerAccessLevel ,
      verification : {
        verified : false , verificationCode : "" , numVerAttempts : 7
      } ,
      personalDetails : {
        firstName : "Eurus" , lastName : "Holmes" ,
        dateOfBirth : new Date( "2000-02-03" ) ,
        age : 17 , gender : "Female"
      } ,
      activeApps : [ "Call263" ]
    }

    /**************************************************************************/

  ];

}

/******************************************************************************/
