"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var mongoose=require("mongoose"),x=require("../../../basic-schema"),user=require("../../../core/user/model"),round=require("../../round/model"),cartProductSchema=new mongoose.Schema({user:user.UserInfoSchema,round:round.RoundInfoSchema,cartId:x.ObjectIdSchema,product:{productId:mongoose.Schema.Types.ObjectId,label:x.StringSchema,quantity:x.NumberSchema,value:x.NumberSchema},createdAt:x.DateSchema,updatedAt:x.DateSchema}),MongooseModel=mongoose.model("CartProduct",cartProductSchema);exports.MongooseModel=MongooseModel;