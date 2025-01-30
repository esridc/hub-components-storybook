import { getAssociationStats, getReferencedEntityIds, getTypeFromEntity, MetricVisibility } from "@esri/hub-common";
/** type-specific about view components */
export const ABOUT_VIEWS = [
  {
    name: 'about',
    entities: ['event'],
    component: 'arcgis-hub-event-about',
  },
  {
    name: 'about',
    entities: ['project'],
    component: 'arcgis-hub-project-about',
  },
  {
    name: 'about',
    entities: ['initiative'],
    component: 'arcgis-hub-initiative-about',
  }
];
/** type-specific hero components */
export const HERO_VIEWS = [
  {
    name: 'hero',
    entities: ['event'],
    component: 'arcgis-hub-event-hero'
  },
  {
    name: 'hero',
    entities: ['initiative'],
    component: 'arcgis-hub-initiative-hero'
  }
];
/** type-specific view components */
export const getTypeSpecificViewConfigs = async (entity, context) => {
  var _a, _b;
  const type = getTypeFromEntity(entity);
  const configs = [
    {
      name: 'content',
      entities: ['group'],
      i18nLabel: 'tabs.content',
      component: 'arcgis-hub-entity-group-content',
    },
    {
      name: 'members',
      entities: ['group'],
      i18nLabel: 'tabs.members',
      component: 'arcgis-hub-entity-group-members',
    }
  ];
  // entity metrics view
  const metricDisplays = ((_b = (_a = entity === null || entity === void 0 ? void 0 : entity.view) === null || _a === void 0 ? void 0 : _a.metricDisplays) === null || _b === void 0 ? void 0 : _b.filter((display) => (display === null || display === void 0 ? void 0 : display.visibility) !== MetricVisibility.hidden)) || [];
  configs.push({
    name: 'metrics',
    entities: ['project', 'initiative'],
    i18nLabel: 'tabs.metrics',
    component: 'arcgis-hub-entity-metrics-view',
    isVisible: [!!metricDisplays.length]
  });
  // initiative's associated projects view
  if (type === 'initiative') {
    // check if there are any associated entities
    const { associated } = await getAssociationStats(entity, "project", context);
    configs.push({
      name: 'projects',
      entities: ['initiative'],
      isVisible: ['hub:project:associations', !!associated],
      i18nLabel: 'tabs.projects',
      component: 'arcgis-hub-initiative-projects-view',
    });
  }
  // project's associated initiatives view
  if (type === 'project') {
    // check if there are any referenced entities
    const haveReferencedEntities = getReferencedEntityIds(entity).length > 0;
    // if there are then we need to check if there are any associated entities
    const { associated } = haveReferencedEntities && await getAssociationStats(entity, "initiative", context);
    configs.push({
      name: 'initiatives',
      entities: ['project'],
      isVisible: ['hub:project:associations', !!associated],
      i18nLabel: 'tabs.initiatives',
      component: 'arcgis-hub-project-initiatives-view',
    });
  }
  return configs;
};
