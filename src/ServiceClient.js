import Firebase from "./Firebase";

export default class ServiceClient {

  static async request(endpoint, method = "GET", body, abortController) {
    body = body == null ? undefined : typeof body === "string" ? body : JSON.stringify(body);
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Firebase.token}`
      },
      method: method,
      body: body,
      signal: abortController?.signal
    };
    return await fetch(`${window.process.env.API_URL}${endpoint}`, options)
      .then(response => response.json())
  }

}
