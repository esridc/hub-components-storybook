import { getHubRelease } from '../utils/hub-release';
export default function HubRelease(status) {
  const attributeName = 'hub-release';
  return function (target, _propertyKey, descriptor) {
    const releaseStatus = getHubRelease(status, target._context);
    if (!!releaseStatus) {
      const originalRender = descriptor.value;
      descriptor.value = function (...args) {
        if (this.element) {
          this.element.setAttribute(attributeName, releaseStatus);
          return originalRender.apply(this, args);
        }
        else {
          console.warn(`Could not apply hub-release attribute to ${target.name} host element. "element" is not defined.`);
        }
      };
    }
    return descriptor;
  };
}
