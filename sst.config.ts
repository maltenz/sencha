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
    const isProduction = $app.stage === "production";

    const site = new sst.cloudflare.StaticSite("SenchaSite", {
      path: "website",
      ...(isProduction
        ? {
            domain: {
              name: "senchasound.com",
              redirects: ["www.senchasound.com"],
            },
          }
        : {}),
      assets: {
        fileOptions: [
          {
            files: "**",
            ignore: ["**/*.mp4", "**/*.MP4", "**/*.mov", "**/*.MOV"],
            cacheControl: "max-age=0,no-cache,no-store,must-revalidate",
          },
          {
            files: "**/*.html",
            cacheControl: "max-age=0,no-cache,no-store,must-revalidate",
          },
          {
            files: ["**/*.js", "**/*.css"],
            cacheControl: "max-age=31536000,public,immutable",
          },
        ],
      },
    });

    return {
      SiteUrl: site.url,
    };
  },
});
