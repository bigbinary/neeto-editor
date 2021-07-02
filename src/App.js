import React, { Component } from "react";
import Editor from "./Editor/index";
import "./index.scss";

export default class App extends Component {
  ref = React.createRef();

  getHTML = () => {
    return this.ref.current.editor.getHTML();
  };

  render() {
    return (
      <div style={{ width: 720, margin: "48px auto" }}>
        <div className="flex justify-end">
          <button
            className="px-3 py-1 text-sm font-medium border border-gray-200 rounded shadow-sm"
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log(this.getHTML());
            }}
          >
            Print output to console
          </button>
        </div>
        <hr className="my-2 border-gray-100" />
        <Editor ref={this.ref} />
      </div>
    );
  }
}
