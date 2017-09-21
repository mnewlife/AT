module Powertel {

  /******************************************************************************/

  import airtime = Airtime;
  import airtimeSale = AirtimeSale;
  import card = Card;
  import cardSale = CardSale;
  import newAirtimeStock = NewAirtimeStock;
  import newCardStock = NewCardStock;

  /******************************************************************************/

  export type ModelRange = airtime.Super | airtimeSale.Super | card.Super
    | cardSale.Super | newAirtimeStock.Super | newCardStock.Super;
  export type ModelArrayRange = airtime.Super[] | airtimeSale.Super[] | card.Super[]
    | cardSale.Super[] | newAirtimeStock.Super[] | newCardStock.Super[];

  /******************************************************************************/


}