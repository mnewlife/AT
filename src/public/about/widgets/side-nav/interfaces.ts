module AboutSideNavWidgetInterfaces {
  
    /*******************************************/
  
    export interface Instance {
      items: Item[];
      services: Item[];
    }
  
    export interface Item {
      id: number;
      href: string;
      icon: string;
      caption: string;
    }
  
    /*******************************************/
  
  }