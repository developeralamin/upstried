import { LanguageObj, ServerLanguageObj } from './dataTypes';

export const mapLanguageFromServer = (
  request: ServerLanguageObj
): LanguageObj => {
  return {
    country: request.country,
    countryCode: request.country_code,
    language: request.language,
    langCode: request.lang_code,
    isDefault: request.is_default,
  };
};
