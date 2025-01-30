// TODO: use this in opendata-ui
export const isValidEntityType = (entity) => {
  const validEntities = [
    'site',
    'project',
    'initiative',
    'page',
    'discussion',
    'content',
    'org',
    'initiativeTemplate',
    'survey',
  ];
  return !!entity && validEntities.includes(entity);
};
