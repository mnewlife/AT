
module DialogService {

  import interfaces = DialogServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $mdDialog: ng.material.IDialogService
    ) { }

    /***************************************************/

    public showAlert ( title: string, textContent: string, ev?: MouseEvent, okText?: string ): ng.IPromise<void> {

      let dialog: ng.material.IAlertDialog = this.$mdDialog.alert();
      dialog.parent( angular.element( document.body ) );
      dialog.clickOutsideToClose( true );
      dialog.ariaLabel( "Alert Dialog" );
      dialog.title( title );
      dialog.textContent( textContent );
      if ( ev ) {
        dialog.targetEvent( ev );
      }
      dialog.ok(( okText ) ? okText : "Got It" );

      return this.$mdDialog.show( alert )
        .then(( response: any ) => {

          return this.$q.resolve();

        } );

    }

    /***************************************************/

    public showConfirm ( title: string, textContent: string, ev?: MouseEvent, okText?: string, cancelText?: string ): ng.IPromise<boolean> {

      let dialog: ng.material.IConfirmDialog = this.$mdDialog.confirm();
      dialog.ariaLabel( "Confirm Dialog" );
      dialog.title( title );
      dialog.textContent( textContent );
      if ( ev ) {
        dialog.targetEvent( ev );
      }
      dialog.ok(( okText ) ? okText : "Yes" );
      dialog.cancel(( cancelText ) ? cancelText : "No" );

      return this.$mdDialog.show( dialog )
        .then(( response: any ) => {

          return this.$q.resolve( true );

        } )
        .catch(( reason: any ) => {

          return this.$q.resolve( false );

        } );

    }

    /***************************************************/

    public showPrompt = ( title: string, textContext: string, ev?: MouseEvent, placeholder?: string, okText?: string, cancelText?: string ): ng.IPromise<string> => {

      let prompt: ng.material.IPromptDialog = this.$mdDialog.prompt();
      prompt.title( title );
      prompt.textContent( textContext );
      prompt.ariaLabel( "Prompt Dialog" );

      if ( placeholder ) prompt.placeholder( placeholder );
      if ( ev ) prompt.targetEvent( ev );
      if ( okText ) prompt.ok( okText );
      if ( cancelText ) prompt.cancel( cancelText );

      return this.$mdDialog.show( prompt )
        .then(( result ) => {

          return this.$q.resolve( result );

        } )
        .catch(( reason: any ) => {

          return this.$q.reject( reason );

        } );

    }

    /***************************************************/

  }

}

/*******************************************************************/