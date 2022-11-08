"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Apple;

function Apple(options) {
  return {
    id: "apple",
    name: "Apple",
    type: "oauth",
    wellKnown: "https://appleid.apple.com/.well-known/openid-configuration",
    authorization: {
      params: {
        scope: "name email",
        response_mode: "form_post"
      }
    },
    userinfo: {
      request({ provider, tokens, requestInfo: { body } }) {
        const profile = tokens.claims()
        if (body?.user) {
        try {
          profile.user = typeof body.user === 'string' ? JSON.parse(body.user) : body.user

          return profile
        } catch (error) {
          profile.user = body.user
          // logger.debug("ERR_PARSING_BODY_USER_OBJECT_APPLE", {
          //   error: error as Error,
          //   providerId: provider.id,
          // })
        } 
      } else {
        return profile
      }
      },
    },    
    idToken: true,

    profile(profile) {
      return {
        id: profile.sub,
        name: profile.user?.name,
        email: profile.email,
        image: null
      };
    },

    checks: ["pkce"],
    options
  };
}
