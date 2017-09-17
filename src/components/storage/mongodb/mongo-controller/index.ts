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

export default abstract class MongoController<FiltrationCriteria extends any, SortCriteria extends interfaces.BaseSortCriteria,
  AddDetails extends any, UpdateDetails extends any,
  QueryConditions extends any, Document extends mongoose.Document,
  DataModel extends dataModel.DataModel, E extends events.BaseMethods> implements interfaces.StorageController {

  /*****************************************************************/

  constructor(
    protected readonly events: E,
    protected readonly Model: mongoose.Model<mongoose.Document>,
    protected readonly mapDetails: dataStructures.MapDetails,
    protected readonly checkThrow: moders.CheckThrow,
    protected readonly makeConditions: internalMethods.MakeConditions<FiltrationCriteria, QueryConditions>,
    protected readonly makeSortCriteria: internalMethods.MakeSortCriteria<SortCriteria>,
    protected readonly generateAddDetails: internalMethods.GenerateAddDetails<AddDetails>,
    protected readonly generateUpdateDetails: internalMethods.GenerateUpdateDetails<UpdateDetails, Document>,
    protected readonly convertToAbstract: internalMethods.ConvertToAbstract<Document, DataModel>
  ) { }

  /*****************************************************************/

  readonly get = ( filtrationCriteria: FiltrationCriteria, sortCriteria: SortCriteria, limit: number, forceThrow = false ): Promise<DataModel[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        if ( filtrationCriteria ) {
          return this.makeConditions( filtrationCriteria );
        } else {
          return Promise.resolve( {} );
        }

      } )
      .then(( conditions: QueryConditions ) => {

        if ( sortCriteria ) {

          return this.makeSortCriteria( sortCriteria )
            .then(( sortString: string ) => {

              return Promise.resolve( {
                conditions: conditions,
                sortString: sortString
              } );

            } );

        } else {

          return Promise.resolve( {
            conditions: conditions,
            sortString: ""
          } );

        }

      } )
      .then(( holder: { conditions: QueryConditions, sortString: string } ) => {

        return this.find( holder.conditions, holder.sortString, limit );

      } )
      .then(( foundDocuments: Document[] ) => {

        return this.convertToAbstract( foundDocuments );

      } )
      .then(( convertedDocuments: DataModel[] ) => {

        new Promise<DataModel[]>(( resolve, reject ) => {
          this.events.got( {
            filtrationCriteria: filtrationCriteria,
            sortCriteria: sortCriteria,
            limit: limit,
            ids: convertedDocuments.map(( document ) => {
              return document.id;
            } )
          } );
          resolve();
        } );

        return Promise.resolve( convertedDocuments );

      } )
      .catch(( reason: any ) => {

        console.log( ">" + reason );

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

  readonly getById = ( documentId: string, forceThrow = false ): Promise<DataModel> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.findById( mongoose.Types.ObjectId( documentId ) );

      } )
      .then(( foundDocument: Document ) => {

        return this.convertToAbstract( [ foundDocument ] );

      } )
      .then(( convertedDocuments: DataModel[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.gotById( {
            id: documentId
          } );
        } );

        return Promise.resolve( convertedDocuments[ 0 ] );

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
          return Promise.reject( reason );
        }

        return Promise.reject( {
          identifier: "GetByIdFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly addBatch = ( documents: AddDetails[], forceThrow = false ): Promise<DataModel[]> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveMultipleDocuments( this.generateAddDetails( documents ) );

      } )
      .then(( addedDocuments: Document[] ) => {

        return this.convertToAbstract( addedDocuments );

      } )
      .then(( convertedDocuments: DataModel[] ) => {

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

  readonly add = ( details: AddDetails, forceThrow = false ): Promise<DataModel> => {

    return this.checkThrow( forceThrow )
      .then(( response: any ) => {

        return this.saveDocument( this.generateAddDetails( [ details ] )[ 0 ] );

      } )
      .then(( addedDocument: Document ) => {

        return this.convertToAbstract( [ addedDocument ] );

      } )
      .then(( convertedDocuments: DataModel[] ) => {

        new Promise<void>(( resolve, reject ) => {
          this.events.added( {
            documents: convertedDocuments
          } );
          resolve();
        } );

        return Promise.resolve( convertedDocuments[ 0 ] );

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

  readonly update = ( filtrationCriteria: FiltrationCriteria, details: UpdateDetails, forceThrow = false ): Promise<DataModel[]> => {

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
      .then(( updatedDocuments: DataModel[] ) => {

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

  readonly updateById = ( documentId: string, details: UpdateDetails, forceThrow = false ): Promise<DataModel> => {

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
      .then(( convertedDocuments: DataModel[] ) => {

        new Promise<any>(( resolve, reject ) => {
          this.events.updated( {
            id: documentId,
            documents: convertedDocuments
          } );
          resolve();
        } );

        return Promise.resolve( convertedDocuments[ 0 ] );

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

        if ( reason.identifier && reason.identifier === "DocumentNotFound" ) {
          return Promise.reject( reason );
        }

        return Promise.reject( {
          identifier: "UpdateFailed",
          data: {
            reason: reason
          }
        } );

      } );

  }

  /*****************************************************************/

  readonly remove = ( filtrationCriteria: FiltrationCriteria, forceThrow = false ): Promise<void> => {

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

    conditions = ( conditions ) ? conditions : "";
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
            identifier: "DocumentNotFound",
            data: {}
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

        Promise.all(( foundDocuments as Document[] ).map(( document ) => {

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
