import { IUiSchemaElement } from '@esri/hub-common';
import { JSONSchema } from '../../../resources';
export declare const BASIC_SCHEMA: JSONSchema;
export declare const KEYWORD_SCHEMA: JSONSchema;
export declare const COLOR_PICKER_UI_SCHEMA: {
  type: string;
  options: {
    control: string;
  };
};
export declare const UI_SCHEMA_WITH_HELPER_TEXT: IUiSchemaElement;
export declare const UI_SCHEMA_WITH_TOOLTIP: IUiSchemaElement;
export declare const UI_SCHEMA_WITH_INLINE_LAYOUT: IUiSchemaElement;
export declare const UI_SCHEMA_WITH_ERRORS_AND_SUCCESS: IUiSchemaElement;
export declare const MOCK_COLLECTIONS: ({
  label: string;
  key: string;
  targetEntity: string;
  include: any[];
  scope: {
    targetEntity: string;
    filters: {
      operation: string;
      predicates: ({
        type: {
          any: string[];
          not: string[];
        };
        typekeywords: {
          not: string[];
        };
      } | {
        type: string;
        typekeywords: string;
      })[];
    }[];
  };
} | {
  label: string;
  key: string;
  targetEntity: string;
  include: any[];
  scope: {
    targetEntity: string;
    filters: {
      predicates: {
        type: string;
      }[];
    }[];
  };
})[];
export declare const MOCK_CATALOGS: ({
  schemaVersion: number;
  title: string;
  scopes: {
    item: {
      targetEntity: string;
      filters: {
        predicates: {
          owner: string;
        }[];
      }[];
    };
  };
  collections: ({
    label: string;
    key: string;
    targetEntity: string;
    include: any[];
    scope: {
      targetEntity: string;
      filters: {
        operation: string;
        predicates: ({
          type: {
            any: string[];
            not: string[];
          };
          typekeywords: {
            not: string[];
          };
        } | {
          type: string;
          typekeywords: string;
        })[];
      }[];
    };
  } | {
    label: string;
    key: string;
    targetEntity: string;
    include: any[];
    scope: {
      targetEntity: string;
      filters: {
        predicates: {
          type: string;
        }[];
      }[];
    };
  })[];
} | {
  schemaVersion: number;
  title: string;
  scopes: {
    item: {
      targetEntity: string;
      filters: {
        predicates: {
          access: string;
        }[];
      }[];
    };
  };
  collections: ({
    label: string;
    key: string;
    targetEntity: string;
    include: any[];
    scope: {
      targetEntity: string;
      filters: {
        operation: string;
        predicates: ({
          type: {
            any: string[];
            not: string[];
          };
          typekeywords: {
            not: string[];
          };
        } | {
          type: string;
          typekeywords: string;
        })[];
      }[];
    };
  } | {
    label: string;
    key: string;
    targetEntity: string;
    include: any[];
    scope: {
      targetEntity: string;
      filters: {
        predicates: {
          type: string;
        }[];
      }[];
    };
  })[];
})[];
export declare const MOCK_FACETS: ({
  label: string;
  key: string;
  display: string;
  operation: string;
  options: ({
    label: string;
    key: string;
    selected: boolean;
    predicates: {
      access: string;
    }[];
  } | {
    label: string;
    key: string;
    selected: boolean;
    predicates: {
      owner: string;
    }[];
  })[];
  pageSize?: undefined;
} | {
  label: string;
  key: string;
  display: string;
  pageSize: number;
  operation: string;
  options: ({
    label: string;
    key: string;
    selected: boolean;
    predicates: {
      type: string;
    }[];
  } | {
    label: string;
    key: string;
    selected: boolean;
    predicates: {
      type: string[];
    }[];
  } | {
    label: string;
    key: string;
    selected: boolean;
    predicates: {
      typekeywords: {
        any: string[];
        not: string[];
      };
      type: {
        any: string[];
        not: string[];
      };
    }[];
  })[];
})[];
