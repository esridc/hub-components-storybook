'use strict';

const app = [
    "Application",
    "City Engine Web Scene",
    "CityEngine Web Scene",
    "Dashboard",
    "Insights Page",
    "Insights Workbook",
    "Operation View",
    "Web Mapping Application",
    "StoryMap",
    "Web Experience",
    "Urban Model",
];
const dataset = [
    "CSV Collection",
    "CSV",
    "Feature Collection Template",
    "Feature Collection",
    "Feature Layer",
    "Feature Service",
    "File Geodatabase",
    "GeoJSON",
    "GeoJson",
    "KML Collection",
    "KML",
    "Microsoft Excel",
    "Raster Layer",
    "Shapefile",
    "Stream Service",
    "Table",
];
const document = [
    "CAD Drawing",
    "Document Link",
    "Hub Page",
    "Site Page",
    "Image",
    "iWork Keynote",
    "iWork Numbers",
    "iWork Pages",
    "Microsoft Powerpoint",
    "Microsoft Visio",
    "Microsoft Word",
    "Notebook",
    "PDF",
    "Pro Map",
    "Report Template",
];
const event = ["Hub Event"];
const feedback = ["Form", "Quick Capture Project"];
const initiative = ["Hub Initiative"];
const solution = ["Solution"];
const template = ["Hub Initiative Template"];
const map = [
    "Image Collection",
    "Image Service",
    "Map Service Layer",
    "Map Service",
    "Scene Service",
    "Scene Layer",
    "Vector Tile Service",
    "Web Map Service",
    "Web Map Tile Service",
    "Web Map",
    "Web Scene",
    "WFS",
    "WMS",
    "WMTS",
];
const other = [
    "360 VR Experience",
    "3DTiles Package",
    "3DTiles Service",
    "API Key",
    "Activity",
    "Addin Package",
    "Administrative Report",
    "AllSource Project",
    "Analysis Model",
    "Apache Parquet",
    "App Bundle",
    "AppBuilder Extension",
    "AppBuilder Widget Package",
    "Application Configuration",
    "Application SDK",
    "ArcGIS Pro Add In",
    "ArcGIS Pro Configuration",
    "ArcPad Package",
    "Arcade Module",
    "Basemap Package",
    "Big Data Analytic",
    "Big Data File Share",
    "Code Attachment",
    "Code Sample",
    "Color Set",
    "Compact Tile Package",
    "Content Category Set",
    "Data Package Collection",
    "Data Pipeline",
    "Data Store",
    "Deep Learning Package",
    "Deep Learning Studio Project",
    "Desktop Add In",
    "Desktop Application",
    "Desktop Application Template",
    "Desktop Style",
    "Earth Configuration",
    "Esri Classification Schema",
    "Esri Classifier Definition",
    "Excalibur Imagery Project",
    "Experience Builder Widget",
    "Experience Builder Widget Package",
    "Explorer Add In",
    "Explorer Layer",
    "Explorer Map",
    "Export Package",
    "Featured Items",
    "Feed",
    "GML",
    "GeoBIM Application",
    "GeoBIM Project",
    "GeoPackage",
    "Geocoding Service",
    "Geodata Service",
    "Geoenrichment Service",
    "Geometry Service",
    "Geoprocessing Package",
    "Geoprocessing Sample",
    "Geoprocessing Service",
    "Globe Document",
    "Globe Service",
    "Group Layer",
    "IPS Configuration",
    "Indoors Map Configuration",
    "Insights Data Engineering Model",
    "Insights Data Engineering Workbook",
    "Insights Model",
    "Insights Script",
    "Insights Theme",
    "Insights Workbook Package",
    "Kernel Gateway Connection",
    "Knowledge Graph",
    "Knowledge Graph Layer",
    "Knowledge Graph Web Investigation",
    "Knowledge Studio Project",
    "Layer",
    "Layer File",
    "Layer Package",
    "Layer Template",
    "Layout",
    "Legend",
    "Living Atlas Export Package",
    "Locator Package",
    "Map Area",
    "Map Document",
    "Map Package",
    "Map Service Definition",
    "Map Template",
    "Media Layer",
    "Mission",
    "Mission Report",
    "Mission Template",
    "Mobile Application",
    "Mobile Basemap Package",
    "Mobile Map Package",
    "Mobile Scene Package",
    "Native Application",
    "Native Application Installer",
    "Native Application Template",
    "Network Analysis Service",
    "Notebook Code Snippet Library",
    "Notebook Code Snippets",
    "OGCFeatureServer",
    "Operations Dashboard Add In",
    "Operations Dashboard Extension",
    "Oriented Imagery Catalog",
    "Ortho Mapping Project",
    "Ortho Mapping Template",
    "Pro Presentation",
    "Pro Project",
    "Pro Report",
    "Pro Report Template",
    "Project Package",
    "Project Template",
    "Published Map",
    "QuickCapture Project",
    "Raster Function Template",
    "Real Time Analytic",
    "Reality Mapping Project",
    "Reality Studio Project",
    "Relational Database Connection",
    "Replication Package",
    "Rule Package",
    "SMX Item",
    "SMX Map",
    "SMX Theme",
    "SQLite Geodatabase",
    "Scene Document",
    "Scene Package",
    "Scene Package Part",
    "Server",
    "Service Definition",
    "Statistical Data Collection",
    "StoryMap Theme",
    "Style",
    "Suitability Model",
    "Survey123 Add In",
    "Symbol Service",
    "Symbol Set",
    "Task File",
    "Tile Package",
    "Urban Project",
    "User License Type Extension",
    "Vector Tile Package",
    "Video Service",
    "Viewer Configuration",
    "Visio Document",
    "WCS",
    "Web AppBuilder Widget",
    "Web Experience Template",
    "Web Link Chart",
    "Windows Mobile Package",
    "Windows Viewer Add In",
    "Workflow",
    "Workflow Manager Package",
    "Workflow Manager Service",
    "Workforce Project",
    "netCDF",
];
const site = ["Hub Site Application", "Site Application"];
/**
 * Get the Hub collection for a given item type
 * @param itemType The ArcGIS [item type](https://developers.arcgis.com/rest/users-groups-and-items/items-and-item-types.htm).
 * @returns the Hub collection of a given item type.
 * @private
 */
const getCollection = (type) => {
    if (!type) {
        return;
    }
    const lowerCaseType = type.toLocaleLowerCase();
    return Object.keys(collections).find((key) => {
        const collectionTypes = collections[key];
        return collectionTypes.some((t) => t.toLocaleLowerCase() === lowerCaseType);
    });
};
/**
 * The converse of getCollection, returns associated types of provided collection
 * @param collection The Hub collection
 * @returns An array of types, or undefined if collection is not found
 * @private
 */
const getCollectionTypes = (collection) => {
    if (!collection) {
        return;
    }
    const lowerCaseCollection = collection.toLocaleLowerCase();
    return collections[lowerCaseCollection];
};
// TODO: remove this when we remove the deprecated categories
// and then move the above arrays and getCollection() logic to get-family
const collections = {
    app,
    dataset,
    document,
    event,
    feedback,
    initiative,
    template,
    solution,
    map,
    other,
    site,
};

// private helper functions
function collectionToFamily(collection) {
    const overrides = {
        other: "content",
        solution: "template",
    };
    return overrides[collection] || collection;
}
/**
 * return the Hub family given an item's type
 * @param type item type
 * @returns Hub family
 */
function getFamily(type) {
    let family;
    // override default behavior for the rows that are highlighted in yellow here:
    // https://esriis.sharepoint.com/:x:/r/sites/ArcGISHub/_layouts/15/Doc.aspx?sourcedoc=%7BADA1C9DC-4F6C-4DE4-92C6-693EF9571CFA%7D&file=Hub%20Routes.xlsx&nav=MTBfe0VENEREQzI4LUZFMDctNEI0Ri04NjcyLThCQUE2MTA0MEZGRn1fezIwMTIwMEJFLTA4MEQtNEExRC05QzA4LTE5MTAzOUQwMEE1RH0&action=default&mobileredirect=true&cid=df1c874b-c367-4cea-bc13-7bebfad3f2ac
    switch (type.toLowerCase()) {
        // NOTE: we really want to put tiled image services in the maps family
        // but we would need the typekeywords to differentiate them
        // for now send them to the maps route here:
        // https://github.com/ArcGIS/opendata-ui/blob/cdc0dac6b7e8c43afaa60ae219393a7d3aaa7433/packages/ember-arcgis-hub-components/addon/utils/content-routes.js#L39-L44
        case "image service":
            family = "dataset";
            break;
        case "feature service":
        case "raster layer":
            // TODO: check if feature service has > 1 layer first?
            family = "map";
            break;
        case "microsoft excel":
            family = "document";
            break;
        case "cad drawing":
        case "feature collection template":
        case "report template":
            family = "content";
            break;
        case "hub project":
            family = "project";
            break;
        case "discussion":
            family = "discussion";
            break;
        case "event":
            family = "event";
            break;
        case "hub initiative":
            family = "initiative";
            break;
        default:
            // by default derive from collection
            family = collectionToFamily(getCollection(type));
    }
    return family;
}
/**
 * return the types associated with a provided Hub Family
 * Overrides are provided to match getFamily implementation
 * @param type item type
 * @returns Hub family
 */
function getFamilyTypes(family) {
    let types;
    // override default behavior for the rows that are highlighted in yellow here:
    // https://esriis.sharepoint.com/:x:/r/sites/ArcGISHub/_layouts/15/Doc.aspx?sourcedoc=%7BADA1C9DC-4F6C-4DE4-92C6-693EF9571CFA%7D&file=Hub%20Routes.xlsx&nav=MTBfe0VENEREQzI4LUZFMDctNEI0Ri04NjcyLThCQUE2MTA0MEZGRn1fezIwMTIwMEJFLTA4MEQtNEExRC05QzA4LTE5MTAzOUQwMEE1RH0&action=default&mobileredirect=true&cid=df1c874b-c367-4cea-bc13-7bebfad3f2ac
    switch (family.toLowerCase()) {
        case "content":
            types = getCollectionTypes("other");
            types = types.concat([
                "CAD Drawing",
                "Feature Collection Template",
                "Report Template",
            ]);
            break;
        case "template":
            types = [
                ...getCollectionTypes("template"),
                ...getCollectionTypes("solution"),
            ];
            break;
        case "dataset":
            types = getCollectionTypes(family.toLowerCase()).filter((type) => type !== "Feature Collection Template" &&
                // Changed as part of https://confluencewikidev.esri.com/x/KYJuDg
                // Remove when reclassification has been completed
                // type !== "Feature Service" &&
                type !== "Raster Layer" &&
                type !== "Microsoft Excel");
            types = types.concat("Image Service");
            break;
        case "map":
            types = getCollectionTypes(family.toLowerCase()).filter((type) => type !== "Image Service");
            types = types.concat([
                // Changed as part of https://confluencewikidev.esri.com/x/KYJuDg
                // Remove when reclassification has been completed
                // "Feature Service",
                "Raster Layer",
            ]);
            break;
        case "document":
            types = getCollectionTypes(family.toLowerCase()).filter((type) => type !== "CAD Drawing" && type !== "Report Template");
            types = types.concat("Microsoft Excel");
            break;
        case "project":
            types = ["Hub Project"];
            break;
        case "discussion":
            types = ["Discussion"];
            break;
        case "initiative":
            types = ["Hub Initiative"];
            break;
        default:
            types = getCollectionTypes(family.toLowerCase());
    }
    return types;
}

exports.collections = collections;
exports.getCollection = getCollection;
exports.getFamily = getFamily;
exports.getFamilyTypes = getFamilyTypes;
