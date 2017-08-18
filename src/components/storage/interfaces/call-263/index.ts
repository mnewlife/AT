/******************************************************************************/

import * as airtimePayment from "./airtime-payment";
import * as airtimeTransfer from "./airtime-transfer";
import * as channel from "./channel";

/******************************************************************************/

export { airtimePayment, airtimeTransfer, channel };

/******************************************************************************/

export interface ClassInstance {
  readonly airtimePayment: airtimePayment.ClassInstance;
  readonly airtimeTransfer: airtimeTransfer.ClassInstance;
  readonly channel: channel.ClassInstance;
}

/******************************************************************************/