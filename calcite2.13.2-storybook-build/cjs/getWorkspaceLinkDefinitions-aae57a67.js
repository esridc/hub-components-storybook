'use strict';

const types = require('./types-ff8f7df0.js');

/**
 * NOTE: this definition is filled with mostly dummy variables right now.
 * These will need to be updated to correct values before using a site workspace.
*/
const ContentWorkspaceLinks = [
  // TODO: re-add content overview pane
  // {
  //   entity: 'content',
  //   pane: 'overview',
  //   component: 'arcgis-hub-entity-overview',
  //   i18nLabel: 'panes.overview',
  //   icon: PANE_ICONS.overview,
  //   permissions: ['hub:content:workspace:overview'],
  // },
  {
    entity: 'content',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: types.PANE_ICONS.dashboard,
    permissions: ['hub:content:workspace:dashboard']
  },
  {
    entity: 'content',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: types.PANE_ICONS.details,
    permissions: ['hub:content:workspace:details'],
  },
  {
    entity: 'site',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: types.PANE_ICONS.collaborators,
    permissions: ['hub:site:workspace:collaborators']
  },
  {
    entity: 'content',
    pane: 'discussion',
    component: 'arcgis-hub-entity-discussion-settings-pane',
    i18nLabel: 'panes.discussions',
    icon: types.PANE_ICONS.discussion,
    permissions: ['hub:content:workspace:discussion'],
  },
  {
    entity: 'content',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: types.PANE_ICONS.settings,
    permissions: ['hub:content:workspace:settings'],
  },
];

const DiscussionWorkspaceLinks = [
  {
    entity: 'discussion',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: types.PANE_ICONS.dashboard,
    permissions: ['hub:discussion:workspace:dashboard']
  },
  {
    entity: 'discussion',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: types.PANE_ICONS.details,
    permissions: ['hub:discussion:workspace:details']
  },
  {
    entity: 'discussion',
    pane: 'participation',
    component: 'arcgis-hub-entity-discussion-participation-pane',
    i18nLabel: 'panes.participation',
    icon: types.PANE_ICONS.discussion,
    permissions: ['hub:discussion:workspace:discussion']
  },
  {
    entity: 'discussion',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: types.PANE_ICONS.settings,
    permissions: ['hub:discussion:workspace:settings']
  },
];

const SurveyWorkspaceLinks = [
  {
    entity: 'survey',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: types.PANE_ICONS.dashboard,
    permissions: ['hub:survey:workspace:dashboard']
  },
  {
    entity: 'survey',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: types.PANE_ICONS.details,
    permissions: ['hub:survey:workspace:details']
  },
  {
    entity: 'survey',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: types.PANE_ICONS.collaborators,
    permissions: ['hub:survey:workspace:collaborators']
  },
  {
    entity: 'survey',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: types.PANE_ICONS.settings,
    permissions: ['hub:survey:workspace:settings']
  },
];

const GroupWorkspaceLinks = [
  {
    entity: 'group',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: types.PANE_ICONS.details,
    permissions: ['hub:group:workspace:details']
  },
  {
    entity: 'group',
    pane: 'members',
    component: 'arcgis-hub-entity-group-members',
    i18nLabel: 'panes.members',
    icon: types.PANE_ICONS.members,
    permissions: ['hub:group:workspace:members']
  },
  {
    entity: 'group',
    pane: 'content',
    component: 'arcgis-hub-entity-group-content',
    i18nLabel: 'panes.content',
    icon: types.PANE_ICONS.content,
    permissions: ['hub:group:workspace:content']
  },
  {
    entity: 'group',
    pane: 'discussion',
    component: 'arcgis-hub-entity-discussion-settings-pane',
    i18nLabel: 'panes.discussions',
    icon: types.PANE_ICONS.discussion,
    permissions: ['hub:group:workspace:discussion'],
  },
  {
    entity: 'group',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: types.PANE_ICONS.settings,
    permissions: ['hub:group:workspace:settings']
  },
];

const InitiativeWorkspaceLinks = [
  // TODO: re-add initiative overview pane
  // {
  //   entity: 'initiative',
  //   pane: 'overview',
  //   component: 'arcgis-hub-initiative-overview',
  //   i18nLabel: 'panes.overview',
  //   icon: PANE_ICONS.overview,
  //   permissions: ['hub:initiative:workspace:overview']
  // },
  {
    entity: 'initiative',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: types.PANE_ICONS.dashboard,
    permissions: ['hub:initiative:workspace:dashboard']
  },
  {
    entity: 'initiative',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: types.PANE_ICONS.details,
    permissions: ['hub:initiative:workspace:details']
  },
  {
    entity: 'initiative',
    pane: 'catalog',
    i18nLabel: 'panes.catalog',
    icon: types.PANE_ICONS.catalog,
    permissions: ['hub:initiative:workspace:catalog'],
    children: [
      {
        entity: 'initiative',
        pane: 'catalog-content',
        component: 'arcgis-hub-entity-catalog',
        i18nLabel: 'panes.catalogContent',
        icon: types.PANE_ICONS.catalogContent,
        permissions: ['hub:initiative:workspace:catalog']
      },
      {
        entity: 'initiative',
        pane: 'catalog-events',
        component: 'arcgis-hub-entity-catalog',
        i18nLabel: 'panes.catalogEvents',
        icon: types.PANE_ICONS.catalogEvents,
        permissions: ['hub:initiative:workspace:catalog']
      }
    ]
  },
  {
    entity: 'initiative',
    pane: 'metrics',
    component: 'arcgis-hub-entity-metrics',
    i18nLabel: 'panes.metrics',
    icon: types.PANE_ICONS.metrics,
    permissions: ['hub:initiative:workspace:metrics']
  },
  {
    entity: 'initiative',
    pane: 'projects',
    component: 'arcgis-hub-entity-projects',
    i18nLabel: 'panes.projects',
    icon: types.PANE_ICONS.projects,
    permissions: ['hub:initiative:workspace:projects']
  },
  {
    entity: 'initiative',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: types.PANE_ICONS.collaborators,
    permissions: ['hub:initiative:workspace:collaborators']
  },
  {
    entity: 'initiative',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: types.PANE_ICONS.settings,
    permissions: ['hub:initiative:workspace:settings']
  },
];

const PageWorkspaceLinks = [
  // TODO: re-add page workspace overview
  // {
  //   entity: 'page',
  //   pane: 'overview',
  //   component: 'arcgis-hub-entity-overview',
  //   i18nLabel: 'panes.overview',
  //   icon: PANE_ICONS.overview,
  //   permissions: ['hub:page:workspace:overview']
  // },
  {
    entity: 'page',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: types.PANE_ICONS.dashboard,
    permissions: ['hub:page:workspace:dashboard']
  },
  {
    entity: 'page',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: types.PANE_ICONS.details,
    permissions: ['hub:page:workspace:details']
  },
  {
    entity: 'page',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: types.PANE_ICONS.collaborators,
    permissions: ['hub:page:workspace:collaborators']
  },
  {
    entity: 'page',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: types.PANE_ICONS.settings,
    permissions: ['hub:page:workspace:settings']
  }
];

const ProjectWorkspaceLinks = [
  // TODO: re-add project workspace overview
  // {
  //   entity: 'project',
  //   pane: 'overview',
  //   component: 'arcgis-hub-project-overview',
  //   i18nLabel: 'panes.overview',
  //   icon: PANE_ICONS.overview,
  //   permissions: ['hub:project:workspace:overview']
  // },
  {
    entity: 'project',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: types.PANE_ICONS.dashboard,
    permissions: ['hub:project:workspace:dashboard']
  },
  {
    entity: 'project',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: types.PANE_ICONS.details,
    permissions: ['hub:project:workspace:details']
  },
  {
    entity: 'project',
    pane: 'catalog',
    i18nLabel: 'panes.catalog',
    icon: types.PANE_ICONS.catalog,
    permissions: ['hub:project:workspace:catalog'],
    children: [
      {
        entity: 'project',
        pane: 'catalog-content',
        component: 'arcgis-hub-entity-catalog',
        i18nLabel: 'panes.catalogContent',
        icon: types.PANE_ICONS.catalogContent,
        permissions: ['hub:project:workspace:catalog']
      },
      {
        entity: 'project',
        pane: 'catalog-events',
        component: 'arcgis-hub-entity-catalog',
        i18nLabel: 'panes.catalogEvents',
        icon: types.PANE_ICONS.catalogEvents,
        permissions: ['hub:project:workspace:catalog']
      }
    ]
  },
  {
    entity: 'project',
    pane: 'initiatives',
    component: 'arcgis-hub-entity-initiatives',
    i18nLabel: 'panes.initiatives',
    icon: types.PANE_ICONS.initiatives,
    permissions: ['hub:project:workspace:initiatives']
  },
  {
    entity: 'project',
    pane: 'metrics',
    component: 'arcgis-hub-entity-metrics',
    i18nLabel: 'panes.metrics',
    icon: types.PANE_ICONS.metrics,
    permissions: ["hub:project:workspace:metrics"]
  },
  {
    entity: 'project',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: types.PANE_ICONS.collaborators,
    permissions: ['hub:project:workspace:collaborators']
  },
  {
    entity: 'project',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: types.PANE_ICONS.settings,
    permissions: ["hub:project:workspace:settings"]
  },
];

/**
 * NOTE: this definition is filled with mostly dummy variables right now.
 * These will need to be updated to correct values before using a site workspace.
*/
const SiteWorkspaceLinks = [
  // TODO: re-add site overview pane
  // {
  //   entity: 'site',
  //   pane: 'overview',
  //   component: 'arcgis-hub-entity-overview',
  //   i18nLabel: 'panes.overview',
  //   icon: PANE_ICONS.overview,
  //   permissions: ['hub:site:workspace:overview']
  // },
  {
    entity: 'site',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: types.PANE_ICONS.dashboard,
    permissions: ['hub:site:workspace:dashboard']
  },
  {
    entity: 'site',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: types.PANE_ICONS.details,
    permissions: ['hub:site:workspace:details']
  },
  {
    entity: 'site',
    pane: 'content',
    component: 'arcgis-hub-entity-content',
    i18nLabel: 'panes.content',
    icon: types.PANE_ICONS.content,
    permissions: ['hub:site:workspace:content']
  },
  {
    entity: 'site',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: types.PANE_ICONS.collaborators,
    permissions: ['hub:site:workspace:collaborators']
  },
  {
    entity: 'site',
    pane: 'followers',
    component: 'arcgis-hub-entity-followers',
    i18nLabel: 'panes.followers',
    icon: types.PANE_ICONS.followers,
    permissions: ['hub:site:workspace:followers']
  },
  {
    entity: 'site',
    pane: 'discussion',
    component: 'arcgis-hub-entity-discussion-settings-pane',
    i18nLabel: 'panes.discussions',
    icon: types.PANE_ICONS.discussion,
    permissions: ['hub:site:workspace:discussion'],
  },
  {
    entity: 'site',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: types.PANE_ICONS.settings,
    permissions: ['hub:site:workspace:settings']
  },
];

const InitiativeTemplateWorkspaceLinks = [
  {
    entity: "initiativeTemplate",
    pane: "dashboard",
    component: "arcgis-hub-entity-dashboard",
    i18nLabel: "panes.dashboard",
    icon: types.PANE_ICONS.dashboard,
    permissions: ["hub:initiativeTemplate:workspace:dashboard"]
  },
  {
    entity: 'initiativeTemplate',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: types.PANE_ICONS.details,
    permissions: ['hub:initiativeTemplate:workspace:details']
  },
  {
    entity: 'initiativeTemplate',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: types.PANE_ICONS.collaborators,
    permissions: ['hub:initiativeTemplate:workspace:collaborators']
  },
  {
    entity: 'initiativeTemplate',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: types.PANE_ICONS.settings,
    permissions: ["hub:initiativeTemplate:workspace:settings"]
  }
];

const TemplateWorkspaceLinks = [
  {
    entity: "template",
    pane: "dashboard",
    component: "arcgis-hub-entity-dashboard",
    i18nLabel: "panes.dashboard",
    icon: types.PANE_ICONS.dashboard,
    permissions: ["hub:template:workspace:dashboard"]
  },
  {
    entity: 'template',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: types.PANE_ICONS.details,
    permissions: ['hub:template:workspace:details']
  },
  {
    entity: 'template',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: types.PANE_ICONS.collaborators,
    permissions: ['hub:template:workspace:collaborators']
  },
  {
    entity: 'template',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: types.PANE_ICONS.settings,
    permissions: ["hub:template:workspace:settings"]
  }
];

const EventWorkspaceLinks = [
  {
    entity: 'event',
    pane: 'dashboard',
    component: 'arcgis-hub-entity-dashboard',
    i18nLabel: 'panes.dashboard',
    icon: types.PANE_ICONS.dashboard,
    permissions: ['hub:event:workspace:dashboard']
  },
  {
    entity: 'event',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: types.PANE_ICONS.details,
    permissions: ['hub:event:workspace:details']
  },
  {
    entity: 'event',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: types.PANE_ICONS.collaborators,
    permissions: ['hub:event:workspace:collaborators'],
  },
  {
    entity: 'event',
    pane: 'registrants',
    component: 'arcgis-hub-entity-registrants',
    i18nLabel: 'panes.registrants',
    icon: types.PANE_ICONS.registrants,
    permissions: ['hub:event:workspace:registrants']
  },
  {
    entity: 'event',
    pane: 'settings',
    component: 'arcgis-hub-entity-event-settings',
    i18nLabel: 'panes.settings',
    icon: types.PANE_ICONS.settings,
    permissions: ['hub:event:workspace:settings']
  }
];

/**
 * NOTE: this definition is filled with mostly dummy variables right now.
 * These will need to be updated to correct values before using a site workspace.
*/
const UserWorkspaceLinks = [
  {
    entity: 'user',
    pane: 'overview',
    component: 'arcgis-hub-user-overview',
    i18nLabel: 'panes.overview',
    icon: types.PANE_ICONS.overview,
    permissions: ['hub:user:workspace:overview']
  },
  {
    entity: 'user',
    pane: 'content',
    component: 'arcgis-hub-user-content-pane',
    i18nLabel: 'panes.content',
    icon: types.PANE_ICONS.content,
    permissions: ['hub:user:workspace:content']
  },
  {
    entity: 'user',
    pane: 'events',
    component: 'arcgis-hub-user-events-pane',
    i18nLabel: 'panes.events',
    icon: types.PANE_ICONS.events,
    permissions: ['hub:user:workspace:events']
  },
  // THIS IS COMMENTED OUT BECAUSE WE DO NOT WANT THIS TO INADVERTENTLY SHOW UP ON QA ALPHA ORGS
  // THE BACKING API NEEDS WORK, BUT KEEPING THIS PRESENT IS HELPFUL FOR INCREMENTAL DEVELOPMENT
  // ALLOWING DEVS TO RE-ENABLE THIS BY UNCOMMENTING THIS SECTION
  {
    entity: 'user',
    pane: 'discussion',
    component: 'arcgis-hub-user-posts-pane',
    i18nLabel: 'panes.discussions',
    icon: types.PANE_ICONS.discussion,
    permissions: ['hub:user:workspace:discussions']
  },
  {
    entity: 'user',
    pane: 'groups',
    component: 'arcgis-hub-user-groups-pane',
    i18nLabel: 'panes.groups',
    icon: types.PANE_ICONS.group,
    permissions: ['hub:user:workspace:groups']
  },
  {
    entity: 'user',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: types.PANE_ICONS.settings,
    permissions: ['hub:user:workspace:settings']
  }
];

/**
 * returns the workspace link definitions based on the entity type
 */
function getWorkspaceLinkDefinitions(entityType) {
  const entityTypeToWorkspaceLinksDefinition = {
    project: ProjectWorkspaceLinks,
    initiative: InitiativeWorkspaceLinks,
    site: SiteWorkspaceLinks,
    discussion: DiscussionWorkspaceLinks,
    content: ContentWorkspaceLinks,
    page: PageWorkspaceLinks,
    template: TemplateWorkspaceLinks,
    group: GroupWorkspaceLinks,
    initiativeTemplate: InitiativeTemplateWorkspaceLinks,
    survey: SurveyWorkspaceLinks,
    event: EventWorkspaceLinks,
    user: UserWorkspaceLinks
  };
  return entityTypeToWorkspaceLinksDefinition[entityType] || [];
}

exports.getWorkspaceLinkDefinitions = getWorkspaceLinkDefinitions;
