/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import List from "@ckeditor/ckeditor5-list/src/list";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { ButtonView } from "@ckeditor/ckeditor5-ui";
import Abbreviation from "./abbrivation/abbreviation";

class Timestamp extends Plugin {
  init() {
    console.log("Timestamp was initialized.");
    const editor = this.editor;
    editor.ui.componentFactory.add("timestamp", () => {
      const button = new ButtonView();

      button.set({
        label: "Timestamp",
        withText: true,
      });

      button.on("execute", () => {
        const now = new Date();

        editor.model.change((writer) => {
          editor.model.insertContent(
            writer.createText("timestamp: " + now.toString())
          );
        });
      });

      return button;
    });
  }
}

ClassicEditor.create(document.querySelector("#editor"), {
  plugins: [
    Essentials,
    Paragraph,
    Heading,
    List,
    Bold,
    Italic,
    Timestamp,
    Abbreviation,
  ],
  toolbar: [
    "heading",
    "bold",
    "italic",
    "numberedList",
    "bulletedList",
    "timestamp",
    "abbreviation",
  ],
})
  .then((editor) => {
    console.log("Editor was initialized", editor);
  })
  .catch((error) => {
    console.error(error.stack);
  });
