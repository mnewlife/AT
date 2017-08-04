/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import * as bCrypt from "bcrypt-nodejs";

import * as interfaces from "../../../../../../../src/interfaces/index";

/******************************************************************************/

export default () : interfaces.dataModel.CartProduct[] => {

  return [

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      roundId : mongoose.Types.ObjectId() ,
      cartId : mongoose.Types.ObjectId() ,
      product : {
        productId : mongoose.Types.ObjectId() ,
        quantity : 10 ,
        price : 100
      }
    } ,

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      roundId : mongoose.Types.ObjectId() ,
      cartId : mongoose.Types.ObjectId() ,
      product : {
        productId : mongoose.Types.ObjectId() ,
        quantity : 20 ,
        price : 200
      }
    } ,

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      roundId : mongoose.Types.ObjectId() ,
      cartId : mongoose.Types.ObjectId() ,
      product : {
        productId : mongoose.Types.ObjectId() ,
        quantity : 30 ,
        price : 300
      }
    } ,

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      roundId : mongoose.Types.ObjectId() ,
      cartId : mongoose.Types.ObjectId() ,
      product : {
        productId : mongoose.Types.ObjectId() ,
        quantity : 40 ,
        price : 400
      }
    }

    /**************************************************************************/

  ];

}

/******************************************************************************/
