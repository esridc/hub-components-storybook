import { U as UiSchemaRuleEffects, b as UiSchemaMessageTypes } from './types-1fca2e83.js';
import { c as checkPermission } from './checkPermission-6c5be250.js';
import { g as getDownloadFlow } from './getDownloadFlow-6c6d04d5.js';
import { a as isHostedFeatureServiceMainEntity } from './hostedServiceUtils-f22b023b.js';
import { s as shouldShowDownloadsConfiguration } from './shouldShowDownloadsConfiguration-385c6ff6.js';
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
import './TemplateBusinessRules-0e35d61b.js';
import './InitiativeTemplateBusinessRules-e78cc3ef.js';
import './get-with-default-b819d95d.js';
import './get-prop-ec5be510.js';
import './map-by-a2234e13.js';
import './canUseHubDownloadSystem-a22afbb9.js';
import './index-edff2d62.js';
import './util-3e6872d9.js';

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
    return isHostedFeatureServiceMainEntity(entity);
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
                    type: UiSchemaMessageTypes.custom,
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
            effect: UiSchemaRuleEffects.DISABLE,
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
            effect: UiSchemaRuleEffects.DISABLE,
            conditions: [true],
        });
        result.options.messages = [
            {
                type: UiSchemaMessageTypes.custom,
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
    const downloadFlow = getDownloadFlow(entity);
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
    if (checkPermission("hub:content:workspace:settings:schedule", _context, options).access) {
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
                        effect: UiSchemaRuleEffects.DISABLE,
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
                        effect: UiSchemaRuleEffects.SHOW,
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
                        effect: UiSchemaRuleEffects.SHOW,
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
    if (shouldShowDownloadsConfiguration(options)) {
        const downloadsSection = getDownloadsSection(i18nScope, options);
        uiSchema.elements.push(downloadsSection);
    }
    return uiSchema;
};

export { buildUiSchema };
