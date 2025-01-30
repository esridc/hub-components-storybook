import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
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
 * settings uiSchema for Hub Survey - this
 * defines how the schema properties should be
 * rendered in the Survey settings experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    // We want to conver it over to a boolean as it can be undefined which doesn't play well
    // with the rules in our schema system
    const hasMapQuestion = !options.hasMapQuestion;
    return {
        type: "Layout",
        elements: [
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.settings.label`,
                elements: [
                    {
                        labelKey: `${i18nScope}.fields.displayMap.label`,
                        scope: "/properties/displayMap",
                        type: "Control",
                        rule: {
                            effect: UiSchemaRuleEffects.DISABLE,
                            condition: {
                                scope: "/properties/hasMapQuestion",
                                schema: { const: false },
                            },
                        },
                        options: {
                            control: "hub-field-input-tile-select",
                            type: "radio",
                            labels: [
                                `{{${i18nScope}.fields.displayMap.enabled.label:translate}}`,
                                `{{${i18nScope}.fields.displayMap.disabled.label:translate}}`,
                            ],
                            descriptions: [
                                `{{${i18nScope}.fields.displayMap.enabled.description:translate}}`,
                                `{{${i18nScope}.fields.displayMap.disabled.description:translate}}`,
                            ],
                            icons: ["sidecar", "form-elements"],
                            layout: "horizontal",
                        },
                    },
                    {
                        type: "Notice",
                        options: {
                            notice: {
                                configuration: {
                                    id: "map-question-notice",
                                    noticeType: "notice",
                                    closable: false,
                                    kind: "info",
                                    scale: "m",
                                },
                                title: `{{${i18nScope}.fields.displayMap.notice.title:translate}}`,
                                body: `{{${i18nScope}.fields.displayMap.notice.message:translate}}`,
                                autoShow: true,
                            },
                        },
                        rules: [
                            {
                                effect: UiSchemaRuleEffects.SHOW,
                                conditions: [hasMapQuestion],
                            },
                        ],
                    },
                ],
            },
        ],
    };
};

export { buildUiSchema };
