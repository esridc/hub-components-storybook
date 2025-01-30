export const MOCK_STRING_FIELD = {
  name: "category",
  type: "esriFieldTypeString",
};
export const MOCK_NUMERIC_FIELD = {
  name: 'amount',
  type: "esriFieldTypeDouble",
};
export const MOCK_DATE_FIELD = {
  name: 'date',
  type: 'esriFieldTypeDate',
};
export const MOCK_STRING_DOMAIN_CODED_VALUES_FIELD = {
  name: "category",
  type: "esriFieldTypeString",
  domain: {
    type: "codedValue",
    codedValues: [
      {
        name: "category1",
        code: "category1",
      }
    ]
  }
};
export const MOCK_ID_FIELD = {
  name: "guid",
  type: "esriFieldTypeGUID",
};
export const MOCK_FIELDS = [MOCK_STRING_FIELD, MOCK_NUMERIC_FIELD, MOCK_DATE_FIELD];
const handleDeleteExpression = function () { return; };
export const MOCK_UISCHEMA_ELEMENTS_STRING = {
  type: 'Section',
  label: 'Filter',
  options: {
    section: 'block',
    collapsible: false,
    open: true,
    actions: [
      {
        alignment: 'end',
        icon: 'trash',
        key: 'expression-123',
        label: 'Delete filter',
        onClick: handleDeleteExpression.bind({}),
        scale: 's',
        textEnabled: true,
      }
    ]
  },
  elements: [
    {
      type: 'Control',
      scope: '/properties/combobox-expression-123',
      label: 'Select attribute',
      options: {
        control: 'hub-field-input-combobox',
        items: [{ value: 'category', label: 'category', icon: 'string' }],
        allowCustomValues: false,
        selectionMode: 'single',
        overlayPositioning: 'fixed',
      }
    },
    {
      type: 'Control',
      scope: '/properties/select-expression-123',
      label: 'Filter type',
      options: {
        control: 'hub-field-input-select',
        disabled: true,
      }
    },
    {
      type: 'Control',
      scope: '/properties/value-1-expression-123',
      label: 'Filter value',
      options: {
        control: 'hub-field-input-input',
      }
    }
  ]
};
export const MOCK_UISCHEMA_ELEMENTS_DATE = {
  type: 'Section',
  label: 'Filter',
  options: {
    section: 'block',
    collapsible: false,
    open: true,
    actions: [
      {
        alignment: 'end',
        icon: 'trash',
        key: 'expression-123',
        label: 'Delete filter',
        onClick: handleDeleteExpression.bind({}),
        scale: 's',
        textEnabled: true,
      }
    ]
  },
  elements: [
    {
      type: 'Control',
      scope: '/properties/combobox-expression-123',
      label: 'Select attribute',
      options: {
        control: 'hub-field-input-combobox',
        items: [{ value: 'date', label: 'date', icon: 'calendar' }],
        allowCustomValues: false,
        selectionMode: 'single',
        overlayPositioning: 'fixed',
      }
    },
    {
      type: 'Control',
      scope: '/properties/select-expression-123',
      label: 'Filter type',
      options: {
        control: 'hub-field-input-select',
        disabled: true,
      }
    },
    {
      type: 'Control',
      scope: '/properties/value-1-expression-123',
      label: 'Starting date',
      options: {
        control: 'hub-field-input-date',
        overlayPositioning: 'fixed',
      }
    },
    {
      type: 'Control',
      scope: '/properties/value-2-expression-123',
      label: 'Ending date',
      options: {
        control: 'hub-field-input-date',
        overlayPositioning: 'fixed',
      }
    }
  ]
};
export const MOCK_UISCHEMA_ELEMENTS_GUID = {
  type: 'Section',
  label: 'Filter',
  options: {
    section: 'block',
    collapsible: false,
    open: true,
    actions: [
      {
        alignment: 'end',
        icon: 'trash',
        key: 'expression-123',
        label: 'Delete filter',
        onClick: handleDeleteExpression.bind({}),
        scale: 's',
        textEnabled: true,
      }
    ]
  },
  elements: [
    {
      type: 'Control',
      scope: '/properties/combobox-expression-123',
      label: 'Select attribute',
      options: {
        control: 'hub-field-input-combobox',
        items: [{ value: 'guid', label: 'guid', icon: 'fingerprint' }],
        allowCustomValues: false,
        selectionMode: 'single',
        overlayPositioning: 'fixed',
      }
    },
    {
      type: 'Control',
      scope: '/properties/select-expression-123',
      label: 'Filter type',
      options: {
        control: 'hub-field-input-select',
        disabled: true,
      }
    },
    {
      type: 'Control',
      scope: '/properties/value-1-expression-123',
      label: 'Starting value',
      options: {
        control: 'hub-field-input-input',
        type: 'number',
      }
    },
    {
      type: 'Control',
      scope: '/properties/value-2-expression-123',
      label: 'Ending value',
      options: {
        control: 'hub-field-input-input',
        type: 'number'
      }
    }
  ]
};
export const MOCK_UISCHEMA_ELEMENTS_STRING_CV = {
  type: 'Section',
  label: 'Filter',
  options: {
    section: 'block',
    collapsible: false,
    open: true,
    actions: [
      {
        alignment: 'end',
        icon: 'trash',
        key: 'expression-123',
        label: 'Delete filter',
        onClick: handleDeleteExpression.bind({}),
        scale: 's',
        textEnabled: true,
      }
    ]
  },
  elements: [
    {
      type: 'Control',
      scope: '/properties/combobox-expression-123',
      label: 'Select attribute',
      options: {
        control: 'hub-field-input-combobox',
        items: [{ value: 'category', label: 'category', icon: 'string' }],
        allowCustomValues: false,
        selectionMode: 'single',
        overlayPositioning: 'fixed',
      }
    },
    {
      type: 'Control',
      scope: '/properties/select-expression-123',
      label: 'Filter type',
      options: {
        control: 'hub-field-input-select',
        disabled: true,
      }
    },
    {
      type: 'Control',
      scope: '/properties/value-1-expression-123',
      label: 'Filter value',
      options: {
        control: 'hub-field-input-combobox',
        items: [{ label: "category1", value: "category1" }],
        overlayPositioning: "fixed",
        selectionMode: "single",
        allowCustomValues: false,
      }
    }
  ]
};
export const MOCK_UISCHEMA_ELEMENTS_NUMERIC = {
  type: 'Section',
  label: 'Filter',
  options: {
    section: 'block',
    collapsible: false,
    open: true,
    actions: [
      {
        alignment: 'end',
        icon: 'trash',
        key: 'expression-123',
        label: 'Delete filter',
        onClick: handleDeleteExpression.bind({}),
        scale: 's',
        textEnabled: true,
      }
    ]
  },
  elements: [
    {
      type: 'Control',
      scope: '/properties/combobox-expression-123',
      label: 'Select attribute',
      options: {
        control: 'hub-field-input-combobox',
        items: [{ value: 'amount', label: 'amount', icon: 'number' }],
        allowCustomValues: false,
        selectionMode: 'single',
        overlayPositioning: 'fixed',
      }
    },
    {
      type: 'Control',
      scope: '/properties/select-expression-123',
      label: 'Filter type',
      options: {
        control: 'hub-field-input-select',
        disabled: true,
      }
    },
    {
      type: 'Control',
      scope: '/properties/value-1-expression-123',
      label: 'Starting value',
      options: {
        control: 'hub-field-input-input',
        type: 'number',
      }
    },
    {
      type: 'Control',
      scope: '/properties/value-2-expression-123',
      label: 'Ending value',
      options: {
        control: 'hub-field-input-input',
        type: 'number'
      }
    }
  ]
};
export const MOCK_SCHEMA_PROPERTIES_STRING = {
  'combobox-expression-123': {
    type: 'string',
    enum: ['category', '']
  },
  'select-expression-123': {
    type: 'string',
    default: 'Is exactly',
    enum: ['Is exactly']
  },
  'value-1-expression-123': {
    type: 'string'
  },
};
export const MOCK_SCHEMA_PROPERTIES_NUMERIC = {
  'combobox-expression-123': {
    type: 'string',
    enum: ['amount', '']
  },
  'select-expression-123': {
    type: 'string',
    default: 'Between',
    enum: ['Between']
  },
  'value-1-expression-123': {
    type: 'number'
  },
  'value-2-expression-123': {
    type: 'number'
  }
};
export const MOCK_SCHEMA_PROPERTIES_DATE = {
  'combobox-expression-123': {
    type: 'string',
    enum: ['date', '']
  },
  'select-expression-123': {
    type: 'string',
    default: 'Between',
    enum: ['Between']
  },
  'value-1-expression-123': {
    type: 'string'
  },
  'value-2-expression-123': {
    type: 'string'
  }
};
export const MOCK_SCHEMA_PROPERTIES_STRING_VC = {
  'combobox-expression-123': {
    type: 'string',
    enum: ['category', '']
  },
  'select-expression-123': {
    type: 'string',
    default: 'Is exactly',
    enum: ['Is exactly']
  },
  'value-1-expression-123': {
    type: 'string',
  },
};
export const MOCK_SCHEMA_PROPERTIES_ID = {
  'combobox-expression-123': {
    type: 'string',
    enum: ['guid', '']
  },
  'select-expression-123': {
    type: 'string',
    default: 'Between',
    enum: ['Between']
  },
  'value-1-expression-123': {
    type: 'number'
  },
  'value-2-expression-123': {
    type: 'number'
  }
};
export const MOCK_SCHEMA_PROPERTIES_PARTIAL = {
  'combobox-expression-123': {
    type: 'string',
    enum: ['category', '']
  }
};
