/**
 * @private
 * constructs the complete edit uiSchema for Hub Pages.
 * This defines how the schema properties should be
 * rendered in the page editing experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    return {
        type: "Layout",
        elements: [
            {
                labelKey: `${i18nScope}.fields.name.label`,
                scope: "/properties/name",
                type: "Control",
                options: {
                    messages: [
                        {
                            type: "ERROR",
                            keyword: "required",
                            icon: true,
                            labelKey: `${i18nScope}.fields.name.requiredError`,
                        },
                        {
                            type: "ERROR",
                            keyword: "maxLength",
                            icon: true,
                            labelKey: `${i18nScope}.fields.name.maxLengthError`,
                        },
                        {
                            type: "ERROR",
                            keyword: "format",
                            icon: true,
                            labelKey: `${i18nScope}.fields.name.entityTitleValidatorError`,
                        },
                    ],
                },
            },
        ],
    };
};

export { buildUiSchema };
