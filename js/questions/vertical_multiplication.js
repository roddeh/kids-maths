import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import pad from '../utils/pad'
import rand from '../utils/rand'
import zerosToSpace from '../utils/zeros_to_space'
import QuestionEditor from '../question_editor'

const defaultProps = {
  numDigits: 3,
  carryOver: false,
}

class VerticalMultiplicationGenerator extends React.Component {

  render(){
    let numDigits = this.props.numDigits
    let top
    let bottom

    if(this.props.carryOver){
      let max = Math.pow(10, numDigits) - 1
      top = String(rand(0, max))
      bottom = String(rand(0, 9))
    }
    else{
      bottom = rand(2, 4);
      let max;

      switch(bottom){
        case 4: max = 2; break;
        case 3: max = 3; break;
        case 2: max = 4; break;
        case 1: max = 9; break;
        default: max = 1; break;
      }

      top = doTimes(numDigits, (i) => {
        return rand(0, max);
      }).join('');

      doTimes(numDigits - 1, () => { bottom = '0' + bottom });
      bottom = zerosToSpace(bottom, '0');
    }

    return (
      <div className='vertical-arithmetic'>
        {pad(2 + numDigits - top.length) + top }
        <br/>
        { String.fromCodePoint(215) + pad(1 + numDigits - bottom.length) + bottom }
        <br/>
        {
          doTimes(numDigits + 2, () => { return '‾'}).join('')
        }
      </div>
    )    
  }
}

VerticalMultiplicationGenerator.defaultProps = defaultProps;

class VerticalMultiplicationEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Number of digits:</label>
        <input type='range' name='numDigits' min='2' max='6' step='1' value={ this.state.numDigits } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.numDigits }</label>
        <br/>
        <label>Include questions with carry over:</label>
        <input type='checkbox' name='carryOver' defaultChecked={ this.state.carryOver } onChange={ this.handleCheckboxChange }></input>
      </div>
    )
  }
}

VerticalMultiplicationEditor.defaultProps = defaultProps;

const VerticalMultiplication = {
  name: 'verticalMultiplication',
  title: 'Vertical Multiplication',
  description: 'Learn multiplication of large numbers. To start with you can exclude questions with \'carry over\'.',
  difficultyLevel:4,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: VerticalMultiplicationGenerator,
  editor: VerticalMultiplicationEditor,
}

module.exports = VerticalMultiplication
