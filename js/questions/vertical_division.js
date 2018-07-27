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

class VerticalDivisionGenerator extends React.Component {

  render(){
    let divisor = rand(1, 4);
    let max;

    switch(divisor){
      case 4: max = 2; break;
      case 3: max = 3; break;
      case 2: max = 4; break;
      case 1: max = 9; break;
      default: max = 1; break;
    }

    let top = doTimes(this.props.numDigits, (i) => {
      return rand(0, max) * divisor;
    }).join('');

    doTimes(this.props.numDigits - 1, () => { divisor = '0' + divisor });

    return (
      <div className="vertical-arithmetic">
        { '\xA0\xA0' + zerosToSpace(top, '0') }
        <br/>
        { String.fromCodePoint(0x00F7) + '\xA0' + zerosToSpace(divisor, '0') }
        <br/>
        { doTimes(this.props.numDigits + 2, () => { return '‾'}) }
      </div>
    )
  }
}

VerticalDivisionGenerator.defaultProps = defaultProps;

class VerticalDivisionEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Number of digits:</label>
        <input type='range' name='numDigits' min='2' max='5' step='1' value={ this.state.numDigits } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.numDigits }</label>
      </div>
    )
  }
}

VerticalDivisionEditor.defaultProps = defaultProps;

const VerticalDivision = {
  name: 'verticalDivision',
  title: 'Vertical Division',
  description: 'Learn division of large numbers.',
  difficultyLevel:5,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: VerticalDivisionGenerator,
  editor: VerticalDivisionEditor,
}

module.exports = VerticalDivision
