import Firebase from "./Firebase";

export class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

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
      .then(response => {
        if (response.status !== 200) { throw new HttpError(response.statusText, response.status); }
        return response.json();
      });
  }

}
