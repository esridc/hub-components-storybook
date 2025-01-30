import { withRenderCallback } from '../../../.storybook/decorators/withRenderCallback.js';
import { withCenteredLayout } from '../../../.storybook/decorators/withCenteredLayout';
export default {
  title: 'Metadata/Attributes List',
  component: 'arcgis-hub-attributes-list',
  decorators: [
    withRenderCallback('arcgis-hub-attributes-list', ($el, { args }) => {
      if ($el) {
        Object.assign($el, args);
      }
    }),
    withCenteredLayout('30%')
  ]
};
const content = {
  layers: [
    {
      fields: [
        {
          name: 'X',
          type: 'esriFieldTypeDouble',
          actualType: 'float',
          alias: 'X',
          sqlType: 'sqlTypeFloat',
          nullable: true,
          editable: true,
          domain: null,
          defaultValue: null,
          description: '{"value":"/","fieldValueType":"coordinate"}',
        },
        {
          name: 'corner',
          type: 'esriFieldTypeString',
          actualType: 'nvarchar',
          alias: 'corner',
          sqlType: 'sqlTypeNVarchar',
          length: 4000,
          nullable: true,
          editable: true,
          domain: null,
          defaultValue: null,
        },
      ],
    },
  ],
  layer: {
    fields: [
      {
        name: 'X',
        type: 'esriFieldTypeDouble',
        actualType: 'float',
        alias: 'X',
        sqlType: 'sqlTypeFloat',
        nullable: true,
        editable: true,
        domain: null,
        defaultValue: null,
        description: '{"value":"/","fieldValueType":"coordinate"}',
      },
      {
        name: 'corner',
        type: 'esriFieldTypeString',
        actualType: 'nvarchar',
        alias: 'corner',
        sqlType: 'sqlTypeNVarchar',
        length: 4000,
        nullable: true,
        editable: true,
        domain: null,
        defaultValue: null,
      },
    ],
  },
};
const fields = [
  {
    name: 'X',
    type: 'esriFieldTypeDouble',
    actualType: 'float',
    alias: 'X',
    sqlType: 'sqlTypeFloat',
    nullable: true,
    editable: true,
    domain: null,
    defaultValue: null,
    simpleType: 'numeric',
    icon: 'calcite-ui-number',
    description: '',
    i18nType: 'Number',
    chartable: true,
  },
  {
    name: 'corner',
    type: 'esriFieldTypeString',
    actualType: 'nvarchar',
    alias: 'corner',
    sqlType: 'sqlTypeNVarchar',
    length: 4000,
    nullable: true,
    editable: true,
    domain: null,
    defaultValue: null,
    simpleType: 'string',
    icon: 'calcite-ui-string',
    description: '',
    i18nType: 'Text',
    chartable: false,
  },
];
const defaultArgs = {
  content,
  fields
};
export const Default = (args) => `
  <arcgis-hub-attributes-list>
    ${args.fields.map((field) => `
        <div slot="${field.name}-chart" style="display:flex;background:#eee;border:1px solid #333;min-height:100px;justify-content:center;align-items:center;">${field.name} Chart</div>
        <div slot="${field.name}-table" style="display:flex;background:#eee;border:1px solid #333;min-height:100px;justify-content:center;align-items:center;">${field.name} Table</div>
      `).join('')}
  </arcgis-hub-attributes-list>
`;
Default.args = Object.assign({}, defaultArgs);
Default.storyName = 'Attributes List';
