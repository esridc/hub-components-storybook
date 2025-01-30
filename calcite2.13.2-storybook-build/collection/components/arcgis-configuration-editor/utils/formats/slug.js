/**
 * AJV custom formatter for slug validation
 * @param data - input being validated
 */
export const slug = {
  validate: (data) => {
    if (!data.length) {
      return true;
    }
    // NOTE: this is use to validate the slugified title
    // portion of a site's URL, and was taken from:
    // https://github.com/ArcGIS/opendata-ui/blob/aa2e842a73b8530f97152d2654fe5643ad6cf929/packages/layout-editor-engine/addon/components/domain-settings-modal/component.js#L31
    // if we have to validate slugs w/ the `org-key|` prefix
    // then we will need a separate formatter like:
    // /^[a-z0-9]+(?:(-|\|)[a-z0-9]+)*$/.test(data)
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data);
  }
};
