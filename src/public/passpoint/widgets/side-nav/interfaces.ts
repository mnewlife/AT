module SideNavWidgetInterfaces {
  
    /*******************************************/
  
    export interface Instance {
      items: Item[];
    }
  
    export interface Item {
      href: string;
      icon: string;
      caption: string;
    }
  
    /*******************************************/
  
  }