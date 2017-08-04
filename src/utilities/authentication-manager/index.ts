/******************************************************************************/

import * as interfaces from "../../interfaces/index";

import basicAuthenticationManagerFactory from "./basic/index";

/******************************************************************************/

export default ( config : interfaces.Config ) : interfaces.utilities.AuthenticationManager => {

  return basicAuthenticationManagerFactory( config );

}

/******************************************************************************/
