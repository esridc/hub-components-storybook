import { getItemGroups } from "@esri/arcgis-rest-portal";
export async function getDefaultCapabilityConfig(options, context) {
  const cat = await getDefaultCapabilityCatalog(options, context);
  return {
    enabled: false,
    catalog: cat
  };
}
export async function getDefaultCapabilityCatalog(options, context) {
  // Default to the entity's content catalog groups, if defined
  // let groups = getContentGroups(options.entity)
  // // if no groups are returned, then get the edit groups of the entity
  // if (!groups.length) {
  //   groups = (await getEntityEditGroups(options.entity, context))
  // }
  const groups = (await getEntityEditGroups(options.entity, context));
  // TODO: one option here is to check the content catalog's scope, and use that as that would work regardless of
  // how the catalog is defined (e.g. more than just groups, but also tags, etc.)
  const catalog = {
    schemaVersion: 1,
    title: "Content",
    scopes: {},
    collections: [
      {
        label: "All",
        key: "all",
        targetEntity: getEntityTypeForCapability(options.capability),
        include: [],
        scope: {
          targetEntity: getEntityTypeForCapability(options.capability),
          filters: []
        }
      },
    ]
  };
  const s = getScopeForCapability(options.capability, groups);
  catalog.scopes[getEntityTypeForCapability(options.capability)] = s;
  return catalog;
}
async function getEntityEditGroups(entity, context) {
  const allGroups = await getItemGroups(entity.id, context.requestOptions);
  const all = [...allGroups.admin, ...allGroups.member, ...allGroups.other];
  return all.filter(group => group.capabilities.includes('updateitemcontrol')).map(group => group.id);
}
// function getContentGroups(entity: HubEntity): string[] {
//   let groups = [];
//   const contentConfig = getProp(entity, "content") as IContentConfig;
//   if (contentConfig) {
//     // get the groups from the item scope
//     groups = getGroupPredicate(contentConfig.catalog.scopes.item).group?.any || [];
//   }
//   return groups;
// }
function getTypePredicate(capability) {
  let p = null;
  switch (capability) {
    case 'projects':
      p = { type: "Hub Project" };
      break;
    case 'initiatives':
      p = { type: "Hub Initiative" };
      break;
    case 'events':
      p = { type: "Hub Event" };
      break;
    case 'pages':
      p = { type: "Hub Page" };
      break;
    case "content":
      // Exclude the hub types
      // TODO: Need to implement this as a well-known predicate
      // which I attempted to do, but ran into two issues:
      // 1. When we replace the predicate, it does the entire object, losing the groups property
      // 2. When a predicate is replaced, hub.js forces the filter.operation to be "OR"
      // which results in `(group) OR (type)` but we need `(group AND type)`
      // To move ahead with the prototype, I'm hardcoding the type predicate here
      p = {
        type: {
          not: [
            "Hub Project",
            "Hub Initiative",
            "Hub Site Application",
            "Hub Event",
            "Hub Page",
            "Discussion",
          ],
        },
      };
      break;
  }
  return p;
}
function getScopeForCapability(capability, groups = []) {
  const scope = {
    targetEntity: getEntityTypeForCapability(capability),
    filters: [
      {
        predicates: [
          {
            group: {
              any: groups
            }
          },
        ]
      }
    ]
  };
  const typePredicate = getTypePredicate(capability);
  if (typePredicate) {
    typePredicate.group = { any: groups };
    scope.filters[0].predicates = [typePredicate]; //.push(typePredicate);// = {...scope.filters[0].predicates[0], ...typePredicate};
  }
  return scope;
}
/**
 * Given a capability, return the entity type used for the queries in the Catalog
 * @param capability
 * @returns
 */
export function getEntityTypeForCapability(capability) {
  let type = "item";
  switch (capability) {
    case 'events':
      type = "event";
      break;
  }
  return type;
}
