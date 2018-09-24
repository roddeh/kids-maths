import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import pad from '../utils/pad'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  numDigits: 3,
  numRows: 3,
}

class TemplateGenerator extends React.Component {

  render(){
    let numDigits = this.props.numDigits

    function makeNum(prefix = ''){
      let max = Math.pow(10, numDigits) - 1
      let num = String(rand(0, max))
      return prefix + pad(2 - prefix.length + numDigits - num.length) + num
    }
    
    console.log(this.props.numRows)

    return (
      <div className='stacked-addition center large-text'>
        {
          doTimes(this.props.numRows - 1, (i) => {
            return (
              <React.Fragment key={ i }>
                { makeNum() }
                <br/>  
              </React.Fragment>
            )
          })
        }
        { makeNum('+') }
        <br/>  
        {
          doTimes(numDigits + 2, () => { return '‾'}).join('')
        }
      </div>
    )
  }
}

TemplateGenerator.defaultProps = defaultProps

class TemplateEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Number of digits:</label>
        <input type='range' name='numDigits' min='2' max='5' step='1' value={ this.state.numDigits } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.numDigits }</label>
        <br/>
        <label>Number of rows:</label>
        <input type='range' name='numRows' min='3' max='5' step='1' value={ this.state.numRows } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.numRows }</label>
      </div>
    )
  }
}

TemplateEditor.defaultProps = defaultProps

const Template = {
  name: 'stackedAddition',
  title: 'Stacked Addition',
  description: 'Continue learning addition by adding several numbers in a vertical format.',
  difficultyLevel:4,
  layoutType: c.questionShapes.TALL_RECT,
  generator: TemplateGenerator,
  editor: TemplateEditor,
}

module.exports = Template