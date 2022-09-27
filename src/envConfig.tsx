const API_URL = process.env.REACT_APP_NODE_API || "";
const MIXPANEL = process.env.REACT_APP_MIXPANEL || "";

if (!API_URL || !MIXPANEL) {
  console.log("Missing environment variable");
}

const envConfig = {
  API_URL,
  MIXPANEL,
};

export default envConfig;
