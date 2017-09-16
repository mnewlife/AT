
module ToastService {

  import interfaces = ToastServiceInterfaces;

  export class Service implements interfaces.Instance {

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $mdToast: ng.material.IToastService
    ) { }

    /***************************************************/

    public showSimple = ( message: string ): ng.IPromise<void> => {

      return this.$q<void>(( resolve, reject ) => {

        let simpleToast = this.$mdToast.simple()
          .textContent(( message ) ? message : "" )
          .hideDelay( 3000 );

        this.$mdToast.show( simpleToast )
          .then(( response: any ) => {

            resolve();

          } );

      } );

    }

    /***************************************************/

    public showWithAction = ( message: string, action: string ): ng.IPromise<boolean> => {

      return this.$q(( resolve, reject ) => {

        let toast = this.$mdToast.simple()
          .textContent( message )
          .action( action )
          .highlightAction( false );

        this.$mdToast.show( toast )
          .then(( response: any ) => {

            if ( response == "ok" ) {
              return resolve( true );
            } else {
              return resolve( false );
            }

          } );

      } );

    }

    /***************************************************/

  }

}

/*******************************************************************/