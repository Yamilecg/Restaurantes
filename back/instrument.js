// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://3c226ed9dd7b9cc571735ffedfcc2c68@o4509328064708608.ingest.us.sentry.io/4509328760766464",

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});