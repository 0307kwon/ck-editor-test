import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import AbbreviationUI from "./abbrevation-ui";
import AbbreviationEditing from "./abbreviation-editing";

export default class Abbreviation extends Plugin {
  static get requires() {
    return [AbbreviationEditing, AbbreviationUI];
  }
}
