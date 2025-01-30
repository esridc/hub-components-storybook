import { createId, parseDatasetId } from "@esri/hub-common";
import { isNil } from "./is-nil";
import { ExpressionRelationships } from "../components/arcgis-configuration-editor/components/arcgis-configuration-editor-field/fields/composite/expression-set/resources";
export const STAT_CARD_SCHEMA_VERSION = 1.0;
export function migrateSummaryStatCardSettings(settings = {}, entity) {
  settings = migrateSummaryStatCardSettingsv1(settings, entity);
  return settings;
}
function migrateSummaryStatCardSettingsv1(settings, contentEntity) {
  var _a, _b, _c;
  if (!settings.schemaVersion || settings.schemaVersion !== STAT_CARD_SCHEMA_VERSION) {
    // here we check if we're migrating a card that already has the right config ... such as an alpha-gated manual card
    if (!isNil(settings.type)) {
      settings.schemaVersion = 1.0;
    }
    else {
      const expressionSet = whereToExpressionSet(settings.where);
      const isDataset = !!settings.datasetId;
      const { itemId, layerId } = getItemIdAndLayerId(isDataset, settings);
      const sourceLink = createDynamicSourceLink((_a = contentEntity === null || contentEntity === void 0 ? void 0 : contentEntity.links) === null || _a === void 0 ? void 0 : _a.siteRelative, layerId);
      settings = {
        type: "dynamic",
        cardTitle: settings.title,
        value: "--",
        dynamicMetric: {
          itemId: itemId ? [itemId] : undefined,
          layerId: layerId,
          field: settings.statFieldName || ((_b = settings.statField) === null || _b === void 0 ? void 0 : _b.name),
          fieldType: settings.statFieldType || ((_c = settings.statField) === null || _c === void 0 ? void 0 : _c.type),
          statistic: settings.statType,
          serviceUrl: getServiceUrl(settings.url),
          expressionSet,
          allowExpressionSet: !!expressionSet.length,
          // if we have a where clause, but our expressionSet couldn't be made correctly, then apply the legacy where
          // we'll use the legacy where until the customer uses the expression set instead
          legacyWhere: containsUnsupportedKeywords(settings.where) ? settings.where : undefined,
          sourceLink,
          sourceTitle: contentEntity === null || contentEntity === void 0 ? void 0 : contentEntity.name,
        },
        serverTimeout: settings.timeout,
        textAlign: migrateTextAlign(settings.statValueAlign),
        valueColor: settings.statValueColor === null
          ? undefined
          : settings.statValueColor,
        trailingText: settings.trailingText,
        cardId: settings.cardId || createId(),
        // did not exist on old stat card
        allowUnitFormatting: false,
        allowLink: false,
        allowDynamicLink: shouldShowSource(sourceLink, settings.hideSource),
        schemaVersion: 1.0,
        scale: "l",
      };
    }
  }
  return settings;
}
// if we have source link and we are allowed to show source, true -- otherwise, falses
function shouldShowSource(sourceLink, hideSource) {
  const shouldShowSource = sourceLink && !hideSource;
  return !!shouldShowSource;
}
function getItemIdAndLayerId(isDataset, settings) {
  var _a;
  let itemId = settings.itemId;
  let layerId = (_a = settings.layerId) === null || _a === void 0 ? void 0 : _a.toString();
  // handles old version of stat card where id used to be in datasetId
  // has item id stored in datasetId with layerId added to end
  // ex: a62799dcc06649ec80305ba5a4b0a59c_0
  if (isDataset) {
    const parsed = parseDatasetId(settings.datasetId);
    itemId = parsed.itemId;
    layerId = parsed.layerId;
  }
  return { itemId, layerId };
}
function getServiceUrl(url) {
  let serviceUrl = url;
  // url has layer id at end
  if ((url === null || url === void 0 ? void 0 : url.lastIndexOf("FeatureServer")) > -1) {
    serviceUrl = url.slice(0, url.lastIndexOf("FeatureServer") + 13);
    // url has layer id at end
  }
  else if ((url === null || url === void 0 ? void 0 : url.lastIndexOf("MapServer")) > -1) {
    serviceUrl = url.slice(0, url.lastIndexOf("MapServer") + 9);
  }
  return serviceUrl;
}
function migrateTextAlign(align) {
  switch (align) {
    case "center":
      return "center";
    case "right":
      return "end";
    case "left":
    default:
      return "start";
  }
}
const UNSUPPORTED_LEGACY_QUERY_KEYWORDS = [
  " OR ",
  " CURRENT_TIMESTAMP",
  " IS NULL",
  " is null",
];
function containsUnsupportedKeywords(where) {
  let containsUnsupportedKeyword = false;
  // if we have a clause
  if (where) {
    UNSUPPORTED_LEGACY_QUERY_KEYWORDS.map(keyword => {
      // if where includes an unsupported keyword
      if (where.includes(keyword)) {
        containsUnsupportedKeyword = true;
      }
    });
  }
  return containsUnsupportedKeyword;
}
/**
 * Takes a where clause from a summary statistic card and transforms it into
 * the new expression set array for usage in the new summary stat card.
 *
 * This is a brittle function to be used just for the migration of the <=1.6 of the summary stat card into
 * the 1.7 version of the summary stat card.
 * @param where A where clause as a string. Ex: "Category = 'abc' AND date <= TIMESTAMP '2023-01-01 00:00:00"
 * @returns IExpression[] expression set of the where clause, broken down into individual expressions
 */
function whereToExpressionSet(where) {
  let expressionSet = [];
  if (where) {
    // if we have an unsupported keyword, we can't migrate right now, so we'll use the legacy
    if (containsUnsupportedKeywords(where)) {
      console.error("Cannot migrate original stat card where clause. Converting to legacy.");
      return [];
    }
    ;
    const whereClauses = where.split(" AND ");
    expressionSet = whereClauses
      .map((clause) => {
      // this is really messy and difficult...but necessary to migrate over where clauses
      let expression;
      // could be number or date
      if (clause.includes(">=")) {
        const { fieldName, value } = handleClauseSplit(clause, ">=");
        let finalValue = value;
        let fieldType;
        // handle date
        if (value.includes("TIMESTAMP")) {
          finalValue = handleDateInClause(value);
          fieldType = "esriFieldTypeDate";
        }
        expression = makeExpression(fieldName, fieldType, ExpressionRelationships.BETWEEN, [finalValue]);
      }
      // could be number or date AND value is second in values array
      else if (clause.includes("<=")) {
        const { fieldName, value } = handleClauseSplit(clause, "<=");
        let finalValue = value;
        let fieldType;
        // handle date
        if (value.includes("TIMESTAMP")) {
          finalValue = handleDateInClause(value);
          fieldType = "esriFieldTypeDate";
        }
        expression = makeExpression(fieldName, fieldType, ExpressionRelationships.BETWEEN, [
          undefined,
          finalValue,
        ]);
      }
      // exact string match
      else if (clause.includes("=") && clause !== "1=1") {
        const { fieldName, value } = handleClauseSplit(clause, "=");
        const cleanedValue = removeQuotesAroundValue(value);
        expression = makeExpression(fieldName, "esriFieldTypeString", ExpressionRelationships.IS_EXACTLY, [
          cleanedValue,
        ]);
      }
      // deprecated "like" query that we used 2019 and prior
      else if (clause.includes(ExpressionRelationships.LIKE)) {
        let { fieldName, value } = handleClauseSplit(clause, ExpressionRelationships.LIKE);
        // standardized query like clause looks like
        // UPPER(fieldName)like '%${val}%'
        if (fieldName.includes("UPPER(")) {
          fieldName = removeUpperAroundFieldName(fieldName);
        }
        // clean value
        value = removeQuotesAroundValue(value);
        value = removePercentsAroundValue(value);
        expression = makeExpression(fieldName, "esriFieldTypeString", ExpressionRelationships.LIKE, [
          value
        ]);
      }
      return expression;
    })
      .filter((ex) => !!ex);
  }
  return expressionSet;
}
/**
 * Splits a clause by a given parameter.
 * @param clause String to split into pieces
 * @param splitBy How to split the string
 * @returns The field name and value from the clause, split
 */
function handleClauseSplit(clause, splitBy) {
  const trimmedClause = clause.trim();
  const pieces = trimmedClause.split(splitBy);
  const fieldName = pieces[0].trim();
  const value = pieces[1].trim();
  return { fieldName, value };
}
/**
 * Takes a piece of a where clause with a date in it, and extracts just the YYYY-MM-DD.
 * @param value - where clause piece with value
 * @returns YYYY-MM-DD as string
 */
function handleDateInClause(value) {
  const dateAndTimePieces = value.split("'");
  const dateAndTime = dateAndTimePieces[1].trim();
  const date = dateAndTime.split(" ")[0].trim();
  return date;
}
/**
 * Makes an expression for the expression set.
 * @param fieldName Name of IField
 * @param fieldType Type of IField
 * @param values Values in clause
 * @returns IExpression to be used in an expression set.
 */
function makeExpression(fieldName, fieldType, relationship, values) {
  const field = {
    name: fieldName,
  };
  if (fieldType) {
    field.type = fieldType;
  }
  const expression = {
    field,
    values,
    relationship,
  };
  return expression;
}
/**
 * Removes single quotes around a value. Used to remove the leading and trailing
 * single quotes around a string value for a where clause.
 * @param value string value with single quotes around it
 * @returns string value without leading or trailing single quotes
 */
function removeQuotesAroundValue(value) {
  return value.replace(/^\'+|\'+$/g, "");
}
function removePercentsAroundValue(value) {
  return value.replace(/^\%+|\%+$/g, "");
}
function removeUpperAroundFieldName(fieldName) {
  return fieldName.slice(6, fieldName.length - 1);
}
/**
 * Cretes the dynamic source link from the item
 * using the site relative link and the layerId if we have it.
 * @param linkBase
 * @param layerId
 * @returns
 */
export function createDynamicSourceLink(linkBase, layerId) {
  // add layer id if we have it
  if (linkBase && !isNil(layerId)) {
    linkBase = `${linkBase}_${layerId}`;
  }
  // add query param if we have anything
  if (linkBase) {
    linkBase = `${linkBase}?showData=true`;
  }
  return linkBase;
}
