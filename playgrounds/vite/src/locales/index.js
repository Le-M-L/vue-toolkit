import { useLocales } from "@vue-toolskit/integrations";
const { $t, setupI18n: coreSetup, loadLocaleMessages } = useLocales();

async function setupI18n(app, options = {}) {
    await coreSetup(app, {
        missingWarn: !import.meta.env.PROD,
        ...options,
    });
}

export { $t, setupI18n, loadLocaleMessages };
