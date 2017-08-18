/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as dataModel from "../../../../data-model";
import * as moders from "../../../helpers/moders/interfaces";
import * as dataStructures from "../../../helpers/data-structures/interfaces";

import * as interfaces from "../../interfaces";
import * as internalMethods from "../../interfaces/internal-methods";
import * as events from "../../interfaces/events/generator";

/******************************************************************************/

export default abstract class MongoController<
  FC extends any, SC extends interfaces.BaseSortCriteria,
  AD extends any, UD extends any,
  QC extends any, Document extends mongoose.Document,
  DM extends dataModel.ModelRange, DMA extends dataModel.ModelArrayRange,
  E extends events.BaseMethods>
  implements interfaces.StorageController {

  /*****************************************************************/

  constructor(
    protected readonly events: E,
    protected readonly Model: mongoose.Model<mongoose.Document>,
    protected readonly mapDetails: dataStructures.MapDetails,
    protected readonly checkThrow: moders.CheckThrow,
    protected readonly makeConditions: internalMethods.MakeConditions<FC, QC>,
    protected readonly makeSortCriteria: internalMethods.MakeSortCriteria<SC>,
    protected readonly convertAddDetails: internalMethods.ConvertAddDetails<AD>,
    protected readonly generateUpdateDetails: internalMethods.GenerateUpdateDetails<UD>,
    protected readonly convertToAbstract: internalMethods.ConvertToAbstract<DMA>
  ) { }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: FC, sortCriteria: SC, limit: number, forceThrow = false ): Promise<DMA> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: QC ) => {

        return this.makeSortCriteria( sortCriteria )
          .then(( sortString: string ) => {

            return Promise.resolve( {
              conditions: conditions,
              sortString: sortString
            } );

          } );

      } )
      .then(( holder: { conditions: QC, sortString: string } ) => {

        return this.find( holder.conditions, holder.sortString, limit );

      } )
      .then(( foundDocuments: Document[] ) => {

        return this.convertToAbstract( foundDocuments );

      } )
      .then(( convertedDocuments: DMA ) => {

        new Promise<DMA>(( resolve, reject ) => {
          this.events.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: ( convertedDocuments as dataModel.DataModel[] ).map(( document ) => {
              return document.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedDocuments );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getFailed( {
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

  readonly getById = ( documentId: string, forceThrow = false ): Promise<DM> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( documentId ) );

      } )
      .then(( foundDocument: Document ) => {

        return this.convertToAbstract( [ foundDocument ] );

      } )
      .then(( convertedDocuments: DMA ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.gotById( {
            id: documentId
          } );
        } );

        return Promise.resolve( convertedDocuments[ 0 ] as DM );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.getByIdFailed( {
            id: documentId,
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

  readonly addBatch = ( documents: AD[], forceThrow = false ): Promise<DMA> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( this.convertAddDetails( documents ) );

      } )
      .then(( addedDocuments: Document[] ) => {

        return this.convertToAbstract( addedDocuments );

      } )
      .then(( convertedDocuments: DMA ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedDocuments
          } );
          resolve();
        } );

        return Promise.resolve( convertedDocuments );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.addFailed( {
            details: documents,
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

  readonly add = ( details: AD, forceThrow = false ): Promise<DM> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveDocument( this.convertAddDetails( [ details ] ) );

      } )
      .then(( addedDocument: Document ) => {

        return this.convertToAbstract( [ addedDocument ] );

      } )
      .then(( convertedDocuments: DMA ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedDocuments
          } );
          resolve();
        } );

        return Promise.resolve( convertedDocuments[ 0 ] as DM );

      } )
      .catch(( reason: any ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.addFailed( {
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

  readonly update = ( filtrationCriteria: FC, details: UD, forceThrow = false ): Promise<DMA> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } ).then(( conditions: any ) => {

        return this.find( conditions, null, null );

      } )
      .then(( foundDocuments: Document[] ) => {

        return Promise.all( foundDocuments.map(( document ) => {

          return this.generateUpdateDetails( document, details )
            .then(( fedDocument: Document ) => {

              return new Promise<Document>(( resolve, reject ) => {
                fedDocument.save(( err: any ) => {
                  if ( err ) {
                    reject( err );
                  } else {
                    resolve( fedDocument );
                  }
                } );
              } );

            } );

        } ) );

      } )
      .then(( updatedDocuments: Document[] ) => {

        return this.convertToAbstract( updatedDocuments );

      } )
      .then(( updatedDocuments: DMA ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            conditions: filtrationCriteria,
            documents: updatedDocuments
          } );
          resolve();
        } );

        return Promise.resolve( updatedDocuments );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updateFailed( {
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

  readonly updateById = ( documentId: string, details: UD, forceThrow = false ): Promise<DM> => {

    let documentObjectId: mongoose.Types.ObjectId;

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( documentId ) );

      } )
      .then(( document: Document ) => {

        return this.generateUpdateDetails( document, details )
          .then(( fedDocument: Document ) => {

            return new Promise<Document>(( resolve, reject ) => {
              fedDocument.save(( err: any ) => {
                if ( err ) {
                  reject( err );
                } else {
                  resolve( fedDocument );
                }
              } );
            } );

          } );

      } )
      .then(( updatedDocument: Document ) => {

        return this.convertToAbstract( [ updatedDocument ] );

      } )
      .then(( convertedDocuments: DMA ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            id: documentId,
            documents: convertedDocuments
          } );
          resolve();
        } );

        return Promise.resolve( convertedDocuments[ 0 ] as DM );

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updateFailed( {
            id: documentId,
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

  readonly remove = ( filtrationCriteria: FC, forceThrow = false ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.makeConditions( filtrationCriteria );

      } )
      .then(( conditions: any ) => {

        return this.removeDocuments( conditions );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removed( {
            conditions: filtrationCriteria
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removeFailed( {
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

  readonly removeById = ( documentId: string, forceThrow?: boolean ): Promise<void> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.removeDocuments( {
          "_id": mongoose.Types.ObjectId( documentId )
        } );

      } )
      .then(( response: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removed( {
            id: documentId
          } );
          resolve();
        } );

        return Promise.resolve();

      } )
      .catch(( reason: any ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.removeFailed( {
            id: documentId,
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
  /*****************************************************************/

  private readonly find = ( conditions: any, sortCriteria?: string, limit?: number ): Promise<Document[]> => {

    conditions = ( conditions ) ? conditions : "dfd";
    sortCriteria = ( sortCriteria ) ? sortCriteria : "-updatedAt";
    limit = ( limit ) ? limit : 50;

    return new Promise<any>(( resolve, reject ) => {

      this.Model.find( conditions ).sort( sortCriteria ).limit( limit ).exec(( err, foundDocuments ) => {

        if ( err ) {
          reject( err );
        } else {
          resolve( foundDocuments as Document[] );
        }

      } );

    } );

  }

  /*****************************************************************/

  private readonly findById = ( id: mongoose.Types.ObjectId ): Promise<Document> => {

    return new Promise<Document>(( resolve, reject ) => {

      this.Model.findById( id, ( err, foundDocument ) => {

        if ( err ) {
          return reject( err );
        }

        if ( foundDocument ) {
          resolve( foundDocument as Document );
        } else {
          reject( {
            identifier: "DocumentNotFound"
          } );
        }

      } );

    } );

  }

  /*****************************************************************/

  private readonly saveDocument = ( details: any ): Promise<Document> => {

    return new Promise<Document>(( resolve, reject ) => {

      let newModel = new this.Model( details );
      newModel.save(( err: any ) => {

        if ( err ) {
          reject( err );
        } else {
          resolve( newModel as Document );
        }

      } );

    } );

  }

  /*****************************************************************/

  private readonly saveMultipleDocuments = ( detailArr: any[] ): Promise<Document[]> => {

    return new Promise<Document[]>(( resolve, reject ) => {

      this.Model.insertMany( detailArr, ( err, savedDocuments ) => {

        if ( err ) {
          reject( err );
        } else {
          resolve( savedDocuments as Document[] );
        }

      } );

    } );

  }

  /*****************************************************************/

  private readonly updateDocuments = ( conditions: any, details: any ): Promise<Document[]> => {

    return new Promise<Document[]>(( resolve, reject ) => {

      let returnDocuments: Document[] = [];

      this.Model.find( conditions ).exec(( err, foundDocuments ) => {

        if ( err ) {
          return reject( err );
        }

        Promise.all( ( foundDocuments as Document[] ).map(( document ) => {

          return new Promise<Document>(( resolve, reject ) => {

            this.mapDetails( details, document );

            document.save(( err: any ) => {

              if ( err ) {
                reject( err );
              } else {
                returnDocuments.push( document as Document );
                resolve();
              }

            } );

          } );

        } ) )
          .then(( response: any ) => {

            resolve( returnDocuments as Document[] );

          } );

      } );

    } );

  }

  /*****************************************************************/

  private readonly removeDocuments = ( conditions: any ): Promise<void> => {

    return new Promise<void>(( resolve, reject ) => {

      this.Model.find( conditions ).remove(( err: any ) => {

        if ( err ) {
          reject( err );
        } else {
          resolve();
        }

      } );

    } );

  }

  /*****************************************************************/

}

/******************************************************************************/
