/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import * as bCrypt from "bcrypt-nodejs";

import * as interfaces from "../../../../../../../src/interfaces/index";

/******************************************************************************/

export default () : interfaces.dataModel.Product[] => {

  return [

    /**************************************************************************/

    {
      label : "Product1" ,
      images : [
        "fghj" ,
        "vbnm" 
      ] ,
      priceValues : {
        min : {
          shopId : mongoose.Types.ObjectId() ,
          price : 100
        } ,
        max : {
          shopId : mongoose.Types.ObjectId() ,
          price : 900
        } ,
        mean : {
          shopId : mongoose.Types.ObjectId() ,
          price : 450
        }
      } ,
      effectivePrice : {
        shopId : mongoose.Types.ObjectId() ,
        price : 200
      }
    } ,

    /**************************************************************************/

    {
      label : "Product1" ,
      images : [
        "fghj" ,
        "vbnm" 
      ] ,
      priceValues : {
        min : {
          shopId : mongoose.Types.ObjectId() ,
          price : 100
        } ,
        max : {
          shopId : mongoose.Types.ObjectId() ,
          price : 900
        } ,
        mean : {
          shopId : mongoose.Types.ObjectId() ,
          price : 450
        }
      } ,
      effectivePrice : {
        shopId : mongoose.Types.ObjectId() ,
        price : 200
      }
    } ,

    /**************************************************************************/

    {
      label : "Product1" ,
      images : [
        "fghj" ,
        "vbnm" 
      ] ,
      priceValues : {
        min : {
          shopId : mongoose.Types.ObjectId() ,
          price : 100
        } ,
        max : {
          shopId : mongoose.Types.ObjectId() ,
          price : 900
        } ,
        mean : {
          shopId : mongoose.Types.ObjectId() ,
          price : 450
        }
      } ,
      effectivePrice : {
        shopId : mongoose.Types.ObjectId() ,
        price : 200
      }
    } ,

    /**************************************************************************/

    {
      label : "Product1" ,
      images : [
        "fghj" ,
        "vbnm" 
      ] ,
      priceValues : {
        min : {
          shopId : mongoose.Types.ObjectId() ,
          price : 100
        } ,
        max : {
          shopId : mongoose.Types.ObjectId() ,
          price : 900
        } ,
        mean : {
          shopId : mongoose.Types.ObjectId() ,
          price : 450
        }
      } ,
      effectivePrice : {
        shopId : mongoose.Types.ObjectId() ,
        price : 200
      }
    }

    /**************************************************************************/

  ];

}

/******************************************************************************/
