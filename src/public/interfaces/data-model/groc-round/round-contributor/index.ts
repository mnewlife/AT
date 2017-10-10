module RoundContributor {

  /******************************************************************************/

  import dataModel = DataModel;
  import user = User;
  import track = Track;
  import product = Product;
  import round = Round;

  /******************************************************************************/

  export interface Super extends dataModel.DataModel {
    round: round.RoundInfo;
    user: user.UserInfo;
    contributions: Contributions;
    tracks: TrackInfo[];
    cart: {
      num: number;
      value: number;
    };
    deliveryFees: {
      valuePaid: number;
      valueDue: number;
    };
    complete: boolean;
  };
  
  export interface TrackInfo {
    track: track.TrackInfo;
    deviations: {
      additions: Deviation[];
      subtractions: Deviation[];
    };
  }
  
  export interface Deviation {
    product: product.ProductInfo;
    quantity: number;
    value: number;
  }
  
  export interface Contributions {
    num: number;
    value: number;
    valueDue: number;
  }

  /******************************************************************************/

}