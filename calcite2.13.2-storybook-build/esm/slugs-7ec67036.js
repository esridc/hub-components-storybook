import { i as isGuid } from './is-guid-982831aa.js';

// TODO: use these const in other utils
const SLUG_ORG_SEPARATOR_URI = "::";
const SLUG_ORG_SEPARATOR_KEYWORD = "|";
// TODO: work out how to unify content slug fns
// https: github.com/Esri/hub.js/blob/master/packages/common/src/content/index.ts#L301-L348
/**
 * Uri slugs have `::` as a separator, but we need to use `|` in the typeKeywords. This function
 * converts a uri slug to a typeKeyword slug.
 * @param slug
 * @returns
 */
function uriSlugToKeywordSlug(slug) {
    if (slug.indexOf(SLUG_ORG_SEPARATOR_URI) > -1) {
        slug = slug.replace(SLUG_ORG_SEPARATOR_URI, SLUG_ORG_SEPARATOR_KEYWORD);
    }
    return slug;
}
/**
 * Convert a typeKeyword slug to a uri slug. This is the reverse of uriSlugToKeywordSlug
 * @param slug
 * @returns
 */
function keywordSlugToUriSlug(slug) {
    if (slug.indexOf(SLUG_ORG_SEPARATOR_KEYWORD) > -1) {
        slug = slug.replace(SLUG_ORG_SEPARATOR_KEYWORD, SLUG_ORG_SEPARATOR_URI);
    }
    return slug;
}

const SLUG_ID_SEPARATOR = "~";
const TYPEKEYWORD_MAX_LENGTH = 256;
const TYPEKEYWORD_SLUG_PREFIX = "slug";
/**
 * truncate a slug, namespaced to an org and accounting for the 256 character limit
 * of individual typekeywords.
 *
 * @param title
 * @param orgKey
 * @returns
 */
function truncateSlug(slug, orgKey, paddingEnd = 0) {
    // typekeywords have a max length of 256 characters, so we use the slug
    // format that gets persisted in typekeywords as our basis
    return ([
        // add the typekeyword slug prefix
        TYPEKEYWORD_SLUG_PREFIX,
        // add the orgKey segment
        orgKey.toLowerCase(),
        // add the slugified title segment
        slug,
    ]
        .join("|")
        .substring(0, TYPEKEYWORD_MAX_LENGTH - paddingEnd)
        // removing tailing hyphens
        .replace(/-+$/, "")
        // remove typekeyword slug prefix, it's re-added in setSlugKeyword
        .replace(new RegExp(`^${TYPEKEYWORD_SLUG_PREFIX}\\|`), ""));
}
/**
 * get the max length of a slug, accounting for the type keyword prefix and orgKey
 * @param orgKey
 * @returns
 */
function getSlugMaxLength(orgKey) {
    const prefix = `${TYPEKEYWORD_SLUG_PREFIX}|${orgKey}|`;
    return TYPEKEYWORD_MAX_LENGTH - prefix.length;
}
/**
 * parse out the item's id, slug, and org key out of an identifier
 * @param identifier
 * @returns
 */
const parseIdentifier = (identifier) => {
    let orgKey;
    let slug;
    // if identifier is a guid, we just return that as the id below
    let id = isGuid(identifier) && identifier;
    if (!id) {
        // otherwise try parsing id, slug, and org key from the identifier
        let slugParts;
        [slugParts, id] = identifier.split(SLUG_ID_SEPARATOR);
        const match = slugParts.match(new RegExp(`^((.*)${SLUG_ORG_SEPARATOR_URI})?(.*)$`));
        // istanbul ignore next - I think that regex will always match at least the slug
        if (match) {
            orgKey = match[2];
            slug = match[3];
        }
    }
    return {
        id,
        slug,
        orgKey,
    };
};
/**
 * strip org key prefix from a slug and append an id
 * @param slug
 * @param id
 * @returns
 */
const appendIdToSlug = (slug, id) => {
    const slugWithoutOrgKey = slug.split(SLUG_ORG_SEPARATOR_KEYWORD).pop();
    return `${slugWithoutOrgKey}${SLUG_ID_SEPARATOR}${id}`;
};

export { TYPEKEYWORD_SLUG_PREFIX as T, appendIdToSlug as a, getSlugMaxLength as g, keywordSlugToUriSlug as k, parseIdentifier as p, truncateSlug as t, uriSlugToKeywordSlug as u };
