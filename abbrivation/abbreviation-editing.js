import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class AbbreviationEditing extends Plugin {
  init() {
    this._defineSchema();
    this._defineConverters();
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.extend("$text", {
      allowAttributes: ["abbreviation"],
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.for("downcast").attributeToElement({
      model: "abbreviation",
      view: (modelAttributeValue, conversionApi) => {
        const { writer } = conversionApi;

        return writer.createAttributeElement("abbr", {
          title: modelAttributeValue,
        });
      },
    });

    conversion.for("upcast").elementToAttribute({
      view: {
        name: "abbr",
        attributes: ["title"],
      },
      model: {
        key: "abbreviation",
        value: (viewElement) => {
          const title = viewElement.getAttribute("title");

          return title;
        },
      },
    });
  }
}
