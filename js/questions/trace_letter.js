import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const BOTH = 'both'
const UPPER = 'upper'
const LOWER = 'lower'

const defaultProps = {
  characterSet:BOTH
}

const LETTERS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

class TraceLetterGenerator extends React.Component {

  render(){
    let letter = rand(LETTERS)
    if(this.props.characterSet === LOWER || (this.props.characterSet === BOTH && Math.random() > 0.5)){
      letter = letter.toLowerCase()
    }
    return (
      <div className="trace-letter">{ letter }</div>
    )
  }
}

TraceLetterGenerator.defaultProps = defaultProps

class TraceLetterEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Characters to Include:</label>
        <select name='characterSet' value={ this.state.characterSet } onChange={ this.handleSelectChange }>
          <option value={ BOTH }>Uppercase and Lowercase</option>
          <option value={ UPPER }>Uppercase Only</option>
          <option value={ LOWER }>Lowercase Only</option>
        </select>
      </div>
    )
  }
}

TraceLetterEditor.defaultProps = defaultProps

const TraceLetter = {
  name: 'traceLetter',
  title: 'Trace Letter',
  description: 'Practise writing letters with dotted trace guides.',
  difficultyLevel:1,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: TraceLetterGenerator,
  editor: TraceLetterEditor,
}

module.exports = TraceLetter