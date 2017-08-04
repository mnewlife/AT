/******************************************************************************/

import * as interfaces from "../../interfaces";

import developerFactory from "./developer";
import adminFactory from "./admin";
import logisticsFactory from "./logistics";
import salesRepFactory from "./sales-rep";

/******************************************************************************/

class Core implements interfaces.components.Core {

  readonly developer: interfaces.components.core.Developer;
  readonly admin: interfaces.components.core.Admin;
  readonly logistics: interfaces.components.core.Logistics;
  readonly salesRep: interfaces.components.core.SalesRep;

  constructor( params: {
    developer: interfaces.components.core.Developer,
    admin: interfaces.components.core.Admin
    logistics: interfaces.components.core.Logistics
    salesRep: interfaces.components.core.SalesRep
  } ) {
    this.developer = params.developer;
    this.admin = params.admin;
    this.logistics = params.logistics;
    this.salesRep = params.salesRep;
  }

}

/******************************************************************************/

export default ( config: interfaces.Config ): interfaces.components.Core => {
  return new Core( {
    developer: developerFactory( config ),
    admin: adminFactory( config ),
    logistics: logisticsFactory( config ),
    salesRep: salesRepFactory( config )
  } );
};

/******************************************************************************/
