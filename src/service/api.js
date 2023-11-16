const URL = "http://localhost:4000/apiv1/";
const DEV_HOST = "https://r0pc83k9-4000.usw3.devtunnels.ms/apiv1/";

export const serviceApi = async (endpoint, body, method) => {
  try {
    const response = await fetch(`${URL}${endpoint}`, {
      method,
      body: method !== "GET" ? body : null,
      //  body,
    });

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(`Error fetching api ${error}`);
  }
};
