/**
 * Function to get the list of location types to be displayed after a user search
 * Currently, we only support point, extent/rectangle, and draw your own.
 * In the future, we look to add polyline and polygon geometries
 */
export function getAllLocationTypes(intl) {
  return [
    { key: 'point', text: intl.t('point'), sourceIndex: 0 },
    { key: 'rectangle', text: intl.t('rectangle'), sourceIndex: 0 },
    { key: 'draw', text: intl.t('draw'), sourceIndex: 0 },
  ];
}
