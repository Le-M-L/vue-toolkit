
import  { i18n, loadLocaleMessages, loadLocalesMap, setupI18n } from './src'

import type { CompileError } from '@intlify/core-base';

import type { Locale } from 'vue-i18n';


import type {
   ImportLocaleFn,
   LocaleSetupOptions,
   SupportedLanguagesType,
} from './src';

export interface useLocales {
  ImportLocaleFn: ImportLocaleFn;
  CompileError: CompileError;
  Locale: Locale;
  LocaleSetupOptions: LocaleSetupOptions;
  SupportedLanguagesType: SupportedLanguagesType;
}

export const useLocales = () => {
  const $t = i18n.global.t;
  return {
      $t,
      i18n,
      loadLocaleMessages,
      loadLocalesMap,
      setupI18n,
  };
};
