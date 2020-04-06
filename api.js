const express = require("express");
const router = express.Router();

const SpotifyWebApi = require("spotify-web-api-node");
const env = require("./env");

const spotifyApi = new SpotifyWebApi({
  redirectUri: env.REDIRECT_URI,
  clientId: env.CLIENT_ID,
  clientSecret: env.CLIENT_SECRET,
});

router.get("/", (req, res) => {
  let scopes = ["user-read-private"];
  let showDialog = true;
  let authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, showDialog);
  return res.redirect(authorizeURL);
});

router.get("/callback", async (req, res) => {
  const params = req.query.code;
  try {
    const grant = await spotifyApi.authorizationCodeGrant(params);
    const token = grant.body.access_token;
    spotifyApi.setAccessToken(token);
    return res.redirect("http://localhost:4000/graphql");
  } catch (err) {
    console.log(err);
  }
});

module.exports = { router, spotifyApi };
