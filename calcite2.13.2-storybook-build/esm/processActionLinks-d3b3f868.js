import { h as hubSearch } from './hubSearch-41612481.js';

/**
 * Given an array of IHubActionLinks, the following util will
 * "pre-process" the action links. This includes:
 *
 * 1. For kind = "content": Fetching the content item, grabbing
 * its site relative href, and transforming the link into an
 * external action link that can be consumed in the UI
 *
 * Note: we can add other pre-processing as necessary
 *
 * @param links hub action links
 * @param requestOptions hub request options
 */
async function processActionLinks(links, requestOptions) {
    const processedActionLinks = await Promise.all(links.map(async (link) => {
        return processActionLink(link, requestOptions);
    }));
    return processedActionLinks;
}
/**
 * Given a single IHubActionLink, the following util will
 * "pre-process" the action link. This includes:
 *
 * 1. For kind = "content": Fetching the content item, grabbing
 * its site relative href, and transforming the link into an
 * external action link that can be consumed in the UI
 *
 * Note: we can add other pre-processing as necessary
 *
 * @param link hub action link
 * @param requestOptions hub request options
 */
async function processActionLink(link, requestOptions) {
    // recursively process nested links
    if (link.kind === "section") {
        link.children = await processActionLinks(link.children, requestOptions);
    }
    if (link.kind === "content") {
        try {
            // 1. query for the content item so we can grab its
            // siteRelative href
            const query = {
                targetEntity: "item",
                filters: [{ predicates: [{ id: link.contentId }] }],
            };
            const { results } = await hubSearch(query, { requestOptions });
            // 2. construct a new "external" action link
            // with the content item's site relative href
            delete link.contentId;
            const processedLink = Object.assign(Object.assign({}, link), { kind: "external", href: results[0].links.siteRelative });
            return processedLink;
        }
        catch (error) {
            throw new Error(`Unable to fetch entity: ${link.contentId}`);
        }
    }
    else {
        return link;
    }
}

export { processActionLink as a, processActionLinks as p };
