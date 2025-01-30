import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { S as SHOW_FOR_STATIC_RULE_ENTITY, a as SHOW_FOR_STATIC_AND_STRING_RULE_ENTITY, b as SHOW_FOR_STATIC_AND_NUMBER_RULE_ENTITY, c as SHOW_FOR_STATIC_AND_DATE_RULE_ENTITY, d as SHOW_FOR_DYNAMIC_RULE_ENTITY } from './rules-f732bdba.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';
import './InitiativeSchema-4fb31f85.js';
import './SiteSchema-3e282ce1.js';
import './DiscussionSchema-6e5016d0.js';
import './PageSchema-4cbe3bd9.js';
import './ContentSchema-d913d8e9.js';
import './TemplateSchema-83e65297.js';
import './GroupSchema-13ff9290.js';
import './InitiativeTemplateSchema-bf5d8531.js';
import './SurveySchema-0fcb1d64.js';
import './EventSchemaCreate-2f6ba245.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './types-db540898.js';
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';

/**
 * @private
 * constructs the uiSchema for initiative metrics.
 * This defines how the MetricSchema properties
 * should render when creating/editing initiative
 * metrics
 *
 * @param i18nScope
 * @param config
 * @param context
 * @returns
 */
const buildUiSchema = async (i18nScope, config, context) => {
    return {
        type: "Layout",
        elements: [
            {
                type: "Notice",
                options: {
                    notice: {
                        id: "metric-editor-preview-notice",
                        title: "{{shared.notices.metrics.preview.label:translate}}",
                        message: "{{shared.notices.metrics.preview.message:translate}}",
                        configuration: {
                            noticeType: "notice",
                            icon: true,
                            kind: "info",
                            closable: false,
                            scale: "s",
                        },
                    },
                },
            },
            {
                type: "Section",
                labelKey: "shared.sections.metrics.basic.label",
                elements: [
                    {
                        labelKey: "shared.fields.metrics.cardTitle.label",
                        scope: "/properties/_metric/properties/cardTitle",
                        type: "Control",
                        options: {
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    labelKey: "shared.fields.metrics.cardTitle.message.required",
                                    icon: true,
                                },
                            ],
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: "shared.sections.metrics.source.label",
                elements: [
                    {
                        labelKey: "shared.fields.metrics.type.label",
                        scope: "/properties/_metric/properties/type",
                        type: "Control",
                        options: {
                            control: "hub-field-input-tile-select",
                            rules: [
                                [],
                                [],
                                [
                                    {
                                        effect: UiSchemaRuleEffects.SHOW,
                                        conditions: [
                                            // commented out for now, as itemQuery was a prototyped fearure that was not implemented.
                                            // will be replaced with requestings metrics in the near future
                                            // checkPermission("hub:availability:alpha", context).access,
                                            false,
                                        ],
                                    },
                                ],
                            ],
                            enum: {
                                i18nScope: "shared.fields.metrics.type.enum",
                            },
                        },
                    },
                    {
                        scope: "/properties/_metric/properties/valueType",
                        type: "Control",
                        labelKey: "shared.fields.metrics.valueType.label",
                        rule: SHOW_FOR_STATIC_RULE_ENTITY,
                        options: {
                            control: "hub-field-input-tile-select",
                            layout: "horizontal",
                            helperText: {
                                labelKey: "shared.fields.metrics.valueType.helperText",
                                placement: "top",
                            },
                            enum: {
                                i18nScope: "shared.fields.metrics.valueType.enum",
                            },
                        },
                    },
                    {
                        labelKey: "shared.fields.metrics.value.label",
                        scope: "/properties/_metric/properties/value",
                        type: "Control",
                        rules: [SHOW_FOR_STATIC_AND_STRING_RULE_ENTITY],
                        options: {
                            control: "hub-field-input-input",
                            clearOnHidden: true,
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    labelKey: "shared.fields.metrics.value.message.required",
                                    icon: true,
                                },
                            ],
                        },
                    },
                    {
                        labelKey: "shared.fields.metrics.value.label",
                        scope: "/properties/_metric/properties/value",
                        type: "Control",
                        rules: [SHOW_FOR_STATIC_AND_NUMBER_RULE_ENTITY],
                        options: {
                            control: "hub-field-input-input",
                            type: "number",
                            clearOnHidden: true,
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    labelKey: "shared.fields.metrics.value.message.required",
                                    icon: true,
                                },
                            ],
                        },
                    },
                    {
                        labelKey: "shared.fields.metrics.value.label",
                        scope: "/properties/_metric/properties/value",
                        type: "Control",
                        rules: [SHOW_FOR_STATIC_AND_DATE_RULE_ENTITY],
                        options: {
                            control: "hub-field-input-date",
                            clearOnHidden: true,
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    labelKey: "shared.fields.metrics.value.message.required",
                                    icon: true,
                                },
                            ],
                        },
                    },
                    {
                        scope: "/properties/_metric/properties/dynamicMetric",
                        type: "Control",
                        labelKey: "shared.fields.metrics.dynamicMetric.label",
                        rule: SHOW_FOR_DYNAMIC_RULE_ENTITY,
                        options: {
                            control: "hub-composite-input-service-query-metric",
                        },
                    },
                    {
                        labelKey: "shared.fields.metrics.unit.label",
                        scope: "/properties/_metric/properties/unit",
                        type: "Control",
                        options: {
                            helperText: {
                                labelKey: "shared.fields.metrics.unit.helperText",
                                placement: "top",
                            },
                        },
                    },
                    {
                        labelKey: "shared.fields.metrics.unitPosition.label",
                        scope: "/properties/_metric/properties/unitPosition",
                        type: "Control",
                        options: {
                            helperText: {
                                labelKey: "shared.fields.metrics.unitPosition.helperText",
                                placement: "bottom",
                            },
                            control: "hub-field-input-select",
                            enum: {
                                i18nScope: "shared.fields.metrics.unitPosition.enum",
                            },
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: "shared.sections.metrics.formatting.label",
                elements: [
                    {
                        labelKey: "shared.fields.metrics.trailingText.label",
                        scope: "/properties/_metric/properties/trailingText",
                        type: "Control",
                        options: {
                            helperText: {
                                labelKey: "shared.fields.metrics.trailingText.helperText",
                                placement: "bottom",
                            },
                        },
                    },
                    {
                        labelKey: "shared.fields.metrics.sourceLink.label",
                        scope: "/properties/_metric/properties/sourceLink",
                        type: "Control",
                        rule: SHOW_FOR_STATIC_RULE_ENTITY,
                        options: {
                            placeholder: "https://esri.com",
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "required",
                                    icon: true,
                                    labelKey: "shared.fields.metrics.sourceLink.message.required",
                                    allowShowBeforeInteract: true,
                                },
                                {
                                    type: "ERROR",
                                    keyword: "format",
                                    icon: true,
                                    labelKey: "shared.errors.urlFormat",
                                },
                                {
                                    type: "ERROR",
                                    keyword: "if",
                                    hidden: true,
                                },
                            ],
                        },
                    },
                    {
                        labelKey: "shared.fields.metrics.sourceTitle.label",
                        scope: "/properties/_metric/properties/sourceTitle",
                        type: "Control",
                        rule: SHOW_FOR_STATIC_RULE_ENTITY,
                    },
                    {
                        type: "Control",
                        scope: "/properties/_metric/properties/allowDynamicLink",
                        labelKey: "shared.fields.metrics.allowDynamicLink.label",
                        rule: SHOW_FOR_DYNAMIC_RULE_ENTITY,
                        options: {
                            layout: "inline-space-between",
                            control: "hub-field-input-switch",
                        },
                    },
                ],
            },
        ],
    };
};
/**
 * @private
 * constructs the default values for the initiative metrics editor.
 * This is used to pre-populate the metrics editor with specific default values
 * that are different from the Schema default values, or contain translated
 * values.
 * @param i18nScope
 * @param options
 * @param context
 * @returns
 */
const buildDefaults = async (i18nScope, options, context) => {
    return {
        _metric: {
            cardTitle: `{{shared.fields.metrics.cardTitle.label:translate}}`,
        },
    };
};

export { buildDefaults, buildUiSchema };
