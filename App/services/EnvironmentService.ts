import * as AppSetings from '../../appsettings.json';

export const apiUrl = process.env['APIURL'] || AppSetings.apiUrl;
export const mobileClientType = process.env['MOBILECLIENTTYPE'] || AppSetings.mobileClientType;
export const version = process.env['VERSION'] || AppSetings.version;
export const build = process.env['BUILD'] || AppSetings.build;
export const privacyPolicyUrl = process.env['PRIVACYPOLICYURL'] || AppSetings.privacyPolicyUrl;
export const termsAndConditionsUrl = process.env['TERMSANDCONDITIONSURL'] || AppSetings.termsAndConditionsUrl;
