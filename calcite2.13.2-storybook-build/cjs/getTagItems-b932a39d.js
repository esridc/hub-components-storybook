'use strict';

const types = require('./types-60347c5c.js');
const request = require('./request-67da3c71.js');
const search = require('./search-2db68ef4.js');

/**
 * Fetch the categorySchema for all the categories, including
 * the ones with 0 count, then recursively collet all the child
 * categories on the deepest level.
 *
 * @param orgId The organization id
 * @param hubRequestOptions The hub request options
 * @returns a _nested_ structure of categories
 */
async function fetchCategoryItems(orgId, hubRequestOptions) {
    const url = `${hubRequestOptions.portal}/portals/${orgId}/categorySchema`;
    try {
        const { categorySchema } = await request.request(url, hubRequestOptions);
        // All categories need to be prefixed with "/Categories" to be valid
        return convertCategoryProps(categorySchema[0].categories, "/Categories");
    }
    catch (e) {
        return [];
    }
}
/**
 * Convert the categories into a format that can be used
 * by the IUiSchemaComboboxItem interface
 *
 * @param obj The object to convert
 * @param parentValue The parent value to append to the value
 * @returns the converted object where `title` becomes `value` and `categories` becomes `children`
 */
function convertCategoryProps(arrayOfCategories, parentValue) {
    return arrayOfCategories.map((category) => {
        var _a;
        // If there is a parentValue, we append it to the category title. This follows the schema that ArcGIS Online
        // uses to save categories on items (e.g. `/Categories/path/to/my/category`) and gives this combobox item
        // a unique value to distinguish it from others
        const value = `${parentValue}/${category.title}`;
        // use just the title as the label, so we don't have redundant information visually
        const label = category.title;
        return {
            value,
            label,
            children: ((_a = category.categories) === null || _a === void 0 ? void 0 : _a.length) ? convertCategoryProps(category.categories, value)
                : [],
        };
    });
}

/**
 * Returns the UI schema element needed to render
 * the categories editing control for an entity.
 *
 * @param i18nScope i18n scope for the entity translations
 * @param entity The entity to build the UI schema for
 * @returns the UI schema element for thumbnail editing
 */
async function fetchCategoriesUiSchemaElement(i18nScope, context) {
    const categoryItems = await fetchCategoryItems(context.portal.id, context.hubRequestOptions);
    return [
        {
            labelKey: `shared.fields.categories.label`,
            scope: "/properties/categories",
            type: "Control",
            options: {
                control: "hub-field-input-combobox",
                items: categoryItems,
                allowCustomValues: false,
                selectionMode: "ancestors",
                placeholderIcon: "select-category",
                helperText: {
                    // helper text varies between entity types
                    labelKey: `${i18nScope}.fields.categories.helperText`,
                },
            },
            rules: [
                {
                    effect: types.UiSchemaRuleEffects.DISABLE,
                    conditions: [!categoryItems.length],
                },
            ],
        },
        {
            type: "Notice",
            options: {
                notice: {
                    configuration: {
                        id: "no-categories-notice",
                        noticeType: "notice",
                        closable: false,
                        icon: "exclamation-mark-triangle",
                        kind: "warning",
                        scale: "m",
                    },
                    message: "{{shared.fields.categories.noCategoriesNotice.body:translate}}",
                    autoShow: true,
                    actions: [
                        {
                            label: "{{shared.fields.categories.noCategoriesNotice.link:translate}}",
                            icon: "launch",
                            href: "https://doc.arcgis.com/en/arcgis-online/reference/content-categories.htm",
                            target: "_blank",
                        },
                    ],
                },
            },
            rules: [
                {
                    effect: types.UiSchemaRuleEffects.SHOW,
                    conditions: [!categoryItems.length],
                },
            ],
        },
    ];
}

// import { IHubSearchOptions } from "../../../search/types/IHubSearchOptions";
/**
 * Fetch the entity's org tags (limited to the top 200),
 * merge with any configured on the entity itself, and convert
 * into a format that can be consumed by the combobox field
 *
 * TODO: the search portion of this util should probably
 * be hoisted to hub.js
 */
async function getTagItems(tags, orgId, hubRequestOptions) {
    // TODO: Once we resolve issues consuming hubSearch in Hub.js we can swap back to this approach
    // const query: IQuery = {
    //   targetEntity: "item",
    //   filters: [{ predicates: [{ orgid: orgId }] }],
    // };
    // const opts: IHubSearchOptions = {
    //   aggFields: ["tags"],
    //   num: 0,
    //   aggLimit: 200,
    //   requestOptions: hubRequestOptions,
    // };
    // const {
    //   aggregations: [tagsAgg],
    // } = await hubSearch(query, opts);
    // const {
    //   aggregations: [tagsAgg],
    // } = await Promise.resolve({
    //   aggregations: [{ values: [{ value: "test" }] }],
    // });
    try {
        const so = {
            q: `orgid:${orgId}`,
            countFields: "tags",
            countSize: 200,
            authentication: hubRequestOptions.authentication,
        };
        const response = await search.searchItems(so);
        const [tagsAgg] = response.aggregations.counts.map((entry) => {
            return {
                mode: "terms",
                field: entry.fieldName,
                values: entry.fieldValues,
            };
        });
        /**
         * Because we allow custom tags, we need to merge the existing entity tags
         * and the tags fetched from the orgs, then remove duplicates, filter out
         * any empty values and convert them to the IUiSchemaComboboxItem format
         */
        const entityTags = tags || [];
        return [...new Set([...tagsAgg.values.map((t) => t.value), ...entityTags])]
            .filter((t) => t)
            .map((t) => ({ value: t }));
    }
    catch (e) {
        return [];
    }
}

exports.fetchCategoriesUiSchemaElement = fetchCategoriesUiSchemaElement;
exports.getTagItems = getTagItems;
