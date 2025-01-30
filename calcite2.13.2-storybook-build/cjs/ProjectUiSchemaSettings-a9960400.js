'use strict';

/**
 * @private
 * constructs the settings uiSchema for Hub Projects.
 * This defines how the schema should be rendered
 * in the project settings pane
 */
const buildUiSchema = async (i18nScope, options, context) => {
    return {
        type: "Layout",
        elements: [
            {
                type: "Section",
                labelKey: `shared.sections.mapSettings.label`,
                elements: [
                    {
                        type: "Control",
                        scope: "/properties/view/properties/mapSettings",
                        labelKey: `${i18nScope}.fields.mapSettings.label`,
                        options: {
                            type: "Control",
                            control: "hub-composite-input-map-settings",
                            // the settings that are visible for configuring the map
                            visibleSettings: ["gallery"],
                            // if the map preview is displayed
                            showPreview: true,
                        },
                    },
                ],
            },
        ],
    };
};

exports.buildUiSchema = buildUiSchema;
