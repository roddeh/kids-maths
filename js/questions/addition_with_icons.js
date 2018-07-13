import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import rand from '../utils/rand'
import emoji from '../utils/emoji'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: 1,
  maxNumber: 12,
  includeTraceNumbers:false,
}

class AdditionWithIconsGenerator extends React.Component {

  render(){
    let icon = rand(emoji)
    let left = rand(this.props.minNumber, this.props.maxNumber)
    let right = rand(this.props.minNumber, this.props.maxNumber)
    let trace = this.props.includeTraceNumbers

    function makeTop(){
      return (
        <span>
          { makeIcons(icon, left) }
          <span className='operator'>+</span>
          { makeIcons(icon, right) }
          <span className='operator'>=</span>
        </span>
      )
    }

    function makeBottom(){
      if(trace){
        return (
          <span>
            <span className='trace-number'>{ left }</span>
            { makeOp('+') }
            <span className='trace-number'>{ right }</span>
            { makeOp('\x3D\xA0')}
            <span className='trace-number'>{ left + right }</span>
          </span>
        )
      }
      else{
        return (
          <span>
            { makeIcons('\xA0', 12) }
            { makeOp('+') }
            { makeIcons('\xA0', 12) }
            { makeOp('\x3D') }
          </span>
        )
      }
    }

    function makeOp(op){
      return <span className='operator'>{ op }</span>
    }

    function makeIcons(icon, num){      
      return <div className='icons'>
        { doTimes(num, () => { return icon }).join('') }
      </div>
    }

    return (
      <div className='addition-with-icons'>
        { makeTop() }
        <br/>
        { makeBottom() }
        <span className='spacer'/>
      </div>
    )
  }
}

AdditionWithIconsGenerator.defaultProps

class AdditionWithIconsEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Minimum number:</label>
        <input type='range' name='minNumber' min='1' max='5' step='1' value={ this.state.minNumber } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.minNumber }</label>
        <br/>
        <label>Maximum number:</label>
        <input type='range' name='maxNumber' min='5' max='16' step='1' value={ this.state.maxNumber } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.maxNumber }</label>
        <br/>
        <label>Include traceable numbers:</label>
        <input type='checkbox' name='includeTraceNumbers' defaultChecked={ this.state.includeTraceNumbers } onChange={ this.handleCheckboxChange }></input>
      </div>
    )
  }
}

AdditionWithIconsEditor.defaultProps

const AdditionWithIcons = {
  name: 'additionWithIcons',
  title: 'Addition with Icons',
  description: 'Learn the basics of addition with icons. Optionally include traceable numbers to help teach the writing of numbers.',
  difficultyLevel:0,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: AdditionWithIconsGenerator,
  editor: AdditionWithIconsEditor,
}

module.exports = AdditionWithIcons