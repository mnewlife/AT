module GrocRoundAdminShopsServiceInterfaces {

  /*******************************************/

  import shop = Shop;
  
  export interface Instance {
    shops: shop.Super[];

    progress: {
      getShops: boolean;
    };

    promises: {
      getShops: ng.IPromise<boolean>;
    };

    getShops: GetShops;
    getShop: GetShop;
    addShop: AddShop;
    updateShop: UpdateShop;
    removeShop: RemoveShop;
  }

  /*******************************************/

  export interface AddDetails {
    shopName: string;
    images?: string[];
  }

  /******************************************************************************/

  export type UpdateDetails = Partial<{
    shopName: string;
    imagesToAdd: string[];
    imagesToRemove: string[];
  }>;

  /*******************************************/

  export interface GetShops {
    (): ng.IPromise<boolean>;
  }

  export interface GetShop {
    ( shopId: string ): ng.IPromise<shop.Super>;
  }

  export interface AddShop {
    ( details: AddDetails ): ng.IPromise<void>;
  }

  export interface UpdateShop {
    ( shopId: string, details: UpdateDetails ): ng.IPromise<void>;
  }

  export interface RemoveShop {
    ( shopId: string ): ng.IPromise<void>;
  }

  /*******************************************/

}
