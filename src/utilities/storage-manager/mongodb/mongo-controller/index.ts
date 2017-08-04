/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";

import * as interfaces from "../../../../interfaces";
import * as sharedLogicInterfaces from "../../../../interfaces/utilities/shared-logic";

/******************************************************************************/

export default abstract class MongoController implements interfaces.utilities.storageManager.StorageController {

  /*****************************************************************/

  protected readonly emitter: any;
  protected readonly Model: mongoose.Model<mongoose.Document>;
  protected readonly checkThrow: sharedLogicInterfaces.moders.CheckThrow;
  protected readonly mapDetails: sharedLogicInterfaces.dataStructures.MapDetails;

  /*****************************************************************/

  constructor( params: {
    emitter: any;
    Model: mongoose.Model<mongoose.Document>;
    mapDetails: sharedLogicInterfaces.dataStructures.MapDetails,
    checkThrow: sharedLogicInterfaces.moders.CheckThrow
  } ) {
    this.Model = params.Model;
    this.checkThrow = params.checkThrow;
    this.mapDetails = params.mapDetails;
  }

  /*****************************************************************/

  protected readonly find = ( conditions: any, sortCriteria?: string, limit?: number ): Promise<any[]> => {

    conditions = ( conditions ) ? conditions : {};
    sortCriteria = ( sortCriteria ) ? sortCriteria : "-updatedAt";
    limit = ( limit ) ? limit : 50;

    return new Promise<any>(( resolve, reject ) => {

      this.Model.find( conditions ).sort( sortCriteria ).limit( limit ).exec(( err, foundDocuments ) => {

        if ( err ) {
          reject( err );
        } else {
          resolve( foundDocuments );
        }

      } );

    } );

  }

  /*****************************************************************/

  protected readonly findById = ( id: mongoose.Types.ObjectId ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      this.Model.findById( id, ( err, foundDocument ) => {

        if ( err ) {
          return reject( err );
        }

        if ( foundDocument ) {
          resolve( foundDocument );
        } else {
          reject( {
            identifier: "DocumentNotFound"
          } );
        }

      } );

    } );

  }

  /*****************************************************************/

  protected readonly saveDocument = ( details: any ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      let newModel = new this.Model( details );
      newModel.save(( err: any ) => {

        if ( err ) {
          reject( err );
        } else {
          resolve( newModel );
        }

      } );

    } );

  }

  /*****************************************************************/

  protected readonly saveMultipleDocuments = ( detailArr: any[] ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      this.Model.insertMany( detailArr, ( err, savedDocuments ) => {

        if ( err ) {
          reject( err );
        } else {
          resolve( savedDocuments );
        }

      } );

    } );

  }

  /*****************************************************************/

  protected readonly updateDocuments = ( conditions: any, details: any ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

      let returnDocuments: mongoose.Document[] = [];

      this.Model.find( conditions ).exec(( err, foundDocuments ) => {

        if ( err ) {
          return reject( err );
        }

        Promise.all( foundDocuments.map(( document: any ) => {

          return new Promise<any>(( resolve, reject ) => {

            this.mapDetails( details, document );

            document.save(( err: any ) => {

              if ( err ) {
                reject( err );
              } else {
                returnDocuments.push( document );
                resolve();
              }

            } );

          } );

        } ) )
          .then(( response: any ) => {

            resolve( returnDocuments );

          } );

      } );

    } );

  }

  /*****************************************************************/

  protected readonly removeDocuments = ( conditions: any ): Promise<any> => {

    return new Promise<any>(( resolve, reject ) => {

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
