import type { Preferences } from './types';

import { preferencesManager, createPreferences } from './preferences';


import * as constants from './constants';
export type * as Preferences from './types';
import { usePreferences } from './use-preferences';
import { useAntdDesignTokens, useElementPlusDesignTokens, useNaiveDesignTokens } from './use-design-tokens';

export const usePreference = () => {
  if(!preferencesManager) {
    createPreferences();
  }
  // 偏好设置（带有层级关系）
  const preferences: Preferences =
    preferencesManager.getPreferences.apply(preferencesManager);

  // 更新偏好设置
  const updatePreferences =
    preferencesManager.updatePreferences.bind(preferencesManager);

  // 重置偏好设置
  const resetPreferences =
    preferencesManager.resetPreferences.bind(preferencesManager);

  const clearPreferencesCache =
    preferencesManager.clearCache.bind(preferencesManager);

  // 初始化偏好设置
  const initPreferences =
    preferencesManager.initPreferences.bind(preferencesManager);


  return {
    clearPreferencesCache,
    initPreferences,
    preferences,
    preferencesManager,
    resetPreferences,
    updatePreferences,
    useElementPlusDesignTokens: () => useElementPlusDesignTokens(preferences),
    useAntdDesignTokens: () => useAntdDesignTokens(preferences),
    useNaiveDesignTokens: () => useNaiveDesignTokens(preferences),
    ...constants,
    usePreferences
  }
}