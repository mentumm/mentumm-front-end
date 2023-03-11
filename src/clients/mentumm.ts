import axios from "axios";

const API_URL = process.env.REACT_APP_NODE_API;

// https://gist.github.com/hunan-rostomyan/28e8702c1cecff41f7fe64345b76f2ca
function getCookie(name: string): string | null {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null
  );
}

// creates authenticated API requests with user's JWT Token
export const menApiAuthClient = () => {
  try {
    const authToken = getCookie("growth_10_token");

    if (!authToken) {
      throw new Error("Could not retrieve auth token from cookie!");
    }
    const instance = axios.create({
      baseURL: API_URL + "/v1",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return instance;
  } catch (error) {}
};
