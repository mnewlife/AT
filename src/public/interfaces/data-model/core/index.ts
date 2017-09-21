module Core {

  /******************************************************************************/

  import event = Event;
  import subscription = Subscription;
  import user = User;

  /******************************************************************************/

  export type ModelRange = event.Super | subscription.Super | user.Super;
  export type ModelArrayRange = event.Super[] | subscription.Super[] | user.Super[];

  /******************************************************************************/

}