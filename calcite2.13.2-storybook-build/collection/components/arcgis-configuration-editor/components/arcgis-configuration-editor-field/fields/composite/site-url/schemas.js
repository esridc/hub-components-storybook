const MAX_SUBDOMAIN_LENGTH = 63;
function getMaxLength(orgUrlKey) {
  return orgUrlKey ? MAX_SUBDOMAIN_LENGTH - (orgUrlKey.length + 1) : MAX_SUBDOMAIN_LENGTH;
}
export const buildSiteUrlEditorSchema = (opts) => {
  const { orgUrlKey, envSuffix = '' } = opts || {};
  const maxLength = getMaxLength(orgUrlKey);
  return {
    type: "object",
    required: [
      "subdomain"
    ],
    properties: {
      subdomain: {
        type: "string",
        // NOTE: this throws a type error w/o any
        format: "slug",
        maxLength
      },
      hubDomain: {
        type: "string",
        enum: [
          `hub${envSuffix}.arcgis.com`,
          `opendata${envSuffix}.arcgis.com`
        ],
      }
    }
  };
};
export const buildSiteUrlEditorUiSchema = (opts) => {
  const { orgUrlKey } = opts || {};
  const suffixText = orgUrlKey ? `-${orgUrlKey}.` : undefined;
  return {
    type: "Layout",
    elements: [
      {
        labelKey: "subdomain",
        scope: "/properties/subdomain",
        type: "Control",
        options: {
          control: "hub-field-input-input",
          messages: [
            {
              type: "ERROR",
              keyword: "format",
              icon: true,
              labelKey: "subdomainFormatError"
            },
            {
              type: "ERROR",
              keyword: "required",
              icon: true,
              labelKey: "subdomainRequiredError"
            }
          ],
          suffixText
        }
      },
      {
        labelKey: "baseDomain",
        scope: "/properties/hubDomain",
        type: "Control",
        options: {
          control: "hub-field-input-select"
        }
      }
    ]
  };
};
