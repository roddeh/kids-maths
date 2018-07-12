import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import pad from '../utils/pad'
import rand from '../utils/rand'
import shallowClone from '../utils/shallow_clone'
import zerosToSpace from '../utils/zeros_to_space'
import QuestionEditor from '../question_editor'

const defaultProps = {
  numDigits: 3,
  carryOver: false,
}

class VerticalAdditionGenerator extends React.Component {

  render(){
    let numDigits = this.props.numDigits
    let top
    let bottom

    if(this.props.carryOver){
      let max = Math.pow(10, numDigits) - 1
      top = String(rand(0, max))
      bottom = String(rand(0, max))
    }
    else{
      function makeNumberPair(i){
        let a = rand(0, 9);
        let b = rand(0, 9 - a)

        if(rand(1) === 1){
          return [a, b];
        }
        return [b, a];
      }

      let numbers = doTimes(this.props.numDigits, makeNumberPair)
        .reduce((nums, pair) => {
          nums.top += pair[0];
          nums.bottom += pair[1];
          return nums;
        }, {top:'', bottom:''});
      top = zerosToSpace(numbers.top, '0');
      bottom = zerosToSpace(numbers.bottom, '0');
    }
    

    return (
      <div className='simple-vertical-addition'>
        {pad(2 + numDigits - top.length) + top }
        <br/>
        { '+' + pad(1 + numDigits - bottom.length) + bottom }
        <br/>
        {
          doTimes(numDigits + 2, () => { return '‾'}).join('')
        }
      </div>
    )    
  }
}

VerticalAdditionGenerator.defaultProps = defaultProps;

class VerticalAdditionEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Number of digits:</label>
        <input type='range' name='numDigits' min='1' max='5' step='1' value={ this.state.numDigits } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.numDigits }</label>
        <br/>
        <label>Include questions with carry over:</label>
        <input type='checkbox' name='carryOver' defaultChecked={ this.state.carryOver } onChange={ this.handleCheckboxChange }></input>
      </div>
    )
  }
}

VerticalAdditionEditor.defaultProps = defaultProps;

const VerticalAddition = {
  name: 'verticalAddition',
  title: 'Vertical Addition',
  description: 'Learn addition of large numbers. To start with you can exclude questions with \'carry over\'.',
  difficultyLevel:3,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: VerticalAdditionGenerator,
  editor: VerticalAdditionEditor,
}

module.exports = VerticalAddition
