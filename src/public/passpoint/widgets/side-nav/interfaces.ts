module SideNavWidgetInterfaces {
  
    /*******************************************/
  
    export interface Instance {
      items: Item[];
    }
  
    export interface Item {
      id: number;
      href: string;
      icon: string;
      caption: string;
    }
  
    /*******************************************/
  
  }