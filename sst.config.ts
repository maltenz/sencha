/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sencha",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "cloudflare",
      providers: {
        cloudflare: "6.15.0",
      },
    };
  },
  async run() {
    const site = new sst.cloudflare.StaticSite("SenchaSite", {
      path: "website",
    });

    return {
      SiteUrl: site.url,
    };
  },
});
