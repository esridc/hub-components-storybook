import { CatalogSchema } from "@esri/hub-common";
import { EVENT_PREDICATE_PROPERTIES, ITEM_PREDICATE_PROPERTIES } from "../arcgis-hub-predicates-builder/types";
import { ListEditModeTypes } from "../../list/resources";
import { dictionary } from "@esri/telemetry-dictionary-hub";
export const CATALOG_BUILDER_SCHEMA = CatalogSchema;
export const buildCatalogBuilderUiSchema = (opts) => {
  const { targetEntity, callbacks, intl } = opts;
  let collectionPredicateProperties;
  // for collection predicates, we filter out predicate
  // properties that are options when configuring the
  // target entity's scope
  switch (targetEntity) {
    case "item":
      collectionPredicateProperties = ITEM_PREDICATE_PROPERTIES.filter((prop) => prop !== "group");
      break;
    case "event":
      collectionPredicateProperties = EVENT_PREDICATE_PROPERTIES.filter((prop) => prop !== "group");
      break;
  }
  return {
    type: "Layout",
    elements: [
      {
        type: "Section",
        label: intl.t("source.heading"),
        options: {
          helperText: {
            label: intl.t("source.description"),
          }
        },
        elements: [
          {
            scope: `/properties/scopes/properties/${targetEntity}`,
            type: "Control",
            options: {
              control: "arcgis-hub-query-builder",
              targetEntity,
              availablePredicateProperties: ["group"],
              callbacks,
            }
          },
        ]
      },
      {
        type: "Section",
        label: intl.t("collections.section.heading"),
        options: {
          helperText: {
            label: intl.t("collections.description"),
          }
        },
        elements: [
          {
            scope: "/properties/collections",
            type: "Control",
            options: {
              control: "hub-field-input-list",
              // enables the flow mode when editing an collection
              editMode: ListEditModeTypes.FLOW,
              // the current target entity we're working with
              targetEntity,
              // the title of the flow
              flowTitle: intl.t("collections.heading"),
              // when we don't have a label on a collection yet
              defaultEditLabel: intl.t("collections.editLabel"),
              // allows us to insert a flow item into the calcite-flow at top level
              calciteFlowRefCallback: callbacks === null || callbacks === void 0 ? void 0 : callbacks.calciteFlowRefCallback,
              // enables the edit experience for a single collection
              allowEdit: true,
              // enables the add button to add new collections
              allowAdd: true,
              // telemetry that fires when a new collection is added
              addItemTelemetry: dictionary.category.interaction.action.select.label.newCollection,
              // enables the draggable icon
              allowReorder: true,
              // enables the visibility icon
              allowHide: true,
              // allows the hidden state to be stored separately of where the edit values are stored
              hiddenEditProp: "displayConfig",
              // lets us use a custom label for the add button
              addItemLabel: intl.t("collections.addLabel"),
              // allows us to wrap our values in a _config property, which allows us to use a composite field as the edit uiSchema
              scopeWrapperProp: "_config",
              // the info needed for the schema and uiSchema in the edit experience
              editSchema: {
                type: "object",
                properties: {
                  _config: { type: "object" },
                }
              },
              editUiSchema: {
                type: "Layout",
                elements: [
                  {
                    scope: "/properties/_config",
                    type: "Control",
                    options: {
                      control: "arcgis-hub-collections-builder",
                      targetEntity,
                      availablePredicateProperties: collectionPredicateProperties,
                      callbacks,
                    }
                  }
                ]
              }
            }
          }
        ]
      },
      {
        type: "Section",
        label: intl.t("appearance.heading"),
        options: {
          section: "block",
          open: true
        },
        elements: [
          {
            scope: "/properties/displayConfig",
            type: "Control",
            options: {
              control: "arcgis-hub-catalog-appearance-builder",
              helperText: { label: intl.t("appearance.helperText") },
              callbacks,
              targetEntity,
            }
          }
        ]
      }
    ]
  };
};
