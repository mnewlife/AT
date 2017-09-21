module AboutSideNavWidgetInterfaces {
  
    /*******************************************/
  
    export interface Instance {
      items: Item[];
      services: Item[];
    }
  
    export interface Item {
      href: string;
      icon: string;
      caption: string;
    }
  
    /*******************************************/
  
  }