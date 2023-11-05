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

}
