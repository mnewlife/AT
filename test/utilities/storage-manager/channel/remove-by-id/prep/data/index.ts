/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import * as bCrypt from "bcrypt-nodejs";

import * as src from "../../../../../../../src/src/index";

/******************************************************************************/

export default () : dataModel.Channel[] => {

  return [

    /**************************************************************************/

    {
      allocated : false ,
      allocatedTo : null ,
      channelDetails : {
        code : "fghj6789" ,
        phoneNumber : "861131254" ,
        password : "ghjk567"
      }
    } ,

    /**************************************************************************/

    {
      allocated : false ,
      allocatedTo : null ,
      channelDetails : {
        code : "fghj6789" ,
        phoneNumber : "861131254" ,
        password : "ghjk567"
      }
    } ,

    /**************************************************************************/

    {
      allocated : true ,
      allocatedTo : mongoose.Types.ObjectId() ,
      channelDetails : {
        code : "fghj6789" ,
        phoneNumber : "861131254" ,
        password : "ghjk567"
      }
    } ,

    /**************************************************************************/

    {
      allocated : true ,
      allocatedTo : mongoose.Types.ObjectId() ,
      channelDetails : {
        code : "fghj6789" ,
        phoneNumber : "861131254" ,
        password : "ghjk567"
      }
    }

    /**************************************************************************/

  ];

}

/******************************************************************************/
