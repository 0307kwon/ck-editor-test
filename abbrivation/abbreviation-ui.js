import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { clickOutsideHandler, ContextualBalloon } from "@ckeditor/ckeditor5-ui";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import "../styles.css";
import FormView from "./abbreviation-view";

export default class AbbreviationUI extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }

  init() {
    const editor = this.editor;

    this._balloon = this.editor.plugins.get(ContextualBalloon);
    this.formView = this._createFormView();

    editor.ui.componentFactory.add("abbreviation", () => {
      const button = new ButtonView();

      button.label = "Abbreviation";
      button.tooltip = true;
      button.withText = true;

      this.listenTo(button, "execute", () => {
        this._showUI();
      });

      return button;
    });
  }

  _hideUI() {
    this.formView.abbrInputView.fieldView.value = "";
    this.formView.titleInputView.fieldView.value = "";
    this.formView.element.reset();

    this._balloon.remove(this.formView);

    this.editor.editing.view.focus();
  }

  _createFormView() {
    const editor = this.editor;
    const formView = new FormView(editor.locale);

    this.listenTo(formView, "submit", () => {
      const title = formView.titleInputView.fieldView.element.value;
      const abbr = formView.abbrInputView.fieldView.element.value;

      editor.model.change((writer) => {
        editor.model.insertContent(
          writer.createText(abbr, { abbreviation: title })
        );
      });

      this._hideUI();
    });

    this.listenTo(formView, "cancel", () => {
      this._hideUI();
    });

    clickOutsideHandler({
      emitter: formView,
      activator: () => this._balloon.visibleView === formView,
      contextElements: [this._balloon.view.element],
      callback: () => this._hideUI(),
    });

    return formView;
  }

  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = null;

    // Set a target position by converting view selection range to DOM.

    target = () =>
      view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());

    return {
      target,
    };
  }

  _showUI() {
    this._balloon.add({
      view: this.formView,
      position: this._getBalloonPositionData(),
    });

    this.formView.focus();
  }
}
