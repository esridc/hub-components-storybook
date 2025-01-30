'use strict';

/**
 * @internal
 * Naieve implementation to merge two queries into one. This
 * simply combines the filters of the two queries. It does not attempt
 * to disabiguate the filters or predicates. It is up to the caller
 * to ensure that the queries are compatible and don't result in a null set
 * of results.
 * @param queries
 * @returns
 */
const combineQueries = (queries) => {
    // remove any entries that are null or undefined
    queries = queries.filter((e) => e);
    // check tht all queries are for the same entity type
    const targetEntity = queries[0].targetEntity;
    if (queries.some((q) => q.targetEntity !== targetEntity)) {
        throw new Error("Cannot combine queries for different entity types");
    }
    // combine the filters from all the queries
    const filters = queries.reduce((acc, q) => [...acc, ...q.filters], []);
    const result = {
        targetEntity,
        filters,
    };
    return result;
};

/**
 * @private
 * Given a type (e.g. "Hub Site Application") return the appropriate entity type
 * that can be used as a `targetEntity` in an `IQuery`
 * @param type
 * @returns
 */
function getEntityTypeFromType(type) {
    // Default to item, as it's the most common
    let etype = "item";
    // Some are just downcased, so we can check them with an array
    if (["group", "event", "user", "channel"].includes(type.toLowerCase())) {
        etype = type.toLocaleLowerCase();
    }
    // Group Member is just weird
    if (type.toLowerCase() === "group member") {
        etype = "groupMember";
    }
    return etype;
}

/**
 * @private
 * Construct an IQuery to fetch a set of items by type(s)
 * with a specified typeKeyword. Note: if an array of types
 * is provided, they must be the same underlying target
 * entity type.
 *
 * @param itemType - The type(s) of item to fetch
 * @param keyword - The typeKeyword to filter by
 * @returns
 */
function getTypeWithKeywordQuery(itemType, keyword) {
    const targetEntity = typeof itemType === "string"
        ? getEntityTypeFromType(itemType)
        : getEntityTypeFromType(itemType[0]);
    return {
        targetEntity,
        filters: [
            {
                operation: "AND",
                predicates: [
                    {
                        type: itemType,
                        typekeywords: [keyword],
                    },
                ],
            },
        ],
    };
}

exports.combineQueries = combineQueries;
exports.getEntityTypeFromType = getEntityTypeFromType;
exports.getTypeWithKeywordQuery = getTypeWithKeywordQuery;
