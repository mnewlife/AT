/******************************************************************************/

import * as Promise from "bluebird";
import * as mongoose from "mongoose";
import * as bCrypt from "bcrypt-nodejs";

import * as interfaces from "../../../../../../../src/interfaces/index";

/******************************************************************************/

export default (): interfaces.dataModel.AirtimeTransfer[] => {

  return [

    /**************************************************************************/

    {
      userId: mongoose.Types.ObjectId(),
      channelId: mongoose.Types.ObjectId(),
      paymentId: mongoose.Types.ObjectId(),
      transferDetails: {
        identifier: "3456vb5678",
        amount: 4
      },
      paymentRecorded: false
    },

    /**************************************************************************/

    {
      userId: mongoose.Types.ObjectId(),
      channelId: mongoose.Types.ObjectId(),
      paymentId: mongoose.Types.ObjectId(),
      transferDetails: {
        identifier: "3456v8678",
        amount: 20
      },
      paymentRecorded: false
    },

    /**************************************************************************/

    {
      userId: mongoose.Types.ObjectId(),
      channelId: mongoose.Types.ObjectId(),
      paymentId: mongoose.Types.ObjectId(),
      transferDetails: {
        identifier: "3456vb5178",
        amount: 18
      },
      paymentRecorded: true
    },

    /**************************************************************************/

    {
      userId: mongoose.Types.ObjectId(),
      channelId: mongoose.Types.ObjectId(),
      paymentId: mongoose.Types.ObjectId(),
      transferDetails: {
        identifier: "3456vb5078",
        amount: 2
      },
      paymentRecorded: true
    }

    /**************************************************************************/

  ];

}

/******************************************************************************/
