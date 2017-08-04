/******************************************************************************/

import * as interfaces from "../interfaces/index";

import sharedLogicFactory from "./shared-logic/index";
import sessionManagerFactory from "./session-manager/index";
import storageManagerFactory from "./storage-manager/index";
import authenticationManagerFactory from "./authentication-manager/index";
import communicationManagerFactory from "./communication-manager/index";
import responseManagerFactory from "./response-manager/index";

/******************************************************************************/

class Utilities implements interfaces.Utilities {

  readonly sharedLogic : interfaces.utilities.SharedLogic;
  readonly sessionManager : interfaces.utilities.SessionManager;
  readonly storageManager : interfaces.utilities.StorageManager;
  readonly authenticationManager : interfaces.utilities.AuthenticationManager;
  readonly communicationManager : interfaces.utilities.CommunicationManager;
  readonly responseManager : interfaces.utilities.ResponseManager;

  constructor ( config : interfaces.Config , params : any ) {

    this.sharedLogic = params.sharedLogicFactory( config );
    this.sessionManager = params.sessionManagerFactory( config );
    this.storageManager = params.storageManagerFactory( config );
    this.authenticationManager = params.authenticationManagerFactory( config );
    this.communicationManager = params.communicationManagerFactory( config );
    this.responseManager = params.responseManagerFactory( config );

  }

}

/******************************************************************************/

export default ( config : interfaces.Config ) : interfaces.Utilities => {

  const params : any = {
    sharedLogicFactory : sharedLogicFactory ,
    sessionManagerFactory : sessionManagerFactory ,
    storageManagerFactory : storageManagerFactory ,
    authenticationManagerFactory : authenticationManagerFactory ,
    communicationManagerFactory : communicationManagerFactory ,
    responseManagerFactory : responseManagerFactory
  };

  return new Utilities( config , params );

};

/******************************************************************************/
