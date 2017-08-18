/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import * as bCrypt from "bcrypt-nodejs";

import * as src from "../../../../../../../src/src/index";

/******************************************************************************/

export default () : dataModel.Call[] => {

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
