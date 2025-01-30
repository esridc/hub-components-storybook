import { UiSchemaRuleEffects } from "@esri/hub-common";
import { esriGeometryType } from "../../../../../../../utils/geometry";
import { getIconForFieldType } from "../../../../../../../utils/feature-service";
export const getSchema = (options) => {
  const { layers, fields, aggregations } = options;
  const getDynamicEnum = (values = [], allowEmptyString = false) => {
    if (allowEmptyString) {
      values.push('');
    }
    // TODO: passing in a dynamic default should re-emit configuration editor values?
    return values.length ? { enum: values } : {};
  };
  return {
    required: [],
    type: 'object',
    properties: {
      itemId: {
        type: 'array',
        maxItems: 1,
      },
      layerId: Object.assign({ type: 'string' }, getDynamicEnum(layers)),
      field: Object.assign({ type: 'string' }, getDynamicEnum(fields, true)),
      statistic: {
        type: 'string',
        enum: aggregations,
      },
      allowExpressionSet: {
        type: 'boolean',
        default: false,
      },
      expressionSet: {
        type: 'array',
      }
    }
  };
};
const SHOW_FOR_ITEM_ID = {
  condition: {
    schema: {
      type: 'object',
      properties: {
        itemId: { not: { const: [] } },
      },
    },
  },
  effect: UiSchemaRuleEffects.SHOW,
};
const SHOW_FOR_ITEM_ID_AND_LAYER_ID = {
  condition: {
    schema: {
      type: 'object',
      properties: {
        itemId: { not: { const: [] } },
        layerId: { not: { const: '' } }
      }
    }
  },
  effect: UiSchemaRuleEffects.SHOW,
};
const SHOW_FOR_ITEM_ID_AND_LAYER_ID_AND_FIELD = {
  condition: {
    schema: {
      type: 'object',
      properties: {
        itemId: { not: { const: [] } },
        layerId: { not: { const: '' } },
        field: { not: { const: '' } }
      }
    }
  },
  effect: UiSchemaRuleEffects.SHOW,
};
export function getUiSchema(options) {
  const { catalogs = [], facets = [], layers, fields, aggregations } = options;
  return {
    type: 'Layout',
    elements: [
      {
        scope: '/properties/itemId',
        type: 'Control',
        options: {
          control: "hub-field-input-gallery-picker",
          targetEntity: 'item',
          catalogs,
          facets,
          styles: {
            '--twShadowNew': 'none'
          },
        }
      },
      {
        labelKey: 'layer',
        scope: '/properties/layerId',
        type: 'Control',
        rule: SHOW_FOR_ITEM_ID,
        options: {
          control: 'hub-field-input-tile-select',
          labels: layers.map(layer => layer.name),
          descriptions: layers.map(layer => esriGeometryType(layer.geometryType)),
          styles: {
            '--maxHeight': '20vh',
          }
        }
      },
      {
        labelKey: 'field.label',
        scope: '/properties/field',
        type: 'Control',
        rule: SHOW_FOR_ITEM_ID_AND_LAYER_ID,
        options: {
          control: 'hub-field-input-combobox',
          selectionMode: 'single',
          items: fields.map(field => { return { icon: getIconForFieldType(field.type), label: field.name, value: field.name }; }),
          styles: {
            '--maxHeight': '20vh',
          }
        },
      },
      {
        labelKey: 'statistic.label',
        scope: '/properties/statistic',
        type: 'Control',
        rule: SHOW_FOR_ITEM_ID_AND_LAYER_ID_AND_FIELD,
        options: {
          control: 'hub-field-input-select',
          labels: aggregations,
        }
      },
      {
        type: "Section",
        scope: "/properties/allowExpressionSet",
        labelKey: 'expression.label',
        rule: SHOW_FOR_ITEM_ID_AND_LAYER_ID_AND_FIELD,
        options: {
          section: "subblock",
          scale: "m",
          toggleDisplay: "switch"
        },
        elements: [
          {
            scope: '/properties/expressionSet',
            rule: SHOW_FOR_ITEM_ID_AND_LAYER_ID_AND_FIELD,
            type: 'Control',
            options: {
              fields,
              control: 'hub-composite-input-expression-set',
            }
          }
        ]
      }
    ]
  };
}
