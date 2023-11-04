import {EventBus, Store} from "@d4lton/node-frontend";
import ServiceClient from "../ServiceClient.js";

export default class UserContestsStore extends Store {

  init() {
    this.value = [];
    this.loading = true;
    this.refresh();
    EventBus.register("contest", (event) => {
      if (event.change === "modified") {
        setTimeout(() => {if (!this._mutex.isLocked()) { this.refresh(); }});
      }
    });
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
