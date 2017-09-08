/******************************************************************************/

import * as eventListener from "../../../event-listener/interfaces";
import * as moders from "../../../components/helpers/moders/interfaces";
import * as authentication from "../../../components/authentication/interfaces";
import * as session from "../../../components/session/interfaces";
import * as storageUser from "../../../components/storage/interfaces/core/user";
import * as mailAgent from "../../../components/communication/mail-agent/interfaces";
import * as numbers from "../../../components/helpers/numbers/interfaces";

import * as interfaces from "./interfaces";

import * as helpers from "./helpers/interfaces";
import * as mailTemplates from "./mail-templates/interfaces";

import * as auth from "./auth/interfaces";
import * as profile from "./profile/interfaces";
import * as registration from "./registration/interfaces";

import Helpers from "./helpers";
import MailTemplates from "./mail-templates";

import Auth from "./auth"; import AuthEvents from "./auth/events";
import Profile from "./profile"; import ProfileEvents from "./profile/events";
import Registration from "./registration"; import RegistrationEvents from "./registration/events";

/******************************************************************************/

class Common implements interfaces.Instance {

  constructor(
    readonly auth: auth.Instance,
    readonly profile: profile.Instance,
    readonly registration: registration.Instance
  ) { }

}

/******************************************************************************/

export default (

  emitEvent: eventListener.Emit,
  checkThrow: moders.CheckThrow,
  authSignIn: authentication.SignIn,
  sendEmail: mailAgent.SendEmail,
  authPassword: authentication.AuthPassword,
  createHashedPassword: authentication.CreateHashedPassword,
  signedIn: session.SignedIn,
  signOutSession: session.SignOut,
  generateRandomNumber: numbers.GenerateRandomNumber,
  getUserById: storageUser.Instance[ "getById" ],
  updateUserById: storageUser.Instance[ "updateById" ],
  removeUserById: storageUser.Instance[ "removeById" ]

): interfaces.Instance => {

  let helpersInstance = new Helpers( checkThrow );
  let mailTemplatesInstance = new MailTemplates( checkThrow );

  return new Common(

    new Auth(
      new AuthEvents( emitEvent ),
      checkThrow,
      helpersInstance.cleanUsers,
      authSignIn
    ),

    new Profile(
      new ProfileEvents( emitEvent ),
      checkThrow,
      helpersInstance.cleanUsers,
      mailTemplatesInstance.newEmailAddress,
      mailTemplatesInstance.passwordReset,
      sendEmail,
      authPassword,
      createHashedPassword,
      signedIn,
      signOutSession,
      generateRandomNumber,
      getUserById,
      updateUserById,
      removeUserById
    ),

    new Registration(
      new RegistrationEvents( emitEvent ),
      checkThrow,
      getUserById,
      updateUserById
    )

  );

}

/******************************************************************************/
