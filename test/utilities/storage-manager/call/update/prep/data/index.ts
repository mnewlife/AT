/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import * as bCrypt from "bcrypt-nodejs";

import * as interfaces from "../../../../../../../src/interfaces/index";

/******************************************************************************/

export default () : interfaces.dataModel.Call[] => {

  return [

    /**************************************************************************/

    {
      callerId : mongoose.Types.ObjectId() ,
      channelId : mongoose.Types.ObjectId() ,
      calleeId : mongoose.Types.ObjectId() ,
      callDetails : {
        duration : 205
      }
    } ,

    /**************************************************************************/

    {
      callerId : mongoose.Types.ObjectId() ,
      channelId : mongoose.Types.ObjectId() ,
      calleeId : mongoose.Types.ObjectId() ,
      callDetails : {
        duration : 210
      }
    } ,

    /**************************************************************************/

    {
      callerId : mongoose.Types.ObjectId() ,
      channelId : mongoose.Types.ObjectId() ,
      calleeId : mongoose.Types.ObjectId() ,
      callDetails : {
        duration : 215
      }
    } ,

    /**************************************************************************/

    {
      callerId : mongoose.Types.ObjectId() ,
      channelId : mongoose.Types.ObjectId() ,
      calleeId : mongoose.Types.ObjectId() ,
      callDetails : {
        duration : 220
      }
    }

    /**************************************************************************/

  ];

}

/******************************************************************************/
