/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import * as bCrypt from "bcrypt-nodejs";

import * as interfaces from "../../../../../../../src/interfaces/index";

/******************************************************************************/

export default () : interfaces.dataModel.Contribution[] => {

  return [

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      roundId : mongoose.Types.ObjectId() ,
      payment : {
        identifier : "45678uh" ,
        amount : 10 ,
        method : "ecocash"
      }
    } ,

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      roundId : mongoose.Types.ObjectId() ,
      payment : {
        identifier : "45678uh" ,
        amount : 20 ,
        method : "cash"
      }
    } ,

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      roundId : mongoose.Types.ObjectId() ,
      payment : {
        identifier : "45678uh" ,
        amount : 30 ,
        method : "ecocash"
      }
    } ,

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      roundId : mongoose.Types.ObjectId() ,
      payment : {
        identifier : "45678uh" ,
        amount : 40 ,
        method : "cash"
      }
    }

    /**************************************************************************/

  ];

}

/******************************************************************************/
