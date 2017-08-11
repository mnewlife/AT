/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import MongoController from "../../mongo-controller";
import { Model, Model_Partial, SaleMongooseModel } from "./model";

import * as interfaces from "../../../../../interfaces";
import * as storageInterfaces from "../../../../../interfaces/components/storage";
import * as sharedLogicInterfaces from "../../../../../interfaces/components/shared-logic";

import emitterFactory from "./event-emitter";

/******************************************************************************/

class MongoSale extends MongoController implements storageInterfaces.routers.Sale {

  /*****************************************************************/

  protected readonly emitter: storageInterfaces.routers.sale.Emitter;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: storageInterfaces.routers.sale.Emitter;
    Model: mongoose.Model<mongoose.Document>;
    mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
    checkThrow: sharedLogicInterfaces.moders.CheckThrow;
  } ) {
    super( {
      emitter: params.emitter,
      Model: params.Model,
      mapDetails: params.mapDetails,
      checkThrow: params.checkThrow
    } );
    this.emitter = params.emitter;
  }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: storageInterfaces.routers.sale.FiltrationCriteria, sortCriteria: storageInterfaces.routers.sale.SortCriteria, limit: number, forceThrow = false ): Promise<interfaces.dataModel.routers.sale.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.makeSortCriteria( sortCriteria )
          .then(( sortString: string ) => {
            return Promise.resolve( {
              conditions: conditions,
              sortString: sortString
            } );
          } );

      } )
      .then(( holder: { conditions: QueryConditions, sortString: string } ) => {

        return this.find( holder.conditions, holder.sortString, limit );

      } )
      .then(( foundSales: Model[] ) => {

        return this.convertToAbstract( foundSales );

      } )
      .then(( convertedSales: interfaces.dataModel.routers.sale.Super[] ) => {

        new Promise<interfaces.dataModel.routers.sale.Super[]>(( resolve, reject ) => {
          this.emitter.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedSales.map(( sale ) => {
              return sale.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedSales );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getFailed( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "GetFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly getById = ( saleId: string, forceThrow = false ): Promise<interfaces.dataModel.routers.sale.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( saleId ) );

      } )
      .then(( foundSale: Model ) => {

        return this.convertToAbstract( [ foundSale ] );

      } )
      .then(( convertedSales: interfaces.dataModel.routers.sale.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.gotById( {
            id: saleId
          } );
        } );

        return Promise.resolve( convertedSales[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.getByIdFailed( {
            id: saleId,
            reason: reason
          } );
          resolve();
        } );

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( {
            identifier: "DocumentNotFound",
            data: {
              reason: reason
            }
          } );
        } else {
          return Promise.reject( {
            identifier: "GetByIdFailed",
            data: {
              reason: reason
            }
          } );
        }

      } );

  }

  /*****************************************************************/

  readonly addBatch = ( sales: storageInterfaces.routers.sale.AddDetails[], forceThrow = false ): Promise<interfaces.dataModel.routers.sale.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( sales.map(( sale ) => {
          let saleDetails: Model_Partial = {
            buyer: {
              fullName: sale.buyer.fullName,
              emailAddress: sale.buyer.emailAddress,
              phoneNumber: sale.buyer.phoneNumber
            },
            type: sale.type,
            paymentMethod: sale.paymentMethod,
            unitCost: sale.unitCost,
            amount: sale.amount,
            totalCost: sale.totalCost
          };
          if ( sale.simCard ) {
            saleDetails.simCard = {
              cardId: mongoose.Types.ObjectId( sale.simCard.cardId ),
              mdn: sale.simCard.mdn
            };
          }
          return saleDetails;
        } ) );

      } )
      .then(( addedSales: Model[] ) => {

        return this.convertToAbstract( addedSales );

      } )
      .then(( convertedSales: interfaces.dataModel.routers.sale.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedSales
          } );
          resolve();
        } );

        return Promise.resolve( convertedSales );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: sales,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "AddBatchFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly add = ( details: storageInterfaces.routers.sale.AddDetails, forceThrow = false ): Promise<interfaces.dataModel.routers.sale.Super> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        let saleDetails: Model_Partial = {
          buyer: {
            fullName: details.buyer.fullName,
            emailAddress: details.buyer.emailAddress,
            phoneNumber: details.buyer.phoneNumber
          },
          type: details.type,
          paymentMethod: details.paymentMethod,
          unitCost: details.unitCost,
          amount: details.amount,
          totalCost: details.totalCost
        };
        if ( details.simCard ) {
          saleDetails.simCard = {
            cardId: mongoose.Types.ObjectId( details.simCard.cardId ),
            mdn: details.simCard.mdn
          };
        }

        return this.saveDocument( saleDetails );

      } )
      .then(( addedSale: Model ) => {

        return this.convertToAbstract( [ addedSale ] );

      } )
      .then(( convertedSales: interfaces.dataModel.routers.sale.Super[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.added( {
            documents: convertedSales
          } );
          resolve();
        } );

        return Promise.resolve( convertedSales[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.emitter.addFailed( {
            details: [ details ],
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "AddFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly update = ( filtrationCriteria: storageInterfaces.routers.sale.FiltrationCriteria, details: storageInterfaces.routers.sale.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.routers.sale.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: QueryConditions ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundSales: Model[] ) => {

        return Promise.all( foundSales.map(( sale ) => {

          return this.generateUpdateDetails( sale, details )
            .then(( fedSale: Model ) => {

              return new Promise<Model>(( resolve, reject ) => {
                fedSale.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedSale );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedSales: Model[] ) => {

        return this.convertToAbstract( updatedSales );

      } )
      .then(( updatedSales: interfaces.dataModel.routers.sale.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            conditions: filtrationCriteria,
            documents: updatedSales
          } );
          resolve();
        } );

        return Promise.resolve( updatedSales );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            conditions: filtrationCriteria,
            updates: details,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "UpdateFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly updateById = ( saleId: string, details: storageInterfaces.routers.sale.UpdateDetails, forceThrow = false ): Promise<interfaces.dataModel.routers.sale.Super> => {

    let saleObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( saleId ) );

      } )
      .then(( sale: Model ) => {

        return this.generateUpdateDetails( sale, details )
          .then(( fedSale: Model ) => {

            return new Promise<Model>(( resolve, reject ) => {
              fedSale.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedSale );
                }
              } );
            } );

          } );

      } )
      .then(( updatedSale: Model ) => {

        return this.convertToAbstract( [ updatedSale ] );

      } )
      .then(( convertedSales: interfaces.dataModel.routers.sale.Super[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updated( {
            id: saleId,
            documents: convertedSales
          } );
          resolve();
        } );

        return Promise.resolve( convertedSales[ 0 ] );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.updateFailed( {
            id: saleId,
            updates: details,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "UpdateFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly remove = ( filtrationCriteria: storageInterfaces.routers.sale.FiltrationCriteria, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QueryConditions ) => {

        return this.removeDocuments( conditions );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            conditions: filtrationCriteria
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            conditions: filtrationCriteria,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "RemoveFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly removeById = ( saleId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( saleId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removed( {
            id: saleId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.emitter.removeFailed( {
            id: saleId,
            reason: reason
          } );
          resolve();
        } );

        return Promise.reject( {
          identifier: "RemoveFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  private readonly makeConditions = ( filtrationCriteria: storageInterfaces.routers.sale.FiltrationCriteria ): Promise<QueryConditions> => {

    return new Promise<QueryConditions>(( resolve, reject ) => {

      let conditions: QueryConditions = {};

      if ( filtrationCriteria.buyer ) {
        if ( filtrationCriteria.buyer.fullName ) {
          conditions[ "buyer.fullName" ] = filtrationCriteria.buyer.fullName;
        }
        if ( filtrationCriteria.buyer.emailAddress ) {
          conditions[ "buyer.emailAddress" ] = filtrationCriteria.buyer.emailAddress;
        }
        if ( filtrationCriteria.buyer.phoneNumber ) {
          conditions[ "buyer.phoneNumber" ] = filtrationCriteria.buyer.phoneNumber;
        }
      }

      if ( filtrationCriteria.simCard ) {
        if ( filtrationCriteria.simCard.cardId ) {
          conditions[ "simCard.cardId" ] = mongoose.Types.ObjectId( filtrationCriteria.simCard.cardId );
        }
        if ( filtrationCriteria.simCard.mdn ) {
          conditions[ "simCard.mdn" ] = filtrationCriteria.simCard.mdn;
        }
      }

      if ( filtrationCriteria.type ) {
        conditions[ "type" ] = filtrationCriteria.type;
      }

      if ( filtrationCriteria.paymentMethod ) {
        conditions[ "paymentMethod" ] = filtrationCriteria.paymentMethod;
      }

      if ( filtrationCriteria.unitCost ) {
        conditions[ "unitCost" ] = {};
        if ( filtrationCriteria.unitCost.min ) {
          conditions[ "unitCost" ].$gte = filtrationCriteria.unitCost.min;
        }
        if ( filtrationCriteria.unitCost.max ) {
          conditions[ "unitCost" ].$lte = filtrationCriteria.unitCost.max;
        }
      }

      if ( filtrationCriteria.amount ) {
        conditions[ "amount" ] = {};
        if ( filtrationCriteria.amount.min ) {
          conditions[ "amount" ].$gte = filtrationCriteria.amount.min;
        }
        if ( filtrationCriteria.amount.max ) {
          conditions[ "amount" ].$lte = filtrationCriteria.amount.max;
        }
      }

      if ( filtrationCriteria.totalCost ) {
        conditions[ "totalCost" ] = {};
        if ( filtrationCriteria.totalCost.min ) {
          conditions[ "totalCost" ].$gte = filtrationCriteria.totalCost.min;
        }
        if ( filtrationCriteria.totalCost.max ) {
          conditions[ "totalCost" ].$lte = filtrationCriteria.totalCost.max;
        }
      }

      if ( filtrationCriteria.textSearch ) {
        conditions.$text = { $search: filtrationCriteria.textSearch };
      }

      resolve( conditions );

    } );

  }

  /*****************************************************************/

  private readonly makeSortCriteria = ( sortCriteria: storageInterfaces.routers.sale.SortCriteria ): Promise<string> => {

    return new Promise<string>(( resolve, reject ) => {
      let sortString;
      sortString = sortCriteria.criteria;
      if ( sortCriteria.order === "Descending" ) {
        sortString = "-" + sortString;
      }
      resolve( sortString );
    } );

  }

  /*****************************************************************/

  private readonly generateUpdateDetails = ( document: Model, details: storageInterfaces.routers.sale.UpdateDetails ): Promise<Model> => {

    return new Promise<Model>(( resolve, reject ) => {

      if ( details.buyer ) {
        if ( details.buyer.fullName ) {
          document.buyer.fullName = details.buyer.fullName;
        }
        if ( details.buyer.emailAddress ) {
          document.buyer.emailAddress = details.buyer.emailAddress;
        }
        if ( details.buyer.phoneNumber ) {
          document.buyer.phoneNumber = details.buyer.phoneNumber;
        }
      }

      if ( details.simCard ) {
        if ( details.simCard.cardId ) {
          document.simCard.cardId = mongoose.Types.ObjectId( details.simCard.cardId );
        }
        if ( details.simCard.mdn ) {
          document.simCard.mdn = details.simCard.mdn;
        }
      }

      if ( details.type ) {
        document.type = details.type;
      }

      if ( details.paymentMethod ) {
        document.paymentMethod = details.paymentMethod;
      }

      if ( details.unitCost ) {
        document.unitCost = details.unitCost;
      }

      if ( details.amount ) {
        document.amount = details.amount;
      }

      if ( details.totalCost ) {
        document.totalCost = details.totalCost;
      }

      resolve( document );

    } );

  }

  /*****************************************************************/

  private readonly convertToAbstract = ( sales: Model[], forceThrow = false ): Promise<interfaces.dataModel.routers.sale.Super[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return new Promise<interfaces.dataModel.routers.sale.Super[]>(( resolve, reject ) => {

          let returnSales: interfaces.dataModel.routers.sale.Super[] = [];

          sales.forEach(( sale ) => {

            let returnSale: interfaces.dataModel.routers.sale.Super = {
              id: ( <mongoose.Types.ObjectId>sale._id ).toHexString(),
              buyer: {
                id: ( sale.buyer._id as mongoose.Types.ObjectId ).toHexString(),
                fullName: sale.buyer.fullName,
                emailAddress: sale.buyer.emailAddress,
                phoneNumber: sale.buyer.phoneNumber,
                createdAt: sale.buyer.createdAt,
                updatedAt: sale.buyer.updatedAt
              },
              type: sale.type,
              paymentMethod: sale.paymentMethod,
              unitCost: sale.unitCost,
              amount: sale.amount,
              totalCost: sale.totalCost,
              createdAt: sale.createdAt,
              updatedAt: sale.updatedAt
            };

            if ( sale.simCard ) {
              returnSale.simCard = {
                id: ( sale.simCard._id as mongoose.Types.ObjectId ).toHexString(),
                cardId : ( sale.simCard.cardId as mongoose.Types.ObjectId ).toHexString(),
                mdn: sale.simCard.mdn,
                createdAt: sale.simCard.createdAt,
                updatedAt: sale.simCard.updatedAt
              };
            }

            returnSales.push( returnSale );

          } );

          resolve( returnSales );

        } );

      } );

  }

  /*****************************************************************/

}

/******************************************************************************/

interface QueryConditions {
  "buyer.fullName"?: string;
  "buyer.emailAddress"?: string;
  "buyer.phoneNumber"?: string;

  "simCard.cardId"?: mongoose.Types.ObjectId;
  "simCard.mdn"?: number;

  "type"?: string;
  "paymentMethod"?: string;
  "unitCost"?: { $gte?: number; $lte?: number; };
  "amount"?: { $gte?: number; $lte?: number; };
  "totalCost"?: { $gte?: number; $lte?: number; };
  $text?: { $search: string };
}

/******************************************************************************/

export default ( params: {
  emitEvent: interfaces.setupConfig.eventManager.Emit;
  mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;
  checkThrow: sharedLogicInterfaces.moders.CheckThrow;
} ): storageInterfaces.routers.Sale => {
  return new MongoSale( {
    emitter: emitterFactory( params.emitEvent ),
    Model: SaleMongooseModel,
    mapDetails: params.mapDetails,
    checkThrow: params.checkThrow
  } );
}

/******************************************************************************/
