module Subscription {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    userId: string;
    subscription: string;
  }

  /******************************************************************************/

}