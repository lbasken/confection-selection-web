import {Store} from "@d4lton/node-frontend";
import ServiceClient from "./ServiceClient.js";

export default class UserContestsStore extends Store {

  init() {
    this.loading = true;
    this.refresh();
  }

  async refresh() {
    return this.action(async () => {
      this.value = await ServiceClient.request("/contest_live");
    });
  }

  async vote(contest, category) {
    // TODO
  }

}
