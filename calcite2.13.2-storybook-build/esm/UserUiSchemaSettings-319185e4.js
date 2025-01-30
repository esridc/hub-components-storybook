import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { f as fetchOrg } from './fetch-org-8e578c0d.js';
import { f as failSafe } from './fail-safe-cd1a5a2a.js';
import { _ as __assign } from './tslib.es6-7023f322.js';
import { g as getPortalUrl } from './get-portal-url-b1c49fc5.js';
import { r as request } from './request-fa80ae40.js';
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
import './get-prop-ec5be510.js';
import './getPortalBaseFromOrgUrl-ad7df86a.js';
import './get-portal-5e0a1617.js';
import './clean-url-dff2b6ee.js';

/* Copyright (c) 2017-2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * ```js
 * import { getPortalSettings } from "@esri/arcgis-rest-portal";
 * //
 * getPortalSettings()
 * getPortalSettings("fe8")
 * getPortalSettings(null, { portal: "https://custom.maps.arcgis.com/sharing/rest/" })
 * ```
 * Fetch the settings for the current portal by id. If no id is passed, portals/self/settings will be called
 * @param id
 * @param requestOptions
 */
function getPortalSettings(id, requestOptions) {
    // construct the search url
    var idOrSelf = id ? id : "self";
    var url = getPortalUrl(requestOptions) + "/portals/" + idOrSelf + "/settings";
    // default to a GET request
    var options = __assign({ httpMethod: "GET" }, requestOptions);
    // send the request
    return request(url, options);
}

/**
 * @private
 * constructs the settings uiSchema for Hub Users.
 * This defines how the schema should be rendered in the
 * user workspace settings pane
 * @param i18nScope - translation scope to be interpolated into the uiSchema
 * @param options - additional options to customize the uiSchema
 * @param context - contextual auth and portal information
 * @returns
 */
const buildUiSchema = async (i18nScope, options, context) => {
    var _a, _b;
    let associatedOrgName;
    let noticeMessage = `{{${i18nScope}.notice.message:translate}}`;
    // default notice action - "Go to organization settings"
    const orgNoticeActions = [
        {
            ariaLabel: `{{${i18nScope}.notice.actions.goToOrg:translate}}`,
            label: `{{${i18nScope}.notice.actions.goToOrg:translate}}`,
            href: `${context.portalUrl}/home/organization.html?tab=general#settings`,
            target: "_blank",
        },
    ];
    // we have to make this xhr to fetch the portal settings to determine if
    // the banner is enabled as it's only exposed in appSettings/ember
    const portalSettings = await _getPortalSettings(context);
    const bannerString = ((_a = portalSettings.informationalBanner) === null || _a === void 0 ? void 0 : _a.enabled) ? `{{${i18nScope}.fields.infoBanner.helperText:translate}}`
        : `{{${i18nScope}.fields.infoBanner.helperTextWhenDisabled:translate}}`;
    const configureBannerString = `{{${i18nScope}.fields.infoBanner.goToBannerConfig:translate}}`;
    const showInfoBannerLink = `<calcite-link href=${context.portalUrl}/home/organization.html?tab=security#settings target=\"_blank\" icon-end=\"launch\">${configureBannerString}</calcite-link>`;
    /**
     * If there is a community org relationship, or we are in a community
     * org with an enterprise org relationship, show another action that
     * links out to the corresponding relationship org ("Go to community
     * organization" or "Go to staff organization")
     */
    if (context.communityOrgId || context.enterpriseOrgId) {
        const actionLabelKey = context.enterpriseOrgId
            ? "goToStaffOrg"
            : "goToCommunityOrg";
        // get the org url we will include in the notice action
        const orgUrl = await _getCommunityOrEnterpriseAGOUrl(context);
        // We want to always show the associated org name in the notice, if there is one
        // So we get either the community or enterprise org id
        const orgId = context.enterpriseOrgId || context.communityOrgId;
        // then we get the associated org name from trusted orgs.
        associatedOrgName = context.trustedOrgs.find((org) => org.to.orgId === orgId).to.name;
        // update the notice message with the associated org name
        noticeMessage = context.enterpriseOrgId
            ? `{{${i18nScope}.notice.staffMessage:translate}}: ${associatedOrgName}`
            : `{{${i18nScope}.notice.communityMessage:translate}}: ${associatedOrgName}`;
        // add the community org action if there is an org url
        if (orgUrl) {
            orgNoticeActions.push({
                ariaLabel: `{{${i18nScope}.notice.actions.${actionLabelKey}:translate}}`,
                label: `{{${i18nScope}.notice.actions.${actionLabelKey}:translate}}`,
                href: orgUrl,
                target: "_blank",
            });
        }
    }
    return {
        type: "Layout",
        elements: [
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.userSettings`,
                elements: [
                    {
                        type: "Control",
                        scope: "/properties/settings/properties/preview/properties/workspace",
                        labelKey: `${i18nScope}.fields.workspacePreview.label`,
                        options: {
                            type: "Control",
                            control: "hub-field-input-switch",
                            layout: "inline-space-between",
                            helperText: {
                                labelKey: `${i18nScope}.fields.workspacePreview.helperText`,
                            },
                        },
                    },
                ],
            },
            {
                type: "Section",
                labelKey: `${i18nScope}.sections.orgSettings.label`,
                options: {
                    helperText: {
                        label: `${context.portal.name}`,
                    },
                },
                rules: [
                    {
                        effect: UiSchemaRuleEffects.SHOW,
                        conditions: [
                            context.isOrgAdmin &&
                                context.currentUser.orgId === context.portal.id,
                        ],
                    },
                ],
                elements: [
                    {
                        type: "Notice",
                        options: {
                            notice: {
                                configuration: {
                                    id: "user-org-settings-notice",
                                    noticeType: "notice",
                                    closable: false,
                                    kind: "info",
                                    scale: "m",
                                },
                                title: `{{${i18nScope}.notice.title:translate}}`,
                                message: noticeMessage,
                                autoShow: true,
                                actions: orgNoticeActions,
                            },
                        },
                    },
                    {
                        type: "Section",
                        labelKey: `${i18nScope}.sections.orgSettings.siteDefaults.label`,
                        elements: [
                            {
                                type: "Control",
                                scope: "/properties/hubOrgSettings/properties/showInformationalBanner",
                                labelKey: `${i18nScope}.fields.infoBanner.label`,
                                options: {
                                    type: "Control",
                                    control: "hub-field-input-switch",
                                    layout: "inline-space-between",
                                    helperText: {
                                        label: bannerString,
                                    },
                                },
                                rules: [
                                    {
                                        effect: UiSchemaRuleEffects.DISABLE,
                                        conditions: [!((_b = portalSettings.informationalBanner) === null || _b === void 0 ? void 0 : _b.enabled)],
                                    },
                                ],
                            },
                            {
                                type: "Control",
                                scope: "/properties/hubOrgSettings/properties/showInformationalBanner",
                                options: {
                                    control: "calcite-link",
                                    layout: "inline-space-between",
                                    helperText: {
                                        label: showInfoBannerLink,
                                    },
                                },
                                rules: [
                                    {
                                        effect: UiSchemaRuleEffects.SHOW,
                                        conditions: [context.isOrgAdmin],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: "Section",
                        labelKey: `${i18nScope}.sections.orgSettings.signinSettings.label`,
                        rules: [
                            {
                                effect: UiSchemaRuleEffects.SHOW,
                                conditions: [
                                    // only if in community org and admin of the org
                                    !!(context.isCommunityOrg && context.isOrgAdmin),
                                ],
                            },
                        ],
                        options: {
                            helperText: {
                                labelKey: `${i18nScope}.sections.orgSettings.signinSettings.helperText`,
                            },
                        },
                        elements: [
                            {
                                type: "Control",
                                scope: "/properties/hubOrgSettings/properties/enableTermsAndConditions",
                                labelKey: `${i18nScope}.fields.enableTermsAndConditions.label`,
                                options: {
                                    control: "hub-field-input-switch",
                                    layout: "inline-space-between",
                                },
                            },
                            {
                                type: "Control",
                                scope: "/properties/hubOrgSettings/properties/termsAndConditions",
                                labelKey: `${i18nScope}.fields.termsAndConditions.label`,
                                options: {
                                    control: "hub-field-input-rich-text",
                                    type: "textarea",
                                },
                                rules: [
                                    {
                                        effect: UiSchemaRuleEffects.SHOW,
                                        conditions: [
                                            {
                                                scope: "/properties/hubOrgSettings/properties/enableTermsAndConditions",
                                                schema: { const: true },
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                type: "Control",
                                scope: "/properties/hubOrgSettings/properties/enableSignupText",
                                labelKey: `${i18nScope}.fields.enableSignupText.label`,
                                options: {
                                    control: "hub-field-input-switch",
                                    layout: "inline-space-between",
                                },
                            },
                            {
                                type: "Control",
                                scope: "/properties/hubOrgSettings/properties/signupText",
                                options: {
                                    control: "hub-field-input-rich-text",
                                    type: "textarea",
                                },
                                rules: [
                                    {
                                        effect: UiSchemaRuleEffects.SHOW,
                                        conditions: [
                                            {
                                                scope: "/properties/hubOrgSettings/properties/enableSignupText",
                                                schema: { const: true },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    };
};
async function _getCommunityOrEnterpriseAGOUrl(context) {
    let orgUrl = `${context.communityOrgUrl}/home/organization.html`;
    // if there's an enterprise org, we need to fetch it to get the url
    if (context.enterpriseOrgId) {
        // Fail safe fetch the e-org
        const fsGetOrg = failSafe(fetchOrg, {});
        const org = await fsGetOrg(context.enterpriseOrgId, context.requestOptions);
        // If the org response has a urlKey it is a real response. If the urlKey is missing the org is private
        if (org.urlKey) {
            // construct the url
            orgUrl = `https://${org.urlKey}.${org.customBaseUrl}/home/organization.html`;
        }
        else {
            // If the org is private, we can't link to it
            orgUrl = undefined;
        }
    }
    // return the url
    return orgUrl;
}
/**
 * Fetches the portal settings in a fail-safe manner.
 *
 * @param context - The context containing the ArcGIS portal information.
 * @returns A promise that resolves to the portal settings.
 */
async function _getPortalSettings(context) {
    // Fail safe fetch the portal settings
    const fsGetPortalSettings = failSafe(getPortalSettings, {});
    const settings = await fsGetPortalSettings(context.portal.id, {
        portal: context.sharingApiUrl,
    });
    return settings;
}

export { _getPortalSettings, buildUiSchema };
