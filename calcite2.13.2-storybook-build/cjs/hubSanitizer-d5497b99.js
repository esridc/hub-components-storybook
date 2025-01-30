'use strict';

const index = require('./index-77618030.js');
const getProp = require('./get-prop-4bd8fc1a.js');

/**
 * Remove all html tags
 * @param {string} text text to sanitize
 */
function stripHtml(text) {
  return _sanitize(text, HubSanitizerRules.noHtml, false);
}
/**
 * All Hub Rules
 * @param {string} text text to sanitize
 */
function sanitizeMarkdown(text) {
  return _sanitize(text, HubSanitizerRules.hubTextCard);
}
/**
 * All Hub Rules, but strip hrefs
 * @param {string} text text to sanitize
 */
function sanitizePreviewMarkdown(text) {
  // hubTextCard + noHrefs
  const overrides = Object.assign({}, HubSanitizerRules.hubTextCard);
  overrides.whiteList.a = HubSanitizerRules.noHrefs.whiteList.a;
  overrides.onTagAttr = noHrefsOnTagAttr;
  return _sanitize(text, overrides);
}
/**
 * Normal Hub Sanitize Rules
 * @param {string} text text to sanitize
 */
function sanitizeHtml(text, rulesetName = 'hubTextCard') {
  // Logger.info(`Sanitizer:sanitizeHtml rulesetName: ${rulesetName}`);
  // some rulesets extend the platform ruleset others do not
  // lets start w/ assuming they do not...
  let extendDefaults = false;
  // try to get the ruleset
  let ruleset = getProp.getProp(HubSanitizerRules, rulesetName);
  if (ruleset) {
    extendDefaults = !!(['platformDefault', 'hubTextCard'].indexOf(rulesetName) > -1);
  }
  else {
    ruleset = HubSanitizerRules.hubTextCard;
    extendDefaults = true;
  }
  return _sanitize(text, ruleset, extendDefaults);
}
/**
 * Return the sanitized string, and a flag indicating if
 * changes were made during sanitization
 * @param {string} text Text to sanitize
 * @param {string} rulesetName ruleset to use
 */
function validateHtml(text, rulesetName = 'hubTextCard') {
  // Logger.log(`validateHtml called with ${text}`);
  const raw = text;
  const sanitized = sanitizeHtml(text, rulesetName);
  return {
    isValid: raw === sanitized,
    sanitized,
  };
}
/**
 * Only allow links
 * @param {string} text text to sanitize
 */
function onlyLinks(text) {
  return _sanitize(text, HubSanitizerRules.linksOnly, false);
}
function sanitizeHeadContent(text, page = false) {
  let metaTags = '';
  if (text) {
    const ruleSetName = page ? 'pageMetaContent' : 'headContent';
    metaTags = sanitizeHtml(text, ruleSetName);
    if (metaTags) {
      const tempHead = document.createElement('head');
      tempHead.insertAdjacentHTML('afterbegin', metaTags);
      const remainingMetaTags = Array.from(tempHead.childNodes).filter(node => getProp.getProp(node, 'tagName') === 'META');
      tempHead.replaceChildren(...remainingMetaTags);
      metaTags = tempHead.innerHTML;
    }
  }
  return metaTags;
}
/**
 * Actually do the sanitizing using arcgis-html-sanitizer
 * @param {string} text text to sanitize
 */
function _sanitize(text, overrides, extendDefaults = true) {
  // if the content is undefined, false or empty, just return it
  if (!text || typeof text !== 'string') {
    return text;
  }
  // repair broken comment strings (HIFLD)
  text = text.replace(/--!>/g, '-->');
  // extract out style tags and re-inject them
  const styleMatchRegExp = /<style[^>]*>([^<]+)<\/style>/gi;
  let match = styleMatchRegExp.exec(text);
  const cssStringArray = [];
  while (match != null) {
    cssStringArray.push(match[1]);
    match = styleMatchRegExp.exec(text);
  }
  // replace everything between the style tags w/ nothing
  text = text.replace(styleMatchRegExp, 'ADDSTYLE');
  const s = new index.Sanitizer(overrides, extendDefaults);
  let sanitized = s.sanitize(text);
  // and re-inject it
  sanitized = sanitized.replace('ADDSTYLE', `<style>${cssStringArray.join(' ')}</style>`);
  return sanitized;
}
function noHrefsOnTagAttr(tag, name, _value, _isAllowedAttr) {
  // Logger.info(`Sanitizer:noHrefsOnTagAttr handler for ${tag} ${name}=${value} isAllowedAttr: ${isAllowedAttr}`);
  if (tag === 'a' && name === 'href') {
    return '';
  }
}
/**
 * Sanitize a url
 * @param {string} value href or src property
 */
function sanitizeUrl(value = '', forceSsl = true) {
  if (typeof value !== 'string') {
    return value;
  }
  let protocol = value.substring(0, value.indexOf(':')).trim();
  // in support of move to HSTS, replace http w/ https
  if (protocol === 'http' && forceSsl) {
    protocol = 'https';
    value = value.replace('http://', 'https://');
  }
  return !(value === '/' ||
    value === '#' ||
    value[0] === '#' || // allow anchors
    value[0] === '/' || // allow relative urls
    ALLOWED_PROTOCOLS.indexOf(protocol.toLowerCase()) > -1)
    ? ''
    : index.lib.escapeAttrValue(value);
}
// Copied from arcgis-html-sanitizer
const ALLOWED_PROTOCOLS = [
  'http',
  'https',
  'mailto',
  'iform',
  'tel',
  'flow',
  'lfmobile',
  'arcgis-navigator',
  'arcgis-appstudio-player',
  'arcgis-survey123',
  'arcgis-collector',
  'arcgis-workforce',
  'arcgis-explorer',
  'arcgis-trek2there',
  'arcgis-quickcapture',
  'mspbi',
  'comgooglemaps',
  'pdfefile',
  'pdfehttp',
  'pdfehttps',
  'boxapp',
  'boxemm',
  'awb',
  'awbs',
  'gropen',
  'radarscope',
];
const SVG_TAGS = [
  'altGlyph',
  'altGlyphDef',
  'altGlyphItem',
  'animate',
  'animateColor',
  'animateMotion',
  'animateTransform',
  'animation',
  'canvas',
  'circle',
  'clipPath',
  'color-profile',
  'cursor',
  'defs',
  'desc',
  'discard',
  'ellipse',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'filter',
  // 'font',
  'font-face',
  'font-face-format',
  'font-face-name',
  'font-face-src',
  'font-face-uri',
  'foreignObject',
  'g',
  'glyph',
  'glyphRef',
  'handler',
  'hkern',
  'line',
  'linearGradient',
  'listener',
  'marker',
  'mask',
  'metadata',
  'missing-glyph',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'prefetch',
  'radialGradient',
  'rect',
  'set',
  'solidColor',
  'stop',
  'switch',
  'svg',
  'symbol',
  'tbreak',
  'text',
  'textArea',
  'textPath',
  // 'title',
  'tref',
  'tspan',
  'unknown',
  'use',
  'view',
  'vkern',
];
/**
 * Hub-specific implementation of the jsxss safeAttrValue function
 * Take over safe attribute filtering for `a` `href`, `img` `src`,
 * and `source` `src` attributes, otherwise pass onto the
 * default `XSS.safeAttrValue` method.
 *
 * @export
 * @param {*} tag
 * @param {*} name
 * @param {*} value
 * @param {*} cssFilter
 * @returns
 */
function hubSafeAttrValue(tag, name, value, cssFilter) {
  const isCalciteComponent = tag.startsWith('calcite-');
  if ((tag === "a" || isCalciteComponent) && name === 'href') {
    // If we want to force href's to be https, remove the `false` in the next line
    return sanitizeUrl(value, false);
  }
  else if ((tag === 'img' || tag === 'source') && name === 'src') {
    return sanitizeUrl(value);
  }
  else {
    return index.lib.safeAttrValue(tag, name, value, cssFilter);
  }
}
/**
 * Hub Sanitizer Rules
 */
const HubSanitizerRules = {
  // has no overridden values so it's just the platform defaults
  platformDefault: {},
  // remove all html
  noHtml: {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script'], // remove script tag contents
  },
  headContent: {
    whiteList: {
      // we allow http-equiv at the site level because we've determined that customers
      // potentially rendering the site- editor inaccessible by redirecting is an acceptable risk
      meta: ['name', 'content', 'http-equiv', 'charset'],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: true,
  },
  pageMetaContent: {
    whiteList: {
      meta: ['name', 'content', 'http-equiv', 'charset'],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: true,
  },
  //, strip everything but links
  linksOnly: {
    safeAttrValue: hubSafeAttrValue,
    whiteList: {
      a: ['href', 'title', 'aria-label', 'rel', 'target'],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script'], // remove script tag contents,
  },
  // remove hrefs from anchor tags
  noHrefs: {
    whiteList: {
      a: ['data-target', 'data-toggle', 'name', 'rel', 'style', 'target', 'title'],
    },
  },
  itemDescriptionStrict: {
    stripIgnoreTagBody: true,
    safeAttrValue: hubSafeAttrValue,
    whiteList: {
      a: ['href', 'title'],
      br: [],
      dd: [],
      div: [],
      dl: [],
      dt: [],
      em: [],
      font: [],
      li: [],
      ol: [],
      p: [],
      span: [],
      strong: [],
      ul: [],
    },
  },
  itemDescription: {
    stripIgnoreTagBody: true,
    safeAttrValue: hubSafeAttrValue,
    whiteList: {
      a: ['href', 'title'],
      b: [],
      blockquote: ['cite'],
      br: [],
      caption: [],
      cite: [],
      code: [],
      col: ['span', 'width'],
      colgroup: ['span', 'width'],
      dd: [],
      div: [],
      dl: [],
      dt: [],
      em: [],
      font: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ['align', 'alt', 'height', 'src', 'title', 'width'],
      li: [],
      ol: [],
      p: [],
      pre: [],
      q: ['cite'],
      small: [],
      strike: [],
      strong: [],
      span: [],
      sub: [],
      sup: [],
      table: ['summary', 'width'],
      tbody: [],
      td: ['abbr', 'axis', 'colspan', 'rowspan', 'width'],
      tfoot: [],
      th: ['abbr', 'axis', 'colspan', 'rowspan', 'scope', 'width'],
      thead: [],
      tr: [],
      u: [],
      ul: [],
    },
  },
  // Extensions for Hub
  hubTextCard: {
    stripIgnoreTagBody: ['script'],
    allowCommentTag: true,
    css: false,
    /**
     * This processes every attribute of every tag
     * In particular, it is used to avoid xss attacks from data- attributes and svg tags
     * @param tag html tag name
     * @param name attribute name
     * @param value attribute value
     * @param _isAllowedAttr Is it an allowed attribute
     * @returns processed attribute and value as string
     */
    onTagAttr(tag, name, value, _isAllowedAttr) {
      const isCalciteComponent = tag.startsWith('calcite-');
      const isDataAttribute = name.startsWith('data-');
      const isEventAttribute = name.startsWith('on');
      // if attr is href, sanitize it regardless of tag
      console.info(`Sanitizer:onTagAttr handler for ${tag} ${name}=${value} isAllowedAttr: ${_isAllowedAttr}`);
      // Always sanitize the href regardless of tag
      if (name === 'href') {
        value = sanitizeUrl(value, false);
      }
      // If it is not an event listener AND is either a data attribute or a
      // calcite component (unless the attribute is href) or an svg tag
      if (!isEventAttribute && ((isCalciteComponent || isDataAttribute || SVG_TAGS.includes(tag)))) {
        // if its the href tag, just return it
        if (name === 'href') {
          return `href="${value}"`;
        }
        // See https://web.archive.org/web/20230311094820/https://blogs.msmvps.com/alunj/2015/05/10/html-data-attributes-stop-my-xss/
        // for more information on xss attacks using data attributes (original article is gone hence wayback machine)
        // We are explicitly avoiding the various amp;, quot;, etc
        // because otherwise only using & will endlessly build up amp; on every edit of the string.
        const val = value.replace(/&(?!amp;|quot;|lt;|gt;)/g, '&amp;').replace(/'/g, '&quot;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        let valTemplate = `"${val}"`;
        if (SVG_TAGS.includes(tag)) {
          // viewBox is case sensitive
          if (name === 'viewbox') {
            name = 'viewBox';
          }
          /**
           * When we moved the svg into being sanitized to prevent XSS attacks,
           * customers reported bugs with their layouts when used through background-images.
           * We had enough customers to implement this fix. For future use,
           * we should AVOID directly editing html like this, as it is brittle and never as easy as it looks.
           */
          valTemplate = `'${val}'`;
        }
        return `${name}=${valTemplate}`;
      }
      // If a string "" was passed in, xss will strip it for certain tags. Thus we need
      // to make sure it doesn't
      if (!value && typeof value === 'string' && value.length === 0) {
        return `${name}=""`;
      }
      // if nothing is returned, and the tag is in the allowlist,
      // filters will be applied as per safeAttrValue
    },
    onIgnoreTagAttr(tag, attr, value, isAllowedAttr) {
      // allow calcite components to have all attributes
      const isCalciteComponent = tag.startsWith('calcite-');
      const isEventAttribute = attr.startsWith('on');
      if (!isEventAttribute && ((isCalciteComponent) || SVG_TAGS.includes(tag))) {
        // svg attrs are case sensitive so we have to reset the casing for viewBox
        if (tag === 'svg' && attr === 'viewbox') {
          attr = 'viewBox';
        }
        // svg attributes must use single quotes
        let valueTemplate = `"${value}"`;
        if (SVG_TAGS.includes(tag)) {
          valueTemplate = `'${value}'`;
        }
        return `${attr}=${valueTemplate}`;
      }
      // Logger.info(`Sanitizer:onIgnoreTagAttr handler for ${tag} ${attr}=${value} isAttrAllowed: ${isAllowedAttr}`);
      const attrsForAllTags = ['id', 'viewbox', 'class', 'style', 'align', 'aria-label', 'aria-describedby', 'aria-labelledby', 'role', 'tabindex', 'slot', 'lang'];
      // eslint-disable-next-line unicorn/prefer-ternary
      if (attrsForAllTags.indexOf(attr) > -1 || isAllowedAttr) {
        // Logger.info(`Found ${attr} in global allow list... returning ${attr}="${value}"`);
        return `${attr}="${value}"`;
      }
      else {
        return null;
      }
    },
    safeAttrValue: hubSafeAttrValue,
    escapeHtml(html) {
      return html
        ? html
          // swap out comment start and end
          .replace(/<!--/g, '[CMS]')
          .replace(/-->/g, '[CME]')
          // sanitize the other < >'s
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          // swap back in
          .replace(/\[CMS\]/g, '<!--')
          .replace(/\[CME\]/g, '-->')
        : html;
    },
    whiteList: {
      'a': ['data-target', 'data-toggle', 'href', 'name', 'rel', 'style', 'target', 'title'],
      'abbr': [],
      'acronym': [],
      'address': [],
      'article': [],
      'aside': [],
      'audio': ['autoplay', 'controls', 'loop', 'muted', 'preload'],
      'b': [],
      'bdi': [],
      'bdo': [],
      'big': [],
      'blockquote': ['cite'],
      'br': [],
      'button': ['name', 'value', 'data-toggle', 'data-target', 'data-dismiss'],
      'caption': [],
      'center': [],
      'cite': [],
      'code': [],
      'col': ['span', 'width'],
      'colgroup': ['span', 'width'],
      'datalist': [],
      'dd': [],
      'del': [],
      'details': [],
      'dfn': [],
      'div': ['style', 'align', 'data-show', 'data-target', 'data-toggle'],
      'dl': [],
      'dt': [],
      'em': [],
      'embed': [],
      'fieldset': [],
      'figcaption': [],
      'figure': [],
      'font': ['size', 'color', 'style'],
      'footer': [],
      'frameset': [],
      'h1': [],
      'h2': [],
      'h3': [],
      'h4': [],
      'h5': [],
      'h6': [],
      'head': [],
      'header': [],
      'hgroup': [],
      'hr': [],
      'i': [],
      // iframe: ['src', 'allow', 'width', 'height', 'scrolling', 'title', 'loading', 'name', 'referrerpolicy'],
      'img': ['src', 'width', 'height', 'border', 'alt', 'style', 'align', 'title'],
      'input': [],
      'ins': [],
      'kbd': [],
      'keygen': [],
      'li': [],
      'link': [],
      'main': [],
      'map': [],
      'mark': [],
      'menu': [],
      'meter': [],
      'nav': [],
      'ol': ['align', 'type'],
      'optgroup': [],
      'option': [],
      'output': [],
      'p': ['style'],
      'param': [],
      'pre': [],
      'progress': [],
      'q': ['cite'],
      'rp': [],
      'rt': [],
      'ruby': [],
      's': [],
      'samp': [],
      'section': [],
      'select': [],
      'small': [],
      'source': ['media', 'src', 'type'],
      'span': ['style'],
      'strike': [],
      'strong': [],
      'style': [],
      'sub': [],
      'summary': [],
      'sup': [],
      'table': ['width', 'height', 'cellpadding', 'cellspacing', 'border', 'style', 'summary', 'class'],
      'tbody': [],
      'td': ['height', 'width', 'valign', 'align', 'colspan', 'rowspan', 'nowrap', 'style', 'abbr', 'axis'],
      'textarea': [],
      'tfoot': [],
      'th': ['height', 'width', 'valign', 'align', 'colspan', 'rowspan', 'nowrap', 'style', 'abbr', 'axis', 'scope'],
      'thead': [],
      'time': [],
      'title': [],
      'tr': ['height', 'valign', 'align', 'style'],
      'track': [],
      'tt': [],
      'u': [],
      // calicte support
      'calcite-action': [],
      'calcite-accordion': [],
      'calcite-accordion-item': [],
      'calcite-avatar': [],
      'calcite-block': [],
      'calcite-button': [],
      'calcite-card': [],
      'calcite-chip': [],
      'calcite-dropdown-group': [],
      'calcite-dropdown-item': [],
      'calcite-fab': [],
      'calcite-flow': [],
      'calcite-icon': [],
      'calcite-link': [],
      'calcite-modal': [],
      'calcite-panel': [],
      'calcite-rating': [],
      'calcite-split-button': [],
      'calcite-stepper': [],
      'calcite-stepper-item': [],
      'calcite-tab': [],
      'calcite-tab-nav': [],
      'calcite-tab-title': [],
      'calcite-tabs': [],
      'calcite-tile': [],
      'calcite-tip': [],
      'calcite-tooltip': [],
      // svg support
      'altGlyph': [],
      'altGlyphDef': [],
      'altGlyphItem': [],
      'animate': [],
      'animateColor': [],
      'animateMotion': [],
      'animateTransform': [],
      'animation': [],
      'canvas': [],
      'circle': [],
      'clipPath': [],
      'color-profile': [],
      'cursor': [],
      'defs': [],
      'desc': [],
      'discard': [],
      'ellipse': [],
      'feBlend': [],
      'feColorMatrix': [],
      'feComponentTransfer': [],
      'feComposite': [],
      'feConvolveMatrix': [],
      'feDiffuseLighting': [],
      'feDisplacementMap': [],
      'feDistantLight': [],
      'feDropShadow': [],
      'feFlood': [],
      'feFuncA': [],
      'feFuncB': [],
      'feFuncG': [],
      'feFuncR': [],
      'feGaussianBlur': [],
      'feImage': [],
      'feMerge': [],
      'feMergeNode': [],
      'feMorphology': [],
      'feOffset': [],
      'fePointLight': [],
      'feSpecularLighting': [],
      'feSpotLight': [],
      'feTile': [],
      'feTurbulence': [],
      'filter': [],
      // 'font': [],
      'font-face': [],
      'font-face-format': [],
      'font-face-name': [],
      'font-face-src': [],
      'font-face-uri': [],
      'foreignObject': [],
      'g': [],
      'glyph': [],
      'glyphRef': [],
      'handler': [],
      'hkern': [],
      'line': [],
      'linearGradient': [],
      'listener': [],
      'marker': [],
      'mask': [],
      'metadata': [],
      'missing-glyph': [],
      'mpath': [],
      'path': [],
      'pattern': [],
      'polygon': [],
      'polyline': [],
      'prefetch': [],
      'radialGradient': [],
      'rect': [],
      'set': [],
      'solidColor': [],
      'stop': [],
      'switch': [],
      'svg': [],
      'symbol': [],
      'tbreak': [],
      'text': [],
      'textArea': [],
      'textPath': [],
      // 'title',
      'tref': [],
      'tspan': [],
      'unknown': [],
      'use': [],
      'view': [],
      'vkern': [],
    },
  },
};

exports.ALLOWED_PROTOCOLS = ALLOWED_PROTOCOLS;
exports.SVG_TAGS = SVG_TAGS;
exports.hubSafeAttrValue = hubSafeAttrValue;
exports.onlyLinks = onlyLinks;
exports.sanitizeHeadContent = sanitizeHeadContent;
exports.sanitizeHtml = sanitizeHtml;
exports.sanitizeMarkdown = sanitizeMarkdown;
exports.sanitizePreviewMarkdown = sanitizePreviewMarkdown;
exports.sanitizeUrl = sanitizeUrl;
exports.stripHtml = stripHtml;
exports.validateHtml = validateHtml;
