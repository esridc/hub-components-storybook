/**
 * get orgKey or derive from hostname
 * and ensure it is lowercased
 * @param domain
 * @returns
 */
export const _getOrgKey = (domain) => {
  var _a, _b;
  return (_b = (domain.orgKey || ((_a = domain.hostname) === null || _a === void 0 ? void 0 : _a.split('.')[0]))) === null || _b === void 0 ? void 0 : _b.toLocaleLowerCase();
};
