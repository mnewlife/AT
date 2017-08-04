/******************************************************************************/

import * as mongoose from "mongoose";
import * as interfaces from "../../interfaces/index";
import * as modelParams from "./model-params";
import * as implementations from "./implementations";

/******************************************************************************/

export { modelParams, implementations };

/******************************************************************************/

export interface DataModel { }

export type AccessLevel = "admin" | "developer" | "consumer";

export interface User extends DataModel {
  emailAddress: string;
  password: string;
  accessLevel: AccessLevel;
  resetCode?: string;

  verification: {
    verified: boolean;
    verificationCode?: string;
    numVerAttempts: number;
  };

  personalDetails?: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    age: number;
    gender: "Male" | "Female";
  };

  contactDetails?: {
    phoneNumbers: string[];
  };

  residentialDetails?: {
    country: string;
    province: string;
    address: string;
  };

  activeApps: string[];
}

export interface Happening {
  context: string;
  identifier: string;
  tags: string[];
  data: any;
}

export interface Event extends Happening, DataModel {
}

export type ProgressionSubject = "Signups" | "Orders";

export interface ProgressionTimeMeasure {
  identifier: string;
  label: string;
}

export interface ProgressionAmounts {
  additions: number;
  subtractions: number;
  endAmount: number;
}

export interface Progression extends DataModel {
  userId: mongoose.Types.ObjectId;
  subject: ProgressionSubject;
  timeMeasure: ProgressionTimeMeasure;
  amounts: ProgressionAmounts;
}

export type NotificationType = "security";

export interface Notification extends DataModel {
  userId: mongoose.Types.ObjectId;
  app: interfaces.AppName;
  type: NotificationType;
  label: string;
  seen: boolean;
  cleared: boolean;
}

export type Invitee = {
  userId?: mongoose.Types.ObjectId;
  emailAddress: string;
  converted: boolean;
};

export interface Invitation extends DataModel {
  inviterId: mongoose.Types.ObjectId;
  app: interfaces.AppName;
  invitees: Invitee[];
}

export interface Subscription extends DataModel {
  userId: mongoose.Types.ObjectId;
  subscription: string;
}

/******************************************************************************/
/******************************************************************************/

export interface Shop extends DataModel {
  shopName: string;
  images?: string[];
  numProducts: number;
}

export interface PriceValue {
  shopId: mongoose.Types.ObjectId;
  price: number;
};

export interface PriceValues {
  min?: PriceValue;
  max?: PriceValue;
  median?: PriceValue;
  mean?: PriceValue;
};

export interface Product extends DataModel {
  label: string;
  images?: string[];
  priceValues: PriceValues;
  effectivePrice: PriceValue
}

export interface Price extends DataModel {
  productId: mongoose.Types.ObjectId;
  shopId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface RoundDuration {
  start?: Date;
  end?: Date;
  span?: string;
}

export interface Round extends DataModel {
  roundName: string;
  inProgress: boolean;
  duration: RoundDuration;
  deliveryFee?: number;
  numContributions: number;
  totalValueContributions: number;
  numContributors: number;
  numDeliveryFees: number;
  totalDeliveryFees: number;
  numTracks: number;
  totalValueCartProducts: number;
}

type Deviation = {
  type: "Addition" | "Subtraction";
  productId: mongoose.Types.ObjectId;
};

export type TrackMetaData = {
  trackId: mongoose.Types.ObjectId;
  deviations?: Deviation[];
};

export interface RoundContributor extends DataModel {
  roundId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  numContributions: number;
  totalValueContributions: number;
  contributionsDue: number;
  tracks?: TrackMetaData[];
  numCartProducts: number;
  costCart: number;
  deliveryFeesPaid: number;
}

export type InstallmentValue = {
  value: number;
  interval: string;
};

export interface Track extends DataModel {
  roundId: mongoose.Types.ObjectId;
  trackName: string;
  contributionValue: number;
  installmentValues?: InstallmentValue[];
  adminFeePercentage?: number;
  numProducts: number;
  costProducts: number;
  numShops: number;
  shops: string[];
}

export interface TrackProduct extends DataModel {
  trackId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface ContributionPaymentDetails {
  identifier?: string;
  amount: number;
  method: string;
}

export interface Contribution extends DataModel {
  userId: mongoose.Types.ObjectId;
  roundId: mongoose.Types.ObjectId;
  payment: ContributionPaymentDetails;
}

export interface DeliveryFeePaymentDetails {
  identifier?: string;
  amount: number;
  method: string;
}

export interface DeliveryFee extends DataModel {
  userId: mongoose.Types.ObjectId;
  roundId: mongoose.Types.ObjectId;
  payment: DeliveryFeePaymentDetails;
}

export interface Cart extends DataModel {
  userId: mongoose.Types.ObjectId;
  roundId: mongoose.Types.ObjectId;
  adminFeePercentage: number;
  numProducts: number;
  costProducts: number;
}

export interface CartProductDetails {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface CartProduct extends DataModel {
  userId: mongoose.Types.ObjectId;
  roundId: mongoose.Types.ObjectId;
  cartId: mongoose.Types.ObjectId;
  product: CartProductDetails;
}

export interface Disbursement extends DataModel {
  userId: mongoose.Types.ObjectId;
  roundId: mongoose.Types.ObjectId;
  complete: boolean;
}

export interface Article extends DataModel {
  userId: mongoose.Types.ObjectId;
  title: string;
  images: string[];
  tags: string[];
  content: string;
}

/******************************************************************************/

export interface ChannelDetails {
  code: string;
  phoneNumber: string;
  password: string;
}

export interface Channel extends DataModel {
  allocated: boolean;
  allocatedTo?: mongoose.Types.ObjectId;
  channelDetails: ChannelDetails;
}

export interface TransactionDetails {
  identifier?: string;
  amount: number;
  method: string;
};

export interface Payment extends DataModel {
  userId: mongoose.Types.ObjectId;
  channelId: mongoose.Types.ObjectId;
  transactionDetails: TransactionDetails;
  transferDone: boolean;
}

export interface TransferDetails {
  identifier?: string;
  amount: number;
}

export interface AirtimeTransfer extends DataModel {
  userId: mongoose.Types.ObjectId;
  channelId: mongoose.Types.ObjectId;
  paymentId: mongoose.Types.ObjectId;
  transferDetails: TransferDetails;
  paymentRecorded: boolean;
}

export interface CallDetails {
  duration: number;
}

export interface Call extends DataModel {
  callerId: mongoose.Types.ObjectId;
  channelId: mongoose.Types.ObjectId;
  calleeId?: mongoose.Types.ObjectId;
  callDetails?: CallDetails;
}

/******************************************************************************/
