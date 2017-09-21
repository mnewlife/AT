module DescLimitFilter {

  import interfaces = DescLimitFilterInterfaces;

  export let getFilter = () => {

    return function (): interfaces.filter {

      return function ( description: string ) {
        if ( description ) {
          return ( description.length < 100 ) ? description : description.substring( 0, 100 ) + "...";
        }
      }

    }

  }

}