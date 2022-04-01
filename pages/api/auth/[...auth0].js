import { handleAuth } from '@auth0/nextjs-auth0';
import {
  handleAuth,
  handleLogin,
  handleCallback,
  getSession,
} from "@auth0/nextjs-auth0";

function getOrgId(orgName) {
  // get org id from org name
  return ...;
}

function getReturnTo(path = "/", orgName) {
  const url = new URL(path, "http://localhost:3000");
  if (!url.host.match(/([^.]*)\.localhost(?::\d{2,4})?/i)) {
    url.host = `${orgName}.localhost:3000`;
  }
  return url.toString();
}

function getOrgName(hostname) {
  const matches = hostname.match(/([^.]*)\.localhost(?::\d{2,4})?/i);
  return Array.isArray(matches) ? matches[1] : null;
}

function getLoginOptions(req, res) {
  const authorizationParams = {
    response_type: "code",
    scope: "openid profile email offline_access",
    audience: "https://audience.example.com",
  };
  const orgName = getOrgName(req.headers.host);
  if (!orgName) {
    authorizationParams.returnTo = req.query.returnTo || "/";
    return { authorizationParams };
  }

  const orgId = getOrgId(orgName);
  if (!orgId) {
    res.status(400).end("Unable to resolve organization");
  }
  const returnTo = getReturnTo(req.query.returnTo, orgName);
  return {
    authorizationParams: {
      ...authorizationParams,
      redirect_uri: `http://${orgName}.localhost:3000/api/auth/callback`,
      organization: orgId,
      returnTo,
    },
    returnTo,
  };
}

export default handleAuth({
  // async login(req, res) {
  //   try {
  //     // Check if user already has a valid session
  //     const orgName = getOrgName(req.headers.host);
  //     const hasSession = !!getSession(req, res);
  //     if (orgName && hasSession) {
  //       return res.redirect(getReturnTo(req.query.returnTo, orgName));
  //     }

  //     const { authorizationParams, returnTo } = getLoginOptions(req, res);
  //     await handleLogin(req, res, {
  //       authorizationParams,
  //       returnTo,
  //     });
  //   } catch (error) {
  //     res.status(error.status || 500).end(error.message);
  //   }
  // },

  async callback(req, res) {
    try {
      console.log({host: req.headers.host})
      const orgName = getOrgName(req.headers.host);
      if (!orgName) {
        return res.status(400).end("Unable to resolve organization");
      }

      await handleCallback(req, res, {
        redirectUri: `http://${orgName}.localhost:3000/api/auth/callback`,
      });
    } catch (error) {
      res.status(error.status || 400).end(error.message);
    }
  },
});