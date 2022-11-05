import React from 'react'
import Parser from 'html-react-parser';

function HTMLParser(props) {
  return Parser(props.children || '')
}

export default HTMLParser;