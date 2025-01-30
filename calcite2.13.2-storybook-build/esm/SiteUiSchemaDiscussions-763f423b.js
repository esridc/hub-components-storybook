/**
 * @private
 * settings uiSchema for Hub Discussions - this
 * defines how the schema properties should be
 * rendered in the Discussions settings experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    return {
        type: "Layout",
        elements: [
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.discussions.label`,
                elements: [
                    {
                        labelKey: `${i18nScope}.fields.discussable.label`,
                        scope: "/properties/_discussions",
                        type: "Control",
                        options: {
                            control: "hub-field-input-tile-select",
                            layout: "horizontal",
                            labels: [
                                `{{${i18nScope}.fields.discussable.enabled.label:translate}}`,
                                `{{${i18nScope}.fields.discussable.disabled.label:translate}}`,
                            ],
                            descriptions: [
                                `{{${i18nScope}.fields.discussable.enabled.description:translate}}`,
                                `{{${i18nScope}.fields.discussable.disabled.description:translate}}`,
                            ],
                            icons: ["speech-bubbles", "circle-disallowed"],
                            type: "radio",
                            styles: { "max-width": "45rem" },
                        },
                    },
                ],
            },
        ],
    };
};

export { buildUiSchema };
