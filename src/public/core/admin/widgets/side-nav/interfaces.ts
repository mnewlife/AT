module CoreAdminSideNavWidgetInterfaces {
  
    /*******************************************/
  
    export interface Instance {
      apps: App[];
      locals: Local[];
    }
  
    export interface App {
      href: string;
      icon: string;
      caption: string;
    }

    export interface Local {
      href: string;
      icon: string;
      caption: string;
    }
  
    /*******************************************/
  
  }