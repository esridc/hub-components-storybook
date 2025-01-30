import { getWorkspaceLinkDefinitions } from './getWorkspaceLinkDefinitions';
import { checkPermission, getTypeFromEntity, } from '@esri/hub-common';
/**
 * returns an array of workspace links for a given entity that the
 * current user is granted access to
 */
export async function getWorkspaceLinks(entity, _context) {
  const entityType = getTypeFromEntity(entity);
  const entityWorkspaceLinkDefinitions = getWorkspaceLinkDefinitions(entityType);
  return entityWorkspaceLinkDefinitions.reduce((workspaceLinks, linkDefinition) => {
    const { i18nLabel, icon, pane, children } = linkDefinition;
    const isAccessGranted = _checkWorkspaceLink(linkDefinition, entity, _context);
    let _children = [];
    // check immediate children, but only if parent is access granted
    if (isAccessGranted && (children === null || children === void 0 ? void 0 : children.length)) {
      _children = children.reduce((acc, childLinkDef) => {
        const isChildAccessGranted = _checkWorkspaceLink(childLinkDef, entity, _context);
        isChildAccessGranted && acc.push({
          i18nKey: childLinkDef.i18nLabel,
          icon: childLinkDef.icon,
          pane: childLinkDef.pane
        });
        return acc;
      }, []);
    }
    ;
    // check parent
    const displayOnly = !linkDefinition.component;
    const hasChildren = !!_children.length;
    // permission is access granted,
    // and the link has children or is not a display only
    // if no children and is display only, we should not render it
    (isAccessGranted && (hasChildren || !displayOnly)) && workspaceLinks.push({
      i18nKey: i18nLabel,
      icon,
      pane,
      children: _children,
      displayOnly
    });
    return workspaceLinks;
  }, []);
}
/**
 * Checks the access for a single workspace link
 * @param linkDefinition
 * @param entity
 * @param _context
 * @returns
 */
function _checkWorkspaceLink(linkDefinition, entity, _context) {
  let isAccessGranted;
  const { permissions } = linkDefinition;
  if (!(permissions === null || permissions === void 0 ? void 0 : permissions.length)) {
    throw new Error('getWorkspaceLinks: permissions must be defined on workspace links');
  }
  if (permissions === null || permissions === void 0 ? void 0 : permissions.length) {
    isAccessGranted = permissions.every((permission) => {
      const chk = checkPermission(permission, _context, entity);
      return chk.access;
    });
  }
  return isAccessGranted;
}
