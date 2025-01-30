/**
 * AJV custom formatter for URL validation. For
 * now, string must begin with "https://" or "/"
 * @param data - input being validated
 */
export const url = {
  validate: (data) => {
    if (!data.length) {
      return true;
    }
    try {
      const isRelative = data.startsWith("/");
      new URL(data, isRelative ? window.location.origin : undefined);
      return data.startsWith("https://") || data.startsWith('/');
    }
    catch (e) {
      return false;
    }
  }
};
