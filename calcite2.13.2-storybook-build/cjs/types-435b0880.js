'use strict';

/**
 * The model for associations is built around platform
 * capabilities. Platform imposes a limit of 128 on the
 * number of typeKeywords that can be set on an item.
 * Since "child" entities form their half of an association
 * connection via typeKeywords, we must limit the number
 * of associations a child can request or accept to far
 * fewer than 128.
 *
 * For now, we are setting this limit to 50
 */
const ASSOCIATION_REFERENCE_LIMIT = 50;

exports.ASSOCIATION_REFERENCE_LIMIT = ASSOCIATION_REFERENCE_LIMIT;
