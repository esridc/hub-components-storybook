'use strict';

const types = require('./types-60347c5c.js');
const checkPermission = require('./checkPermission-11ab5992.js');
const getDownloadFlow = require('./getDownloadFlow-94a34207.js');
const hostedServiceUtils = require('./hostedServiceUtils-236344a8.js');
const shouldShowDownloadsConfiguration = require('./shouldShowDownloadsConfiguration-62f7f280.js');
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
require('./TemplateBusinessRules-5564c964.js');
require('./InitiativeTemplateBusinessRules-c5d5f695.js');
require('./get-with-default-d1b1754d.js');
require('./get-prop-4bd8fc1a.js');
require('./map-by-a7a75788.js');
require('./canUseHubDownloadSystem-5b330e55.js');
require('./index-ef80ab27.js');
require('./util-38e73510.js');

/**
 * @private
 * Constructs the downloads section for an IHubEditableContent entity.
 * Due to numerous product requirements, the content and state of this section
 * can vary greatly depending on the entity type and configuration.
 *
 * @param i18nScope translation scope
 * @param entity entity to get the downloads section for
 * @returns ui schema elements for the downloads section
 */
function getDownloadsSection(i18nScope, entity) {
    const downloadSectionElements = [];
    if (shouldShowDownloadSystemElement(entity)) {
        const downloadSystemElement = getDownloadSystemElement(i18nScope);
        downloadSectionElements.push(downloadSystemElement);
    }
    const downloadFormatsElement = getDownloadFormatsElement(i18nScope, entity);
    downloadSectionElements.push(downloadFormatsElement);
    return {
        type: "Section",
        labelKey: `${i18nScope}.sections.downloads.label`,
        options: {},
        elements: downloadSectionElements,
    };
}
/**
 * NOTE: we only show the download system toggle for main entities of a hosted feature service
 * since we can guarantee that the user will have the necessary permissions to enable
 * extract capabilities on the service.
 */
function shouldShowDownloadSystemElement(entity) {
    return hostedServiceUtils.isHostedFeatureServiceMainEntity(entity);
}
function getDownloadSystemElement(i18nScope) {
    return {
        labelKey: `${i18nScope}.fields.serverExtractCapability.label`,
        scope: "/properties/serverExtractCapability",
        type: "Control",
        options: {
            control: "hub-field-input-tile-select",
            labels: [
                `{{${i18nScope}.fields.serverExtractCapability.exportDataSetting.label:translate}}`,
                `{{${i18nScope}.fields.serverExtractCapability.defaultDownloadsSystem.label:translate}}`,
            ],
            descriptions: [
                `{{${i18nScope}.fields.serverExtractCapability.exportDataSetting.description:translate}}`,
                `{{${i18nScope}.fields.serverExtractCapability.defaultDownloadsSystem.description:translate}}`,
            ],
            layout: "vertical",
            messages: [
                {
                    type: types.UiSchemaMessageTypes.custom,
                    display: "notice",
                    kind: "warning",
                    icon: "exclamation-mark-triangle",
                    titleKey: `${i18nScope}.fields.serverExtractCapability.noFormatConfigurationNotice.title`,
                    labelKey: `${i18nScope}.fields.serverExtractCapability.noFormatConfigurationNotice.body`,
                    allowShowBeforeInteract: true,
                    conditions: [
                        {
                            scope: "/properties/serverExtractCapability",
                            schema: {
                                const: false,
                            },
                        },
                    ],
                },
            ],
        },
    };
}
/**
 * Returns the ui schema element for the download formats field. Populating this field
 * is a complex process that depends on the entity type, configuration, and product requirements.
 */
function getDownloadFormatsElement(i18nScope, entity) {
    const result = {
        labelKey: `${i18nScope}.fields.downloadFormats.label`,
        scope: "/properties/downloadFormats",
        type: "Control",
        options: {
            control: "hub-field-input-list",
            helperText: {
                labelKey: `${i18nScope}.fields.downloadFormats.helperText`,
            },
            allowReorder: true,
            allowHide: true,
        },
        rules: [],
    };
    // Product has asked that if the extract capability toggle is present, we should disable
    // the download formats control when the toggle is off. We hope this will encourage more
    // users to opt into the hosted downloads experience.
    if (shouldShowDownloadSystemElement(entity)) {
        result.rules.push({
            effect: types.UiSchemaRuleEffects.DISABLE,
            conditions: [
                {
                    scope: "/properties/serverExtractCapability",
                    schema: {
                        const: false,
                    },
                },
            ],
        });
        // Product had us add this branch in to encourage users to make their content / service downloadable.
        // This branch should run when the entity represents a service that cannot be downloaded and extract
        // cannot be enabled. The control will list all the formats that _could_ be available if the user
        // were to make the necessary changes
    }
    else if (shouldDisableDownloadFormatsControl(entity)) {
        result.rules.push({
            effect: types.UiSchemaRuleEffects.DISABLE,
            conditions: [true],
        });
        result.options.messages = [
            {
                type: types.UiSchemaMessageTypes.custom,
                display: "notice",
                kind: "warning",
                icon: "exclamation-mark-triangle",
                titleKey: `${i18nScope}.fields.downloadFormats.downloadsUnavailableNotice.title`,
                labelKey: `${i18nScope}.fields.downloadFormats.downloadsUnavailableNotice.body`,
                allowShowBeforeInteract: true,
                alwaysShow: true,
            },
        ];
    }
    return result;
}
/**
 * Returns true when an entity represents a item/service that
 * cannot be downloaded with its current configuration.
 */
function shouldDisableDownloadFormatsControl(entity) {
    const downloadFlow = getDownloadFlow.getDownloadFlow(entity);
    return !downloadFlow;
}

/**
 * @private
 * constructs the complete settings uiSchema for Hub Editable Content.
 * This defines how the schema properties should be
 * rendered in the content settings editing experience
 */
const buildUiSchema = async (i18nScope, options, _context) => {
    const uiSchema = {
        type: "Layout",
        elements: [],
    };
    if (checkPermission.checkPermission("hub:content:workspace:settings:schedule", _context, options).access) {
        const scheduleSectionElements = [
            {
                type: "Control",
                scope: "/properties/schedule",
                labelKey: `${i18nScope}.sections.schedule.helperText`,
                options: {
                    type: "Control",
                    control: "hub-field-input-scheduler",
                    labelKey: "fieldHeader",
                    format: "select",
                    inputs: [
                        { type: "automatic" },
                        { type: "daily" },
                        { type: "weekly" },
                        { type: "monthly" },
                        { type: "yearly" },
                        {
                            type: "manual",
                            helperActionIcon: "information-f",
                            helperActionText: `{{${i18nScope}.fields.schedule.manual.helperActionText:translate}}`,
                        },
                    ],
                },
                rules: [
                    {
                        effect: types.UiSchemaRuleEffects.DISABLE,
                        conditions: [options.access !== "public"],
                    },
                ],
            },
            {
                type: "Notice",
                options: {
                    notice: {
                        configuration: {
                            id: "schedule-unavailable-notice",
                            noticeType: "notice",
                            closable: false,
                            kind: "warning",
                            icon: "exclamation-mark-triangle",
                            scale: "m",
                        },
                        title: `{{${i18nScope}.fields.schedule.unavailableNotice.title:translate}}`,
                        message: `{{${i18nScope}.fields.schedule.unavailableNotice.body:translate}}`,
                        autoShow: true,
                    },
                },
                rules: [
                    {
                        effect: types.UiSchemaRuleEffects.SHOW,
                        conditions: [options.access !== "public"],
                    },
                ],
            },
            {
                type: "Control",
                scope: "/properties/_forceUpdate",
                options: {
                    control: "hub-field-input-tile-select",
                    type: "checkbox",
                    labels: [
                        `{{${i18nScope}.fields.schedule.forceUpdateButton.label:translate}}`,
                    ],
                    descriptions: [
                        `{{${i18nScope}.fields.schedule.forceUpdateButton.description:translate}}`,
                    ],
                },
                rules: [
                    {
                        effect: types.UiSchemaRuleEffects.SHOW,
                        conditions: [options.access === "public"],
                    },
                ],
            },
        ];
        uiSchema.elements.push({
            type: "Section",
            labelKey: `${i18nScope}.sections.schedule.label`,
            elements: scheduleSectionElements,
        });
    }
    if (shouldShowDownloadsConfiguration.shouldShowDownloadsConfiguration(options)) {
        const downloadsSection = getDownloadsSection(i18nScope, options);
        uiSchema.elements.push(downloadsSection);
    }
    return uiSchema;
};

exports.buildUiSchema = buildUiSchema;
