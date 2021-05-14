import React, { Component } from 'react'
import Editor, { editor as editorState } from "./Editor"
import "./index.css"

export default class App extends Component {
  ref = React.createRef();
  
  getHTML = () => {
    return this.ref.current.editor.getHTML();
  }

  render() {
    return (
      <div style={{width: 720, margin: "48px auto"}}>
        <button onClick={() => console.log(this.getHTML())}>Print output</button>
       <Editor ref={this.ref}/>
      </div>
    )
  }
}