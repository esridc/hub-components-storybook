'use strict';

const types = require('./types-60347c5c.js');
const fetchOrg = require('./fetch-org-d214b65b.js');
const failSafe = require('./fail-safe-33c35b7f.js');
const tslib_es6 = require('./tslib.es6-e7faa7f3.js');
const getPortalUrl = require('./get-portal-url-44f2448f.js');
const request = require('./request-67da3c71.js');
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
require('./get-prop-4bd8fc1a.js');
require('./getPortalBaseFromOrgUrl-393e8178.js');
require('./get-portal-6ca924c2.js');
require('./clean-url-1dfecac0.js');

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
    var url = getPortalUrl.getPortalUrl(requestOptions) + "/portals/" + idOrSelf + "/settings";
    // default to a GET request
    var options = tslib_es6.__assign({ httpMethod: "GET" }, requestOptions);
    // send the request
    return request.request(url, options);
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
                        effect: types.UiSchemaRuleEffects.SHOW,
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
                                        effect: types.UiSchemaRuleEffects.DISABLE,
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
                                        effect: types.UiSchemaRuleEffects.SHOW,
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
                                effect: types.UiSchemaRuleEffects.SHOW,
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
                                        effect: types.UiSchemaRuleEffects.SHOW,
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
                                        effect: types.UiSchemaRuleEffects.SHOW,
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
        const fsGetOrg = failSafe.failSafe(fetchOrg.fetchOrg, {});
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
    const fsGetPortalSettings = failSafe.failSafe(getPortalSettings, {});
    const settings = await fsGetPortalSettings(context.portal.id, {
        portal: context.sharingApiUrl,
    });
    return settings;
}

exports._getPortalSettings = _getPortalSettings;
exports.buildUiSchema = buildUiSchema;
