module GrocRoundAdminAddEditProductComponentInterfaces {

  /*******************************************/

  import productsService = GrocRoundAdminProductsServiceInterfaces;
  import pricesService = GrocRoundAdminPricesServiceInterfaces;
  import product = Product;
  import price = Price;

  /*******************************************/

  export interface Instance {
    editMode: boolean;
    errorMessage: string;

    loading: boolean;
    adding: boolean;
    updating: boolean;
    deleting: boolean;

    loadingPrices: boolean;
    addingPrice: boolean;
    updatingPrice: boolean;
    deletingPrice: boolean;

    addDetails: productsService.AddDetails;
    updateDetails: productsService.UpdateDetails;
    productId?: string;
    prices: price.Super[];

    addProduct: AddProduct;
    updateProduct: UpdateProduct;
    deleteProduct: DeleteProduct;

    addPrice: AddPrice;
    updatePrice: UpdatePrice;
    deletePrice: DeletePrice;
  }

  /*******************************************/

  export interface AddProduct {
    ( details: productsService.UpdateDetails ): any;
  }

  export interface UpdateProduct {
    ( productId: string, details: productsService.UpdateDetails ): any;
  }

  export interface DeleteProduct {
    ( productId: string ): any;
  }

  export interface AddPrice {
    ( details: pricesService.UpdateDetails ): any;
  }

  export interface UpdatePrice {
    ( priceId: string, details: pricesService.UpdateDetails ): any;
  }

  export interface DeletePrice {
    ( priceId: string ): any;
  }

  /*******************************************/
  
}
