'use strict';

/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
/**
 * All Hub families
 */
const HubFamilies = [
    "app",
    "content",
    "dataset",
    "document",
    "event",
    "feedback",
    "initiative",
    "map",
    "people",
    "site",
    "team",
    "template",
    "project",
    "channel",
    "discussion",
    "eventAttendee",
];
/**
 * BEGIN CONTENT UPLOAD RELATED TYPES
 * Please note that the below enum/types are duplicated from the AGO
 * content upload modal. They were brought over for forward compability purposes and changes
 * to them may impact how our content upload works.
 */
/**
 * ENUM which defines File extensions.
 */
exports.FileExtension = void 0;
(function (FileExtension) {
    FileExtension["aptx"] = "aptx";
    FileExtension["bpk"] = "bpk";
    FileExtension["csv"] = "csv";
    FileExtension["eaz"] = "eaz";
    FileExtension["esriaddin"] = "esriaddin";
    FileExtension["esriaddinx"] = "esriaddinx";
    FileExtension["doc"] = "doc";
    FileExtension["docx"] = "docx";
    FileExtension["dlpk"] = "dlpk";
    FileExtension["featurecollection"] = "featurecollection";
    FileExtension["geojson"] = "geojson";
    FileExtension["gcpk"] = "gcpk";
    FileExtension["gpk"] = "gpk";
    FileExtension["gpkg"] = "gpkg";
    FileExtension["gpkx"] = "gpkx";
    FileExtension["insightswbk"] = "insightswbk";
    FileExtension["ipynb"] = "ipynb";
    FileExtension["jpg"] = "jpg";
    FileExtension["jpeg"] = "jpeg";
    FileExtension["json"] = "json";
    FileExtension["key"] = "key";
    FileExtension["kml"] = "kml";
    FileExtension["kmz"] = "kmz";
    FileExtension["lpk"] = "lpk";
    FileExtension["lpkx"] = "lpkx";
    FileExtension["lyr"] = "lyr";
    FileExtension["lyrx"] = "lyrx";
    FileExtension["mapx"] = "mapx";
    FileExtension["mmpk"] = "mmpk";
    FileExtension["mpk"] = "mpk";
    FileExtension["mpkx"] = "mpkx";
    FileExtension["msd"] = "msd";
    FileExtension["mspk"] = "mspk";
    FileExtension["mxd"] = "mxd";
    FileExtension["ncfg"] = "ncfg";
    FileExtension["nmc"] = "nmc";
    FileExtension["nmf"] = "nmf";
    FileExtension["numbers"] = "numbers";
    FileExtension["pages"] = "pages";
    FileExtension["pagx"] = "pagx";
    FileExtension["parquet"] = "parquet";
    FileExtension["pdf"] = "pdf";
    FileExtension["pmf"] = "pmf";
    FileExtension["png"] = "png";
    FileExtension["ppkx"] = "ppkx";
    FileExtension["ppt"] = "ppt";
    FileExtension["pptx"] = "pptx";
    FileExtension["proconfigx"] = "proconfigx";
    FileExtension["rpk"] = "rpk";
    FileExtension["rptx"] = "rptx";
    FileExtension["sd"] = "sd";
    FileExtension["slpk"] = "slpk";
    FileExtension["spk"] = "spk";
    FileExtension["stylx"] = "stylx";
    FileExtension["surveyaddin"] = "surveyaddin";
    FileExtension["sxd"] = "sxd";
    FileExtension["tif"] = "tif";
    FileExtension["tiff"] = "tiff";
    FileExtension["tpk"] = "tpk";
    FileExtension["tpkx"] = "tpkx";
    FileExtension["vsd"] = "vsd";
    FileExtension["vtpk"] = "vtpk";
    FileExtension["wmpk"] = "wmpk";
    FileExtension["wpk"] = "wpk";
    FileExtension["xls"] = "xls";
    FileExtension["xml"] = "xml";
    FileExtension["xlsx"] = "xlsx";
    FileExtension["zip"] = "zip";
    FileExtension["3dd"] = "3dd";
    FileExtension["3vr"] = "3vr";
    FileExtension["3ws"] = "3ws";
    FileExtension["rft.json"] = "rft.json";
    FileExtension["rft.xml"] = "rft.xml";
})(exports.FileExtension || (exports.FileExtension = {}));
/**
 * ENUM which defines human readable Item Type names
 * DO **NOT** UPDATE THIS ENUM W/O RESOLVING https://devtopia.esri.com/dc/hub/issues/6990
 */
exports.ItemType = void 0;
(function (ItemType) {
    ItemType["360 VR Experience"] = "360 VR Experience";
    ItemType["Apache Parquet"] = "Apache Parquet";
    ItemType["AppBuilder Widget Package"] = "AppBuilder Widget Package";
    ItemType["Desktop Add In"] = "Desktop Add In";
    ItemType["Explorer Add In"] = "Explorer Add In";
    ItemType["Explorer Map"] = "Explorer Map";
    ItemType["Explorer Layer"] = "Explorer Layer";
    ItemType["Windows Mobile Package"] = "Windows Mobile Package";
    ItemType["ArcGIS Pro Add In"] = "ArcGIS Pro Add In";
    ItemType["ArcGIS Pro Configuration"] = "ArcGIS Pro Configuration";
    ItemType["Globe Document"] = "Globe Document";
    ItemType["Map Document"] = "Map Document";
    ItemType["ArcPad Package"] = "ArcPad Package";
    ItemType["Published Map"] = "Published Map";
    ItemType["Scene Document"] = "Scene Document";
    ItemType["CityEngine Web Scene"] = "CityEngine Web Scene";
    ItemType["Code Sample"] = "Code Sample";
    ItemType["CSV Collection"] = "CSV Collection";
    ItemType["CSV"] = "CSV";
    ItemType["CAD Drawing"] = "CAD Drawing";
    ItemType["Deep Learning Package"] = "Deep Learning Package";
    ItemType["Desktop Application"] = "Desktop Application";
    ItemType["Desktop Application Template"] = "Desktop Application Template";
    ItemType["Desktop Style"] = "Desktop Style";
    ItemType["Earth Configuration"] = "Earth Configuration";
    ItemType["Feature Collection"] = "Feature Collection";
    ItemType["File Geodatabase"] = "File Geodatabase";
    ItemType["GeoJson"] = "GeoJson";
    ItemType["Geoprocessing Package"] = "Geoprocessing Package";
    ItemType["GeoPackage"] = "GeoPackage";
    ItemType["Geoprocessing Sample"] = "Geoprocessing Sample";
    ItemType["GML"] = "GML";
    ItemType["Image Collection"] = "Image Collection";
    ItemType["Image"] = "Image";
    ItemType["iWork Keynote"] = "iWork Keynote";
    ItemType["iWork Numbers"] = "iWork Numbers";
    ItemType["iWork Pages"] = "iWork Pages";
    ItemType["KML Collection"] = "KML Collection";
    ItemType["KML"] = "KML";
    ItemType["Layer"] = "Layer";
    ItemType["Layer Package"] = "Layer Package";
    ItemType["Layout"] = "Layout";
    ItemType["Locator Package"] = "Locator Package";
    ItemType["Map Package"] = "Map Package";
    ItemType["Map Template"] = "Map Template";
    ItemType["Microsoft Excel"] = "Microsoft Excel";
    ItemType["Microsoft Powerpoint"] = "Microsoft Powerpoint";
    ItemType["Visio Document"] = "Visio Document";
    ItemType["Microsoft Word"] = "Microsoft Word";
    ItemType["Mobile Basemap Package"] = "Mobile Basemap Package";
    ItemType["Mobile Map Package"] = "Mobile Map Package";
    ItemType["Mobile Scene Package"] = "Mobile Scene Package";
    ItemType["Notebook"] = "Notebook";
    ItemType["PDF"] = "PDF";
    ItemType["Pro Map"] = "Pro Map";
    ItemType["Pro Report"] = "Pro Report";
    ItemType["Project Package"] = "Project Package";
    ItemType["Project Template"] = "Project Template";
    ItemType["Raster function template"] = "Raster function template";
    ItemType["Rule Package"] = "Rule Package";
    ItemType["Scene Package"] = "Scene Package";
    ItemType["Service Definition"] = "Service Definition";
    ItemType["Shapefile"] = "Shapefile";
    ItemType["Survey123 Add In"] = "Survey123 Add In";
    ItemType["Tile Package"] = "Tile Package";
    ItemType["Vector Tile Package"] = "Vector Tile Package";
    ItemType["Workflow Manager Package"] = "Workflow Manager Package";
    ItemType["Document Link"] = "Document Link";
    ItemType["Feature Service"] = "Feature Service";
    ItemType["Geocoding Service"] = "Geocoding Service";
    ItemType["Geodata Service"] = "Geodata Service";
    ItemType["Geometry Service"] = "Geometry Service";
    ItemType["Geoprocessing Service"] = "Geoprocessing Service";
    ItemType["Geoenrichment Service"] = "Geoenrichment Service";
    ItemType["Globe Service"] = "Globe Service";
    ItemType["Image Service"] = "Image Service";
    ItemType["Map Service"] = "Map Service";
    ItemType["Network Analysis Service"] = "Network Analysis Service";
    ItemType["Vector Tile Service"] = "Vector Tile Service";
    ItemType["WFS"] = "WFS";
    ItemType["WMS"] = "WMS";
    ItemType["WMTS"] = "WMTS";
    ItemType["OGCFeatureServer"] = "OGCFeatureServer";
    ItemType["Scene Service"] = "Scene Service";
    ItemType["Stream Service"] = "Stream Service";
    ItemType["Workflow Manager Service"] = "Workflow Manager Service";
    ItemType["Web Mapping Application"] = "Web Mapping Application";
    ItemType["Mobile Application"] = "Mobile Application";
    ItemType["AppBuilder Extension"] = "AppBuilder Extension";
    ItemType["Google Drive"] = "Google Drive";
    ItemType["Dropbox"] = "Dropbox";
    ItemType["OneDrive"] = "OneDrive";
    ItemType["StoryMap"] = "StoryMap";
    ItemType["Dashboard"] = "Dashboard";
    ItemType["Hub Project"] = "Hub Project";
    ItemType["Hub Initiative"] = "Hub Initiative";
    ItemType["Hub Site Application"] = "Hub Site Application";
    ItemType["Web Experience"] = "Web Experience";
    ItemType["Insights Workbook Package"] = "Insights Workbook Package";
    ItemType["Application"] = "Application";
    ItemType["ArcGIS Explorer Application Configuration"] = "ArcGIS Explorer Application Configuration";
    ItemType["ArcMap Document"] = "ArcMap Document";
    ItemType["Layer File"] = "Layer File";
    ItemType["ogcFeature"] = "ogcFeature";
    ItemType["FeatureServer"] = "Feature Service";
    ItemType["GeocodeServer"] = "GeocodeServer";
    ItemType["GeoDataServer"] = "GeoDataServer";
    ItemType["GeometryServer"] = "GeometryServer";
    ItemType["GeoenrichmentServer"] = "GeoenrichmentServer";
    ItemType["GPServer"] = "GPServer";
    ItemType["GlobeServer"] = "GlobeServer";
    ItemType["ImageServer"] = "ImageServer";
    ItemType["MapServer"] = "MapServer";
    ItemType["NAServer"] = "NAServer";
    ItemType["ElevationServer"] = "ElevationServer";
    ItemType["VectorTileServer"] = "VectorTileServer";
    ItemType["Scene Server"] = "Scene Server";
    ItemType["StreamServer"] = "StreamServer";
    ItemType["WMServer"] = "WMServer";
    ItemType["TiledImageServer"] = "TiledImageServer";
})(exports.ItemType || (exports.ItemType = {}));
/**
 * Maps human readable file names to extensions IE Image === jpg, png, etc
 */
const addCreateItemTypes = {
    "360 VR Experience": {
        fileExt: [exports.FileExtension["3dd"]],
        type: exports.ItemType["360 VR Experience"],
        typeKeywords: [],
    },
    "Apache Parquet": {
        fileExt: [exports.FileExtension.parquet],
        type: exports.ItemType["Apache Parquet"],
        typeKeywords: [],
    },
    "AppBuilder Widget Package": {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType["AppBuilder Widget Package"],
        typeKeywords: [],
    },
    "Desktop Add In": {
        fileExt: [exports.FileExtension.esriaddin],
        type: exports.ItemType["Desktop Add In"],
        typeKeywords: [
            "Tool",
            "Add In",
            "Desktop Add In",
            "ArcGIS Desktop",
            "ArcMap",
            "ArcGlobe",
            "ArcScene",
            "esriaddin",
        ],
    },
    "Explorer Add In": {
        fileExt: [exports.FileExtension.eaz],
        type: exports.ItemType["Explorer Add In"],
        typeKeywords: [
            "Tool",
            "Add In",
            "Explorer Add In",
            "ArcGIS Explorer",
            "eaz",
        ],
    },
    "Explorer Map": {
        fileExt: [exports.FileExtension.nmf],
        type: exports.ItemType["Explorer Map"],
        typeKeywords: [
            "Map",
            "Explorer Map",
            "Explorer Document",
            "2D",
            "3D",
            "ArcGIS Explorer",
            "nmf",
        ],
    },
    "ArcGIS Explorer Application Configuration": {
        fileExt: [exports.FileExtension.ncfg],
        type: exports.ItemType["Explorer Map"],
        typeKeywords: [
            "Map",
            "Explorer Map",
            "Explorer Mapping Application",
            "2D",
            "3D",
            "ArcGIS Explorer",
        ],
    },
    "Explorer Layer": {
        fileExt: [exports.FileExtension.nmc],
        type: exports.ItemType["Explorer Layer"],
        typeKeywords: ["Data", "Layer", "Explorer Layer", "ArcGIS Explorer", "nmc"],
    },
    "Windows Mobile Package": {
        fileExt: [exports.FileExtension.wmpk],
        type: exports.ItemType["Windows Mobile Package"],
        typeKeywords: [],
    },
    "ArcGIS Pro Add In": {
        fileExt: [exports.FileExtension.esriaddinx],
        type: exports.ItemType["ArcGIS Pro Add In"],
        typeKeywords: ["Tool", "Add In", "Pro Add In", "esriaddinx"],
    },
    "ArcGIS Pro Configuration": {
        fileExt: [exports.FileExtension.proconfigx],
        type: exports.ItemType["ArcGIS Pro Configuration"],
        typeKeywords: [],
    },
    "Globe Document": {
        fileExt: [exports.FileExtension["3dd"]],
        type: exports.ItemType["Globe Document"],
        typeKeywords: [
            "Map",
            "Globe Document",
            "3D",
            "ArcGlobe",
            "ArcGIS Server",
            "3dd",
        ],
    },
    "Map Document": {
        fileExt: [exports.FileExtension.msd],
        type: exports.ItemType["Map Document"],
        typeKeywords: [
            "Map Document",
            "Map",
            "2D",
            "ArcMap",
            "ArcGIS Server",
            "msd",
        ],
    },
    "ArcMap Document": {
        fileExt: [exports.FileExtension.mxd],
        type: exports.ItemType["Map Document"],
        typeKeywords: ["Map Document", "Map", "2D", "ArcMap", "ArcGIS Server"],
    },
    "ArcPad Package": {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType["ArcPad Package"],
        typeKeywords: ["Map", "Layer", "Data"],
    },
    "Published Map": {
        fileExt: [exports.FileExtension.pmf],
        type: exports.ItemType["Published Map"],
        typeKeywords: [
            "Map",
            "Published Map",
            "2D",
            "ArcReader",
            "ArcMap",
            "ArcGIS Server",
            "pmf",
        ],
    },
    "Scene Document": {
        fileExt: [exports.FileExtension.sxd],
        type: exports.ItemType["Scene Document"],
        typeKeywords: ["Map", "Scene Document", "3D", "ArcScene", "sxd"],
    },
    "CityEngine Web Scene": {
        fileExt: [exports.FileExtension["3ws"]],
        type: exports.ItemType["CityEngine Web Scene"],
        typeKeywords: ["3D", "Map", "Scene", "Web"],
    },
    "Code Sample": {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType["Code Sample"],
        typeKeywords: ["Code", "Sample"],
    },
    "CSV Collection": {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType["CSV Collection"],
        typeKeywords: [],
    },
    CSV: {
        fileExt: [exports.FileExtension.csv],
        type: exports.ItemType.CSV,
        typeKeywords: ["CSV"],
    },
    "CAD Drawing": {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType["CAD Drawing"],
        typeKeywords: [],
    },
    "Deep Learning Package": {
        fileExt: [exports.FileExtension.zip, exports.FileExtension.dlpk],
        type: exports.ItemType["Deep Learning Package"],
        typeKeywords: ["Deep Learning", "Raster"],
    },
    "Desktop Application": {
        type: exports.ItemType["Desktop Application"],
        typeKeywords: ["Desktop Application"],
    },
    "Desktop Application Template": {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType["Desktop Application Template"],
        typeKeywords: ["application", "template", "ArcGIS desktop"],
    },
    "Desktop Style": {
        fileExt: [exports.FileExtension.stylx],
        type: exports.ItemType["Desktop Style"],
        typeKeywords: ["ArcGIS Pro", "Symbology", "Style", "Symbols"],
    },
    "Earth Configuration": {
        fileExt: [exports.FileExtension.xml],
        type: exports.ItemType["Earth Configuration"],
        typeKeywords: ["ArcGIS Earth", "Earth", "Earth Configuration"],
    },
    "Feature Collection": {
        type: exports.ItemType["Feature Collection"],
        fileExt: [exports.FileExtension.featurecollection],
        typeKeywords: [],
    },
    "File Geodatabase": {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType["File Geodatabase"],
        typeKeywords: [],
    },
    GeoJson: {
        fileExt: [exports.FileExtension.geojson, exports.FileExtension.json],
        type: exports.ItemType.GeoJson,
        typeKeywords: [
            "Coordinates Type",
            "CRS",
            "Feature",
            "FeatureCollection",
            "GeoJSON",
            "Geometry",
            "GeometryCollection",
        ],
    },
    "Geoprocessing Package": {
        fileExt: [exports.FileExtension.gpk, exports.FileExtension.gpkx],
        type: exports.ItemType["Geoprocessing Package"],
        typeKeywords: [
            "ArcGIS Desktop",
            "ArcGlobe",
            "ArcMap",
            "ArcScene",
            "Geoprocessing Package",
            "gpk",
            "Model",
            "Result",
            "Script",
            "Sharing",
            "Tool",
            "Toolbox",
        ],
    },
    GeoPackage: {
        fileExt: [exports.FileExtension.gpkg],
        type: exports.ItemType.GeoPackage,
        typeKeywords: ["Data", "GeoPackage", "gpkg"],
    },
    "Geoprocessing Sample": {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType["Geoprocessing Sample"],
        typeKeywords: ["tool", "geoprocessing", "sample"],
    },
    GML: {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType.GML,
        typeKeywords: [],
    },
    "Image Collection": {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType["Image Collection"],
        typeKeywords: [],
    },
    Image: {
        fileExt: [
            exports.FileExtension.jpg,
            exports.FileExtension.jpeg,
            exports.FileExtension.png,
            exports.FileExtension.tif,
            exports.FileExtension.tiff,
        ],
        type: exports.ItemType.Image,
        typeKeywords: ["Data", "Image"],
    },
    "iWork Keynote": {
        fileExt: [exports.FileExtension.key],
        type: exports.ItemType["iWork Keynote"],
        typeKeywords: ["Data", "Document", "Mac"],
    },
    "iWork Numbers": {
        fileExt: [exports.FileExtension.numbers],
        type: exports.ItemType["iWork Numbers"],
        typeKeywords: ["Data", "Document", "Mac"],
    },
    "iWork Pages": {
        fileExt: [exports.FileExtension.pages],
        type: exports.ItemType["iWork Pages"],
        typeKeywords: ["Data", "Document", "Mac"],
    },
    "KML Collection": {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType["KML Collection"],
        typeKeywords: [],
    },
    KML: {
        type: exports.ItemType.KML,
        fileExt: [exports.FileExtension.kml, exports.FileExtension.kmz],
        typeKeywords: ["Data", "Map", "kml"],
    },
    Layer: {
        fileExt: [exports.FileExtension.lyr],
        type: exports.ItemType.Layer,
        typeKeywords: [
            "Data",
            "Layer",
            "ArcMap",
            "ArcGlobe",
            "ArcGIS Explorer",
            "lyr",
        ],
    },
    "Layer File": {
        fileExt: [exports.FileExtension.lyrx],
        type: exports.ItemType.Layer,
        typeKeywords: ["ArcGIS Pro", "Layer", "Layer File"],
    },
    "Layer Package": {
        fileExt: [exports.FileExtension.lpk, exports.FileExtension.lpkx],
        type: exports.ItemType["Layer Package"],
        typeKeywords: [],
    },
    Layout: {
        fileExt: [exports.FileExtension.pagx],
        type: exports.ItemType.Layout,
        typeKeywords: ["ArcGIS Pro", "Layout", "Layout File", "pagx"],
    },
    "Locator Package": {
        fileExt: [exports.FileExtension.gcpk],
        type: exports.ItemType["Locator Package"],
        typeKeywords: [],
    },
    "Map Package": {
        fileExt: [exports.FileExtension.mpk, exports.FileExtension.mpkx],
        type: exports.ItemType["Map Package"],
        typeKeywords: [],
    },
    "Map Template": {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType["Map Template"],
        typeKeywords: ["map", "ArcMap", "template", "ArcGIS desktop"],
    },
    "Microsoft Excel": {
        fileExt: [exports.FileExtension.xls, exports.FileExtension.xlsx],
        type: exports.ItemType["Microsoft Excel"],
        typeKeywords: ["Data", "Document", "Microsoft Excel"],
    },
    "Microsoft Powerpoint": {
        fileExt: [exports.FileExtension.ppt, exports.FileExtension.pptx],
        type: exports.ItemType["Microsoft Powerpoint"],
        typeKeywords: ["Data", "Document", "Microsoft Powerpoint"],
    },
    "Visio Document": {
        fileExt: [exports.FileExtension.vsd],
        type: exports.ItemType["Visio Document"],
        typeKeywords: ["Data", "Document", "Visio Document"],
    },
    "Microsoft Word": {
        fileExt: [exports.FileExtension.doc, exports.FileExtension.docx],
        type: exports.ItemType["Microsoft Word"],
        typeKeywords: ["Data", "Document"],
    },
    "Mobile Basemap Package": {
        fileExt: [exports.FileExtension.bpk],
        type: exports.ItemType["Mobile Basemap Package"],
        typeKeywords: [],
    },
    "Mobile Map Package": {
        fileExt: [exports.FileExtension.mmpk],
        type: exports.ItemType["Mobile Map Package"],
        typeKeywords: [],
    },
    "Mobile Scene Package": {
        fileExt: [exports.FileExtension.mspk],
        type: exports.ItemType["Mobile Scene Package"],
        typeKeywords: [],
    },
    Notebook: {
        fileExt: [exports.FileExtension.ipynb],
        type: exports.ItemType.Notebook,
        typeKeywords: ["Notebook", "Python"],
    },
    PDF: {
        fileExt: [exports.FileExtension.pdf],
        type: exports.ItemType.PDF,
        typeKeywords: ["Data", "Document", "PDF"],
    },
    "Pro Map": {
        fileExt: [exports.FileExtension.mapx],
        type: exports.ItemType["Pro Map"],
        typeKeywords: ["ArcGIS Pro", "Map", "Map File", "mapx"],
    },
    "Pro Report": {
        fileExt: [exports.FileExtension.rptx],
        type: exports.ItemType["Pro Report"],
        typeKeywords: [],
    },
    "Project Package": {
        fileExt: [exports.FileExtension.ppkx],
        type: exports.ItemType["Project Package"],
        typeKeywords: [],
    },
    "Project Template": {
        fileExt: [exports.FileExtension.aptx],
        type: exports.ItemType["Project Template"],
        typeKeywords: [],
    },
    "Raster function template": {
        fileExt: [exports.FileExtension["rft.json"], exports.FileExtension["rft.xml"]],
        type: exports.ItemType["Raster function template"],
        typeKeywords: [
            "Raster",
            "Functions",
            "Processing",
            "rft",
            "srf",
            "function template",
            "templates",
            "ArcGIS Pro",
        ],
    },
    "Rule Package": {
        fileExt: [exports.FileExtension.rpk],
        type: exports.ItemType["Rule Package"],
        typeKeywords: [],
    },
    "Scene Package": {
        fileExt: [exports.FileExtension.slpk, exports.FileExtension.spk],
        type: exports.ItemType["Scene Package"],
        typeKeywords: [],
    },
    "Service Definition": {
        fileExt: [exports.FileExtension.sd],
        type: exports.ItemType["Service Definition"],
        typeKeywords: ["Data", "Service", "Service Definition"],
    },
    Shapefile: {
        fileExt: [exports.FileExtension.zip],
        type: exports.ItemType.Shapefile,
        typeKeywords: ["Data", "Layer", "shapefile"],
    },
    "Survey123 Add In": {
        fileExt: [exports.FileExtension.surveyaddin],
        type: exports.ItemType["Survey123 Add In"],
        typeKeywords: ["Add In", "Survey123 Add In", "Tool"],
    },
    "Tile Package": {
        fileExt: [exports.FileExtension.tpk, exports.FileExtension.tpkx],
        type: exports.ItemType["Tile Package"],
        typeKeywords: [],
    },
    "Vector Tile Package": {
        fileExt: [exports.FileExtension.vtpk],
        type: exports.ItemType["Vector Tile Package"],
        typeKeywords: [],
    },
    "Workflow Manager Package": {
        fileExt: [exports.FileExtension.wpk],
        type: exports.ItemType["Workflow Manager Package"],
        typeKeywords: [],
    },
    "Document Link": {
        type: exports.ItemType["Document Link"],
        typeKeywords: ["Data", "Document"],
    },
    "Feature Service": {
        type: exports.ItemType["Feature Service"],
        typeKeywords: [
            "ArcGIS Server",
            "Data",
            "Feature Access",
            "Feature Service",
            "Service",
            "Singlelayer",
            "Hosted Service",
        ],
    },
    GeocodeServer: {
        type: exports.ItemType["Geocoding Service"],
        typeKeywords: [
            "ArcGIS Server",
            "Geocoding Service",
            "Locator Service",
            "Service",
            "Tool",
            "Service Proxy",
        ],
    },
    GeoDataServer: {
        type: exports.ItemType["Geodata Service"],
        typeKeywords: ["Data", "Service", "Geodata Service", "ArcGIS Server"],
    },
    GeometryServer: {
        type: exports.ItemType["Geometry Service"],
        typeKeywords: ["Tool", "Service", "Geometry Service", "ArcGIS Server"],
    },
    GeoenrichmentServer: {
        type: exports.ItemType["Geoenrichment Service"],
        typeKeywords: ["Geoenrichment Service", "ArcGIS Server"],
    },
    GPServer: {
        type: exports.ItemType["Geoprocessing Service"],
        typeKeywords: ["Tool", "Service", "Geoprocessing Service", "ArcGIS Server"],
    },
    GlobeServer: {
        type: exports.ItemType["Globe Service"],
        typeKeywords: ["Data", "Service", "Globe Service", "ArcGIS Server"],
    },
    ImageServer: {
        type: exports.ItemType["Image Service"],
        typeKeywords: ["Data", "Service", "Image Service", "ArcGIS Server"],
    },
    MapServer: {
        type: exports.ItemType["Map Service"],
        typeKeywords: ["Data", "Service", "Map Service", "ArcGIS Server"],
    },
    NAServer: {
        type: exports.ItemType["Network Analysis Service"],
        typeKeywords: [
            "Tool",
            "Service",
            "Network Analysis Service",
            "ArcGIS Server",
        ],
    },
    ElevationServer: {
        type: exports.ItemType["Image Service"],
        typeKeywords: ["Elevation 3D Layer"],
    },
    VectorTileServer: {
        type: exports.ItemType["Vector Tile Service"],
        typeKeywords: [],
    },
    WFS: {
        type: exports.ItemType.WFS,
        typeKeywords: ["Data", "Service", "Web Feature Service", "OGC"],
    },
    WMS: {
        type: exports.ItemType.WMS,
        typeKeywords: ["Data", "Service", "Web Map Service", "OGC"],
    },
    WMTS: {
        type: exports.ItemType.WMTS,
        typeKeywords: ["Data", "Service", "OGC"],
    },
    ogcFeature: {
        type: exports.ItemType.OGCFeatureServer,
        typeKeywords: [
            "Data",
            "Service",
            "Feature Service",
            "OGC",
            "OGC Feature Service",
        ],
    },
    SceneServer: {
        type: exports.ItemType["Scene Service"],
        typeKeywords: ["Scene Service"],
    },
    StreamServer: {
        type: exports.ItemType["Stream Service"],
        typeKeywords: ["Data", "Service", "Stream Service", "ArcGIS Server"],
    },
    WMServer: {
        type: exports.ItemType["Workflow Manager Service"],
        typeKeywords: [
            "Workflow Manager",
            "ArcGIS Server",
            "WMServer",
            "Workflow",
            "JTX",
            "Job Tracking",
        ],
    },
    TiledImageServer: {
        type: exports.ItemType["Image Service"],
        typeKeywords: ["Tiled Imagery"],
    },
    "Web Mapping Application": {
        type: exports.ItemType["Web Mapping Application"],
        typeKeywords: [
            "JavaScript",
            "Map",
            "Mapping Site",
            "Online Map",
            "Ready To Use",
            "Web AppBuilder",
            "Web Map (+ WAB2D or WAB3D)",
        ],
    },
    "Mobile Application": {
        type: exports.ItemType["Mobile Application"],
        typeKeywords: ["ArcGIS Mobile Map", "Mobile Application"],
    },
    "AppBuilder Extension": {
        type: exports.ItemType["AppBuilder Extension"],
        typeKeywords: ["Widget", "App Builder"],
    },
    "Google Drive": {
        type: exports.ItemType["Google Drive"],
        typeKeywords: ["CSV", "Shapefile", "GeoJSON", "Excel", "FileGeodatabase"],
    },
    Dropbox: {
        type: exports.ItemType.Dropbox,
        typeKeywords: ["CSV", "Shapefile", "GeoJSON", "Excel", "FileGeodatabase"],
    },
    OneDrive: {
        type: exports.ItemType.OneDrive,
        typeKeywords: ["CSV", "Shapefile", "GeoJSON", "Excel", "FileGeodatabase"],
    },
    "Map Service": {
        type: exports.ItemType["Map Service"],
        typeKeywords: [
            "ArcGIS Server",
            "Data",
            "Map Service",
            "Service",
            "Hosted Service",
        ],
    },
    StoryMap: {
        type: exports.ItemType.StoryMap,
        typeKeywords: [
            "arcgis-storymaps",
            "StoryMap",
            "Web Application (smstatusdraft or smsstatuspublished)",
        ],
    },
    Dashboard: {
        type: exports.ItemType.Dashboard,
        typeKeywords: ["Dashboard", "Operations Dashboard"],
    },
    "Hub Initiative": {
        type: exports.ItemType["Hub Initiative"],
        typeKeywords: ["Hub", "hubInitiative", "OpenData"],
    },
    "Hub Site Application": {
        type: exports.ItemType["Hub Site Application"],
        typeKeywords: [
            "Hub",
            "hubSite",
            "hubSolution",
            "JavaScript",
            "Map",
            "Mapping Site",
            "Online Map",
            "OpenData",
            "Ready To Use",
            "selfConfigured",
            "Web Map",
            "Registered App",
        ],
    },
    "Web Experience": {
        type: exports.ItemType["Web Experience"],
        typeKeywords: [
            "EXB Experience",
            "JavaScript",
            "Ready To Use Web Application",
            "Web Experience",
            "Web Mapping Application",
            "Web Page",
            "Web Site",
        ],
    },
    "Insights Workbook Package": {
        type: exports.ItemType["Insights Workbook Package"],
        fileExt: [exports.FileExtension.insightswbk],
        typeKeywords: ["Insights", "Insights Workbook Package"],
    },
};
/**
 * ENUM which defines entity statuses
 */
exports.HubEntityStatus = void 0;
(function (HubEntityStatus) {
    HubEntityStatus["notStarted"] = "notStarted";
    HubEntityStatus["inProgress"] = "inProgress";
    HubEntityStatus["onHold"] = "onHold";
    HubEntityStatus["complete"] = "complete";
})(exports.HubEntityStatus || (exports.HubEntityStatus = {}));
/**
 * Types of entity heroes
 */
exports.HubEntityHero = void 0;
(function (HubEntityHero) {
    HubEntityHero["map"] = "map";
    HubEntityHero["image"] = "image";
})(exports.HubEntityHero || (exports.HubEntityHero = {}));
/**
 * END CONTENT UPLOAD TYPES/ENUMS
 */

exports.HubFamilies = HubFamilies;
exports.addCreateItemTypes = addCreateItemTypes;
