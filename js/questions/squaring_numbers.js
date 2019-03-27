import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  maxValue: 10,
}

class SquaringNumbersGenerator extends React.Component {

  render(){

    



    return (
      <div className='squaring-numbers text-question'>
        {
          doTimes(3, (i) => {
            let value = rand(1, this.props.maxValue)
            return (
              <React.Fragment key={i}>
                {value}<sup>2</sup> = &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = <br/>
              </React.Fragment>
            )
          })
        }    
      </div>
    )
  }
}

SquaringNumbersGenerator.defaultProps = defaultProps

class SquaringNumbersEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Range example:</label>
        <input type='range' name='maxValue' min='1' max='12' step='1' value={ this.state.maxValue } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.maxValue }</label>
      </div>
    )
  }
}

SquaringNumbersEditor.defaultProps = defaultProps

const SquaringNumbers = {
  name: 'squaringNumbers',
  title: 'Squaring Numbers',
  description: 'Learn about squaring numbers.',
  difficultyLevel:7,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: SquaringNumbersGenerator,
  editor: SquaringNumbersEditor,
}

module.exports = SquaringNumbers