/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import * as bCrypt from "bcrypt-nodejs";

import * as interfaces from "../../../../../../../src/interfaces/index";

/******************************************************************************/

export default () : interfaces.dataModel.Cart[] => {

  return [

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      roundId : mongoose.Types.ObjectId() ,
      adminFeePercentage : 5 ,
      numProducts : 0 ,
      costProducts : 0
    } ,

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      roundId : mongoose.Types.ObjectId() ,
      adminFeePercentage : 15 ,
      numProducts : 10 ,
      costProducts : 10
    } ,

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      roundId : mongoose.Types.ObjectId() ,
      adminFeePercentage : 25 ,
      numProducts : 20 ,
      costProducts : 20
    } ,

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      roundId : mongoose.Types.ObjectId() ,
      adminFeePercentage : 35 ,
      numProducts : 30 ,
      costProducts : 30
    }

    /**************************************************************************/

  ];

}

/******************************************************************************/
