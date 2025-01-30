// Parse any permission flags or service flags from the uri, and remove them
// Flag v2
// pe - permission enable - pe=hub:projects
// pd - permission disable - pd=hub:site:domains
// sol - system offline -
// sna - system not available
;
export function parseFlags(href) {
  const result = {
    replaceState: false,
    uri: href,
    featureFlags: {},
    serviceStatus: {
      portal: "online",
      discussions: "online",
      events: "online",
      metrics: "online",
      notifications: "online",
      "hub-search": "online",
      domains: "online",
      "hub-downloads": "online"
    }
  };
  const baseUrl = href.split('?')[0];
  const params = href.split('?')[1];
  if (params) {
    // use strings vs browser specific apis so we can move this to hub.js
    // also - this seems more reliable - which is odd
    const sp = params.split('&');
    let passThruParams = [];
    // iterate them, looking for entries, which we then parse into a hash
    for (const p of sp) {
      const param = p.split('=')[0];
      const prop = decodeURIComponent(p.split('=')[1]);
      let handled = false;
      if (['pe', 'pd'].includes(param)) {
        const value = param === 'pe';
        result.featureFlags[prop] = value;
        handled = true;
        result.replaceState = false;
      }
      if (['sol', 'sna'].includes(param)) {
        // This is appended to `service-` in hub.js
        // so we don't send the full PolicyResponse string
        const status = param === 'sol' ? 'offline' : 'not-available';
        result.serviceStatus[prop] = status;
        handled = true;
        result.replaceState = false;
      }
      if (!handled) {
        passThruParams = [...passThruParams, p];
      }
    }
    // Compute the uri without the query params
    // eslint-disable-next-line unicorn/prefer-ternary
    if (passThruParams.length) {
      result.uri = `${baseUrl}?${passThruParams.join('&')}`;
    }
    else {
      result.uri = baseUrl;
    }
  }
  return result;
}
