export default class Utilities {

  static generateNameForCategoryId(id) {
    return id
      .replace(/_/g, " ")
      .split(" ")
      .map(word => `${word[0].toUpperCase()}${word.substring(1)}`)
      .join(" ")
  }

  static concatenateWithAnd(words) {
    if (!Array.isArray(words)) { return words; }
    if (words.length < 2) { return words.join(""); }
    return `${words.slice(0, words.length - 1).join(", ")}, and ${words[words.length - 1]}`;
  }

  static isSet(value) {
    return value !== undefined && value !== null;
  }

  static isEmpty(value) {
    if (!Utilities.isSet(value)) { return true; }
    if (Array.isArray(value)) { return value.length === 0; }
    if (typeof value === "string") { return value.length === 0; }
    if (Utilities.isObject(value)) { return Object.keys(value).length === 0; }
    return false;
  }

  static isObject(value) {
    if (!Utilities.isSet(value)) { return false; }
    return (typeof value === "object" && !Array.isArray(value));
  }

}
