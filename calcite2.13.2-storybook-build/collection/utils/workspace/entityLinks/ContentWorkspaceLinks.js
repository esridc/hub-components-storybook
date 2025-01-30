/**
 * NOTE: this definition is filled with mostly dummy variables right now.
 * These will need to be updated to correct values before using a site workspace.
*/
import { PANE_ICONS } from "../types";
export const ContentWorkspaceLinks = [
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
    icon: PANE_ICONS.dashboard,
    permissions: ['hub:content:workspace:dashboard']
  },
  {
    entity: 'content',
    pane: 'details',
    component: 'arcgis-hub-entity-details',
    i18nLabel: 'panes.details',
    icon: PANE_ICONS.details,
    permissions: ['hub:content:workspace:details'],
  },
  {
    entity: 'site',
    pane: 'collaborators',
    component: 'arcgis-hub-entity-collaborators',
    i18nLabel: 'panes.collaborators',
    icon: PANE_ICONS.collaborators,
    permissions: ['hub:site:workspace:collaborators']
  },
  {
    entity: 'content',
    pane: 'discussion',
    component: 'arcgis-hub-entity-discussion-settings-pane',
    i18nLabel: 'panes.discussions',
    icon: PANE_ICONS.discussion,
    permissions: ['hub:content:workspace:discussion'],
  },
  {
    entity: 'content',
    pane: 'settings',
    component: 'arcgis-hub-entity-settings',
    i18nLabel: 'panes.settings',
    icon: PANE_ICONS.settings,
    permissions: ['hub:content:workspace:settings'],
  },
];
