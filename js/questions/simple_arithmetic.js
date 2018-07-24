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

const defaultProps = {
  minNumber: 1,
  maxNumber: 12,
  operations: [ADDITION, SUBTRACTION]
}

class SimpleArithmeticGenerator extends React.Component {

  render(){
    let min = this.props.minNumber
    let max = this.props.maxNumber

    function addition(){
      return rand(min, max) + ' + ' + rand(min, max) + ' = '
    }

    function subtraction(){
      let leftNum = rand(min, max)
      let rightNum = rand(min, leftNum)
      return leftNum + ' - ' + rightNum + ' = '
    }

    function multiplication(){
      return rand(min, max) + ' ' + MULTIPLICATION + ' ' + rand(min, max) + ' = ' 
    }

    function division(){
      let right = rand(min, max)
      let answer = rand(min, max)
      return (right * answer) + ' ' + DIVISION + ' ' + right + ' = ' 
    }

    let methods = {}
    methods[ADDITION] = addition
    methods[SUBTRACTION] = subtraction
    methods[MULTIPLICATION] = multiplication
    methods[DIVISION] = division

    let ops = this.props.operations
    if(!ops || ops.length === 0){
      ops = [ADDITION]
    }

    ops = this.props.operations.map((o) => {
      return methods[o]
    })

    return (
       <div className='simple-arithmetic'>
        {
          doTimes(3, (i) => { 
            return (
              <React.Fragment key={ i }>
                { rand(ops)() }
                <br/>
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }
}

SimpleArithmeticGenerator.defaultProps = defaultProps

class SimpleArithmeticEditor extends QuestionEditor {

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

SimpleArithmeticEditor.defaultProps = defaultProps

const SimpleArithmetic = {
  name: 'simpleArithmetic',
  title: 'Simple Arithmetic',
  description: 'Practise arithmetic',
  difficultyLevel:0,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: SimpleArithmeticGenerator,
  editor: SimpleArithmeticEditor,
}

module.exports = SimpleArithmetic