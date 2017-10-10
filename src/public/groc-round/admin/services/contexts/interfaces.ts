module GrocRoundAdminContextsServiceInterfaces {

  /*******************************************/

  import user = User;

  /*******************************************/

  export interface Instance {
    innerContext: string;
    currentUser: user.Super;
    checked: boolean;
  }

  /*

  join round ( contexts [ user, round ] ) // add rc

  ADD EDIT
  round
  track
  track-product
  cart-product

  contribution
  delivery fee

  shops -> shop
  products -> product

  //U round contributors -> rc
  //U contributions / delivery fees

  rounds -> round -> round contributors ( round, user ) -> rc
  tracks -> track -> track products ( track )

  [ rc -> contributions ]
  [ rc -> delivery fees ]

  carts -> cart -> cart products ( cart )

  contributions ( round, user )
  delivery fees ( round, user )
  
  */

  /*******************************************/

}
