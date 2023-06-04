export interface actionProps {
    type: 'adicionar' | 'editar' | 'deletar';
    label?: string;
    endpoint?: string;
    axios?: AxiosInstance;
    action?: (e?: any) => void;
    selectable?: boolean;
    selectableAll?: boolean;
  }
  
  export interface actionCreateEditProps {
    type: 'save' | 'save&new' | 'cancell';
    label?: string;
    endpoint?: string;
    axios?: AxiosInstance;
    action?: (e?: any) => void;
  }
  
  export interface customActionProps {
    label: string;
    action?: () => void;
    endpoint?: string;
    axios?: AxiosInstance;
    selectable?: boolean;
    selectableAll?: boolean;
  }
  
  export interface metaDataProps {
    title: string;
    keepFilters?: boolean;
    concatFilters?: boolean;
    actions?: actionProps[];
    customActions?: customActionProps[];
    fields: fieldsProps[];
    endpoint?: string;
  }
  
  export interface metaDataCreateEditProps {
    title: string;
    actions?: actionCreateEditProps[];
    fields: fieldsProps[];
    endpoint?: string;
  }
  
  export interface fieldsProps extends gridColumnsProps {
    key?: boolean;
    initValue?: any;
    label: string;
    property: string;
    type?: typeProps;
    field?: metaDataProps[];
    filter?: boolean;
    search?: boolean;
    visible?: boolean;
    required?: boolean;
    optional?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    errorMessage?: string;
    order?: number;
    minLength?: number;
    maxLength?: number;
    format?: string;
    icon?: string;
    maskFormatModel?: string;
    mask?: string;
    options?: optionsProps[];
    optionsMulti?: boolean;
    sort?: boolean;
    sortable?: boolean;
    directionSort?: 'asc' | 'desc';
    disabled: boolean;
    endpoint?: string;
    propertyDTO?: string;
    propertyBy?: string;
  }
  export interface optionsProps extends gridColumnsProps {
    label: string;
    value: any;
  }
  interface gridColumnsProps {
    gridColumns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    gridColumnsSm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    gridColumnsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    gridColumnsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    gridColumnsXl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    'gridColumnsSm-mobile'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    'gridColumnsMd-mobile'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    'gridColumnsLg-mobile'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    'gridColumnsXl-mobile'?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    gridColumnsTablet?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  }
  //| "tel" | "url" | "file" | "image" | "color" | "range" | "time" | "datetime-local";
  
  export type typeProps =
    | 'text'
    | 'number'
    | 'date'
    | 'time'
    | 'datetime'
    | 'boolean'
    | 'currency'
    | 'label'
    | 'list';
  