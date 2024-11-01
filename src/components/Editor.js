import React, { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { oneDark } from '@codemirror/theme-one-dark'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

export default function Editor(props) {
  const { language, displayName, value, onChange } = props
  const [open, setOpen] = useState(true)

  const getLanguageExtension = () => {
    switch (language) {
      case 'javascript':
        return javascript()
      case 'xml':
        return html()
      case 'css':
        return css()
      default:
        return javascript()
    }
  }

  function handleChange(value) {
    onChange(value)
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <CodeMirror
        value={value}
        height="200px"
        theme={oneDark}
        extensions={[getLanguageExtension()]}
        onChange={(value, viewUpdate) => handleChange(value)}
        options={{
          lineWrapping: true,
          lineNumbers: true
        }}
      />
    </div>
  )
}
