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
  operations: [ADDITION, SUBTRACTION]
}

class SimpleAlgebraGenerator extends React.Component {

  render(){
    let min = this.props.minNumber;
    let max = this.props.maxNumber;

    function addition(a, b){
      return [a, b, a + b];
    }
    function subtraction(a, b){
      return [a, b, a - b];
    }
    function multiplication(a, b){
      return [a, b, a * b]
    }
    function division(a, b){
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

    let [left, right, answer] = operation.method(rand(min, max), rand(min, max));
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


// 'use strict';

// const c = require('../constants');
// const doTimes = require('../do_times');
// const rand = require('roddeh-rand');
// const prepareConfig = require('../prepare_config');

// let config = {
//   minNumber: 1,
//   maxNumber: 9,
// }

// const ADDITION = '+';
// const SUBTRACTION = '-';
// const MULTIPLICATION = '&times;'
// const DIVISION = '&div;'
// const VARIABLES = ['a', 'b', 'c', 'x', 'y'];

// function generateQuestion(){
//   let min = config.minNumber;
//   let max = config.maxNumber;

//   function addition(a, b){
//     return [a, b, a + b];
//   }
//   function subtraction(a, b){
//     return [a, b, a - b];
//   }
//   function multiplication(a, b){
//     return [a, b, a * b]
//   }
//   function division(a, b){
//     return [a * b, a, b];
//   }

//   let operation = rand([
//     {method:addition, symbol:ADDITION},
//     {method:subtraction, symbol:SUBTRACTION},
//     {method:multiplication, symbol:MULTIPLICATION},
//     {method:division, symbol:DIVISION},
//   ]);

//   let [left, right, answer] = operation.method(rand(min, max), rand(min, max));
//   let letter = rand(VARIABLES);
//   if(Math.random() > 0.5){
//     left = letter;
//   }
//   else{
//     right = letter;
//   }

//   let question = left + ' ' + operation.symbol + ' ' + right;
//   let top = question + ' = ' + answer;
//   let bottom = `&#8756; ${ letter } = `

//   return `
//     <div class="simple-algebra">
//       ${ top }<br/>
//       ${ bottom }
//     </div>
//   `
// }

// let simpleAlgebra = {
//   type: c.questionShapes.SMALL_SQUARE,
//   prepare(cfg){
//     config = prepareConfig(cfg || {}, config);
//     return this;
//   },
//   generateQuestion,
// };

// module.exports = simpleAlgebra;