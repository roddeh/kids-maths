import React from 'react'
import c from '../constants'
import doTimes from '../do_times'
import pad from '../pad'
import rand from '../rand'
import shallowClone from '../shallow_clone'
import QuestionEditor from '../question_editor'

const defaultProps = {
  numDigits: 3,
  carryOver: true,
}

class VerticalAdditionGenerator extends React.Component {

  render(){
    let config = this.props;
    let numDigits = config.numDigits;

    let max = Math.pow(10, numDigits) - 1;
    let top = String(rand(0, max));
    let bottom = String(rand(0, max));

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
      </div>
    )
  }
}

// <br/>
//         <label>Include questions with carry over:</label>
//         <input type='checkbox' name='carryOver' onChange={ this.handleCheckboxChange }></input>

const VerticalAddition = {
  name: 'verticalAddition',
  title: 'Vertical Addition',
  description: 'Learn addition of large numbers. To start with you can exclude questions with \'carry over\'.',
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: VerticalAdditionGenerator,
  editor: VerticalAdditionEditor,
}

module.exports = VerticalAddition
