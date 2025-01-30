export async function canAccessWorkspaceView(_action, _entity, _context) {
  // TODO: Simple validation by checking if user can edit the entity
  return {
    canAccess: true,
  };
}
