
import  { i18n, loadLocaleMessages, loadLocalesMap, setupI18n } from './src'

export type { CompileError } from '@intlify/core-base';

export type { Locale } from 'vue-i18n';


export type {
   ImportLocaleFn,
   LocaleSetupOptions,
   SupportedLanguagesType,
} from './src';

export const useLocales = () => {
  const $t = i18n.global.t;
  return {
      $t,
      i18n,
      loadLocaleMessages,
      loadLocalesMap,
      setupI18n
  };
};
