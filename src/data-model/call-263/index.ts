/******************************************************************************/

import * as airtimeTransfer from "./airtime-transfer";
import * as airtimePayment from "./airtime-payment";
import * as channel from "./channel";

/******************************************************************************/

export { airtimeTransfer, airtimePayment, channel };

/******************************************************************************/

export type ModelRange = airtimePayment.Super | airtimeTransfer.Super | channel.Super;
export type ModelArrayRange = airtimePayment.Super[] | airtimeTransfer.Super[] | channel.Super[];

/******************************************************************************/
