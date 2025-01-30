'use strict';

/**
 * @private
 * constructs the minimal create uiSchema for Hub Initiatives.
 * This defines how the schema properties should be rendered
 * in the initiative creation experience
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

exports.buildUiSchema = buildUiSchema;
