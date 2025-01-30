/**
 * NOTE: this definition is filled with mostly dummy variables right now.
 * These will need to be updated to correct values before using a site workspace.
*/
import { PANE_ICONS } from "../types";
export const UserWorkspaceLinks = [
  {
    entity: 'user',
    pane: 'overview',
    component: 'arcgis-hub-user-overview',
    i18nLabel: 'panes.overview',
    icon: PANE_ICONS.overview,
    permissions: ['hub:user:workspace:overview']
  },
  {
    entity: 'user',
    pane: 'content',
    component: 'arcgis-hub-user-content-pane',
    i18nLabel: 'panes.content',
    icon: PANE_ICONS.content,
    permissions: ['hub:user:workspace:content']
  },
  {
    entity: 'user',
    pane: 'events',
    component: 'arcgis-hub-user-events-pane',
    i18nLabel: 'panes.events',
    icon: PANE_ICONS.events,
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
    icon: PANE_ICONS.discussion,
    permissions: ['hub:user:workspace:discussions']
  },
  {
    entity: 'user',
    pane: 'groups',
    component: 'arcgis-hub-user-groups-pane',
    i18nLabel: 'panes.groups',
    icon: PANE_ICONS.group,
    permissions: ['hub:user:workspace:groups']
  },
  {
    entity: 'user',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: PANE_ICONS.settings,
    permissions: ['hub:user:workspace:settings']
  }
];
