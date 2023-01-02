import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import AbbreviationEditing from "./abbreviation-editing";
import AbbreviationUI from "./abbreviation-ui";

export default class Abbreviation extends Plugin {
  static get requires() {
    return [AbbreviationEditing, AbbreviationUI];
  }
}
