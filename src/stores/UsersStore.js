import {Store} from "@d4lton/node-frontend";
import ServiceClient from "../ServiceClient.js";

export default class UsersStore extends Store {

  init() {
    this.value = [];
    this.loading = true;
    this.refresh();
  }

  async refresh() {
    return this.action(async () => {
      this.value = await ServiceClient.request("/user");
    });
  }

  getByUid(uid) {
    return this.value.find(it => it.uid === uid);
  }

  getByEmail(email) {
    return this.value.find(it => it.email === email);
  }

}
