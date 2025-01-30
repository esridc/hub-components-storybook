'use strict';

/**
 * Optional map states for symbol
 */
exports.SYMBOL_STATE = void 0;
(function (SYMBOL_STATE) {
  SYMBOL_STATE["ACTIVE"] = "active";
  SYMBOL_STATE["HOVER"] = "hover";
  SYMBOL_STATE["DEFAULT"] = "default";
})(exports.SYMBOL_STATE || (exports.SYMBOL_STATE = {}));
/**
 * Get the maximum deviation for a given view
 * @param {Object} view - Esri view
 * @param {number} maxDeviation - Maximum allowed deviation from original geometry
 * @returns {number} Number - Maximum deviation
**/
function getMaxDeviation(view, maxDeviation = 3.5) {
  return view.resolution * maxDeviation;
}

function callout (state, properties = defaultLayerThemeOptions.callout, count) {
  const { backgroundColor, textColor, hoverColor, activeColor, width, isOffset, is3D } = properties;
  const totalCount = count + 1;
  let strokeColor = [255, 255, 255];
  if (state === exports.SYMBOL_STATE.HOVER) {
    strokeColor = hoverColor;
  }
  else if (state === exports.SYMBOL_STATE.ACTIVE) {
    strokeColor = activeColor;
  }
  return {
    type: 'cim',
    data: {
      type: "CIMSymbolReference",
      symbol: {
        type: "CIMPointSymbol",
        symbolLayers: [{
            // TEXT SYMBOL
            type: "CIMVectorMarker",
            enable: true,
            size: 30,
            frame: { xmin: -4, ymin: -4, xmax: 4, ymax: 4 },
            markerGraphics: [
              {
                type: "CIMMarkerGraphic",
                geometry: {
                  x: isOffset ? 4.5 : 4,
                  y: isOffset ? (is3D ? 9 : 11) : 4
                },
                symbol: {
                  type: "CIMTextSymbol",
                  fontFamilyName: "Sans Serif",
                  fontStyleName: "Bold",
                  height: 3.25,
                  horizontalAlignment: "Center",
                  symbol: {
                    type: "CIMPolygonSymbol",
                    symbolLayers: [
                      {
                        type: "CIMSolidFill",
                        enable: true,
                        color: [
                          ...textColor,
                          255
                        ]
                      }
                    ]
                  },
                  verticalAlignment: "Center",
                },
                textString: totalCount > 99 ? '99+' : `${totalCount}`
              }
            ],
            scaleSymbolsProportionally: true
          }, {
            type: "CIMVectorMarker",
            enable: true,
            size: 30,
            frame: {
              xmin: isOffset ? -5 : -4,
              ymin: isOffset ? (is3D ? -9 : -11) : -4,
              xmax: isOffset ? 3 : 4,
              ymax: isOffset ? (is3D ? -1 : -3) : 4
            },
            markerGraphics: [{
                type: "CIMMarkerGraphic",
                geometry: {
                  rings: [
                    [[0, 0], [4, 0], [4.35, 0.02], [4.69, 0.06],
                      [5.04, 0.14], [5.37, 0.24], [5.69, 0.37], [6, 0.54],
                      [6.29, 0.72], [6.57, 0.94], [6.83, 1.17], [7.06, 1.43],
                      [7.28, 1.71], [7.46, 2], [7.63, 2.31], [7.76, 2.63],
                      [7.86, 2.96], [7.94, 3.31], [7.98, 3.65], [8, 4],
                      [7.98, 4.35], [7.94, 4.69], [7.86, 5.04], [7.76, 5.37],
                      [7.63, 5.69], [7.46, 6], [7.28, 6.29], [7.06, 6.57],
                      [6.83, 6.83], [6.57, 7.06], [6.29, 7.28], [6, 7.46],
                      [5.69, 7.63], [5.37, 7.76], [5.04, 7.86], [4.69, 7.94],
                      [4.35, 7.98], [4, 8], [3.65, 7.98], [3.31, 7.94],
                      [2.96, 7.86], [2.63, 7.76], [2.31, 7.63], [2, 7.46],
                      [1.71, 7.28], [1.43, 7.06], [1.17, 6.83], [0.94, 6.57],
                      [0.72, 6.29], [0.54, 6], [0.37, 5.69], [0.24, 5.37],
                      [0.14, 5.04], [0.06, 4.69], [0.02, 4.35], [0, 4], [0, 0]]
                  ]
                },
                symbol: {
                  type: "CIMPolygonSymbol",
                  symbolLayers: [
                    {
                      type: "CIMSolidStroke",
                      enable: true,
                      capStyle: "Round",
                      joinStyle: "Round",
                      lineStyle3D: "Strip",
                      miterLimit: 10,
                      width: width,
                      color: [
                        ...strokeColor,
                        255
                      ]
                    },
                    {
                      type: "CIMSolidFill",
                      enable: true,
                      color: [
                        ...backgroundColor,
                        255
                      ]
                    }
                  ]
                }
              }]
          }]
      }
    }
  };
}

function point (state = exports.SYMBOL_STATE.DEFAULT, properties = defaultLayerThemeOptions.point) {
  const { activeColor, color, hoverColor } = properties;
  let strokeColor = color;
  if (state === exports.SYMBOL_STATE.HOVER) {
    strokeColor = hoverColor;
  }
  else if (state === exports.SYMBOL_STATE.ACTIVE) {
    strokeColor = activeColor;
  }
  return {
    type: 'text',
    color: [
      ...strokeColor,
      0.9
    ],
    text: `\ue61d`,
    font: {
      size: 24,
      family: 'CalciteWebCoreIcons'
    }
  };
}

function polyline (state = exports.SYMBOL_STATE.DEFAULT, properties = defaultLayerThemeOptions.polyline) {
  const { activeColor, color, hoverColor, width } = properties;
  let strokeColor = color;
  if (state === exports.SYMBOL_STATE.HOVER) {
    strokeColor = hoverColor;
  }
  else if (state === exports.SYMBOL_STATE.ACTIVE) {
    strokeColor = activeColor;
  }
  return {
    type: 'simple-line',
    color: [
      ...strokeColor,
      1
    ],
    width,
    style: 'solid'
  };
}

function polygon (state = exports.SYMBOL_STATE.DEFAULT, properties = defaultLayerThemeOptions.polygon) {
  const { activeColor, color, hoverColor, width } = properties;
  let strokeColor = color;
  if (state === exports.SYMBOL_STATE.HOVER) {
    strokeColor = hoverColor;
  }
  else if (state === exports.SYMBOL_STATE.ACTIVE) {
    strokeColor = activeColor;
  }
  return {
    type: 'simple-fill',
    color: [
      ...color,
      0.15
    ],
    outline: {
      color: [
        ...strokeColor,
        1
      ],
      width
    }
  };
}

// TODO: move files in thiis directory out from
// Geometry Defaults
const DEFAULT_GEOM_COLOR = [115, 96, 167];
const DEFAULT_GEOM_STROKE_WIDTH = 2;
// SYMBOL_STATE defaults (default, active, hover)
const DEFAULT_ACTIVE_COLOR = [39, 129, 153];
const DEFAULT_HOVER_COLOR = [169, 169, 169];
// Callout Defaults
const DEFAULT_CALLOUT_BACKGROUND_COLOR = [255, 255, 255];
const DEFAULT_CALLOUT_TEXT_COLOR = [0, 0, 0];
const DEFAULT_CALLOUT_STROKE_WIDTH = 2;
const pointTheme = {
  activeColor: DEFAULT_ACTIVE_COLOR,
  color: DEFAULT_GEOM_COLOR,
  hoverColor: DEFAULT_HOVER_COLOR
};
const polylineTheme = Object.assign(Object.assign({}, pointTheme), { width: DEFAULT_GEOM_STROKE_WIDTH });
/**
 * Default theme options
 */
const defaultLayerThemeOptions = {
  point: pointTheme,
  polyline: polylineTheme,
  polygon: polylineTheme,
  callout: {
    backgroundColor: DEFAULT_CALLOUT_BACKGROUND_COLOR,
    textColor: DEFAULT_CALLOUT_TEXT_COLOR,
    hoverColor: DEFAULT_HOVER_COLOR,
    activeColor: DEFAULT_ACTIVE_COLOR,
    width: DEFAULT_CALLOUT_STROKE_WIDTH,
    isOffset: false
  },
  extent: polylineTheme
};
const symbols = {
  callout,
  extent: polygon,
  point,
  polyline,
  polygon
};

exports.defaultLayerThemeOptions = defaultLayerThemeOptions;
exports.getMaxDeviation = getMaxDeviation;
exports.symbols = symbols;
