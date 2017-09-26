module GrocRoundAdminProductsServiceInterfaces {
  
    /*******************************************/
  
    import product = Product;
  
    /*******************************************/
  
    export interface Instance {
      products: product.Super[];
  
      progress: {
        getProducts: boolean;
      };
  
      promises: {
        getProducts: ng.IPromise<boolean>;
      };
  
      getProducts: GetProducts;
      getProduct: GetProduct;
      addProduct: AddProduct;
      updateProduct: UpdateProduct;
      removeProduct: RemoveProduct;
    }
  
    /*******************************************/
  
    export interface AddDetails {
      label: string;
      images?: string[];
      effectivePrice: product.PriceValue
    }
    
    /******************************************************************************/
    
    export type UpdateDetails = Partial<{
      label: string;
      imagesToAdd: string[];
      imagesToRemove: string[];
      priceValues: product.PriceValues;
      effectivePrice: product.PriceValue
    }>;
  
    /*******************************************/
  
    export interface GetProducts {
      (): ng.IPromise<boolean>;
    }
  
    export interface GetProduct {
      ( productId: string ): ng.IPromise<product.Super>;
    }
  
    export interface AddProduct {
      ( details: AddDetails ): ng.IPromise<void>;
    }
  
    export interface UpdateProduct {
      ( productId: string, details: UpdateDetails ): ng.IPromise<void>;
    }
  
    export interface RemoveProduct {
      ( productId: string ): ng.IPromise<void>;
    }
  
    /*******************************************/
  
  }
  