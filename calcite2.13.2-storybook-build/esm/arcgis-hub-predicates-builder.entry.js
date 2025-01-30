import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-57f71b44.js';
import './types-dca4cb90.js';
import '@arcgis/core/config.js';
import { i as interpolateTranslations } from './interpolate-translations-f9ad4891.js';
import './resources-3b88c839.js';
import './index-55cb25f7.js';
import { g as getGlobalContext } from './state-31a09db0.js';
import './index-dd3f99ac.js';
import './screen-4768262d.js';
import './sha256-bf3e0364.js';
import './interfaces-fd83cf89.js';
import { m as mergeDeep } from './index-213c70d0.js';
import { a as getWellKnownCatalog } from './wellKnownCatalog-7e9f7f53.js';
import { i as isNil } from './is-nil-03b9a6b5.js';
import { g as getFamily } from './get-family-543fac52.js';
import { U as UiSchemaRuleEffects } from './types-1fca2e83.js';
import { i as intlManager } from './intl-manager-13176c32.js';
import { E as EVENT_PREDICATE_PROPERTIES, I as ITEM_PREDICATE_PROPERTIES } from './types-010085a1.js';
import { i as isFieldEmpty } from './isFieldEmpty-d560d7e3.js';
import { a as cloneObject } from './util-3e6872d9.js';
import './interpolate-d39d6151.js';
import './_commonjsHelpers-11ca3be1.js';
import './store-0a6cb79f.js';
import './get-prop-ec5be510.js';
import './ProjectSchema-060a6b72.js';
import './MetricSchema-da66a5ad.js';
import './enums-783e40b4.js';
import './definitions-193d63f9.js';
import './HubItemEntitySchema-5c1f4677.js';
import './types-2eaa1a18.js';
import './subschemas-4d56570e.js';
import './InitiativeSchema-4fb31f85.js';
import './SiteSchema-3e282ce1.js';
import './DiscussionSchema-6e5016d0.js';
import './PageSchema-4cbe3bd9.js';
import './ContentSchema-d913d8e9.js';
import './TemplateSchema-83e65297.js';
import './GroupSchema-13ff9290.js';
import './InitiativeTemplateSchema-bf5d8531.js';
import './SurveySchema-0fcb1d64.js';
import './EventSchemaCreate-2f6ba245.js';
import './getDefaultEventDatesAndTimes-4847a519.js';
import './types-db540898.js';
import './validations-3d61466c.js';
import './UserSchema-abc4f738.js';

/**
 * returns the requested group catalogs to be used
 * in various group picker predicate experiences
 *
 * @param context contextual portal & auth info
 * @param i18nScope intl scope for translations
 * @param catalogNames optional catalog names
 */
const getGroupCatalogs = (context, i18nScope, catalogNames) => {
  const _catalogNames = catalogNames || [
    "editGroups",
    "viewGroups"
  ];
  const catalogs = _catalogNames.map((name) => {
    const opts = {
      user: context.currentUser,
    };
    const catalog = getWellKnownCatalog(i18nScope, name, "group", opts);
    return catalog;
  });
  return catalogs;
};

/**
 * returns default group facets to be used in various
 * group picker predicate experiences
 *
 * @param context contextual portal and auth info
 * @param i18nScope intl scope for translations
 */
const getGroupFacets = (context, i18nScope) => {
  var _a, _b, _c, _d;
  {
    const idsOfUserAdminGroups = context.currentUser.groups
      .reduce((acc, group) => {
      group.userMembership.memberType === 'admin' && acc.push(group.id);
      return acc;
    }, []);
    const facet = {
      label: `{{${i18nScope}.facet.label:translate}}`,
      key: 'from',
      display: 'single-select',
      operation: 'OR',
      options: [
        {
          label: `{{${i18nScope}.facet.myGroups:translate}}`,
          key: `{{${i18nScope}.facet.myGroups:translate}}`,
          selected: true,
          predicates: [
            {
              owner: context === null || context === void 0 ? void 0 : context.currentUser.username
            }
          ]
        },
        {
          label: `{{${i18nScope}.facet.myOrganization:translate}}`,
          key: `{{${i18nScope}.facet.myOrganization:translate}}`,
          selected: false,
          predicates: [
            {
              orgid: (_a = context === null || context === void 0 ? void 0 : context.currentUser) === null || _a === void 0 ? void 0 : _a.orgId,
              searchUserAccess: 'groupMember',
              searchUserName: (_b = context === null || context === void 0 ? void 0 : context.currentUser) === null || _b === void 0 ? void 0 : _b.username,
              isviewonly: false
            },
            {
              orgid: (_c = context === null || context === void 0 ? void 0 : context.currentUser) === null || _c === void 0 ? void 0 : _c.orgId,
              id: idsOfUserAdminGroups
            }
          ]
        }
      ]
    };
    if (context === null || context === void 0 ? void 0 : context.communityOrgId) {
      facet.options.push({
        label: `{{${i18nScope}.facet.myCommunity:translate}}`,
        key: `{{${i18nScope}.facet.myCommunity:translate}}`,
        selected: false,
        predicates: [
          {
            orgid: context === null || context === void 0 ? void 0 : context.communityOrgId,
            searchUserAccess: 'groupMember',
            searchUserName: (_d = context === null || context === void 0 ? void 0 : context.currentUser) === null || _d === void 0 ? void 0 : _d.username,
            isviewonly: false
          },
          {
            orgid: context === null || context === void 0 ? void 0 : context.communityOrgId,
            id: idsOfUserAdminGroups
          }
        ]
      });
    }
    return [facet];
  }
};

/**
 * returns the configuration for a given operator
 *
 * NOTE: we will continue to add more operators here
 * as we extend the predicate builder field
 *
 * @param {PredicateOprator} operator predicate operator
 * @param {PredicateProperty} labelScope optional i18n scope to override the default operator label
 */
const getOperatorConfig = (operator, labelScope) => {
  return {
    isAny: {
      value: "isAny",
      label: `{{operatorConfigs.isAny.${labelScope || "default"}:translate}}`
    },
    isAll: {
      value: "isAll",
      label: `{{operatorConfigs.isAll.${labelScope || "default"}:translate}}`
    },
    isExactly: {
      value: "isExactly",
      label: `{{operatorConfigs.isExactly.${labelScope || "default"}:translate}}`
    },
    isNot: {
      value: "isNot",
      label: `{{operatorConfigs.isNot.${labelScope || "default"}:translate}}`
    },
  }[operator];
};

/**
 * returns the configuration for a given predicate property
 *
 * NOTE: we will continue to add more properties here
 * as we extend the predicate builder field
 *
 * @param {PredicateProperty} property predicate property
 * @param {PredicateProperty} labelScope optional i18n scope to override the default property label
 */
const getPropertyConfig = (property, labelScope) => {
  return {
    type: {
      value: "type",
      label: `{{propertyConfigs.type.${labelScope || "default"}:translate}}`,
      targetEntities: ["item"]
    },
    group: {
      value: "group",
      label: `{{propertyConfigs.group.${labelScope || "default"}:translate}}`,
      targetEntities: ["item", "event"]
    },
    occurrence: {
      value: "occurrence",
      label: `{{propertyConfigs.occurrence.${labelScope || "default"}:translate}}`,
      targetEntities: ["event"]
    }
  }[property];
};

/**
 * Build a list of type strings from rawTypesFromAGO
 * e.g. ["Application", "Web Map", "Web Scene"... ]
 * @returns
 */
function getAgoTypes(rawAgoTypes) {
  const types = rawAgoTypes.map(rawType => rawType.split(':')[0].split('#')[0]);
  // remove duplicates and sort alphabetically
  return [...new Set(types)].sort();
}

// A list of item types we pulled from AGO in Nov, 2024.
// Whenever we pull new types from AGO, make sure to
// update this list with the latest information to
// ensure that all functions relying on these types
// remain accurate and consistent.
// Functions that are currently relying on this list include but not limited to:
// 1. getTypePredicateItemsWithChildren in packages/hub-components/src/components/arcgis-configuration-editor/components/arcgis-configuration-editor-field/fields/composite/arcgis-hub-predicates-builder/utils/predicate-utils/type-predicate.ts
const rawAgoItemTypes = [
  'Web Map:text:Web Map,Explorer Web Map,Map,Online Map,ArcGIS Online;',
  'Map Document:file:Map Document,Map,2D,ArcMap,ArcGIS Server,mxd;',
  'Scene Package:file:Scene Package,Scene,3D,ArcGIS Pro,ArcGIS Server,slpk;',
  'Scene Package#spk:file:Scene Package,Scene,3D,ArcGIS Pro,ArcGIS Server,spk;',
  'Scene Package#slpk:file:Scene Package,Scene,3D,ArcGIS Pro,ArcGIS Server,slpk;',
  'Scene Package Part:file:Scene Package Part,ArcGIS Pro,slpk part;',
  'Globe Document:file:Map,Globe Document,3D,ArcGlobe,ArcGIS Server,3dd;',
  'Scene Document:file:Map,Scene Document,3D,ArcScene,sxd;',
  'Published Map:file:Published Map,2D,ArcReader,ArcMap,ArcGIS Server,pmf;',
  'Explorer Map:file:Map,Explorer Map,2D,3D,ArcGIS Explorer;',
  'Explorer Layer:file:Data,Layer,Explorer Layer,ArcGIS Explorer,nmc;',
  'Explorer Add In:file:Tool,Add In,Explorer Add In,ArcGIS Explorer,eaz;',
  'Layer Package:file:Data,Layer Package,ArcMap,ArcGlobe,ArcGIS Explorer,lpk;',
  'Layer Package#lpk:file:Data,Layer Package,ArcMap,ArcGlobe,ArcGIS Explorer,lpk;',
  'Layer Package#lpkx:file:Data,Layer Package,ArcGIS Pro,lpkx;',
  'Layer:file:Data,Layer,ArcMap,ArcGlobe,ArcGIS Explorer,lyr;',
  'Layer#lyrx:file:ArcGIS Pro,Layer,Layer File,lyrx;',
  'Map Service:url:Data,Service,Map Service,ArcGIS Server;',
  'Geocoding Service:url:Tool,Service,Geocoding Service,Locator Service,ArcGIS Server,Locator;',
  'Network Analysis Service:url:Tool,Service,Network Analysis Service,ArcGIS Server;',
  'Globe Service:url:Data,Service,Globe Service,ArcGIS Server;',
  'Geoprocessing Service:url:Tool,Service,Geoprocessing Service,ArcGIS Server;',
  'Geodata Service:url:Data,Service,Geodata Service,ArcGIS Server;',
  'Image Service:url:Data,Service,Image Service,ArcGIS Server;',
  'Geometry Service:url:Tool,Service,Geometry Service,ArcGIS Server;',
  'Web Mapping Application:text:Web Map,Map,Online Map,Mapping Site;',
  'Feature Service:url:Data,Service,Feature Service,ArcGIS Server,Feature Access;',
  'Scene Service:url:Data,Service,Scene Service,ArcGIS Server;',
  'Featured Items:text:Featured,Items;',
  'Map Package:file:Map,2D,Map Package,ArcMap;',
  'Map Package#mpk:file:Map,2D,Map Package,ArcMap;',
  'Map Package#mpkx:file:Map,2D,Map Package,ArcGIS Pro;',
  'Code Attachment:file:Code;',
  'Windows Mobile Package:file:ArcGIS Windows Mobile Package,ArcGIS Windows Mobile Map,ArcGIS Windows Mobile,wmpk;',
  'Addin Package:file:Addin Package;',
  'Desktop Add In:file:Tool,Add In,Desktop Add In,ArcGIS Desktop,ArcMap,ArcGlobe,ArcScene,esriaddin;',
  'Legend:text:Legend;',
  'Mobile Application:text:ArcGIS Mobile Map,Mobile Application;',
  'Code Sample:file:Code,Sample;',
  'Geoprocessing Sample:file:Tool,Geoprocessing,Sample;',
  'Map Template:file:Map,Template,ArcMap,ArcGIS Desktop;',
  'Desktop Application Template:file:Application,Template,ArcGIS Desktop;',
  'Feature Collection:text:Feature Collection;',
  'Geoprocessing Package:file:Tool,ArcGIS Desktop,ArcMap,ArcGlobe,ArcScene,Toolbox,Geoprocessing Package,Model,Script,Sharing,Result,gpk;',
  'Geoprocessing Package#gpkx:file:ArcGIS Pro, gpkx;',
  'Service Definition:file:Service Definition,ArcGIS;',
  'Feature Collection Template:text:Feature Collection,Feature Service Template,Map Notes Template;',
  'Symbol Set:text:Symbol Set;',
  'Locator Package:file:Tool,ArcMap,ArcGIS Desktop,Locator Package,Geocoding,gcpk;',
  'CSV:file:CSV;',
  'Shapefile:file:Data,Layer,Shapefile,Template,ArcGIS Desktop;',
  'Tile Package:file:Data,Tile Package,ArcMap,ArcGlobe,tpk;',
  'KML:file:Data,Map,kml;',
  'WMS:text:Data,Service,Web Map Service,OGC;',
  'Color Set:text:Color Set;',
  'Workflow Manager Package:file:Tool,ArcGIS Workflow Manager,Sharing,wpk,ArcGIS Desktop;',
  'Workflow Manager Service:text:Workflow Manager,ArcGIS Server,WMServer,Workflow,JTX,Job Tracking;',
  'Viewer Configuration:text:Application,ArcGIS Windows Viewer,Configuration;',
  'Windows Viewer Add In:file:Application,ArcGIS Windows Viewer,Add In;',
  'CityEngine Web Scene:file:3D,Map,Scene,Web;',
  'Application Configuration:text:Application Configuration;',
  'ArcPad Package:file:Map,Layer,Data,ArcPad;',
  'Operation View:text:Application,ArcGIS Operations Dashboard,ArcGIS Operation View;',
  'Operations Dashboard Add In:file:Application,ArcGIS Operations Dashboard,Add In;',
  'Application:text:Application;',
  'Document Link:url:Data,Document;',
  'Microsoft Word:file:Data,Document,Microsoft Word;',
  'Microsoft Excel:file:Data,Document,Microsoft Excel;',
  'PDF:file:Data,Document,PDF;',
  'Image:file:Data,Image;',
  'Visio Document:file:Data,Document,Visio Document;',
  'Microsoft Powerpoint:file:Data,Document,Microsoft Powerpoint;',
  'CSV Collection:file:CSV Collection;',
  'KML Collection:file:KML Collection;',
  'File Geodatabase:file:File Geodatabase;',
  'Rule Package:file:Tool,Rule Package,ArcScene,3D,rpk;',
  'Desktop Application:file:Desktop Application;',
  'Basemap Package:file:Basemap,Basemap Package,ArcGIS Pro,bpkx;',
  'Task File:file:ArcGIS Professional,Task Assistant,esriTasks;',
  'SQLite Geodatabase:file:SQLite Geodatabase;',
  'Map Area:text:Map,Map Area;',
  'Web Scene:text:Web Scene,3D,Map,Scene,Web,Streaming;',
  'Project Package:file:Project,Project Package,ArcGIS Pro;',
  'iWork Keynote:file:Data,Document,Mac;',
  'iWork Pages:file:Data,Document,Mac;',
  'iWork Numbers:file:Data,Document,Mac;',
  'Pro Map:file:ArcGIS Pro,Map,Map File,mapx;',
  'Layout:file:ArcGIS Pro,Layout,Layout File,pagx;',
  'CAD Drawing:file:Data,CAD;',
  'Stream Service:url:Data,Service,Stream Service,ArcGIS Server;',
  'GeoJson:file:Feature,FeatureCollection,Geometry,GeometryCollection,CRS,Coordinates Type;',
  'Style:text:Symbology,Style,Symbols,Platform;',
  'Desktop Style:file:ArcGIS Pro,Symbology,Style,Symbols;',
  'Workflow Manager Service:url:Data,Service,Workflow Manager Service,ArcGIS Server;',
  'Layer Template:text:Platform,Template,Layer;',
  'Activity:text:Activity,Mobile,Location,Location Awareness;',
  'Project Template:file:ArcGIS Project Template,Project Template,ArcGIS Pro;',
  'Mobile Map Package:file:Mobile Map Package,Map,ArcGIS Pro,mmpk;',
  'Mobile Basemap Package:file:Mobile,Mobile Basemap Package,Basemap,ArcGIS Pro,bpkx;',
  'Raster function template:file:Raster,Functions,Processing,rft,Function Template,Templates;',
  'Operations Dashboard Extension:url:Extension,Application,ArcGIS Operations Dashboard;',
  'Native Application:file:Application,Native,App,Configuration;',
  'Native Application Template:file:Template,Native,App;',
  'Native Application Installer:file:Installer,Native,App;',
  'Vector Tile Service:url:Data,Service,Vector Tile Service;',
  'Vector Tile Package:file:Data,Vector Tile Package,ArcGIS Pro, vtpk;',
  'Data Package Collection:text:Data Package Collection;',
  'Geoenrichment Service:url:Data,Enrichment,Demographic,Geoenrichment Service,ArcGIS Server;',
  'Server:url:Server;',
  'Workforce Project:text:Workforce Project;',
  'Form:file:xForm,Form,Survey123;',
  'Report Template:file:Business Analyst,Geoenrichment Report Template;',
  'Big Data File Share:url:Data Store,Big Data Catalog Service,Service,ArcGIS Server;',
  'Notebook:file:Notebook;',
  'Notebook Code Snippets:text:Code,Snippets,Notebook;',
  'Notebook Code Snippet Library:text:Code,Snippet,Notebook,Library;',
  'Insights Workbook:url:Application,ArcGIS,Insights Workbook;',
  'Insights Model:text:Application,ArcGIS,Insights Model;',
  'Relational Database Connection:url:Data Store, Relational, Database, Connection, Service, Catalog, ArcGIS Server;',
  'ArcGIS Pro Add In:file:Tool,Add In,Pro Add In,esriaddinx;',
  'Statistical Data Collection:file:Business Analyst Statistical Data Collection;',
  'netCDF:file:netCDF,Space Time Cube,Space Time,Trend Analysis,Time Series,Multidimensional;',
  'WFS:text:Data,Service,Web Feature Service,OGC;',
  'OGCFeatureServer:url:Data,Service,Feature Service,OGC,OGC Feature Service;',
  'WMTS:text:Data,Service,Web Map Tile Service,OGC;',
  'Replication Package:file:Replication Package,crpk;',
  '360 VR Experience:file:Virtual Reality,VR,VR360,3D,360,Panorama,Photo,Spherical,Cube Map,Street View,City,Smart Cities,Proposals,Scenarios,Compare,Experience,ArcGIS;',
  'Insights Page:url:Application,ArcGIS,Insights Page;',
  'Image Collection:file:Data,Image,Image Collection;',
  'ArcGIS Pro Configuration:file:Tool,Add-in,Configuration,proConfigX,ArcGIS Pro;',
  'Dashboard:text:Dashboard,Operations Dashboard;',
  'Hub Initiative:text:Hub,OpenData;',
  'Hub Site Application:text:Hub,OpenData;',
  'Hub Page:text:Hub,OpenData;',
  'AppBuilder Extension:url:Widget,App Builder,AppBuilder;',
  'AppBuilder Widget Package:file:HTML3D/HTML,App Builder,AppBuilder,Widget;',
  'Content Category Set:text:Content Category Set;',
  'Ortho Mapping Template:text:Ortho Mapping Template,Ortho Maker,Orthomosaic,Orthophoto,Ortho,Template;',
  'Ortho Mapping Project:text:Ortho Mapping Project,Ortho Maker,Orthomosaic,Orthophoto,Ortho;',
  'Solution:text:Solution;',
  'Insights Theme:text:ArcGIS,Insights Theme;',
  'Mobile Scene Package:file:3D,ArcGIS Pro,Scene,mspk,Mobile,Mobile Scene Package;',
  'Oriented Imagery Catalog:text:OIC,Oriented Imagery Catalog,ArcGIS,Imagery;',
  'App Bundle:text:App Bundle;',
  'Export Package:file:Export Package,epk;',
  'Deep Learning Package:file:Deep Learning Package,Raster,dlpk;',
  'GeoPackage:file:Data,GeoPackage,gpkg;',
  'Big Data Analytic:text:Big Data Analytic,IoT;',
  'Real Time Analytic:text:Real Time Analytic,IoT;',
  'Feed:url:Feed,IoT;',
  'Data Store:text:Data Store,ArcGIS Server;',
  'Excalibur Imagery Project:text:Excalibur Imagery Project;',
  'Mission:text:ArcGIS Mission Management,Mission Command;',
  'Compact Tile Package:file:Compact Tile Package,Tile Package,tpkx;',
  'Site Application:text:Hub,OpenData;',
  'Site Page:text:Hub,OpenData;',
  'StoryMap:text:StoryMap,Web Application;',
  'QuickCapture Project:text:QuickCapture,QuickCapture Project;',
  'Urban Model:text:Urban,Urban-Model;',
  'Pro Report:file:Report,Pro Report,ArcGIS Pro,rptx;',
  'Web Experience:text:Web Application,Web Mapping Application,Web Page,Web Site,Web Experience;',
  'Workflow:text:Workflow Manager;',
  'Survey123 Add In:file:Survey123 Add In,Add In,Tool;',
  'Web Experience Template:text:Web Experience Template;',
  'Insights Script:text:Insights Script;',
  'Kernel Gateway Connection:text:Kernel Connection,Insights Gateway Connection,Insights Jupyter Kernel Gateway Connection;',
  'User License Type Extension:text:User License Type Extension;',
  'API Key:text:API Key;',
  'Knowledge Graph:url:Knowledge Graph,Service,ArcGIS Server;',
  'Web Link Chart:text:Link Chart,Web Link Chart;',
  'Hub Initiative Template:text:Hub,Hub Initiative Template,JavaScript,OpenData,Ready To Use;',
  'Indoors Map Configuration:text:Configuration, ArcGIS Indoors;',
  'Mission Report:text:ArcGIS Mission Report;',
  'Esri Classification Schema:text:Esri Classification Schema,Label,Deep Learning Studio,Deep Learning,Training Sample,Model;',
  'Deep Learning Studio Project:text:Deep Learning Studio,Deep Learning Studio Project,Deep Learning,Training Sample,Model,Inference,Object Detection,Pixel Segmentation,Pixel Classification,Detect Objects,Classify Pixel,Classify Feature;',
  'Administrative Report:file:Report,ArcGIS Online,Reporting,Administrative Report;',
  'StoryMap Theme:text:StoryMap,StoryMap Theme;',
  'Hub Event:text:Hub,Hub Event,Ready To Use,Javascript;',
  'Web AppBuilder Widget:text:Web AppBuilder, Widget;',
  'GML:file:GML;',
  'Earth Configuration:file:Earth,ArcGIS Earth,Earth Configuration;',
  'GeoBIM Project:text:BIM,Map,Scene,GeoBIM,CAD;',
  'GeoBIM Application:text:BIM,Map,Scene,GeoBIM,CAD,Application;',
  'Knowledge Graph Web Investigation:text:Investigation,Knowledge Graph Web Investigation;',
  'Pro Project:text:Pro Project,Project,ArcGIS Pro;',
  'Insights Workbook Package:file:Insights,Insights Workbook Package;',
  'Apache Parquet:file:Parquet,Data Interoperability,Data;',
  'SMX Item:text:Storymap Express,SMX Item,Web Application,SMX;',
  'SMX Theme:text:Storymap Express,SMX Theme,SMX;',
  'SMX Map:text:Storymap Express,SMX Map,SMX;',
  'Symbol Service:text:ArcGIS Server,Symbol Service,Service,Tool;',
  'Hub Project:text:Hub,Hub Project,Ready To Use,JavaScript;',
  'Video Service:url:ArcGIS Video Server,Video Service,Video;',
  'Experience Builder Widget Package:file:Package Widget,Experience Builder,Widget;',
  'Experience Builder Widget:url:Experience Builder Widget,Experience Builder,Widget;',
  'Data Pipeline:text:Data Pipeline;',
  'Suitability Model:text:Suitability Model;',
  'Esri Classifier Definition:text:Esri Classifier Definition,ECD,Classifier,Classification,Regression;',
  'Insights Data Engineering Model:text:Insights,Insights Data Engineering,Data Engineering,Model,Data Engineering Model,Insights Data Engineering Model,Insights Model;',
  'Insights Data Engineering Workbook:text:Insights,Insights Data Engineering,Data Engineering,Workbook,Data Engineering Workbook,Insights Data Engineering Workbook,Insights Workbook;',
  'Pro Report Template:file:Report Template,Pro Report Template,ArcGIS Pro,rptt;',
  'Arcade Module:text:Arcade Module,Arcade;',
  'AllSource Project:file:AllSource,AllSource Project;',
  'Reality Studio Project:file:Reality,Reality Studio;',
  'Reality Mapping Project:text:Reality Mapping Project,Reality,Ortho,Orthomosaic,Orthophoto,True Ortho,Mesh,Point Cloud,DSM,DTM;',
  'Discussion:text:ArcGIS Hub,Hub,Hub Discussion,Discussion;',
  'Knowledge Studio Project:text:Knowledge Studio Project;',
  'Mission Template:text:ArcGIS Mission Template;',
  '3DTiles Package:file:3DTiles,3DTiles Package;',
  '3DTiles Service:url:Data,Service,3DTiles Service,ArcGIS Server;',
  'IPS Configuration:text:Configuration,ArcGIS IPS;',
  'Group Layer:text:Group Layer;',
  'Media Layer:text:Media Layer;',
  'Knowledge Graph Layer:text:Knowledge Graph;',
  'Living Atlas Export Package:file:Living Atlas Export Package,lapk;',
  'Analysis Model:text:Analysis Model;',
  'WCS:url:Data,OGC,Service,Web Coverage Service;',
  'Urban Project:text:Urban,Urban Project;',
  'Pro Presentation:file:Presentation,Presentation File,Pro Presentation File,ArcGIS Pro,prsx;',
  'Application SDK:text:Application SDK;'
];

/**
 *
 * @param targetEntity
 * @param intl
 */
const getTypePredicateItemsWithChildren = (targetEntity, intl) => {
  let comboboxUiItems = [];
  switch (targetEntity) {
    case "item":
      comboboxUiItems = getItemTargetEntityTypeItems(intl);
      break;
    /**
     * TODO: if we reuse the type predicate (group types, user types, etc),
     * we'll add more combobox item cases here
    */
  }
  return comboboxUiItems;
};
/**
 * Helper function to convert raw ago item types into combobox items that can be rendered in the UI.
 * This groups the combobox items by family so that the items are nested, and adds the appropriate icon.
 * We also include the family as a top-level item in the combobox so that a type expansion like "$documents" can be used in the query.
 * @param intl
 * @returns
 */
const getItemTargetEntityTypeItems = (intl) => {
  const familyToIndex = {};
  const comboboxItems = getAgoTypes(rawAgoItemTypes).reduce((acc, type) => {
    // grab the family first, since we organize by this
    const family = getFamily(type);
    // only non-event types are added to combobox
    if (family && family !== "event") {
      // if we have yet to see the family (and no events since we are in items)
      if (isNil(familyToIndex[family])) {
        // save the family and the index where we added it
        familyToIndex[family] = acc.length;
        acc.push({
          label: intl.t(`valueConfigs.type.${family}.label`),
          // we add a $ to the value to prepare it for predicate expansion later
          value: `$${family}`,
          children: [],
        });
      }
      // add the type to the family
      acc[familyToIndex[family]].children.push({
        label: type,
        value: type
      });
    }
    // if we don't get a family, log that type
    else if (!family) {
      console.error("No family is defined for type: ", type);
    }
    return acc;
  }, []);
  // sort the resulting list by family alphabetically
  comboboxItems.sort((a, b) => a.label.localeCompare(b.label));
  return comboboxItems;
};

/**
 * returns the full predicate configuration for a given
 * predicate property
 *
 * NOTE: we will continue to add more predicate configs
 * here as we extend the predicate builder field
 *
 * @param {PredicateProperty} property predicate property
 * @param {EntityType} targetEntity type of entity the predicate is targeting
 * @param {IArcGISContext} context contextual portal & auth information
 */
const getPredicateConfig = async (property, targetEntity, context, intl) => {
  let config;
  switch (property) {
    case "type":
      config = {
        property: getPropertyConfig("type"),
        operators: [
          getOperatorConfig("isAny"),
          getOperatorConfig("isNot")
        ],
        values: {
          schema: {
            type: "array",
            items: {
              type: "string",
            }
          },
          uiSchema: {
            type: "Control",
            label: "{{valueConfigs.type.label:translate}}",
            scope: "/properties/value",
            options: {
              control: "hub-field-input-combobox",
              selectionMode: "multiple",
              allowCustomValues: false,
              items: getTypePredicateItemsWithChildren(targetEntity, intl),
              messages: [
                {
                  type: "ERROR",
                  keyword: "required",
                  icon: true,
                  label: "{{valueConfigs.type.requiredError:translate}}"
                }
              ],
            }
          }
        }
      };
      break;
    case "group":
      config = {
        property: getPropertyConfig("group"),
        // the events API does not currently support search via an
        // advanced query language, e.g. it does not yet have an
        // equivalent to AGO's q parameter. Without being able to
        // explicitly AND/OR conditions, we can only support a
        // subset of operands.
        operators: targetEntity === "event"
          ? [getOperatorConfig("isAny", "group")]
          : [getOperatorConfig("isAny", "group"), getOperatorConfig("isAll", "group"), getOperatorConfig("isNot", "group")],
        values: {
          schema: {
            type: "array",
            items: {
              type: "string"
            }
          },
          uiSchema: {
            label: "{{valueConfigs.group.label:translate}}",
            type: "Control",
            scope: "/properties/value",
            options: {
              control: "hub-field-input-gallery-picker",
              targetEntity: "group",
              catalogs: getGroupCatalogs(context, "shared.groupPicker"),
              facets: getGroupFacets(context, "shared.groupPicker"),
              messages: [
                {
                  type: "ERROR",
                  keyword: "required",
                  icon: true,
                  label: "{{valueConfigs.group.requiredError:translate}}"
                }
              ],
            }
          }
        }
      };
      break;
    case "occurrence":
      config = {
        property: getPropertyConfig("occurrence"),
        operators: [getOperatorConfig("isExactly", "occurrence")],
        values: {
          schema: {
            type: "string",
            enum: ["upcoming", "past", "inProgress"]
          },
          uiSchema: {
            type: "Control",
            label: "{{valueConfigs.occurrence.label:translate}}",
            scope: "/properties/value",
            options: {
              control: "hub-field-input-radio",
              labels: [
                "{{valueConfigs.occurrence.upcoming:translate}}",
                "{{valueConfigs.occurrence.past:translate}}",
                "{{valueConfigs.occurrence.inProgress:translate}}"
              ],
              messages: [
                {
                  type: "ERROR",
                  keyword: "required",
                  icon: true,
                  label: "{{valueConfigs.occurrence.requiredError:translate}}"
                }
              ],
            }
          },
        }
      };
      break;
  }
  if (!config) {
    throw new Error(`getPredicateConfig: no config found for property ${property}`);
  }
  else if (!config.property.targetEntities.includes(targetEntity)) {
    throw new Error(`getPredicateConfig: property ${property} is not valid for target entity ${targetEntity}`);
  }
  return config;
};

const buildPredicateBuilderSchema = async (opts) => {
  const { properties, predicates, targetEntity, context, intl } = opts;
  const predicate = predicates[0];
  const property = properties.length === 1 ? properties[0] : predicate === null || predicate === void 0 ? void 0 : predicate.property;
  let operatorEnum = [];
  let valueSchema;
  if (property) {
    const config = await getPredicateConfig(property, targetEntity, context, intl);
    operatorEnum = config.operators.map(operator => {
      return operator.value;
    });
    valueSchema = config.values.schema;
  }
  return {
    type: "object",
    required: ["property", "operator", "value"],
    properties: Object.assign({ property: Object.assign({ type: "string", enum: properties }, (properties.length >= 1 && { default: properties[0] })), operator: Object.assign(Object.assign({ type: "string" }, (operatorEnum.length && { enum: operatorEnum })), (operatorEnum.length >= 1 && { default: operatorEnum[0] })) }, (valueSchema && { value: valueSchema }))
  };
};
const buildPredicateBuilderUiSchema = async (opts) => {
  var _a;
  const { properties, predicates, targetEntity, context, intl } = opts;
  const predicate = predicates[0];
  const property = properties.length === 1 ? properties[0] : predicate === null || predicate === void 0 ? void 0 : predicate.property;
  let config;
  let operatorEnum = [];
  let operator;
  if (property) {
    config = await getPredicateConfig(property, targetEntity, context, intl);
    operatorEnum = config.operators.map(operator => {
      return operator.value;
    });
    operator = operatorEnum.length >= 1 ? operatorEnum[0] : predicate === null || predicate === void 0 ? void 0 : predicate.operator;
  }
  let valueUiSchema = [];
  if (property && operator) {
    valueUiSchema = Array.isArray((_a = config === null || config === void 0 ? void 0 : config.values) === null || _a === void 0 ? void 0 : _a.uiSchema)
      ? config.values.uiSchema
      : [config.values.uiSchema];
  }
  return {
    type: "Layout",
    elements: [
      {
        type: "Control",
        scope: "/properties/property",
        label: "{{property.label:translate}}",
        options: {
          control: "hub-field-input-combobox",
          selectionMode: "single",
          readOnly: properties.length === 1,
          clearDisabled: true,
          items: properties.map(property => {
            var _a;
            return {
              value: property,
              label: (_a = getPropertyConfig(property)) === null || _a === void 0 ? void 0 : _a.label
            };
          }),
          messages: [
            {
              type: "ERROR",
              keyword: "required",
              icon: true,
              label: "{{property.requiredError:translate}}"
            }
          ],
        }
      },
      {
        type: "Control",
        scope: "/properties/operator",
        label: "{{operator.label:translate}}",
        options: {
          control: "hub-field-input-combobox",
          selectionMode: "single",
          readOnly: operatorEnum.length === 1,
          clearDisabled: true,
          items: config === null || config === void 0 ? void 0 : config.operators,
          messages: [
            {
              type: "ERROR",
              keyword: "required",
              icon: true,
              label: "{{operator.requiredError:translate}}"
            }
          ],
        },
        rules: [
          {
            effect: UiSchemaRuleEffects.SHOW,
            conditions: [
              {
                scope: "/properties/property",
                schema: { not: { const: "" } }
              }
            ]
          }
        ]
      },
      ...valueUiSchema
    ].filter(Boolean)
  };
};

const arcgisHubPredicatesBuilderCss = "arcgis-configuration-editor.sc-arcgis-hub-predicates-builder{border-left:3px solid;border-left-color:var(--calcite-color-border-3);padding-left:1rem}";

const ArcgisHubPredicatesBuilder = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arcgisHubPredicatesBuilderChange = createEvent(this, "arcgisHubPredicatesBuilderChange", 7);
    /**
     * wrapper around the built-in intl.t function that
     * encapsulates the translation strings from this
     * component to pass into the configuration editor
     */
    this.translationFunc = (key, values, opts) => {
      return this._intl.t(key, values, opts);
    };
    this.handlePredicatesEditorChange = async (evt) => {
      const { values } = evt.detail;
      evt.stopPropagation();
      const _predicate = mergeDeep(cloneObject(this._predicates[0]), cloneObject(values));
      this._predicates = [_predicate];
      const transformedPredicates = await this.transformPredicatesToEmit(this._predicates);
      // despite being called the predicates editor, we currently
      // only support a single predicate being configured. We need
      // to ensure that this predicate is "complete" before emitting;
      // i.e. it has a property, operator, and value
      const isComplete = ["property", "operator", "value"].every((key) => {
        const hasField = Object.keys(_predicate).includes(key);
        return hasField && !isFieldEmpty(_predicate[key]);
      });
      this.arcgisHubPredicatesBuilderChange.emit(isComplete ? transformedPredicates : []);
    };
    this.predicates = undefined;
    this.targetEntity = undefined;
    this.availablePredicateProperties = [];
    this._isLoading = undefined;
    this._schema = undefined;
    this._uiSchema = undefined;
    this._predicates = undefined;
  }
  async buildSchemas() {
    await Promise.all([this.buildSchema(), this.buildUiSchema()]);
  }
  ;
  async componentWillLoad() {
    this._intl = await intlManager.loadIntlForComponent(this.element);
    this.init();
  }
  async init() {
    this._isLoading = true;
    this._predicates = await this.transformPredicatesForEditor(this.predicates);
    this._isLoading = false;
  }
  get _context() {
    return getGlobalContext();
  }
  /**
   * predicate properties to present as "Parameter" options. If
   * none are provided, we default to all properties available
   * for the targetEntity
   */
  get _predicateProperties() {
    return this.availablePredicateProperties.length
      ? this.availablePredicateProperties
      : this._defaultPredicateProperties;
  }
  /**
   * if availablePredicateProperties are not provided, we
   * default to all properties available for the targetEntity
   */
  get _defaultPredicateProperties() {
    let properties;
    switch (this.targetEntity) {
      case "item":
        properties = ITEM_PREDICATE_PROPERTIES;
        break;
      case "event":
        properties = EVENT_PREDICATE_PROPERTIES;
        break;
    }
    return properties;
  }
  /** function to dynamically generate the predicate builder schema */
  async buildSchema() {
    this._schema = await buildPredicateBuilderSchema({
      properties: this._predicateProperties,
      predicates: this._predicates,
      targetEntity: this.targetEntity,
      context: this._context,
      intl: this._intl,
    });
  }
  ;
  /** function to dynamically generate the predicate builder uiSchema */
  async buildUiSchema() {
    const uiSchema = await buildPredicateBuilderUiSchema({
      properties: this._predicateProperties,
      predicates: this._predicates,
      targetEntity: this.targetEntity,
      context: this._context,
      intl: this._intl,
    });
    this._uiSchema = interpolateTranslations(this._intl, uiSchema);
  }
  ;
  /**
  * function to transform the predicates into a format that is
  * consistent with the underlying predicate editor
  */
  async transformPredicatesForEditor(predicates) {
    return await Promise.all(predicates.map(async (predicate) => {
      // 0. return early if the predicate is empty
      if (!Object.keys(predicate).length) {
        return;
      }
      const transformedPredicate = {};
      // 1. determine the predicate property being edited
      // and grab its configuration
      const property = Object.keys(predicate)[0];
      const config = await getPredicateConfig(property, this.targetEntity, this._context, this._intl);
      const callback = config.values.inCallback;
      // 2. determine the operator & value
      let operator;
      let value = predicate[property];
      // if the predicate value is a string or number,
      // we can assume the operator is "isExactly"
      if (["string", "number"].includes(typeof value)) {
        operator = 'isExactly';
      }
      // if the predicate value is an array, we can
      // assume the operator is "isAny"
      if (Array.isArray(value)) {
        operator = "isAny";
      }
      // if the predicate value is an object, we can assume
      // it is either an IMatchOptions | IDateRange | IRelativeDate
      // and parse it accordingly
      // TODO: support IDateRange & IRelativeDate operators
      if (Object.keys(value).length) {
        if (value.any) {
          operator = "isAny";
          value = value.any;
        }
        if (value.all) {
          operator = "isAll";
          value = value.all;
        }
        if (value.not) {
          operator = "isNot";
          value = value.not;
        }
      }
      // 3. construct the internal structure of the
      // predicate that's consumed by the editor
      transformedPredicate.property = Object.keys(predicate)[0];
      transformedPredicate.operator = operator;
      transformedPredicate.value = callback ? callback(value) : value;
      return transformedPredicate;
    }));
  }
  /**
   * function to transform the editor values into an array of
   * valid IPredicates before emitting
   */
  async transformPredicatesToEmit(predicates) {
    const transformedPredicates = await Promise.all(predicates.map(async (predicate) => {
      const transformedPredicate = {};
      const config = await getPredicateConfig(predicate === null || predicate === void 0 ? void 0 : predicate.property, this.targetEntity, this._context, this._intl);
      const callback = config.values.outCallback;
      let value = callback ? callback(predicate.value) : predicate.value;
      switch (predicate.operator) {
        case "isAny":
          value = { any: value || [] };
          break;
        case "isAll":
          value = { all: value || [] };
          break;
        case "isNot":
          value = { not: value || [] };
          break;
      }
      transformedPredicate[config.property.value] = value;
      return transformedPredicate;
    }));
    return transformedPredicates;
  }
  renderLoadingState() {
    if (this._isLoading || !this._schema || !this._uiSchema) {
      return h("arcgis-skeleton-loader", { active: true, rows: 3, showHeading: false });
    }
  }
  renderEditor() {
    if (!this._isLoading && this._schema && this._uiSchema) {
      return (h("arcgis-configuration-editor", { onArcgisConfigurationEditorChange: this.handlePredicatesEditorChange, schema: this._schema, t: this.translationFunc, uiSchema: this._uiSchema, values: this._predicates[0] }));
    }
  }
  render() {
    return (h(Host, { "data-element": "predicates-builder" }, this.renderLoadingState(), this.renderEditor()));
  }
  static get assetsDirs() { return ["locales"]; }
  get element() { return getElement(this); }
  static get watchers() { return {
    "_predicates": ["buildSchemas"]
  }; }
};
ArcgisHubPredicatesBuilder.style = arcgisHubPredicatesBuilderCss;

export { ArcgisHubPredicatesBuilder as arcgis_hub_predicates_builder };
