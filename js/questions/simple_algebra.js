import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'
import CheckboxSet from '../checkbox_set'

const ADDITION = '+';
const SUBTRACTION = '-';
const MULTIPLICATION = String.fromCodePoint(215)
const DIVISION = String.fromCodePoint(0x00F7)

const VARIABLES = ['a', 'b', 'c', 'x', 'y'];

const defaultProps = {
  minNumber: 1,
  maxNumber: 9,
  operations: [ADDITION, SUBTRACTION],
  includeNegative: false,
}

class SimpleAlgebraGenerator extends React.Component {

  render(){
    let min = this.props.minNumber;
    let max = this.props.maxNumber;

    function addition(a, b){
      if(this.props.includeNegative && Math.random() > 0.5){
        a *= -1
      }
      return [a, b, a + b];
    }
    function subtraction(a, b){
      if(this.props.includeNegative){
        return [a, b, a - b];
      }
      else{
        let mn = Math.min(a, b)
        let mx = Math.max(a, b)
        return [mx, mn, mx - mn]
      }
    }
    function multiplication(a, b){
      if(this.props.includeNegative && Math.random() > 0.5){
        a *= -1
      }
      return [a, b, a * b]
    }
    function division(a, b){
      if(this.props.includeNegative && Math.random() > 0.5){
        a *= -1
      }
      return [a * b, a, b];
    }

    let methods = {}
    methods[ADDITION] = {method:addition, symbol:ADDITION}
    methods[SUBTRACTION] = {method:subtraction, symbol:SUBTRACTION}
    methods[MULTIPLICATION] = {method:multiplication, symbol:MULTIPLICATION}
    methods[DIVISION] = {method:division, symbol:DIVISION}

    let ops = this.props.operations
    if(!ops || ops.length === 0){
      ops = [methods[ADDITION]]
    }
    ops = this.props.operations.map((o) => {
      return methods[o]
    })

    let operation = rand(ops)

    let [left, right, answer] = operation.method.apply(this, [rand(min, max), rand(min, max)]);
    let letter = rand(VARIABLES);
    if(Math.random() > 0.5){
      left = letter;
    }
    else{
      right = letter;
    }

    let question = left + ' ' + operation.symbol + ' ' + right;
    let top = question + ' = ' + answer;
    let bottom = String.fromCodePoint(0x2234) + ' ' + letter + ' = '

    return (
      <div className='simple-algebra'>
        { top }
        <br/>
        { bottom }
      </div>
    )
  }
}

SimpleAlgebraGenerator.defaultProps = defaultProps

class SimpleAlgebraEditor extends QuestionEditor {

  render(){
    let options = [
      {label:'Addition', value:ADDITION},
      {label:'Subtraction', value:SUBTRACTION},
      {label:'Multiplication', value:MULTIPLICATION},
      {label:'Division', value:DIVISION},
    ]
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 16) }
        <br/>
        <CheckboxSet value={ this.state.operations } options={ options } onChange={ (val) => this.handleCheckboxSetChange('operations', val) }></CheckboxSet>
        <label>Include Negative Numbers:</label>
        <input type='checkbox' name='includeNegative' defaultChecked={ this.state.includeNegative } onChange={ this.handleCheckboxChange }></input>
      </div>
    )
  }
}

SimpleAlgebraEditor.defaultProps = defaultProps

const SimpleAlgebra = {
  name: 'simpleAlgebra',
  title: 'Simple Algebra',
  description: 'Practise the foundations of algebra.',
  difficultyLevel:5,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: SimpleAlgebraGenerator,
  editor: SimpleAlgebraEditor,
}

module.exports = SimpleAlgebra