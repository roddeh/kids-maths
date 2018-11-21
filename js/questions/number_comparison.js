import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  numDigits: 3,
}

class NumberComparisonGenerator extends React.Component {

  render(){
    let max = Math.pow(10, this.props.numDigits)
    

    return (
      <div className='number-comparison'>
        <p>For each pair of numbers determine whether the numbers are &lt; or &gt; or =</p>
        {
          doTimes(4, (i) => {
            let n1 = rand(max)
            let n2 = rand(max)
            return (
              <p key={ i }>{ n1 }<span className='square'>&nbsp;</span>{ n2 }</p>
            )
          })
        }
      </div>
    )
  }
}

NumberComparisonGenerator.defaultProps = defaultProps

class NumberComparisonEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Number of digits:</label>
        <input type='range' name='numDigits' min='1' max='4' step='1' value={ this.state.numDigits } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.numDigits }</label>
      </div>
    )
  }
}

NumberComparisonEditor.defaultProps = defaultProps

const NumberComparison = {
  name: 'numberComparison',
  title: 'Number Comparison',
  description: 'Compare numbers to learn which is the largest',
  difficultyLevel:2,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: NumberComparisonGenerator,
  editor: NumberComparisonEditor,
}

module.exports = NumberComparison