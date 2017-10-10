module GrocRoundAdminDeliveryFeesServiceInterfaces {

  /*******************************************/

  import deliveryFee = DeliveryFee;
  import user = User;
  import round = Round;

  export interface Instance {
    getDeliveryFees: GetDeliveryFees;
    getDeliveryFee: GetDeliveryFee;
    addDeliveryFee: AddDeliveryFee;
    updateDeliveryFee: UpdateDeliveryFee;
    removeDeliveryFee: RemoveDeliveryFee;
  }

  /*******************************************/

  export interface AddDetails {
    user: user.UserInfo;
    round: round.RoundInfo;
    payment: {
      identifier: string;
      amount: number;
      method: string;
    };
  }
  
  /******************************************************************************/
  
  export type UpdateDetails = Partial<{
    round: Partial<round.RoundInfo>;
    payment: Partial<deliveryFee.Super[ "payment" ]>;
  }>;

  /*******************************************/

  export interface GetDeliveryFees {
    ( round: string, user: string ): ng.IPromise<deliveryFee.Super[]>;
  }

  export interface GetDeliveryFee {
    ( deliveryFeeId: string ): ng.IPromise<deliveryFee.Super>;
  }

  export interface AddDeliveryFee {
    ( details: AddDetails ): ng.IPromise<deliveryFee.Super>;
  }

  export interface UpdateDeliveryFee {
    ( deliveryFeeId: string, details: UpdateDetails ): ng.IPromise<deliveryFee.Super>;
  }

  export interface RemoveDeliveryFee {
    ( deliveryFeeId: string ): ng.IPromise<void>;
  }

  /*******************************************/

}
