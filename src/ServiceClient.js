import Firebase from "./Firebase";

export default class ServiceClient {

  static async request(endpoint, method = "GET", body) {
    body = body == null ? undefined : typeof body === "string" ? body : JSON.stringify(body);
    const token = await Firebase.auth.currentUser?.getIdToken();
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      method: method,
      body: body
    };
    return await fetch(`${window.process.env.API_URL}${endpoint}`, options)
      .then(response => response.json())
  }

}
