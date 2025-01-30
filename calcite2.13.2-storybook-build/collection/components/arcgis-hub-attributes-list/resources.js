const FIELD_ICONS = {
  title: 'title',
  string: 'string',
  label: 'label',
  number: 'number',
  percent: 'percent',
  measure: 'measure',
  credits: 'credits',
  fingerprint: 'fingerprint',
  phone: 'phone',
  emailAddress: 'email-address',
  switch: 'switch',
  toggle: 'toggle',
  pin: 'pin',
  point: 'point',
  calendar: 'calendar',
  vertexCheck: 'vertex-check',
  fileText: 'file-text',
};
export const FIELD_MAP = {
  nameOrTitle: {
    icon: FIELD_ICONS.title,
    text: 'nameTitle'
  },
  description: {
    icon: FIELD_ICONS.string,
    text: 'description'
  },
  typeOrCategory: {
    icon: FIELD_ICONS.label,
    text: 'category'
  },
  countOrAmount: {
    icon: FIELD_ICONS.number,
    text: 'amount'
  },
  percentageOrRatio: {
    icon: FIELD_ICONS.percent,
    text: 'percentage'
  },
  measurement: {
    icon: FIELD_ICONS.measure,
    text: 'measurement'
  },
  currency: {
    icon: FIELD_ICONS.credits,
    text: 'currency'
  },
  uniqueIdentifier: {
    icon: FIELD_ICONS.fingerprint,
    text: 'identifier'
  },
  phoneNumber: {
    icon: FIELD_ICONS.phone,
    text: 'phone'
  },
  emailAddress: {
    icon: FIELD_ICONS.emailAddress,
    text: 'email'
  },
  orderedOrRanked: {
    icon: FIELD_ICONS.switch,
    text: 'ordered'
  },
  binary: {
    icon: FIELD_ICONS.toggle,
    text: 'binary'
  },
  locationOrPlaceName: {
    icon: FIELD_ICONS.pin,
    text: 'placename'
  },
  coordinate: {
    icon: FIELD_ICONS.point,
    text: 'coordinate'
  },
  dateAndTime: {
    icon: FIELD_ICONS.calendar,
    text: 'datetime'
  },
  esriFieldTypeSmallInteger: {
    icon: FIELD_ICONS.number,
    text: 'shortInt'
  },
  esriFieldTypeInteger: {
    icon: FIELD_ICONS.number,
    text: 'longInt'
  },
  esriFieldTypeSingle: {
    icon: FIELD_ICONS.number,
    text: 'singleNum'
  },
  esriFieldTypeDouble: {
    icon: FIELD_ICONS.number,
    text: 'doubleNum'
  },
  esriFieldTypeString: {
    icon: FIELD_ICONS.string,
    text: 'charString'
  },
  esriFieldTypeDate: {
    icon: FIELD_ICONS.calendar,
    text: 'date'
  },
  esriFieldTypeOID: {
    icon: FIELD_ICONS.fingerprint,
    text: 'idInteger'
  },
  esriFieldTypeGeometry: {
    icon: FIELD_ICONS.vertexCheck,
    text: 'geometry'
  },
  esriFieldTypeBlob: {
    icon: FIELD_ICONS.fileText,
    text: 'blobObject'
  },
  esriFieldTypeRaster: {
    icon: FIELD_ICONS.string,
    text: 'raster'
  },
  esriFieldTypeGUID: {
    icon: FIELD_ICONS.fingerprint,
    text: 'guid'
  },
  esriFieldTypeGlobalID: {
    icon: FIELD_ICONS.fingerprint,
    text: 'esriId'
  },
  esriFieldTypeXML: {
    icon: FIELD_ICONS.string,
    text: 'xml'
  },
};
