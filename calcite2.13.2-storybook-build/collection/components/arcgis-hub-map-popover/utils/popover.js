/**
 * Determine which view quadrant a point is located
 * @param point ScreenPoint
 * @param view MapView
 * @returns Quadrant
 */
export const getQuad = (point, view) => {
  const { height, width } = view;
  const yQuad = point.y < height / 2
    ? 'top'
    : 'bottom';
  const xQuad = point.x < width / 2
    ? 'left'
    : 'right';
  return `${yQuad}-${xQuad}`;
};
/**
 * Given an extent and quad, return corner point closest to map center
 * @param extent Extent
 * @param quad Quadrant
 * @returns Point
 */
export const getExtentQuadCornerPoint = (extent, quad) => {
  const { xmin, ymin, xmax, ymax, spatialReference } = extent;
  const y = quad.includes('top')
    ? ymin
    : ymax;
  const x = quad.includes('left')
    ? xmax
    : xmin;
  return {
    x,
    y,
    spatialReference
  };
};
/**
 * Calculates planar distance between two points
 * @param pointA Point
 * @param pointB Point
 * @returns Distance between points in relative units
 */
export const distance = (pointA, pointB) => {
  const { x: x1, y: y1 } = pointA;
  const { x: x2, y: y2 } = pointB;
  const dX = x2 - x1;
  const dY = y2 - y1;
  return Math.sqrt(dX ** 2 + dY ** 2);
};
/**
 * Dermine the closest point on a polygon or polyline from a given point
 * @param point Point
 * @param geom Polygon || Polyline
 * @returns Point
 */
export const getClosestPoint = (point, geom) => {
  const { spatialReference } = geom;
  let minDistance = Infinity;
  let closestPointIndex = 0;
  // flatten multi-paths, multi-rings into simple point aray
  const coords = (geom.type === 'polygon'
    ? geom.rings.flat(Infinity)
    : geom.paths.flat(Infinity)).reduce((accum, value, index) => {
    // reassemble into [x,y] coordinates
    const coordIndex = Math.floor(index / 2);
    if (!accum[coordIndex]) {
      accum[coordIndex] = [];
    }
    accum[coordIndex].push(value);
    return accum;
  }, []);
  coords.forEach((coord, index) => {
    const [x, y] = coord;
    const distanceToPoint = distance({
      x,
      y,
      spatialReference
    }, point);
    if (distanceToPoint < minDistance) {
      minDistance = distanceToPoint;
      closestPointIndex = index;
    }
  });
  const [x, y] = coords[closestPointIndex];
  return {
    x,
    y,
    spatialReference
  };
};
