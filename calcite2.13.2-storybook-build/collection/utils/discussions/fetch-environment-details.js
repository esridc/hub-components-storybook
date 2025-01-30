import { domainExists } from '@esri/hub-common';
export async function fetchEnvironmentDetails(options, hubRequestOptions) {
  let { isHub } = options;
  if (isHub === undefined) {
    try {
      isHub = await domainExists(globalThis.location.hostname, hubRequestOptions);
    }
    catch (e) {
      isHub = false;
    }
  }
  return { isHub };
}
