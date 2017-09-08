/******************************************************************************/

import * as airtimePayment from "./airtime-payment";
import * as airtimeTransfer from "./airtime-transfer";
import * as channel from "./channel";

/******************************************************************************/

export { airtimePayment, airtimeTransfer, channel };

/******************************************************************************/

export interface Instance {
  readonly airtimePayment: airtimePayment.Instance;
  readonly airtimeTransfer: airtimeTransfer.Instance;
  readonly channel: channel.Instance;
}

/******************************************************************************/