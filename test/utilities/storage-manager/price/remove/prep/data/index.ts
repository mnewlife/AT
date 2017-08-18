/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import * as bCrypt from "bcrypt-nodejs";

import * as src from "../../../../../../../src/src/index";

/******************************************************************************/

export default () : dataModel.Price[] => {

  return [

    /**************************************************************************/

    {
      productId : mongoose.Types.ObjectId() ,
      shopId : mongoose.Types.ObjectId() ,
      quantity : 1 ,
      price : 10
    } ,

    /**************************************************************************/

    {
      productId : mongoose.Types.ObjectId() ,
      shopId : mongoose.Types.ObjectId() ,
      quantity : 1 ,
      price : 10
    } ,

    /**************************************************************************/

    {
      productId : mongoose.Types.ObjectId() ,
      shopId : mongoose.Types.ObjectId() ,
      quantity : 1 ,
      price : 10
    } ,

    /**************************************************************************/

    {
      productId : mongoose.Types.ObjectId() ,
      shopId : mongoose.Types.ObjectId() ,
      quantity : 1 ,
      price : 90
    }

    /**************************************************************************/

  ];

}

/******************************************************************************/
