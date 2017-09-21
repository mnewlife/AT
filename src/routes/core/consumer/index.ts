/******************************************************************************/

import * as express from "express";

import * as dataModel from "../../../data-model";
import * as EventListener from "../../../event-listener/interfaces";
import * as Components from "../../../components/interfaces";
import * as Procedures from "../../../procedures/interfaces";

import * as response from "../../../components/response/interfaces";
import * as helpers from "../../helpers/interfaces";
import * as mailTemplates from "../../../procedures/core/common/mail-templates/interfaces";
import * as mailAgent from "../../../components/communication/mail-agent/interfaces";
import * as authProcedures from "../../../procedures/core/common/auth/interfaces";

import MailTemplates from "../../../procedures/core/common/mail-templates";

//import profile from "./profile";
import registration from "./registration";

/******************************************************************************/

export default (
  components: Components.Instance,
  procedures: Procedures.Instance,
  helpers: helpers.Instance
): express.Router => {

  /**********************************************************/

  let router = express.Router();

  /**********************************************************/

  router.use( "/registration", registration(
    components.storage.core.user.get,
    components.helpers.numbers.generateRandomNumber,
    components.authentication.createHashedPassword,
    components.storage.core.user.add,
    procedures.core.common.mailTemplates.newEmailAddress,
    components.communication.mailAgent.sendEmail,
    components.response.send
  ) );

  /**********************************************************/

  router.get( "/", authCheck, ( req: express.Request, res: express.Response, next: express.NextFunction ) => {

    return components.response.send( res, "core-consumer", true, null, {
      currentUser: res.locals.currentUser
    } );

  } );

  /**********************************************************/

  function authCheck ( req: express.Request, res: express.Response, next: express.NextFunction ) {

    if ( !components.session.signedIn( req ) ) {
      return signInFirst();
    }

    return components.session.getCurrentUser( req )
      .then(( currentUser: dataModel.core.user.Super ) => {

        if ( currentUser.accessLevel == "consumer" ) {
          res.locals.currentUser = currentUser;
          return next();
        } else {
          return signInFirst();
        }

      } );

    function signInFirst () {
      return components.response.send( res, "passpoint", false, "You need to sign in first", null );
    }

  }

  /**********************************************************/

  return router;

}

/******************************************************************************/