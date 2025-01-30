export const POINT_A = {
  type: 'point',
  latitude: 45,
  longitude: -90,
  x: 100,
  y: -100,
  spatialReference: {
    wkid: 4326
  }
};
export const POINT_B = {
  type: 'point',
  latitude: 0,
  longitude: 0,
  x: 200,
  y: 200,
  spatialReference: {
    wkid: 4326
  }
};
export const POLYGON = {
  type: 'polygon',
  rings: [
    [-75, 90],
    [-90, 90],
    [-90, 75],
    [-75, 75],
    [-75, 90]
  ],
  spatialReference: {
    wkid: 4326
  }
};
export const VIEW = {
  height: 400,
  width: 400
};
export const SCREEN_POINT_TOP_LEFT = {
  x: 100,
  y: 100
};
export const SCREEN_POINT_TOP_RIGHT = {
  x: 300,
  y: 100
};
export const SCREEN_POINT_BOTTOM_LEFT = {
  x: 100,
  y: 300
};
export const SCREEN_POINT_BOTTOM_RIGHT = {
  x: 300,
  y: 300
};
export const EXTENT = {
  xmin: -175,
  ymin: 90,
  xmax: -180,
  ymax: 75,
  spatialReference: {
    wkid: 4326
  }
};
