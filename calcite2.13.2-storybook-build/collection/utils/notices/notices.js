import { constants, dictionary } from '@esri/telemetry-dictionary-hub';
/**
 * Represents pre-configured notices that are displayed to the user.
 * Notices can be modals (calcite-modal), alerts (calcite-alert), or inline notices (calcite-notice).
 *
 * To ADD an entry:
 *
 * - Define a unique key for the new notice
 *   - Format: <:release-date>-<:message-subject>-<:persona>-<:incrementing-number>
 *   - Persona and incrementing number are optional, but can be used to differentiate when multiple notices are released on the same day
 *   - Examples:
 *      - 20240131-new-search
 *      - 20240131-new-search-2
 *      - 20240131-new-search-admin-3
 *      - 20240131-new-search-owner-3
 * - Add a new entry to the NOTICES object
 *   - Use your new key as the object key
 *   - Be sure the id matches the object key
 * - Use the new key to create a new translations hash in `arcgis-hub-notice/locales/arcgis-hub-notice.i18n.en.json`
 *
 * To DEPRECATE an entry:
 *
 * - DO NOT delete the entry from the NOTICES object, we need to keep track of past ids
 * - Delete the corresponding translations hash in `arcgis-hub-notice/locales/arcgis-hub-notice.i18n.en.json`
 * - Convert it to an IHubDeprecatedNotice (ie remove all the props except id and deleted)
 */
export function getPreconfiguredNotice(id, context) {
  return getPreconfiguredNotices(context)[id];
}
export function getPreconfiguredNotices(context) {
  var _a, _b;
  const NOTICES = {
    // Experimental notice that was released into production, do not reuse.
    // Also used for testing purposes. Do not modify or remove.
    n001: {
      id: 'n001',
      deleted: true,
      dismissable: true,
      // configuration: {
      //   notificationType: 'notice',
      //   icon: 'search',
      //   kind: 'info',
      //   scale: 'l',
      // }
      // actions: [
      //   {
      //     href: 'https://some.link.com',
      //   }
      // ]
    },
    // Download Panel
    '20240220-hosted-downloads-1': {
      id: '20240220-hosted-downloads-1',
      dismissable: true,
      configuration: {
        noticeType: 'notice',
        icon: 'search',
        kind: 'info',
        scale: 's',
      },
    },
    // Hub Overview
    '20240220-hosted-downloads-2': {
      id: '20240220-hosted-downloads-2',
      // notificationType: 'notice'
      dismissable: true,
      configuration: {
        noticeType: 'notice',
        icon: 'search',
        kind: 'info',
        scale: 'l',
      },
      actions: [
        {
          href: 'https://community.esri.com/t5/arcgis-hub-blog/an-upgrade-to-arcgis-hub-s-hosted-service-download/ba-p/1370544',
          target: '_blank',
        }
      ]
    },
    // Dataset Edit
    '20240220-hosted-downloads-3': {
      id: '20240220-hosted-downloads-3',
      dismissable: true,
      configuration: {
        noticeType: 'notice',
        icon: 'search',
        kind: 'info',
        scale: 'l',
      },
      actions: [
        {
          href: 'https://community.esri.com/t5/arcgis-hub-blog/an-upgrade-to-arcgis-hub-s-hosted-service-download/ba-p/1370544',
          target: '_blank',
        }
      ]
    },
    // Download Panel Trigger
    // this is a bespoke notice that is not using arcgis-hub-notice
    // it just uses the dismiss stuff with the id (shouldShowNotice, dismissNotice)
    // we want to deprecate this approach in the near future so for now we just "as IHubNotice" it
    '20240220-hosted-downloads-4': {
      id: '20240220-hosted-downloads-4',
    },
    '202404-aboutworkspaces-basic': {
      id: '202404-aboutworkspaces-basic',
      dismissable: false,
      configuration: {
        noticeType: 'modal',
      },
      actions: [
      // {
      //   href: '',
      //   buttonStyle: 'solid'
      // }
      ],
      telemetry: {
        close: dictionary.category.interaction.action.close.label.modal.details.aboutWorkspaces,
        open: dictionary.category.interaction.action.open.label.modal.details.aboutWorkspaces
      }
    },
    '202404-aboutworkspaces-premium': {
      id: '202404-aboutworkspaces-premium',
      dismissable: false,
      configuration: {
        noticeType: 'modal',
      },
      actions: [
      // {
      //   href: '',
      //   buttonStyle: 'solid'
      // }
      ],
      telemetry: {
        close: dictionary.category.interaction.action.close.label.modal.details.aboutWorkspaces,
        open: dictionary.category.interaction.action.open.label.modal.details.aboutWorkspaces
      }
    },
    '202404-workspaceannouncement': {
      id: '202404-workspaceannouncement',
      autoShow: true,
      dismissable: true,
      configuration: {
        noticeType: 'modal',
        escapeDisabled: true,
        outsideCloseDisabled: true,
      },
      permissions: [
        // show if the user is not opted in to workspaces
        {
          permission: 'hub:feature:workspace',
          access: false,
        },
        // AND if we have the preferences permission - this is true for qa and dev
        {
          permission: 'hub:feature:user:preferences',
          access: true,
        }
      ],
      places: [
        '/overview/edit',
        '/edit'
      ],
      actions: [
        {
          href: `/people/${(_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.username}/profile/settings`,
          buttonStyle: 'solid',
          telemetry: dictionary.category.navigation.action.view.label.users.details.settings
        }
      ],
      telemetry: {
        open: dictionary.category.interaction.action.viewed.label.notice.details.introducingWorkspaces,
        close: dictionary.category.interaction.action.close.label.modal.details.introducingWorkspaces,
        dismiss: dictionary.category.users.action.update.label.optOut.details.phase1Workspaces
      }
    },
    '20240517-initiatives-introducing': {
      id: '20240517-initiatives-introducing',
      endDate: "2024-08-31",
      dismissable: false,
      configuration: {
        noticeType: "notice",
        kind: 'info',
        scale: 'l',
        closable: false,
      },
      actions: [
        {
          buttonStyle: "outline-fill",
          href: `https://www.esri.com/arcgis-blog/products/arcgis-hub/announcements/introducing-redefined-initiatives-in-arcgis-hub/`,
          telemetry: dictionary.category.navigation.action.external.label.arcGisBlog.details.initiativesV2Announcement,
          target: "_blank",
          icon: "launch",
          i18nAriaLabelKey: "ariaLabel",
        },
        {
          buttonStyle: "solid",
          href: `/people/${(_b = context === null || context === void 0 ? void 0 : context.currentUser) === null || _b === void 0 ? void 0 : _b.username}/profile/settings`,
          telemetry: dictionary.category.navigation.action.view.label.users.details.settings,
        }
      ],
      permissions: [
        {
          permission: 'hub:feature:workspace',
          access: false,
        },
        {
          permission: 'hub:license:hub-premium',
          access: true,
        }
      ],
      places: [
        "/overview/edit",
      ]
    },
    '20240517-initiatives-manage': {
      id: '20240517-initiatives-manage',
      endDate: "2024-08-31",
      dismissable: false,
      configuration: {
        noticeType: "notice",
        kind: 'info',
        scale: 'l',
        closable: false,
      },
      permissions: [
        {
          permission: "hub:feature:workspace",
          access: true
        },
        {
          permission: "hub:license:hub-premium",
          access: true
        },
        {
          permission: "platform:portal:admin:deleteItems",
          access: true
        }
      ],
      actions: [
        {
          buttonStyle: "outline-fill",
          href: `https://www.esri.com/arcgis-blog/products/arcgis-hub/announcements/introducing-redefined-initiatives-in-arcgis-hub/`,
          telemetry: dictionary.category.navigation.action.external.label.arcGisBlog.details.initiativesV2Announcement,
          target: "_blank",
          icon: "launch",
          i18nAriaLabelKey: "ariaLabel",
        },
        {
          buttonStyle: "solid",
          href: `${context === null || context === void 0 ? void 0 : context.portalUrl}/home/content.html?sortField=relevance&sortOrder=desc&searchTerm=type%3A+"Hub+Initiative"+%26+%21typekeywords%3A+"hubInitiativeV2"&view=table#org`,
          telemetry: Object.assign(Object.assign({}, dictionary.category.navigation.action.external.label.arcGisOnline.details.myOrganization), { element: constants.element.INITIATIVES_V_2_ANNOUNCEMENT_NOTICE }),
          target: "_blank",
          icon: "launch",
          i18nAriaLabelKey: "ariaLabel",
        }
      ]
    },
    '20240517-initiatives-manage-no-priv': {
      id: '20240517-initiatives-manage-no-priv',
      endDate: "2024-08-31",
      dismissable: false,
      configuration: {
        noticeType: "notice",
        kind: 'info',
        scale: 'l',
        closable: false,
      },
      permissions: [
        {
          permission: "hub:feature:workspace",
          access: true
        },
        {
          permission: "hub:license:hub-premium",
          access: true
        },
        {
          permission: "platform:portal:admin:deleteItems",
          access: false
        }
      ],
      actions: [
        {
          buttonStyle: "outline-fill",
          href: `https://www.esri.com/arcgis-blog/products/arcgis-hub/announcements/introducing-redefined-initiatives-in-arcgis-hub/`,
          telemetry: dictionary.category.navigation.action.external.label.arcGisBlog.details.initiativesV2Announcement,
          target: "_blank",
          icon: "launch",
          i18nAriaLabelKey: "ariaLabel",
        },
        {
          buttonStyle: "solid",
          href: `${context === null || context === void 0 ? void 0 : context.portalUrl}/home/content.html?sortField=relevance&sortOrder=desc&searchTerm=type%3A+"Hub+Initiative"+%26+%21typekeywords%3A+"hubInitiativeV2"&view=table#my`,
          telemetry: Object.assign(Object.assign({}, dictionary.category.navigation.action.external.label.arcGisOnline.details.myContent), { element: constants.element.INITIATIVES_V_2_ANNOUNCEMENT_NOTICE }),
          target: "_blank",
          icon: "launch",
          i18nAriaLabelKey: "ariaLabel",
        }
      ]
    },
    '20240517-initiatives-introducing-site': {
      id: '20240517-initiatives-introducing-site',
      endDate: "2024-08-31",
      dismissable: true,
      autoShow: true,
      configuration: {
        noticeType: "modal",
        kind: 'info',
        scale: 'm',
      },
      permissions: [
        {
          permission: 'hub:feature:workspace',
          access: true,
        },
        {
          permission: 'hub:license:hub-premium',
          access: true,
        }
      ],
      actions: [
        {
          buttonStyle: "solid",
          href: `https://www.esri.com/arcgis-blog/products/arcgis-hub/announcements/introducing-redefined-initiatives-in-arcgis-hub/`,
          telemetry: dictionary.category.navigation.action.external.label.arcGisBlog.details.initiativesV2Announcement,
          target: "_blank",
          icon: "launch",
          i18nAriaLabelKey: "ariaLabel",
        },
      ],
      telemetry: {
        open: dictionary.category.interaction.action.viewed.label.notice.details.initiativesV2Announcement,
        close: dictionary.category.interaction.action.close.label.modal.details.reIntroducingHubInitiatives,
        dismiss: dictionary.category.users.action.update.label.optOut.details.initiativesV2Announcement,
      },
      places: [
        /\/workspace\/sites\/.*\/details/
      ],
    },
    // https://devtopia.esri.com/dc/hub/issues/10835
    '20240710-slow-service-warning': {
      id: '20240710-slow-service-warning',
      dismissable: false,
      configuration: {
        noticeType: 'notice',
        icon: 'exclamation-mark-triangle',
        kind: 'warning',
        scale: 'm',
      },
      telemetry: {
        open: dictionary.category.interaction.action.viewed.label.notice.details.slowService
      }
    },
    // https://devtopia.esri.com/dc/hub/issues/10834
    '20240710-unreachable-service-error': {
      id: '20240710-unreachable-service-error',
      dismissable: false,
      configuration: {
        noticeType: 'notice',
        icon: 'exclamation-mark-triangle',
        kind: 'danger',
        scale: 'm',
      },
      telemetry: {
        open: dictionary.category.interaction.action.viewed.label.notice.details.downService,
      }
    },
    // https://devtopia.esri.com/dc/hub/issues/10973
    '20240807-auth-required-status': {
      id: '20240807-auth-required-status',
      dismissable: false,
      configuration: {
        noticeType: 'notice',
        icon: 'exclamation-mark-triangle',
        kind: 'danger',
        scale: 'm',
      },
      telemetry: {
        open: dictionary.category.interaction.action.viewed.label.notice.details.authRequired,
      }
    },
    '20240805-private-downloads-unavailable-ago-error': {
      id: '20240805-private-downloads-unavailable-ago-error',
      dismissable: false,
      configuration: {
        noticeType: 'notice',
        icon: 'exclamation-mark-triangle',
        kind: 'danger',
        scale: 's',
        closable: false,
      },
    },
    '20240805-private-downloads-unavailable-enterprise-error': {
      id: '20240805-private-downloads-unavailable-enterprise-error',
      dismissable: false,
      configuration: {
        noticeType: 'notice',
        icon: 'exclamation-mark-triangle',
        kind: 'danger',
        scale: 's',
        closable: false,
      },
    },
    '20240819-download-formats-disabled': {
      id: '20240819-download-formats-disabled',
      dismissable: false,
      configuration: {
        noticeType: 'notice',
        icon: 'information',
        kind: 'info',
        scale: 's',
        closable: false,
      },
    },
    '20241104-about-feeds-notice': {
      id: '20241104-about-feeds-notice',
      dismissable: false,
      configuration: {
        noticeType: 'notice',
        kind: 'info',
        scale: 'm',
        closable: false,
      },
      actions: [
        {
          href: 'https://doc.arcgis.com/en/hub/content/federate-data-with-external-catalogs.htm',
          target: '_blank',
        }
      ]
    }
  };
  return NOTICES;
}
;
