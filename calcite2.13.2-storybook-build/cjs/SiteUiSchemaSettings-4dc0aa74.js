'use strict';

/**
 * @private
 * constructs the edit uiSchema for Hub Sites.
 * This defines how the schema properties should
 * be rendered in the site editing experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    // NOTE: if this is not defined on the site then
    // the component will use the authenticated user's org
    // which may not be the same as the site's org
    const orgUrlKey = options.orgUrlKey;
    return {
        type: "Layout",
        elements: [
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.siteUrl.label`,
                options: {
                    requiredHelperText: {
                        labelKey: `${i18nScope}.sections.defaultRequiredHelperText`,
                    },
                },
                elements: [
                    {
                        scope: "/properties/_urlInfo",
                        type: "Control",
                        options: {
                            type: "Control",
                            control: "hub-composite-input-site-url",
                            orgUrlKey,
                            messages: [
                                {
                                    type: "ERROR",
                                    keyword: "isUniqueDomain",
                                    labelKey: `${i18nScope}.fields.siteUrl.isUniqueError`,
                                    icon: true,
                                },
                            ],
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.privacy.label`,
                elements: [
                    {
                        scope: "/properties/telemetry/properties/consentNotice",
                        type: "Control",
                        options: {
                            control: "arcgis-privacy-config",
                        },
                    },
                ],
            },
        ],
    };
};

exports.buildUiSchema = buildUiSchema;
