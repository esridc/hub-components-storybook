'use strict';

const util = require('./util-38e73510.js');

/**
 * @private
 * Get the major version from a semantic version string
 *
 * @param version dot delimited semantic version
 * @returns the major version of the semantic version
 */
function getMajorVersion(version) {
    return version.split(".")[0];
}

/**
 * Trigger a manual update to reharvest each public item within a site's catalog.
 * This should only be used when search metadata has gotten out of sync despite
 * the nightly reharvest.
 *
 * @param siteId site's catalog to reharvest
 * @param context
 * @returns Job info for each group whose content is being harvested
 */
async function reharvestSiteCatalog(siteId, context) {
    const apiHost = context.hubUrl;
    const url = `${apiHost}/api/v3/jobs/site/${siteId}/harvest`;
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: context.hubRequestOptions.authentication.token,
        },
    };
    return fetch(url, options)
        .then((result) => result.json())
        .then((rawResult) => {
        const result = {};
        if (rawResult.groups) {
            result.groups = rawResult.groups;
        }
        if (rawResult.message) {
            result.error = rawResult;
        }
        return result;
    });
}

/**
 * Returns the default templates for each supported major version of each feed format
 */
function getDefaultTemplates() {
    return {
        "dcat-us": {
            "1": DCAT_US_1X_DEFAULT,
            "3": DCAT_US_3X_DEFAULT,
        },
        "dcat-ap": {
            "2": DCAT_AP_2XX_DEFAULT,
        },
        rss: {
            "2": RSS_2X_DEFAULT,
        },
    };
}
const DCAT_US_1X_DEFAULT = {
    title: "{{name}}",
    description: "{{description}}",
    keyword: "{{tags}}",
    issued: "{{created:toISO}}",
    modified: "{{modified:toISO}}",
    publisher: {
        name: "{{source}}",
    },
    contactPoint: {
        fn: "{{owner}}",
        hasEmail: "{{orgContactEmail}}",
    },
    spatial: "{{extent}}",
};
const DCAT_US_3X_DEFAULT = {
    "dct:title": "{{ name}}",
    "dct:description": "{{ description}}",
    "dct:issued": {
        "@value": "{{ metadata.metadata.dataIdInfo.idCitation.date.pubDate:toISO || metadata.metadata.dataIdInfo.idCitation.date.createDate:toISO || created:toISO }}",
        "@type": "xsd:dateTime",
    },
};
const DCAT_AP_2XX_DEFAULT = {
    "dct:title": "{{name}}",
    "dct:description": "{{description}}",
    "dcat:contactPoint": {
        "vcard:fn": "{{owner}}",
        "vcard:hasEmail": "{{orgContactEmail}}",
    },
};
const RSS_2X_DEFAULT = {
    channel: {
        title: "{{name}}",
        description: "{{searchDescription}}",
        link: "{{siteUrl}}",
        language: "{{culture}}",
        category: "{{categories}}",
        item: {
            title: "{{name}}",
            description: "{{searchDescription}}",
            author: "{{orgContactEmail}}",
            category: "{{categories}}",
            pubDate: "{{created:toUTC}}",
        },
    },
};

/**
 * Get the feed template for a given feed format and version, accounting
 * for version fallbacks and default templates as necessary.
 * @param opts.feedConfig - the raw feeds configuration object
 * @param opts.format - the feed format
 * @param opts.version - the feed version
 * @returns a feed template object
 */
function getFeedTemplate(opts) {
    const { feedsConfig, format, version } = opts;
    let configuredTemplate;
    if (format === "dcat-us") {
        configuredTemplate = getDcatUsConfig(feedsConfig, version);
    }
    else if (format === "dcat-ap") {
        configuredTemplate = getDcatApConfig(feedsConfig, version);
    }
    else if (format === "rss") {
        configuredTemplate = getRssConfig(feedsConfig, version);
    }
    else {
        throw new Error("Unsupported feed format");
    }
    return configuredTemplate || getDefaultTemplate(format, version);
}
function getDefaultTemplate(format, version) {
    const majorVersion = getMajorVersion(version);
    const defaultTemplates = getDefaultTemplates();
    return util.cloneObject(defaultTemplates[format][majorVersion]);
}
function getDcatApConfig(feedsConfig, version) {
    if (getMajorVersion(version) === "2") {
        return feedsConfig.dcatAP2XX || feedsConfig.dcatAP201;
    }
    throw new Error("Unsupported DCAT AP version");
}
function getDcatUsConfig(feedsConfig, version) {
    if (getMajorVersion(version) === "1") {
        return feedsConfig.dcatUS1X || feedsConfig.dcatUS11;
    }
    if (getMajorVersion(version) === "3") {
        return feedsConfig.dcatUS3X;
    }
    throw new Error("Unsupported DCAT US version");
}
function getRssConfig(feedsConfig, version) {
    if (getMajorVersion(version) === "2") {
        return feedsConfig.rss2;
    }
    throw new Error("Unsupported RSS version");
}

/**
 * Sets the feed template for a given feed format and version. Always use this function
 * to update feed templates rather than interacting with the feeds configuration object directly.
 * @param opts.feedsConfig - the raw feeds configuration object
 * @param opts.format - the feed format
 * @param opts.version - the feed version
 * @param opts.updatedTemplate - the updated feed template
 * @returns a new feeds configuration object with the updated template
 */
function setFeedTemplate(opts) {
    const { feedsConfig, format, version, updatedTemplate } = opts;
    const updatedConfig = util.cloneObject(feedsConfig);
    if (format === "dcat-us") {
        setDcatUsConfig(updatedConfig, version, updatedTemplate);
    }
    else if (format === "dcat-ap") {
        setDcatApConfig(updatedConfig, version, updatedTemplate);
    }
    else if (format === "rss") {
        setRssConfig(updatedConfig, version, updatedTemplate);
    }
    else {
        throw new Error("Unsupported feed format");
    }
    return updatedConfig;
}
function setDcatApConfig(feedsConfig, version, config) {
    if (getMajorVersion(version) === "2") {
        feedsConfig.dcatAP2XX = config;
        return;
    }
    throw new Error("Unsupported DCAT AP Version");
}
function setDcatUsConfig(feedsConfig, version, config) {
    if (getMajorVersion(version) === "1") {
        feedsConfig.dcatUS1X = config;
        return;
    }
    if (getMajorVersion(version) === "3") {
        feedsConfig.dcatUS3X = config;
        return;
    }
    throw new Error("Unsupported DCAT US Version");
}
function setRssConfig(feedsConfig, version, config) {
    if (getMajorVersion(version) === "2") {
        feedsConfig.rss2 = config;
        return;
    }
    throw new Error("Unsupported RSS Version");
}

/**
 * Preview a feed using the provided template and context
 * @param opts.format - the feed format
 * @param opts.version - the feed version
 * @param opts.previewTemplate - the feed template to preview
 * @param opts.previewHubId - the Hub ID to preview the feed for
 * @param opts.context - the ArcGIS context
 * @returns the previewed feed as a string
 */
async function previewFeed(opts) {
    const { format, version, previewHubId, context } = opts;
    const stringifiedTemplate = JSON.stringify(opts.previewTemplate);
    const baseUrl = `${context.hubUrl}/api/feed/${format}/${version}`;
    const searchParams = new URLSearchParams();
    searchParams.set("id", previewHubId);
    // The feeds api has different query parameters for rss and dcat feeds
    const isRSS = format === "rss";
    searchParams.set(isRSS ? "rssConfig" : "dcatConfig", stringifiedTemplate);
    const response = await fetch(`${baseUrl}?${searchParams.toString()}`);
    if (!response.ok) {
        throw new Error(`Failed to preview feed: ${response.statusText}`);
    }
    let preview;
    if (isRSS) {
        // RSS feeds are returned as XML text rather than JSON
        const asText = await response.text();
        preview = decodeURIComponent(asText);
    }
    else {
        const asJson = await response.json();
        preview = JSON.stringify(asJson, null, 2);
    }
    return preview;
}

exports.getFeedTemplate = getFeedTemplate;
exports.getMajorVersion = getMajorVersion;
exports.previewFeed = previewFeed;
exports.reharvestSiteCatalog = reharvestSiteCatalog;
exports.setFeedTemplate = setFeedTemplate;
