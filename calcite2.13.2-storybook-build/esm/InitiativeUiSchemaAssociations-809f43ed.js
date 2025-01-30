import { c as checkPermission } from './checkPermission-6c5be250.js';
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './get-prop-ec5be510.js';
import './map-by-a2234e13.js';

/**
 * @private
 * constructs the minimal association group settings uiSchema for Hub Initiatives.
 * This defines how the schema properties should be rendered
 * in the initiative creation experience
 */
const buildUiSchema = async (i18nScope, options, context) => {
    return {
        type: "Layout",
        elements: [
            {
                type: "Section",
                elements: [
                    {
                        labelKey: `${i18nScope}.fields.groupAccess.label`,
                        scope: "/properties/_associations/properties/groupAccess",
                        type: "Control",
                        options: {
                            control: "hub-field-input-tile-select",
                            layout: "horizontal",
                            helperText: {
                                labelKey: `${i18nScope}.fields.groupAccess.helperText`,
                            },
                            labels: [
                                `{{${i18nScope}.fields.groupAccess.private.label:translate}}`,
                                `{{${i18nScope}.fields.groupAccess.org.label:translate}}`,
                                `{{${i18nScope}.fields.groupAccess.public.label:translate}}`,
                            ],
                            descriptions: [
                                `{{${i18nScope}.fields.groupAccess.private.description:translate}}`,
                                `{{${i18nScope}.fields.groupAccess.org.description:translate}}`,
                                `{{${i18nScope}.fields.groupAccess.public.description:translate}}`,
                            ],
                            icons: ["users", "organization", "globe"],
                            styles: { "max-width": "45rem" },
                        },
                    },
                    {
                        labelKey: `${i18nScope}.fields.membershipAccess.label`,
                        scope: "/properties/_associations/properties/membershipAccess",
                        type: "Control",
                        options: {
                            control: "hub-field-input-radio",
                            labels: [
                                `{{${i18nScope}.fields.membershipAccess.org:translate}}`,
                                `{{${i18nScope}.fields.membershipAccess.collab:translate}}`,
                                `{{${i18nScope}.fields.membershipAccess.any:translate}}`,
                            ],
                            disabled: [
                                false,
                                !checkPermission("platform:portal:user:addExternalMembersToGroup", context).access,
                                !checkPermission("platform:portal:user:addExternalMembersToGroup", context).access,
                            ],
                        },
                    },
                ],
            },
        ],
    };
};

export { buildUiSchema };
