import {Store} from "@d4lton/node-frontend";
import ServiceClient from "./ServiceClient.js";

export default class AdminContestsStore extends Store {

  init() {
    this.loading = true;
    this.refresh();
  }

  async refresh() {
    return this.action(async () => {
      this.value = await ServiceClient.request("/contest");
    });
  }

  async create(contest) {
    return this.action(async () => {
      await ServiceClient.request("/contest", "POST", contest);
      setTimeout(() => this.refresh());
    });
  }

  async update(contest) {
    return this.action(async () => {
      await ServiceClient.request(`/contest/${contest.id}`, "PATCH", contest);
      setTimeout(() => this.refresh());
    });
  }

  async deleteById(id) {
    return this.action(async () => {
      await ServiceClient.request(`/contest/${id}`, "DELETE");
      this.refresh();
    });
  }

}
