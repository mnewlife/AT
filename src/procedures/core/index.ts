/******************************************************************************/

import * as eventListener from "../../event-listener/interfaces";
import * as components from "../../components/interfaces";

import * as interfaces from "./interfaces";
import * as Common from "./common/interfaces";
import common from "./common/";

/******************************************************************************/

class Core implements interfaces.Instance {
  constructor( readonly common: Common.Instance ) { }
}

/******************************************************************************/

export default ( emitEvent: eventListener.Emit, components: components.Instance ): interfaces.Instance => {
  return new Core(
    common(
      emitEvent,
      components.helpers.moders.checkThrow,
      components.authentication.signIn,
      components.communication.mailAgent.sendEmail,
      components.authentication.authPassword,
      components.authentication.createHashedPassword,
      components.session.signedIn,
      components.session.signOut,
      components.helpers.numbers.generateRandomNumber,
      components.storage.core.user.getById,
      components.storage.core.user.update,
      components.storage.core.user.updateById,
      components.storage.core.user.removeById
    )
  );
};

/******************************************************************************/

