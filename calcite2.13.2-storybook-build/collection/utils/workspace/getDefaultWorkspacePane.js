import { getWorkspaceLinks } from './getWorkspaceLinks';
import { getTypeFromEntity, Logger, } from '@esri/hub-common';
/**
 * Returns the default workspace pane for a given entity or entity type.
 * Should pass entityOptions, which should have either entity or entityType.
 * @param _context
 * @param entityOptions
 * @returns
 */
export async function getDefaultWorkspacePane(entity, _context) {
  const DEFAULT_PANES_BY_TYPE = {
    user: 'overview'
  };
  // get entity type
  const entityType = getTypeFromEntity(entity);
  // default pane based on entity type
  let defaultPane = DEFAULT_PANES_BY_TYPE[entityType] || 'details';
  // if we have a specific entity, look at its links to set the default pane
  if (entity && _context) {
    const links = await getWorkspaceLinks(entity, _context);
    if (!links.length) {
      Logger.warn('No workspace links found for entity', entity, _context);
      return defaultPane;
    }
    const link = links.find(({ pane }) => pane === defaultPane) || links[0];
    defaultPane = link.pane;
  }
  return defaultPane;
}
