import { IField } from "@esri/arcgis-rest-feature-layer";
export declare const MOCK_STRING_FIELD: IField;
export declare const MOCK_NUMERIC_FIELD: IField;
export declare const MOCK_DATE_FIELD: IField;
export declare const MOCK_STRING_DOMAIN_CODED_VALUES_FIELD: IField;
export declare const MOCK_ID_FIELD: IField;
export declare const MOCK_FIELDS: IField[];
export declare const MOCK_UISCHEMA_ELEMENTS_STRING: {
  type: string;
  label: string;
  options: {
    section: string;
    collapsible: boolean;
    open: boolean;
    actions: {
      alignment: string;
      icon: string;
      key: string;
      label: string;
      onClick: any;
      scale: string;
      textEnabled: boolean;
    }[];
  };
  elements: ({
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      items: {
        value: string;
        label: string;
        icon: string;
      }[];
      allowCustomValues: boolean;
      selectionMode: string;
      overlayPositioning: string;
      disabled?: undefined;
    };
  } | {
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      disabled: boolean;
      items?: undefined;
      allowCustomValues?: undefined;
      selectionMode?: undefined;
      overlayPositioning?: undefined;
    };
  } | {
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      items?: undefined;
      allowCustomValues?: undefined;
      selectionMode?: undefined;
      overlayPositioning?: undefined;
      disabled?: undefined;
    };
  })[];
};
export declare const MOCK_UISCHEMA_ELEMENTS_DATE: {
  type: string;
  label: string;
  options: {
    section: string;
    collapsible: boolean;
    open: boolean;
    actions: {
      alignment: string;
      icon: string;
      key: string;
      label: string;
      onClick: any;
      scale: string;
      textEnabled: boolean;
    }[];
  };
  elements: ({
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      items: {
        value: string;
        label: string;
        icon: string;
      }[];
      allowCustomValues: boolean;
      selectionMode: string;
      overlayPositioning: string;
      disabled?: undefined;
    };
  } | {
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      disabled: boolean;
      items?: undefined;
      allowCustomValues?: undefined;
      selectionMode?: undefined;
      overlayPositioning?: undefined;
    };
  } | {
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      overlayPositioning: string;
      items?: undefined;
      allowCustomValues?: undefined;
      selectionMode?: undefined;
      disabled?: undefined;
    };
  })[];
};
export declare const MOCK_UISCHEMA_ELEMENTS_GUID: {
  type: string;
  label: string;
  options: {
    section: string;
    collapsible: boolean;
    open: boolean;
    actions: {
      alignment: string;
      icon: string;
      key: string;
      label: string;
      onClick: any;
      scale: string;
      textEnabled: boolean;
    }[];
  };
  elements: ({
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      items: {
        value: string;
        label: string;
        icon: string;
      }[];
      allowCustomValues: boolean;
      selectionMode: string;
      overlayPositioning: string;
      disabled?: undefined;
      type?: undefined;
    };
  } | {
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      disabled: boolean;
      items?: undefined;
      allowCustomValues?: undefined;
      selectionMode?: undefined;
      overlayPositioning?: undefined;
      type?: undefined;
    };
  } | {
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      type: string;
      items?: undefined;
      allowCustomValues?: undefined;
      selectionMode?: undefined;
      overlayPositioning?: undefined;
      disabled?: undefined;
    };
  })[];
};
export declare const MOCK_UISCHEMA_ELEMENTS_STRING_CV: {
  type: string;
  label: string;
  options: {
    section: string;
    collapsible: boolean;
    open: boolean;
    actions: {
      alignment: string;
      icon: string;
      key: string;
      label: string;
      onClick: any;
      scale: string;
      textEnabled: boolean;
    }[];
  };
  elements: ({
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      items: {
        value: string;
        label: string;
        icon: string;
      }[];
      allowCustomValues: boolean;
      selectionMode: string;
      overlayPositioning: string;
      disabled?: undefined;
    };
  } | {
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      disabled: boolean;
      items?: undefined;
      allowCustomValues?: undefined;
      selectionMode?: undefined;
      overlayPositioning?: undefined;
    };
  } | {
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      items: {
        label: string;
        value: string;
      }[];
      overlayPositioning: string;
      selectionMode: string;
      allowCustomValues: boolean;
      disabled?: undefined;
    };
  })[];
};
export declare const MOCK_UISCHEMA_ELEMENTS_NUMERIC: {
  type: string;
  label: string;
  options: {
    section: string;
    collapsible: boolean;
    open: boolean;
    actions: {
      alignment: string;
      icon: string;
      key: string;
      label: string;
      onClick: any;
      scale: string;
      textEnabled: boolean;
    }[];
  };
  elements: ({
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      items: {
        value: string;
        label: string;
        icon: string;
      }[];
      allowCustomValues: boolean;
      selectionMode: string;
      overlayPositioning: string;
      disabled?: undefined;
      type?: undefined;
    };
  } | {
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      disabled: boolean;
      items?: undefined;
      allowCustomValues?: undefined;
      selectionMode?: undefined;
      overlayPositioning?: undefined;
      type?: undefined;
    };
  } | {
    type: string;
    scope: string;
    label: string;
    options: {
      control: string;
      type: string;
      items?: undefined;
      allowCustomValues?: undefined;
      selectionMode?: undefined;
      overlayPositioning?: undefined;
      disabled?: undefined;
    };
  })[];
};
export declare const MOCK_SCHEMA_PROPERTIES_STRING: {
  'combobox-expression-123': {
    type: string;
    enum: string[];
  };
  'select-expression-123': {
    type: string;
    default: string;
    enum: string[];
  };
  'value-1-expression-123': {
    type: string;
  };
};
export declare const MOCK_SCHEMA_PROPERTIES_NUMERIC: {
  'combobox-expression-123': {
    type: string;
    enum: string[];
  };
  'select-expression-123': {
    type: string;
    default: string;
    enum: string[];
  };
  'value-1-expression-123': {
    type: string;
  };
  'value-2-expression-123': {
    type: string;
  };
};
export declare const MOCK_SCHEMA_PROPERTIES_DATE: {
  'combobox-expression-123': {
    type: string;
    enum: string[];
  };
  'select-expression-123': {
    type: string;
    default: string;
    enum: string[];
  };
  'value-1-expression-123': {
    type: string;
  };
  'value-2-expression-123': {
    type: string;
  };
};
export declare const MOCK_SCHEMA_PROPERTIES_STRING_VC: {
  'combobox-expression-123': {
    type: string;
    enum: string[];
  };
  'select-expression-123': {
    type: string;
    default: string;
    enum: string[];
  };
  'value-1-expression-123': {
    type: string;
  };
};
export declare const MOCK_SCHEMA_PROPERTIES_ID: {
  'combobox-expression-123': {
    type: string;
    enum: string[];
  };
  'select-expression-123': {
    type: string;
    default: string;
    enum: string[];
  };
  'value-1-expression-123': {
    type: string;
  };
  'value-2-expression-123': {
    type: string;
  };
};
export declare const MOCK_SCHEMA_PROPERTIES_PARTIAL: {
  'combobox-expression-123': {
    type: string;
    enum: string[];
  };
};
