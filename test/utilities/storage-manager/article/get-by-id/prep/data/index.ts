/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import * as bCrypt from "bcrypt-nodejs";

import * as interfaces from "../../../../../../../src/interfaces/index";

/******************************************************************************/

export default () : interfaces.dataModel.Article[] => {

  return [

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      title : "Title1" ,
      images : [
        "4567hjghj5678bnm" ,
        "5678bnm678bnm"
      ] ,
      tags : [
        "baroque" ,
        "bach" ,
        "fugue"
      ] ,
      content : "Content goes here"
    } ,

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      title : "Title2" ,
      images : [
        "4567hjghj5678bnm" ,
        "5678bnm678bnm"
      ] ,
      tags : [
        "classical" ,
        "mozart" ,
        "sonata"
      ] ,
      content : "Content goes here"
    } ,

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      title : "Title3" ,
      images : [
        "4567hjghj5678bnm" ,
        "5678bnm678bnm"
      ] ,
      tags : [
        "romancio" ,
        "beethoven" ,
        "presto"
      ] ,
      content : "Content goes here"
    } ,

    /**************************************************************************/

    {
      userId : mongoose.Types.ObjectId() ,
      title : "Title4" ,
      images : [
        "4567hjghj5678bnm" ,
        "5678bnm678bnm"
      ] ,
      tags : [
        "modern" ,
        "zimmer" ,
        "film"
      ] ,
      content : "Content goes here"
    }

    /**************************************************************************/

  ];

}

/******************************************************************************/
