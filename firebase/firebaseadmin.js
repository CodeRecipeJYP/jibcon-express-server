const admin = require("firebase-admin");
const serviceAccount = require("../authentication_keys/jibcon-smarts-firebase-adminsdk-f5wfl-1d6d5894ba.json");

const DATABASE_NAME = "jibcon-smarts";

const defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${DATABASE_NAME}.firebaseio.com`
});

module.exports = defaultApp;