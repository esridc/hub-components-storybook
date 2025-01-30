'use strict';

const types = require('./types-60347c5c.js');
require('./ProjectSchema-d1b6b7cf.js');
require('./MetricSchema-b212808d.js');
require('./enums-0160df9d.js');
require('./definitions-94c1da69.js');
require('./HubItemEntitySchema-62590777.js');
require('./types-097b54b1.js');
require('./subschemas-61a41e85.js');
require('./InitiativeSchema-5a0a1956.js');
require('./SiteSchema-85074143.js');
require('./DiscussionSchema-24407ed6.js');
require('./PageSchema-f15eb977.js');
require('./ContentSchema-92224d5f.js');
require('./TemplateSchema-d46d6f3b.js');
require('./GroupSchema-e21948a6.js');
require('./InitiativeTemplateSchema-c5d2cb31.js');
require('./SurveySchema-9ec907b6.js');
require('./EventSchemaCreate-bf05e6ea.js');
require('./getDefaultEventDatesAndTimes-99ac0275.js');
require('./types-751ad3a9.js');
require('./validations-121c30e3.js');
require('./UserSchema-5e3cafa7.js');

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
                            effect: types.UiSchemaRuleEffects.DISABLE,
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
                                effect: types.UiSchemaRuleEffects.SHOW,
                                conditions: [hasMapQuestion],
                            },
                        ],
                    },
                ],
            },
        ],
    };
};

exports.buildUiSchema = buildUiSchema;
