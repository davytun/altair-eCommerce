type AppEnvironment = 'development' | 'staging' | 'production'

const appEnvironment = import.meta.env.VITE_APP_ENV

export const environment: AppEnvironment =
  appEnvironment === 'staging' || appEnvironment === 'production'
    ? appEnvironment
    : 'development'

/**
 * This is a build-time safeguard only. Tracking implementation is deferred
 * until the company supplies its approved server-side tracking template.
 */
export const isProductionTrackingEnabled =
  environment === 'production' &&
  import.meta.env.VITE_ENABLE_PRODUCTION_TRACKING === 'true'
