import { StorefrontRoutesTranslations } from './config/storefront-routes-translations';

export interface RoutesConfig {
  translations?: {
    default?: RoutesTranslations | StorefrontRoutesTranslations;
    locales?: {
      [languageCode: string]: RoutesTranslations | StorefrontRoutesTranslations;
    };
    useLocales?: null | string | string[];
  };
  fetch?: boolean;
}

export interface RoutesTranslations {
  [routeName: string]: RouteTranslation; // allows User's custom pages
}

export interface RouteTranslation {
  paths?: string[];
  paramsMapping?: ParamsMapping;
  children?: RoutesTranslations;
}

export interface ParamsMapping {
  [paramName: string]: string;
}
