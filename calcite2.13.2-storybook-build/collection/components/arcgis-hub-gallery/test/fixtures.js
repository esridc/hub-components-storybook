export const COLLECTION = {
  label: 'Default',
  key: 'default',
  include: [],
  scope: {
    targetEntity: 'item',
    filters: [
      {
        operation: "AND",
        predicates: [
          {
            access: [
              "public",
            ],
          },
          {
            group: [
              "abc123",
              "def456",
            ],
          },
        ],
      },
      {
        operation: "OR",
        predicates: [
          {
            type: "$webmap",
          },
          {
            type: "$webscene",
          },
        ],
      },
    ],
  },
  sortDirection: 'desc',
  sortField: 'numviews',
  targetEntity: 'item'
};
export const COLLECTION_2 = {
  include: [],
  key: "default",
  label: "Default",
  scope: {
    targetEntity: "item",
    filters: [
      {
        operation: "AND",
        predicates: [
          {
            access: [
              "public"
            ]
          },
          {
            orgid: "lQySeXwbBg53XWDi"
          }
        ]
      },
      {
        operation: "OR",
        predicates: [
          {
            type: "$application"
          },
          {
            type: "$dashboard"
          },
          {
            type: "$dataset"
          },
          {
            type: "$site"
          },
          {
            type: "$page"
          },
          {
            type: "$storymap"
          },
          {
            type: "$feedback"
          }
        ]
      }
    ]
  },
  sortDirection: "desc",
  sortField: "numviews",
  targetEntity: "item"
};
export const EMPTY_COLLECTION = {
  label: 'Default',
  key: 'default',
  include: [],
  scope: {
    targetEntity: 'item',
    filters: []
  },
  targetEntity: 'item'
};
export const EMPTY_QUERY = {
  targetEntity: 'item',
  filters: [],
};
export const QUERY = {
  targetEntity: 'item',
  filters: [
    {
      operation: "AND",
      predicates: [
        {
          access: [
            "public",
          ],
        },
        {
          group: [
            "abc123",
            "def456",
          ],
        },
      ],
    },
    {
      operation: "OR",
      predicates: [
        {
          type: "$webmap",
        },
        {
          type: "$webscene",
        },
      ],
    },
  ],
};
export const REQUEST_OPTIONS = {
  authentication: undefined,
  hubApiUrl: "https://hub.arcgis.com",
  isPortal: false,
  portal: "https://www.arcgis.com/sharing/rest",
  portalSelf: undefined
};
export const SEARCH_OPTIONS = {
  include: [],
  num: 20,
  requestOptions: REQUEST_OPTIONS,
  sortField: "numviews",
  sortOrder: "asc",
  site: undefined,
  httpMethod: "POST",
};
export const FACETS = [
  {
    label: 'Access',
    key: 'access',
    field: 'access',
    display: 'multi-select',
    operation: 'OR',
    options: [],
    aggLimit: 5,
  },
  {
    label: 'Type',
    key: 'type',
    field: 'type',
    display: 'multi-select',
    operation: 'OR',
    options: [],
    aggLimit: 20,
  },
  {
    label: 'Tags',
    key: 'tags',
    field: 'tags',
    display: 'multi-select',
    operation: 'AND',
    options: [],
  },
  {
    label: 'Categories',
    key: 'categories',
    field: 'categories',
    display: 'multi-select',
    operation: 'AND',
    options: [],
  },
];
export const AGG_SEARCH_OPTIONS_1 = {
  include: [],
  num: 1,
  requestOptions: REQUEST_OPTIONS,
  aggFields: ['access', 'type', 'tags'],
  aggLimit: 20,
  httpMethod: "POST",
  site: undefined,
};
export const AGG_SEARCH_OPTIONS_2 = {
  include: [],
  num: 1,
  requestOptions: REQUEST_OPTIONS,
  aggFields: ['categories'],
  aggLimit: 20,
  httpMethod: "POST",
  site: undefined,
};
/** Gallery Card fixtures */
export const COLLECTION_MANUAL = {
  include: [],
  key: "default",
  label: "Default",
  scope: {
    targetEntity: "item",
    filters: [
      {
        operation: "AND",
        predicates: [
          {
            id: [
              "f060278f57b24163bd51fef3aa2e81ea",
              "58de591989fa47989c03ecada1dcb061",
              "dea94424ab3b4116a093d0e2750cecec",
              "0b98cda2a0b14c66b6f25b6d4d09a941"
            ]
          }
        ]
      }
    ]
  },
  sortDirection: "desc",
  sortField: "numviews",
  targetEntity: "item"
};
export const COLLECTION_CATALOGS = {
  include: [],
  key: "default",
  label: "Default",
  scope: {
    targetEntity: "item",
    filters: [
      {
        operation: "AND",
        predicates: [
          {
            catalogs: [
              "c797ac37d68e40f49b7debc81b17ab35"
            ]
          },
          {
            orgid: "T5cZDlfUaBpDnk6P"
          }
        ]
      },
      {
        operation: "OR",
        predicates: [
          {
            type: "$dataset"
          },
          {
            type: "$feedback"
          },
          {
            type: "$storymap"
          }
        ]
      }
    ]
  },
  sortDirection: "asc",
  sortField: "title",
  targetEntity: "item"
};
export const COLLECTION_CATEGORIES = {
  include: [],
  key: "default",
  label: "Default",
  scope: {
    targetEntity: "item",
    filters: [
      {
        operation: "AND",
        predicates: [
          {
            categories: [
              "syds category"
            ]
          },
          {
            orgid: "T5cZDlfUaBpDnk6P"
          }
        ]
      },
      {
        operation: "OR",
        predicates: [
          {
            type: "$dataset"
          },
          {
            type: "$feedback"
          },
          {
            type: "$storymap"
          }
        ]
      }
    ]
  },
  sortDirection: "asc",
  sortField: "title",
  targetEntity: "item"
};
export const COLLECTION_TYPES = {
  include: [],
  key: "default",
  label: "Default",
  scope: {
    targetEntity: "item",
    filters: [
      {
        operation: "AND",
        predicates: [
          {
            orgid: "T5cZDlfUaBpDnk6P"
          }
        ]
      },
      {
        operation: "OR",
        predicates: [
          {
            "type": "$dataset"
          }
        ]
      }
    ]
  },
  sortDirection: "asc",
  sortField: "title",
  targetEntity: "item"
};
export const COLLECTION_ACCESS = {
  include: [],
  key: "default",
  label: "Default",
  scope: {
    targetEntity: "item",
    filters: [
      {
        operation: "AND",
        predicates: [
          {
            access: [
              "org"
            ]
          },
          {
            orgid: "T5cZDlfUaBpDnk6P"
          }
        ]
      },
      {
        operation: "OR",
        predicates: [
          {
            type: "$dataset"
          },
          {
            type: "$feedback"
          },
          {
            type: "$storymap"
          }
        ]
      }
    ]
  },
  sortDirection: "asc",
  sortField: "title",
  targetEntity: "item"
};
export const COLLECTION_ACCESS_PRIVATE = {
  include: [],
  key: "default",
  label: "Default",
  scope: {
    targetEntity: "item",
    filters: [
      {
        operation: "AND",
        predicates: [
          {
            access: [
              "private",
              "shared"
            ]
          },
          {
            orgid: "T5cZDlfUaBpDnk6P"
          }
        ]
      },
      {
        operation: "OR",
        predicates: [
          {
            "type": "$dataset"
          },
          {
            "type": "$feedback"
          },
          {
            "type": "$storymap"
          }
        ]
      }
    ]
  },
  sortDirection: "asc",
  sortField: "title",
  targetEntity: "item"
};
export const COLLECTION_GROUPS = {
  include: [],
  key: "default",
  label: "Default",
  scope: {
    targetEntity: "item",
    filters: [
      {
        operation: "AND",
        predicates: [
          {
            group: [
              "da16d71c1ae849d7989e65a7fe4c0e4a"
            ]
          }
        ]
      }
    ]
  },
  sortDirection: "asc",
  sortField: "title",
  targetEntity: "item"
};
export const COLLECTION_TAGS = {
  include: [],
  key: "default",
  label: "Default",
  scope: {
    targetEntity: "item",
    filters: [
      {
        operation: "AND",
        predicates: [
          {
            orgid: "T5cZDlfUaBpDnk6P"
          },
          {
            tags: [
              "tag"
            ]
          }
        ]
      },
      {
        operation: "OR",
        predicates: [
          {
            type: "$dataset"
          },
          {
            type: "$feedback"
          },
          {
            type: "$storymap"
          }
        ]
      }
    ]
  },
  sortDirection: "asc",
  sortField: "title",
  targetEntity: "item"
};
export const COLLECTION_CATEGORIES_TAGS = {
  include: [],
  key: "default",
  label: "Default",
  scope: {
    targetEntity: "item",
    filters: [
      {
        operation: "AND",
        predicates: [
          {
            categories: [
              "syds category"
            ]
          },
          {
            orgid: "T5cZDlfUaBpDnk6P"
          },
          {
            tags: [
              "tag"
            ]
          }
        ]
      },
      {
        operation: "OR",
        predicates: [
          {
            type: "$dataset"
          },
          {
            type: "$feedback"
          },
          {
            type: "$storymap"
          }
        ]
      }
    ]
  },
  sortDirection: "asc",
  sortField: "title",
  targetEntity: "item"
};
export const AGG_SEARCH_OPTIONS_GCARD = {
  num: 8,
  sortField: "title",
  sortOrder: "asc",
  include: [],
  requestOptions: REQUEST_OPTIONS,
  site: undefined,
  httpMethod: "POST",
};
export const AGG_SEARCH_OPTIONS_POPULARITY = {
  num: 8,
  sortField: "numviews",
  sortOrder: "desc",
  include: [],
  requestOptions: REQUEST_OPTIONS,
  site: undefined,
  httpMethod: "POST",
};
export const AGG_SEARCH_OPTIONS_CREATED = {
  num: 8,
  sortField: "created",
  sortOrder: "desc",
  include: [],
  requestOptions: REQUEST_OPTIONS,
  site: undefined,
  httpMethod: "POST",
};
export const AGG_SEARCH_OPTIONS_UPDATED = {
  num: 8,
  sortField: "modified",
  sortOrder: "desc",
  include: [],
  requestOptions: REQUEST_OPTIONS,
  site: undefined,
  httpMethod: "POST",
};
export const LOCATION = {
  type: "org",
  extent: [
    [
      -134.74699999999547,
      20.66992270076423
    ],
    [
      -55.69599999999812,
      50.3089999999983
    ]
  ],
  spatialReference: {
    wkid: 4326
  },
  geometries: [
    {
      spatialReference: {
        wkid: 4326
      },
      rings: [
        [
          [
            -134.74699999999547,
            20.66992270076423
          ],
          [
            -134.74699999999547,
            50.3089999999983
          ],
          [
            -55.69599999999812,
            50.3089999999983
          ],
          [
            -55.69599999999812,
            20.66992270076423
          ],
          [
            -134.74699999999547,
            20.66992270076423
          ]
        ]
      ],
      type: "polygon"
    }
  ]
};
export const ITEM_SEARCH_RESULTS = [
  {
    "access": "public",
    "id": "2a50f20709d3490cbb0c9f94641dea41",
    "type": "Feature Service",
    "name": "Hurricane_Evacuation_Routes",
    "owner": "tanner_pa",
    "tags": [
      "hurricane",
      "evacuation",
      "routes",
      "emergency transportation",
      "disaster relief",
      "hurricane preparedness",
      "transportation"
    ],
    "typeKeywords": [
      "ArcGIS Server",
      "Data",
      "Feature Access",
      "Feature Service",
      "Metadata",
      "Service",
      "Singlelayer",
      "Hosted Service"
    ],
    "categories": [],
    "summary": "This dataset represents the locations of hurricane evacuation routes. A hurricane evacuation route is a designated route used to direct traffic inland in case of a hurricane threat.\n\nHomeland Security                  \n\nUse Cases: Use cases describe how the data may be used and help to define and clarify requirements.     \n\n1) A resource for emergency route planning purposes.\n\n2) A resource for situational awareness planning and response for federal government events.\n\n3) A portion of an evacuation route may be rendered unusable due to natural or man made disaster and rerouting of traffic is necessary.\n\n4) An incident has occurred during an evacuation and first responders must quickly deploy to the area.\n\n5) Public awareness.",
    "createdDate": new Date("2022-06-10T18:11:21.000Z"),
    "createdDateSource": "item.created",
    "updatedDate": new Date("2024-09-05T17:42:46.000Z"),
    "updatedDateSource": "item.modified",
    "family": "map",
    "links": {
      "self": "https://qa-pre-a-hub.mapsqa.arcgis.com/home/item.html?id=2a50f20709d3490cbb0c9f94641dea41",
      "siteRelative": "/maps/2a50f20709d3490cbb0c9f94641dea41",
      "thumbnail": "https://qa-pre-a-hub.mapsqa.arcgis.com/sharing/rest/content/items/2a50f20709d3490cbb0c9f94641dea41/info/thumbnail/ago_downloaded.png"
    },
    "location": {
      "type": "org",
      "extent": [
        [
          -134.74699999999547,
          20.66992270076423
        ],
        [
          -55.69599999999812,
          50.3089999999983
        ]
      ],
      "spatialReference": {
        "wkid": 4326
      },
    },
    "rawResult": {
      "id": "2a50f20709d3490cbb0c9f94641dea41",
      "owner": "tanner_pa",
      "created": 1654884681000,
      "isOrgItem": true,
      "modified": 1725558166000,
      "guid": null,
      "name": null,
      "title": "Hurricane_Evacuation_Routes",
      "type": "Feature Service",
      "typeKeywords": [
        "ArcGIS Server",
        "Data",
        "Feature Access",
        "Feature Service",
        "Metadata",
        "Service",
        "Singlelayer",
        "Hosted Service"
      ],
      "description": "<div style='text-align:Left;'><div><div><p><span>Hurricane Evacuation Routes in the United States. A hurricane evacuation route is a designated route used to direct traffic inland in case of a hurricane threat. This dataset is based on supplied data from Gulf Coast and Atlantic Seaboard states. Each state was contacted by TGS to determine an official source for hurricane evacuation routes. GIS data was gathered from states willing to share such data. In cases where states were unable or unwilling to share data in this format, TGS requested that the states provide a source for identifying hurricane evacuation routes. The states usually identified a website that made this data available to the public. Three (3) states (ME, NY, and NH) indicated that they do not maintain public maps showing hurricane evacuation routes and were unable or unwilling to share GIS files depicting such routes. Hurricane evacuation routes depicted on non-GIS maps were digitized using aerial ortho imagery while referencing supplied maps. Shape files that depicted hurricane evacuation routes were edge matched and merged with the digitized evacuation routes. All routes identified as primary hurricane evacuation routes were included in this dataset. If a state also designated secondary hurricane evacuation routes, they were included as well. Routes depicted in this dataset are dependent upon what each state identified as a hurricane evacuation route. Criteria used to identify these routes may vary from state to state.</span></p></div></div></div>",
      "tags": [
        "hurricane",
        "evacuation",
        "routes",
        "emergency transportation",
        "disaster relief",
        "hurricane preparedness",
        "transportation"
      ],
      "snippet": "This dataset represents the locations of hurricane evacuation routes. A hurricane evacuation route is a designated route used to direct traffic inland in case of a hurricane threat.\n\nHomeland Security                  \n\nUse Cases: Use cases describe how the data may be used and help to define and clarify requirements.     \n\n1) A resource for emergency route planning purposes.\n\n2) A resource for situational awareness planning and response for federal government events.\n\n3) A portion of an evacuation route may be rendered unusable due to natural or man made disaster and rerouting of traffic is necessary.\n\n4) An incident has occurred during an evacuation and first responders must quickly deploy to the area.\n\n5) Public awareness.",
      "thumbnail": "thumbnail/ago_downloaded.png",
      "documentation": null,
      "extent": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -134.74699999999547,
              50.3089999999983
            ],
            [
              -55.69599999999812,
              50.3089999999983
            ],
            [
              -55.69599999999812,
              20.66992270076423
            ],
            [
              -134.74699999999547,
              20.66992270076423
            ],
            [
              -134.74699999999547,
              50.3089999999983
            ]
          ]
        ]
      },
      "categories": [],
      "spatialReference": "102100",
      "accessInformation": "Techni Graphic Systems, Inc.",
      "classification": null,
      "licenseInfo": "<div style='text-align:Left;'><div><div><p><span>Access Constraint: None (Public Domain Information)</span></p><p><span>Use Constraints: None (Public Use)</span></p></div></div></div>",
      "culture": "en-us",
      "properties": {
        "downloads": {
          "flowType": "createReplica",
          "formats": [
            {
              "key": "shapefile",
              "hidden": false
            },
            {
              "key": "csv",
              "hidden": false
            },
            {
              "key": "geojson",
              "hidden": false
            },
            {
              "key": "kml",
              "hidden": false
            },
            {
              "key": "filegdb",
              "hidden": false
            },
            {
              "key": "featureCollection",
              "hidden": false
            },
            {
              "key": "excel",
              "hidden": false
            },
            {
              "key": "geoPackage",
              "hidden": false
            },
            {
              "key": "sqlite",
              "hidden": false
            },
            {
              "key": "additionalResource::0",
              "hidden": false
            }
          ]
        },
        "location": {
          "type": "org",
          "extent": [
            [
              -134.74699999999547,
              20.66992270076423
            ],
            [
              -55.69599999999812,
              50.3089999999983
            ]
          ],
          "spatialReference": {
            "wkid": 4326
          },
          "geometries": [
            {
              "spatialReference": {
                "wkid": 4326
              },
              "rings": [
                [
                  [
                    -134.74699999999547,
                    20.66992270076423
                  ],
                  [
                    -134.74699999999547,
                    50.3089999999983
                  ],
                  [
                    -55.69599999999812,
                    50.3089999999983
                  ],
                  [
                    -55.69599999999812,
                    20.66992270076423
                  ],
                  [
                    -134.74699999999547,
                    20.66992270076423
                  ]
                ]
              ],
              "type": "polygon"
            }
          ]
        }
      },
      "advancedSettings": null,
      "url": "https://servicesqa.arcgis.com/Xj56SBi2udA78cC9/arcgis/rest/services/Hurricane_Evacuation_Routes/FeatureServer",
      "proxyFilter": null,
      "access": "public",
      "size": -1,
      "subInfo": 0,
      "appCategories": [],
      "industries": [],
      "languages": [],
      "largeThumbnail": null,
      "banner": null,
      "screenshots": [],
      "listed": false,
      "ownerFolder": "5e6319f02d6946d6b341c10091b42968",
      "protected": false,
      "numComments": 0,
      "numRatings": 0,
      "avgRating": 0,
      "numViews": 809,
      "scoreCompleteness": 100,
      "groupDesignations": null,
      "apiToken1ExpirationDate": -1,
      "apiToken2ExpirationDate": -1,
      "lastViewed": 1726153200000,
      "source": "Techni Graphic Systems, Inc.",
      "license": "custom"
    },
    "source": "Techni Graphic Systems, Inc.",
    "license": "custom",
    "index": 0
  },
  {
    "access": "public",
    "id": "e40cfbbfc2de4ae7b9f7055e06672bfa",
    "type": "Feature Service",
    "name": "alert('xss:description')  bMouse Over Me/b",
    "owner": "tanner_pa",
    "tags": [
      "cellular",
      "hey&there",
      "hey there"
    ],
    "typeKeywords": [
      "ArcGIS Server",
      "Data",
      "Feature Access",
      "Feature Service",
      "Metadata",
      "Service",
      "Singlelayer",
      "Hosted Service"
    ],
    "categories": [
      "/Categories/Infrastructure/Structures",
      "/Categories/People/Jobs",
      "/Categories/People",
      "/Categories/Infrastructure",
      "/Categories/Infrastructure/Utilities"
    ],
    "summary": "alert('xss:summary') | <b>Mouse Over Me</b>",
    "createdDate": new Date("2022-06-10T18:04:02.000Z"),
    "createdDateSource": "item.created",
    "updatedDate": new Date("2024-05-21T17:26:37.000Z"),
    "updatedDateSource": "item.modified",
    "family": "map",
    "links": {
      "self": "https://qa-pre-a-hub.mapsqa.arcgis.com/home/item.html?id=e40cfbbfc2de4ae7b9f7055e06672bfa",
      "siteRelative": "/maps/e40cfbbfc2de4ae7b9f7055e06672bfa",
      "thumbnail": "https://qa-pre-a-hub.mapsqa.arcgis.com/sharing/rest/content/items/e40cfbbfc2de4ae7b9f7055e06672bfa/info/thumbnail/Screenshot_2023-11-08_at_8.00.36_AM.png"
    },
    "location": {
      "type": "org",
      "extent": [
        [
          -134.74699999999547,
          20.66992270076423
        ],
        [
          -55.69599999999812,
          50.3089999999983
        ]
      ],
      "spatialReference": {
        "wkid": 4326
      },
    },
    "rawResult": {
      "id": "e40cfbbfc2de4ae7b9f7055e06672bfa",
      "owner": "tanner_pa",
      "created": 1654884242000,
      "isOrgItem": true,
      "modified": 1716312397000,
      "guid": null,
      "name": null,
      "title": "alert('xss:description')  bMouse Over Me/b",
      "type": "Feature Service",
      "typeKeywords": [
        "ArcGIS Server",
        "Data",
        "Feature Access",
        "Feature Service",
        "Metadata",
        "Service",
        "Singlelayer",
        "Hosted Service"
      ],
      "description": "<p>&lt;script&gt;alert('xss:summary')&lt;/script&gt; | &lt;b onmouseover=\"alert('mouseOver'\"&gt;Mouse Over Me&lt;/b&gt;</p><p>Blockquote text</p>",
      "tags": [
        "cellular",
        "hey&there",
        "hey there"
      ],
      "snippet": "alert('xss:summary') | <b>Mouse Over Me</b>",
      "thumbnail": "thumbnail/Screenshot_2023-11-08_at_8.00.36_AM.png",
      "documentation": null,
      "extent": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -134.74699999999547,
              50.3089999999983
            ],
            [
              -55.69599999999812,
              50.3089999999983
            ],
            [
              -55.69599999999812,
              20.66992270076423
            ],
            [
              -134.74699999999547,
              20.66992270076423
            ],
            [
              -134.74699999999547,
              50.3089999999983
            ]
          ]
        ]
      },
      "categories": [
        "/Categories/Infrastructure/Structures",
        "/Categories/People/Jobs",
        "/Categories/People",
        "/Categories/Infrastructure",
        "/Categories/Infrastructure/Utilities"
      ],
      "spatialReference": "102100",
      "accessInformation": null,
      "classification": null,
      "licenseInfo": "",
      "culture": "en-us",
      "properties": {
        "downloads": {
          "hosted": true
        },
        "indexJobId": "",
        "indexJobUrl": "",
        "boundary": "item",
        "location": {
          "type": "org",
          "extent": [
            [
              -134.74699999999547,
              20.66992270076423
            ],
            [
              -55.69599999999812,
              50.3089999999983
            ]
          ],
          "spatialReference": {
            "wkid": 4326
          },
          "geometries": [
            {
              "spatialReference": {
                "wkid": 4326
              },
              "rings": [
                [
                  [
                    -134.74699999999547,
                    20.66992270076423
                  ],
                  [
                    -134.74699999999547,
                    50.3089999999983
                  ],
                  [
                    -55.69599999999812,
                    50.3089999999983
                  ],
                  [
                    -55.69599999999812,
                    20.66992270076423
                  ],
                  [
                    -134.74699999999547,
                    20.66992270076423
                  ]
                ]
              ],
              "type": "polygon"
            }
          ]
        }
      },
      "advancedSettings": null,
      "url": "https://servicesqa.arcgis.com/Xj56SBi2udA78cC9/arcgis/rest/services/CellularTowers/FeatureServer",
      "proxyFilter": null,
      "access": "public",
      "size": -1,
      "subInfo": 0,
      "appCategories": [],
      "industries": [],
      "languages": [],
      "largeThumbnail": null,
      "banner": null,
      "screenshots": [],
      "listed": false,
      "ownerFolder": "5e6319f02d6946d6b341c10091b42968",
      "protected": false,
      "numComments": 0,
      "numRatings": 0,
      "avgRating": 0,
      "numViews": 1551,
      "scoreCompleteness": 65,
      "groupDesignations": null,
      "apiToken1ExpirationDate": -1,
      "apiToken2ExpirationDate": -1,
      "lastViewed": 1726156800000,
      "source": "QA Premium Alpha Hub",
      "license": "none"
    },
    "source": "QA Premium Alpha Hub",
    "license": "none"
  },
  {
    "access": "public",
    "id": "4c6a5b17c6d944bf8004eb923d0a2f24",
    "type": "Feature Service",
    "name": "VisionZero",
    "owner": "tanner_pa",
    "tags": [
      "points"
    ],
    "typeKeywords": [
      "ArcGIS Server",
      "Data",
      "Feature Access",
      "Feature Service",
      "Service",
      "Singlelayer"
    ],
    "categories": [],
    "summary": null,
    "createdDate": new Date("2022-06-03T16:38:14.000Z"),
    "createdDateSource": "item.created",
    "updatedDate": new Date("2024-08-26T21:31:02.000Z"),
    "updatedDateSource": "item.modified",
    "family": "map",
    "links": {
      "self": "https://qa-pre-a-hub.mapsqa.arcgis.com/home/item.html?id=4c6a5b17c6d944bf8004eb923d0a2f24",
      "siteRelative": "/maps/4c6a5b17c6d944bf8004eb923d0a2f24",
      "thumbnail": "https://qa-pre-a-hub.mapsqa.arcgis.com/sharing/rest/content/items/4c6a5b17c6d944bf8004eb923d0a2f24/info/thumbnail/ago_downloaded.png"
    },
    "location": {
      "type": "custom",
      "extent": [
        [
          -77.39303089689679,
          38.648908213731836
        ],
        [
          -76.6196682304394,
          39.08607548187385
        ]
      ],
      "spatialReference": {
        "wkid": 4326
      }
    },
    "rawResult": {
      "id": "4c6a5b17c6d944bf8004eb923d0a2f24",
      "owner": "tanner_pa",
      "created": 1654274294000,
      "isOrgItem": true,
      "modified": 1724707862000,
      "guid": null,
      "name": null,
      "title": "VisionZero",
      "type": "Feature Service",
      "typeKeywords": [
        "ArcGIS Server",
        "Data",
        "Feature Access",
        "Feature Service",
        "Service",
        "Singlelayer"
      ],
      "description": null,
      "tags": [
        "points"
      ],
      "snippet": null,
      "thumbnail": "thumbnail/ago_downloaded.png",
      "documentation": null,
      "extent": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -77.39303089689679,
              39.08607548187385
            ],
            [
              -76.6196682304394,
              39.08607548187385
            ],
            [
              -76.6196682304394,
              38.648908213731836
            ],
            [
              -77.39303089689679,
              38.648908213731836
            ],
            [
              -77.39303089689679,
              39.08607548187385
            ]
          ]
        ]
      },
      "categories": [],
      "spatialReference": null,
      "accessInformation": null,
      "classification": null,
      "licenseInfo": "",
      "culture": "en-us",
      "properties": {
        "boundary": "item",
        "location": {
          "type": "custom",
          "extent": [
            [
              -77.39303089689679,
              38.648908213731836
            ],
            [
              -76.6196682304394,
              39.08607548187385
            ]
          ],
          "geometries": [
            {
              "xmin": -77.39303089689679,
              "ymin": 38.648908213731836,
              "xmax": -76.6196682304394,
              "ymax": 39.08607548187385,
              "spatialReference": {
                "wkid": 4326
              },
              "type": "extent"
            }
          ],
          "spatialReference": {
            "wkid": 4326
          }
        },
        "downloads": {
          "flowType": "paging",
          "formats": [
            {
              "key": "csv",
              "hidden": false
            },
            {
              "key": "kml",
              "hidden": false
            },
            {
              "key": "shapefile",
              "hidden": true
            },
            {
              "key": "geojson",
              "hidden": false
            }
          ]
        }
      },
      "advancedSettings": null,
      "url": "https://maps2.dcgis.dc.gov/dcgis/rest/services/DDOT/VisionZero/FeatureServer/1",
      "proxyFilter": null,
      "access": "public",
      "size": -1,
      "subInfo": 0,
      "appCategories": [],
      "industries": [],
      "languages": [],
      "largeThumbnail": null,
      "banner": null,
      "screenshots": [],
      "listed": false,
      "ownerFolder": "5e6319f02d6946d6b341c10091b42968",
      "protected": false,
      "numComments": 0,
      "numRatings": 0,
      "avgRating": 0,
      "numViews": 630,
      "scoreCompleteness": 16,
      "groupDesignations": null,
      "apiToken1ExpirationDate": -1,
      "apiToken2ExpirationDate": -1,
      "lastViewed": 1726128000000,
      "source": "QA Premium Alpha Hub",
      "license": "none"
    },
    "source": "QA Premium Alpha Hub",
    "license": "none"
  },
  {
    "access": "org",
    "id": "f948affc76f942beaa8391e9cb688f44",
    "type": "Map Service",
    "name": "Oregon Administrative Boundaries",
    "owner": "tanner_pa",
    "tags": [
      "Boundaries",
      "Framework",
      "AdminBoundariesFramework",
      "Political",
      "City",
      "Cities",
      "Urban Growth Boundaries",
      "UGB",
      "UGBs",
      "Congressional",
      "House",
      "Senate",
      "District",
      "Districts",
      "Counties",
      "County"
    ],
    "typeKeywords": [
      "ArcGIS Server",
      "Data",
      "Dynamic",
      "Map Service",
      "Multilayer",
      "Service"
    ],
    "categories": [],
    "summary": "Oregon Administrative Boundaries Framework base data.",
    "createdDate": new Date("2024-02-13T16:32:55.000Z"),
    "createdDateSource": "item.created",
    "updatedDate": new Date("2024-02-13T16:40:29.000Z"),
    "updatedDateSource": "item.modified",
    "family": "map",
    "links": {
      "self": "https://qa-pre-a-hub.mapsqa.arcgis.com/home/item.html?id=f948affc76f942beaa8391e9cb688f44",
      "siteRelative": "/maps/f948affc76f942beaa8391e9cb688f44",
      "thumbnail": "https://qa-pre-a-hub.mapsqa.arcgis.com/sharing/rest/content/items/f948affc76f942beaa8391e9cb688f44/info/thumbnail/ago_downloaded.png"
    },
    "location": {
      "type": "custom",
      "extent": [
        [
          -124.86666065870291,
          41.518415286280515
        ],
        [
          -116.15401429353949,
          46.49784818852673
        ]
      ],
      "spatialReference": {
        "wkid": 4326
      }
    },
    "rawResult": {
      "id": "f948affc76f942beaa8391e9cb688f44",
      "owner": "tanner_pa",
      "created": 1707841975000,
      "isOrgItem": true,
      "modified": 1707842429000,
      "guid": null,
      "name": null,
      "title": "Oregon Administrative Boundaries",
      "type": "Map Service",
      "typeKeywords": [
        "ArcGIS Server",
        "Data",
        "Dynamic",
        "Map Service",
        "Multilayer",
        "Service"
      ],
      "description": "Administrative Framework Map Service for the State of Oregon. Contains vector representations of County, City, Urban Growth Boundaries, Senate, House, and Congressional Districts and Oregon State Parks.",
      "tags": [
        "Boundaries",
        "Framework",
        "AdminBoundariesFramework",
        "Political",
        "City",
        "Cities",
        "Urban Growth Boundaries",
        "UGB",
        "UGBs",
        "Congressional",
        "House",
        "Senate",
        "District",
        "Districts",
        "Counties",
        "County"
      ],
      "snippet": "Oregon Administrative Boundaries Framework base data.",
      "thumbnail": "thumbnail/ago_downloaded.png",
      "documentation": null,
      "extent": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -124.86666065870291,
              46.49784818852673
            ],
            [
              -116.15401429353949,
              46.49784818852673
            ],
            [
              -116.15401429353949,
              41.518415286280515
            ],
            [
              -124.86666065870291,
              41.518415286280515
            ],
            [
              -124.86666065870291,
              46.49784818852673
            ]
          ]
        ]
      },
      "categories": [],
      "spatialReference": "102100",
      "accessInformation": "ODOT, DLCD, Legislative Administration",
      "classification": null,
      "licenseInfo": "",
      "culture": "en-us",
      "properties": {
        "location": {
          "type": "custom",
          "extent": [
            [
              -124.86666065870291,
              41.518415286280515
            ],
            [
              -116.15401429353949,
              46.49784818852673
            ]
          ],
          "geometries": [
            {
              "spatialReference": {
                "wkid": 4326
              },
              "xmin": -124.86666065870291,
              "ymin": 41.518415286280515,
              "xmax": -116.15401429353949,
              "ymax": 46.49784818852673,
              "type": "extent"
            }
          ],
          "spatialReference": {
            "wkid": 4326
          }
        }
      },
      "advancedSettings": null,
      "url": "https://navigator.state.or.us/arcgis/rest/services/Framework/Admin_Bounds_WM/MapServer",
      "proxyFilter": null,
      "access": "org",
      "size": -1,
      "subInfo": 0,
      "appCategories": [],
      "industries": [],
      "languages": [],
      "largeThumbnail": null,
      "banner": null,
      "screenshots": [],
      "listed": false,
      "ownerFolder": null,
      "protected": false,
      "numComments": 0,
      "numRatings": 0,
      "avgRating": 0,
      "numViews": 23,
      "scoreCompleteness": 71,
      "groupDesignations": null,
      "apiToken1ExpirationDate": -1,
      "apiToken2ExpirationDate": -1,
      "lastViewed": 1725894000000
    }
  },
  {
    "access": "public",
    "id": "f9276f417584401a934d513bac948835",
    "type": "Hub Project",
    "name": "Tornado Activity and Mitigation Strategy Planning",
    "owner": "tanner_pa",
    "typeKeywords": [
      "Hub",
      "Hub Project",
      "JavaScript",
      "Ready To Use",
      "slug|qa-pre-a-hub|a-project",
      "status|notStarted"
    ],
    "tags": [
      ""
    ],
    "categories": [],
    "summary": "Project to showcase using a web map.",
    "createdDate": new Date("2023-06-14T18:34:02.000Z"),
    "createdDateSource": "item.created",
    "updatedDate": new Date("2024-09-05T16:39:47.000Z"),
    "updatedDateSource": "item.modified",
    "family": "project",
    "links": {
      "self": "https://qa-pre-a-hub.mapsqa.arcgis.com/home/item.html?id=f9276f417584401a934d513bac948835",
      "siteRelative": "/projects/qa-pre-a-hub::a-project",
      "siteRelativeEntityType": "/projects",
      "workspaceRelative": "/workspace/projects/qa-pre-a-hub::a-project",
      "thumbnail": null
    },
    "location": {
      "type": "custom",
      "spatialReference": {
        "wkid": 4326
      },
      "extent": [
        [
          -96.31518240084809,
          35.90275028208306
        ],
        [
          -95.67197510039375,
          36.342927830492734
        ]
      ]
    },
    "rawResult": {
      "id": "f9276f417584401a934d513bac948835",
      "owner": "tanner_pa",
      "created": 1686767642000,
      "isOrgItem": true,
      "modified": 1725554387000,
      "guid": null,
      "name": null,
      "title": "Tornado Activity and Mitigation Strategy Planning",
      "type": "Hub Project",
      "typeKeywords": [
        "Hub",
        "Hub Project",
        "JavaScript",
        "Ready To Use",
        "slug|qa-pre-a-hub|a-project",
        "status|notStarted"
      ],
      "description": "<p>Coffee Culture Project Description</p>",
      "tags": [
        ""
      ],
      "snippet": "Project to showcase using a web map.",
      "thumbnail": null,
      "documentation": null,
      "extent": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -96.31518240084809,
              36.342927830492734
            ],
            [
              -95.67197510039375,
              36.342927830492734
            ],
            [
              -95.67197510039375,
              35.90275028208306
            ],
            [
              -96.31518240084809,
              35.90275028208306
            ],
            [
              -96.31518240084809,
              36.342927830492734
            ]
          ]
        ]
      },
      "categories": [],
      "spatialReference": null,
      "accessInformation": null,
      "classification": null,
      "licenseInfo": null,
      "culture": "en",
      "properties": {
        "slug": "qa-pre-a-hub|a-project",
        "schemaVersion": 1,
        "orgUrlKey": "qa-pre-a-hub",
        "location": {
          "type": "custom",
          "spatialReference": {
            "wkid": 4326
          },
          "geometries": [
            {
              "spatialReference": {
                "wkid": 4326
              },
              "xmin": -96.31518240084809,
              "ymin": 35.90275028208306,
              "xmax": -95.67197510039375,
              "ymax": 36.342927830492734,
              "type": "extent"
            }
          ],
          "extent": [
            [
              -96.31518240084809,
              35.90275028208306
            ],
            [
              -95.67197510039375,
              36.342927830492734
            ]
          ]
        }
      },
      "advancedSettings": null,
      "url": null,
      "proxyFilter": null,
      "access": "public",
      "size": -1,
      "subInfo": 0,
      "appCategories": [],
      "industries": [],
      "languages": [],
      "largeThumbnail": null,
      "banner": null,
      "screenshots": [],
      "listed": false,
      "ownerFolder": null,
      "protected": false,
      "numComments": 0,
      "numRatings": 0,
      "avgRating": 0,
      "numViews": 192,
      "scoreCompleteness": 33,
      "groupDesignations": null,
      "apiToken1ExpirationDate": -1,
      "apiToken2ExpirationDate": -1,
      "lastViewed": 1725552000000,
      "source": "QA Premium Alpha Hub",
      "license": "none"
    },
    "source": "QA Premium Alpha Hub",
    "license": "none"
  },
  {
    "access": "public",
    "id": "d31ea62a42ec4d3081496ac2337c73f9",
    "type": "Feature Service",
    "name": "Major Sport Venues",
    "owner": "tanner_pa",
    "tags": [
      "data"
    ],
    "typeKeywords": [
      "ArcGIS Server",
      "Data",
      "Feature Access",
      "Feature Service",
      "Service",
      "Singlelayer",
      "Hosted Service"
    ],
    "categories": [],
    "summary": "Major sports venues from HFLID",
    "createdDate": new Date("2022-06-09T04:19:14.000Z"),
    "createdDateSource": "item.created",
    "updatedDate": new Date("2024-08-15T22:21:43.000Z"),
    "updatedDateSource": "item.modified",
    "family": "map",
    "links": {
      "self": "https://qa-pre-a-hub.mapsqa.arcgis.com/home/item.html?id=d31ea62a42ec4d3081496ac2337c73f9",
      "siteRelative": "/maps/d31ea62a42ec4d3081496ac2337c73f9",
      "thumbnail": "https://qa-pre-a-hub.mapsqa.arcgis.com/sharing/rest/content/items/d31ea62a42ec4d3081496ac2337c73f9/info/thumbnail/ago_downloaded.png"
    },
    "location": {
      "type": "custom",
      "spatialReference": {
        "wkid": 4326
      },
      "extent": [
        [
          -118.541344,
          32.41776
        ],
        [
          -116.8658173,
          34.350238
        ]
      ]
    },
    "rawResult": {
      "id": "d31ea62a42ec4d3081496ac2337c73f9",
      "owner": "tanner_pa",
      "created": 1654748354000,
      "isOrgItem": true,
      "modified": 1723760503000,
      "guid": null,
      "name": null,
      "title": "Major Sport Venues",
      "type": "Feature Service",
      "typeKeywords": [
        "ArcGIS Server",
        "Data",
        "Feature Access",
        "Feature Service",
        "Service",
        "Singlelayer",
        "Hosted Service"
      ],
      "description": null,
      "tags": [
        "data"
      ],
      "snippet": "Major sports venues from HFLID",
      "thumbnail": "thumbnail/ago_downloaded.png",
      "documentation": null,
      "extent": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -118.541344,
              34.350238
            ],
            [
              -116.8658173,
              34.350238
            ],
            [
              -116.8658173,
              32.41776
            ],
            [
              -118.541344,
              32.41776
            ],
            [
              -118.541344,
              34.350238
            ]
          ]
        ]
      },
      "categories": [],
      "spatialReference": "102100",
      "accessInformation": null,
      "classification": null,
      "licenseInfo": "",
      "culture": "en-us",
      "properties": {
        "downloads": {
          "flowType": "createReplica",
          "formats": [
            {
              "key": "shapefile",
              "hidden": false
            },
            {
              "key": "csv",
              "hidden": true
            },
            {
              "key": "geojson",
              "hidden": false
            },
            {
              "key": "kml",
              "hidden": false
            },
            {
              "key": "filegdb",
              "hidden": false
            },
            {
              "key": "featureCollection",
              "hidden": false
            },
            {
              "key": "excel",
              "hidden": false
            },
            {
              "key": "geoPackage",
              "hidden": false
            },
            {
              "key": "sqlite",
              "hidden": false
            }
          ]
        },
        "boundary": "item",
        "location": {
          "type": "custom",
          "geometries": [
            {
              "spatialReference": {
                "wkid": 4326
              },
              "xmin": -118.541344,
              "ymin": 33.754238,
              "xmax": -117.94534399999998,
              "ymax": 34.350238,
              "type": "extent"
            },
            {
              "spatialReference": {
                "wkid": 4326
              },
              "xmin": -117.46181729999999,
              "ymin": 32.41776,
              "xmax": -116.8658173,
              "ymax": 33.013760000000005,
              "type": "extent"
            }
          ],
          "spatialReference": {
            "wkid": 4326
          },
          "extent": [
            [
              -118.541344,
              32.41776
            ],
            [
              -116.8658173,
              34.350238
            ]
          ]
        }
      },
      "advancedSettings": null,
      "url": "https://servicesqa.arcgis.com/Xj56SBi2udA78cC9/arcgis/rest/services/Major_Sport_Venues/FeatureServer",
      "proxyFilter": null,
      "access": "public",
      "size": -1,
      "subInfo": 0,
      "appCategories": [],
      "industries": [],
      "languages": [],
      "largeThumbnail": null,
      "banner": null,
      "screenshots": [],
      "listed": false,
      "ownerFolder": "5e6319f02d6946d6b341c10091b42968",
      "protected": false,
      "numComments": 0,
      "numRatings": 0,
      "avgRating": 0,
      "numViews": 1529,
      "scoreCompleteness": 41,
      "groupDesignations": null,
      "apiToken1ExpirationDate": -1,
      "apiToken2ExpirationDate": -1,
      "lastViewed": 1726167600000,
      "source": "QA Premium Alpha Hub",
      "license": "none"
    },
    "source": "QA Premium Alpha Hub",
    "license": "none"
  },
  {
    "access": "public",
    "id": "07774ca7c30341bc98eafbec63e023df",
    "type": "Feature Service",
    "name": "Oregon Cities",
    "owner": "tanner_pa",
    "tags": [
      "boundary"
    ],
    "typeKeywords": [
      "ArcGIS Server",
      "Data",
      "Feature Access",
      "Feature Service",
      "Service",
      "Singlelayer"
    ],
    "categories": [],
    "summary": "Oregon Cities data feature service",
    "createdDate": new Date("2024-01-23T18:05:32.000Z"),
    "createdDateSource": "item.created",
    "updatedDate": new Date("2024-01-23T18:24:10.000Z"),
    "updatedDateSource": "item.modified",
    "family": "map",
    "links": {
      "self": "https://qa-pre-a-hub.mapsqa.arcgis.com/home/item.html?id=07774ca7c30341bc98eafbec63e023df",
      "siteRelative": "/maps/07774ca7c30341bc98eafbec63e023df",
      "thumbnail": "https://qa-pre-a-hub.mapsqa.arcgis.com/sharing/rest/content/items/07774ca7c30341bc98eafbec63e023df/info/thumbnail/ago_downloaded.png"
    },
    "location": {
      "type": "custom",
      "spatialReference": {
        "wkid": 4326
      },
      "extent": [
        [
          -124.87177655505917,
          41.90695949950489
        ],
        [
          -117.16286190519223,
          46.30578409992724
        ]
      ]
    },
    "rawResult": {
      "id": "07774ca7c30341bc98eafbec63e023df",
      "owner": "tanner_pa",
      "created": 1706033132000,
      "isOrgItem": true,
      "modified": 1706034250000,
      "guid": null,
      "name": null,
      "title": "Oregon Cities",
      "type": "Feature Service",
      "typeKeywords": [
        "ArcGIS Server",
        "Data",
        "Feature Access",
        "Feature Service",
        "Service",
        "Singlelayer"
      ],
      "description": "This map layer includes cities and towns in Oregon. These cities were clipped from a larger dataset of cities collected from the 1970 National Atlas of the United States.  Where applicable, U.S. Census Bureau codes for named populated places were associated with each name to allow additional information to be attached. The Geographic Names Information System (GNIS) was also used as a source for additional information.  This is a revised version of the December 2003 map layer.",
      "tags": [
        "boundary"
      ],
      "snippet": "Oregon Cities data feature service",
      "thumbnail": "thumbnail/ago_downloaded.png",
      "documentation": null,
      "extent": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -124.87177655505917,
              46.30578409992724
            ],
            [
              -117.16286190519223,
              46.30578409992724
            ],
            [
              -117.16286190519223,
              41.90695949950489
            ],
            [
              -124.87177655505917,
              41.90695949950489
            ],
            [
              -124.87177655505917,
              46.30578409992724
            ]
          ]
        ]
      },
      "categories": [],
      "spatialReference": null,
      "accessInformation": null,
      "classification": null,
      "licenseInfo": "",
      "culture": "en-us",
      "properties": {
        "boundary": "item",
        "location": {
          "type": "custom",
          "geometries": [
            {
              "spatialReference": {
                "wkid": 4326
              },
              "xmin": -124.87177655505917,
              "ymin": 41.90695949950489,
              "xmax": -121.57470495433485,
              "ymax": 46.30578409992724,
              "type": "extent"
            },
            {
              "spatialReference": {
                "wkid": 4326
              },
              "xmin": -120.14214434394647,
              "ymin": 42.277557759878185,
              "xmax": -117.16286190519223,
              "ymax": 45.40059408342623,
              "type": "extent"
            }
          ],
          "spatialReference": {
            "wkid": 4326
          },
          "extent": [
            [
              -124.87177655505917,
              41.90695949950489
            ],
            [
              -117.16286190519223,
              46.30578409992724
            ]
          ]
        }
      },
      "advancedSettings": null,
      "url": "https://services8.arcgis.com/8PAo5HGmvRMlF2eU/arcgis/rest/services/Cities/FeatureServer/0",
      "proxyFilter": null,
      "access": "public",
      "size": -1,
      "subInfo": 0,
      "appCategories": [],
      "industries": [],
      "languages": [],
      "largeThumbnail": null,
      "banner": null,
      "screenshots": [],
      "listed": false,
      "ownerFolder": null,
      "protected": false,
      "numComments": 0,
      "numRatings": 0,
      "avgRating": 0,
      "numViews": 308,
      "scoreCompleteness": 56,
      "groupDesignations": null,
      "apiToken1ExpirationDate": -1,
      "apiToken2ExpirationDate": -1,
      "lastViewed": 1726113600000,
      "source": "QA Premium Alpha Hub",
      "license": "none"
    },
    "source": "QA Premium Alpha Hub",
    "license": "none"
  },
  {
    "access": "shared",
    "id": "07e1d35459824b638f1ee770a4be4813",
    "type": "Feature Service",
    "name": "Community Harvest Data",
    "owner": "tanner_pa",
    "tags": [
      "food",
      "sustainable",
      "community"
    ],
    "typeKeywords": [
      "ArcGIS Server",
      "Data",
      "Feature Access",
      "Feature Service",
      "Service",
      "Singlelayer",
      "Table",
      "Hosted Service"
    ],
    "categories": [],
    "summary": "Community harvest dataset.",
    "createdDate": new Date("2021-09-01T16:13:57.000Z"),
    "createdDateSource": "item.created",
    "updatedDate": new Date("2021-09-28T21:45:01.000Z"),
    "updatedDateSource": "item.modified",
    "family": "map",
    "links": {
      "self": "https://qa-pre-a-hub.mapsqa.arcgis.com/home/item.html?id=07e1d35459824b638f1ee770a4be4813",
      "siteRelative": "/maps/07e1d35459824b638f1ee770a4be4813",
      "thumbnail": "https://qa-pre-a-hub.mapsqa.arcgis.com/sharing/rest/content/items/07e1d35459824b638f1ee770a4be4813/info/thumbnail/ago_downloaded.png"
    },
    "location": {
      "type": "none"
    },
    "rawResult": {
      "id": "07e1d35459824b638f1ee770a4be4813",
      "owner": "tanner_pa",
      "created": 1630512837000,
      "isOrgItem": true,
      "modified": 1632865501000,
      "guid": null,
      "name": null,
      "title": "Community Harvest Data",
      "type": "Feature Service",
      "typeKeywords": [
        "ArcGIS Server",
        "Data",
        "Feature Access",
        "Feature Service",
        "Service",
        "Singlelayer",
        "Table",
        "Hosted Service"
      ],
      "description": null,
      "tags": [
        "food",
        "sustainable",
        "community"
      ],
      "snippet": "Community harvest dataset.",
      "thumbnail": "thumbnail/ago_downloaded.png",
      "documentation": null,
      "extent": null,
      "categories": [],
      "spatialReference": null,
      "accessInformation": null,
      "classification": null,
      "licenseInfo": null,
      "culture": "en-us",
      "properties": null,
      "advancedSettings": null,
      "url": "https://servicesqa.arcgis.com/Xj56SBi2udA78cC9/arcgis/rest/services/SubsistenceData/FeatureServer",
      "proxyFilter": null,
      "access": "shared",
      "size": -1,
      "subInfo": 0,
      "appCategories": [],
      "industries": [],
      "languages": [],
      "largeThumbnail": null,
      "banner": null,
      "screenshots": [],
      "listed": false,
      "ownerFolder": "5e6319f02d6946d6b341c10091b42968",
      "protected": false,
      "numComments": 0,
      "numRatings": 0,
      "avgRating": 0,
      "numViews": 51,
      "scoreCompleteness": 55,
      "groupDesignations": null,
      "apiToken1ExpirationDate": -1,
      "apiToken2ExpirationDate": -1,
      "lastViewed": 1702666800000
    }
  },
  {
    "access": "public",
    "id": "0ea52b84b20843f78d18a86867a18015",
    "type": "Image Service",
    "name": "NAIP_2020_WM",
    "owner": "tanner_pa",
    "tags": [
      ""
    ],
    "typeKeywords": [
      "ArcGIS Server",
      "Data",
      "Image Service",
      "Service"
    ],
    "categories": [],
    "summary": "\nA Web Mercator cache derived from 60cm resolution color Digital Orthophoto Quadrangles (DOQ) of the entire state of Oregon.This digital, geographically referenced data set was developed for the Oregon GIS department to provide updated state wide imagery. Digital 4 band ortho imagery covering the state of Oregon was flown in 2020. The 4 Band imagery was rectified and cut into a DOQs.\n",
    "createdDate": new Date("2022-07-21T17:47:52.000Z"),
    "createdDateSource": "item.created",
    "updatedDate": new Date("2024-08-15T21:57:51.000Z"),
    "updatedDateSource": "item.modified",
    "family": "dataset",
    "links": {
      "self": "https://qa-pre-a-hub.mapsqa.arcgis.com/home/item.html?id=0ea52b84b20843f78d18a86867a18015",
      "siteRelative": "/datasets/0ea52b84b20843f78d18a86867a18015",
      "thumbnail": "https://qa-pre-a-hub.mapsqa.arcgis.com/sharing/rest/content/items/0ea52b84b20843f78d18a86867a18015/info/thumbnail/ago_downloaded.png"
    },
    "location": {
      "type": "custom",
      "extent": [
        [
          -124.632,
          41.9334
        ],
        [
          -116.4303,
          46.3163
        ]
      ],
      "spatialReference": {
        "wkid": 4326
      }
    },
    "rawResult": {
      "id": "0ea52b84b20843f78d18a86867a18015",
      "owner": "tanner_pa",
      "created": 1658425672000,
      "isOrgItem": true,
      "modified": 1723759071000,
      "guid": null,
      "name": null,
      "title": "NAIP_2020_WM",
      "type": "Image Service",
      "typeKeywords": [
        "ArcGIS Server",
        "Data",
        "Image Service",
        "Service"
      ],
      "description": "\nA Web Mercator cache derived from 60cm resolution color Digital Orthophoto Quadrangles (DOQ) of the entire state of Oregon.This digital, geographically referenced data set was developed for the Oregon GIS department to provide updated state wide imagery. Digital 4 band ortho imagery covering the state of Oregon was flown in 2020. The 4 Band imagery was rectified and cut into a DOQs.\n",
      "tags": [
        ""
      ],
      "snippet": "\nA Web Mercator cache derived from 60cm resolution color Digital Orthophoto Quadrangles (DOQ) of the entire state of Oregon.This digital, geographically referenced data set was developed for the Oregon GIS department to provide updated state wide imagery. Digital 4 band ortho imagery covering the state of Oregon was flown in 2020. The 4 Band imagery was rectified and cut into a DOQs.\n",
      "thumbnail": "thumbnail/ago_downloaded.png",
      "documentation": null,
      "extent": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -124.632,
              46.3163
            ],
            [
              -116.4303,
              46.3163
            ],
            [
              -116.4303,
              41.9334
            ],
            [
              -124.632,
              41.9334
            ],
            [
              -124.632,
              46.3163
            ]
          ]
        ]
      },
      "categories": [],
      "spatialReference": "102100",
      "accessInformation": null,
      "classification": null,
      "licenseInfo": "",
      "culture": "en-us",
      "properties": {
        "location": {
          "type": "custom",
          "extent": [
            [
              -124.632,
              41.9334
            ],
            [
              -116.4303,
              46.3163
            ]
          ],
          "geometries": [
            {
              "xmin": -124.632,
              "ymin": 41.9334,
              "xmax": -116.4303,
              "ymax": 46.3163,
              "spatialReference": {
                "wkid": 4326
              },
              "type": "extent"
            }
          ],
          "spatialReference": {
            "wkid": 4326
          }
        }
      },
      "advancedSettings": null,
      "url": "https://imagery.oregonexplorer.info/arcgis/rest/services/NAIP_2020/NAIP_2020_WM/ImageServer",
      "proxyFilter": null,
      "access": "public",
      "size": -1,
      "subInfo": 0,
      "appCategories": [],
      "industries": [],
      "languages": [],
      "largeThumbnail": null,
      "banner": null,
      "screenshots": [],
      "listed": false,
      "ownerFolder": "5e6319f02d6946d6b341c10091b42968",
      "protected": false,
      "numComments": 0,
      "numRatings": 0,
      "avgRating": 0,
      "numViews": 533,
      "scoreCompleteness": 63,
      "groupDesignations": null,
      "apiToken1ExpirationDate": -1,
      "apiToken2ExpirationDate": -1,
      "lastViewed": 1725933600000,
      "source": "QA Premium Alpha Hub",
      "license": "none"
    },
    "source": "QA Premium Alpha Hub",
    "license": "none"
  },
  {
    "access": "public",
    "id": "0e100e43a747418087a2451e72ba8eb7",
    "type": "Feature Service",
    "name": "US States Generalized",
    "owner": "tanner_pa",
    "tags": [
      "boundaries",
      "Nation",
      "State or equivalent entity",
      "Polygon",
      "United States",
      "U.S."
    ],
    "typeKeywords": [
      "ArcGIS Server",
      "Data",
      "Feature Access",
      "Feature Service",
      "Metadata",
      "Public Data Collection",
      "Service",
      "Singlelayer",
      "Hosted Service"
    ],
    "categories": [],
    "summary": "In order for others to use the information in the Census MAF/TIGER database in a geographic information system (GIS) or for other geographic applications, the Census Bureau releases to the public extracts of the database in the form of TIGER/Line Shapefiles.",
    "createdDate": new Date("2024-07-23T21:35:49.000Z"),
    "createdDateSource": "item.created",
    "updatedDate": new Date("2024-08-27T14:56:18.000Z"),
    "updatedDateSource": "item.modified",
    "family": "map",
    "links": {
      "self": "https://qa-pre-a-hub.mapsqa.arcgis.com/home/item.html?id=0e100e43a747418087a2451e72ba8eb7",
      "siteRelative": "/maps/0e100e43a747418087a2451e72ba8eb7",
      "thumbnail": "https://qa-pre-a-hub.mapsqa.arcgis.com/sharing/rest/content/items/0e100e43a747418087a2451e72ba8eb7/info/thumbnail/thumbnail.JPEG"
    },
    "location": {
      "type": "custom",
      "extent": [
        [
          -128.00474280118607,
          18.823355746296073
        ],
        [
          -70.95589512587739,
          50.53033642648629
        ]
      ],
      "spatialReference": {
        "wkid": 4326
      }
    },
    "rawResult": {
      "id": "0e100e43a747418087a2451e72ba8eb7",
      "owner": "tanner_pa",
      "created": 1721770549000,
      "isOrgItem": true,
      "modified": 1724770578000,
      "guid": null,
      "name": null,
      "title": "US States Generalized",
      "type": "Feature Service",
      "typeKeywords": [
        "ArcGIS Server",
        "Data",
        "Feature Access",
        "Feature Service",
        "Metadata",
        "Public Data Collection",
        "Service",
        "Singlelayer",
        "Hosted Service"
      ],
      "description": "The TIGER/Line shapefiles and related database files (.dbf) are an extract of selected geographic and cartographic information from the U.S. Census Bureau's Master Address File / Topologically Integrated Geographic Encoding and Referencing (MAF/TIGER) Database (MTDB).  The MTDB represents a seamless national file with no overlaps or gaps between parts, however, each TIGER/Line shapefile is designed to stand alone as an independent data set, or they can be combined to cover the entire nation.  States and equivalent entities are the primary governmental divisions of the United States.  In addition to the fifty States, the Census Bureau treats the District of Columbia, Puerto Rico, and each of the Island Areas (American Samoa, the Commonwealth of the Northern Mariana Islands, Guam, and the U.S. Virgin Islands) as the statistical equivalents of States for the purpose of data presentation.",
      "tags": [
        "boundaries",
        "Nation",
        "State or equivalent entity",
        "Polygon",
        "United States",
        "U.S."
      ],
      "snippet": "In order for others to use the information in the Census MAF/TIGER database in a geographic information system (GIS) or for other geographic applications, the Census Bureau releases to the public extracts of the database in the form of TIGER/Line Shapefiles.",
      "thumbnail": "thumbnail/thumbnail.JPEG",
      "documentation": null,
      "extent": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -128.00474280118607,
              50.53033642648629
            ],
            [
              -70.95589512587739,
              50.53033642648629
            ],
            [
              -70.95589512587739,
              18.823355746296073
            ],
            [
              -128.00474280118607,
              18.823355746296073
            ],
            [
              -128.00474280118607,
              50.53033642648629
            ]
          ]
        ]
      },
      "categories": [],
      "spatialReference": "102100",
      "accessInformation": null,
      "classification": null,
      "licenseInfo": "",
      "culture": "en-us",
      "properties": {
        "location": {
          "type": "custom",
          "extent": [
            [
              -128.00474280118607,
              18.823355746296073
            ],
            [
              -70.95589512587739,
              50.53033642648629
            ]
          ],
          "geometries": [
            {
              "spatialReference": {
                "wkid": 4326
              },
              "xmin": -128.00474280118607,
              "ymin": 18.823355746296073,
              "xmax": -70.95589512587739,
              "ymax": 50.53033642648629,
              "type": "extent"
            }
          ],
          "spatialReference": {
            "wkid": 4326
          }
        },
        "downloads": {
          "flowType": "createReplica",
          "formats": [
            {
              "key": "additionalResource::0",
              "hidden": false
            },
            {
              "key": "filegdb",
              "hidden": true
            },
            {
              "key": "shapefile",
              "hidden": true
            },
            {
              "key": "csv",
              "hidden": true
            },
            {
              "key": "geojson",
              "hidden": true
            },
            {
              "key": "kml",
              "hidden": true
            },
            {
              "key": "featureCollection",
              "hidden": true
            },
            {
              "key": "excel",
              "hidden": true
            },
            {
              "key": "geoPackage",
              "hidden": true
            },
            {
              "key": "sqlite",
              "hidden": true
            }
          ]
        }
      },
      "advancedSettings": null,
      "url": "https://servicesqa.arcgis.com/Xj56SBi2udA78cC9/arcgis/rest/services/US_States_Generalized/FeatureServer",
      "proxyFilter": null,
      "access": "public",
      "size": -1,
      "subInfo": 0,
      "appCategories": [],
      "industries": [],
      "languages": [],
      "largeThumbnail": null,
      "banner": null,
      "screenshots": [],
      "listed": false,
      "ownerFolder": "528b0a22634d4c8888951d43ba62a088",
      "protected": false,
      "numComments": 0,
      "numRatings": 0,
      "avgRating": 0,
      "numViews": 547,
      "scoreCompleteness": 83,
      "groupDesignations": null,
      "apiToken1ExpirationDate": -1,
      "apiToken2ExpirationDate": -1,
      "lastViewed": 1726149600000,
      "source": "QA Premium Alpha Hub",
      "license": "none"
    },
    "source": "QA Premium Alpha Hub",
    "license": "none"
  }
];
