import { blockWords } from './blockWords';
import { slug } from './slug';
import { timePickerTime } from './time-picker-time';
import { url } from './url';
import { entityTitleValidator } from './entity-title-validator';
import { siteEntityTitleValidator } from './site-entity-title-validator';
/**
 * TODO: if we need to pass context into the formatters, let's make this into a function
 * so that we can give context as a param
 */
export const AJV_FORMATS = {
  blockWords,
  slug,
  timePickerTime,
  url,
  entityTitleValidator,
  siteEntityTitleValidator
};
