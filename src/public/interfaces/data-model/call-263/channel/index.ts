module Channel {

  /******************************************************************************/

  import dataModel = DataModel;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    allocated: boolean;
    allocatedTo: string;
    code: string;
    phoneNumber: string;
    password: string;
  }

  /******************************************************************************/


}