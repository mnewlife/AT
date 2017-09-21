module Call263 {

/******************************************************************************/

import airtimePayment = AirtimePayment;
import airtimeTransfer = AirtimeTransfer;
import channel = Channel;

/******************************************************************************/

export type ModelRange = airtimePayment.Super | airtimeTransfer.Super | channel.Super;
export type ModelArrayRange = airtimePayment.Super[] | airtimeTransfer.Super[] | channel.Super[];

/******************************************************************************/


}