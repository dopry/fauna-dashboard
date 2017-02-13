import React, { Component } from "react"
import Ace from "brace"

import queryFunctions from "../query-functions"

const faunaLangCompleter = {
  getCompletions(editor, session, pos, prefix, callback) {
    const previousToken = session.getTokenAt(pos.row, pos.column - prefix.length - 1) || {}
    if (previousToken.value !== "q") {
      callback(null, [])
      return
    }

    callback(null, queryFunctions
      .filter(fun => fun.includes(prefix))
      .map(fun => ({
        name: fun,
        value: fun,
        score: 0,
        meta: "query function"
      }))
    )
  }
}

export default class ReplEditor extends Component {

  static Mode = {
    CODE_EDITOR: "in-place-editor",
    FORM_FIELD: "form-field"
  }

  componentDidMount() {
    const {
      name,
      value,
      mode = ReplEditor.Mode.CODE_EDITOR,
      focus = false,
      shortcuts = []
    } = this.props

    this.editor = Ace.edit(name)
    this.editor.$blockScrolling = Infinity // Disable warning
    this.editor.setValue(value)
    this.editor.setFontSize(12)
    this.editor.setOption("highlightActiveLine", true)
    this.editor.setOption("enableBasicAutocompletion", true)
    this.editor.setOption("enableLiveAutocompletion", true)
    this.editor.setOption("showPrintMargin", false)
    this.editor.getSession().setMode("ace/mode/javascript")
    this.editor.getSession().setTabSize(2)
    this.editor.getSession().setUseWorker(false)
    this.editor.on("change", this.onChange.bind(this))
    this.editor.renderer.setShowGutter(mode === ReplEditor.Mode.CODE_EDITOR)

    this.editor.completers = [
      Ace.acequire("ace/ext/language_tools").textCompleter,
      faunaLangCompleter
    ]

    shortcuts.forEach(shortcut => {
      this.editor.commands.addCommand(shortcut)
    })

    if (focus) {
      this.editor.focus()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.editor.getValue() !== nextProps.value) {
      this.editor.setValue(nextProps.value)
    }

    if (!this.editor.isFocused() && nextProps.focus) {
      this.editor.focus()
    }
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.editor.getValue())
    }
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    const divStyle = {
      width: "100%",
      height: this.props.mode === ReplEditor.Mode.FORM_FIELD ? "12em" : "100%",
      border: this.props.mode === ReplEditor.Mode.FORM_FIELD ? "1px solid #767676" : "none"
    }

    return <div id={this.props.name} style={divStyle}></div>
  }
}
