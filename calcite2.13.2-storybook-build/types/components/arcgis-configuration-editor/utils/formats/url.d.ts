/**
 * AJV custom formatter for URL validation. For
 * now, string must begin with "https://" or "/"
 * @param data - input being validated
 */
export declare const url: {
  validate: (data: string) => boolean;
};
