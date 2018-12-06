import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'
import CheckboxSet from '../checkbox_set'

const defaultProps = {
  minNumber: 1,
  maxNumber: 12,
  operations: [c.operations.ADDITION, c.operations.SUBTRACTION]
}

class SimpleArithmeticGenerator extends React.Component {

  render(){
    let methods = {}
    methods[c.operations.ADDITION] = this.addition
    methods[c.operations.SUBTRACTION] = this.subtraction
    methods[c.operations.MULTIPLICATION] = this.multiplication
    methods[c.operations.DIVISION] = this.division

    let ops = this.props.operations
    if(!ops || ops.length === 0){
      ops = [c.operations.ADDITION]
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
                { this.createEquation(ops) }
                <br/>
              </React.Fragment>
            )
          })
        }
      </div>
    )
  }

  createEquation(ops){
    let frags = rand(ops)(this.props.minNumber, this.props.maxNumber)
    return frags.left + ' ' + frags.operation + ' ' + frags.right + ' = '
  }

  addition(min, max){
    return {left: rand(min, max), right: rand(min, max), operation: c.operations.ADDITION}
  }

  subtraction(min, max){
    let left = rand(min, max)
    let right = rand(min, left)
    return {left, right, operation: c.operations.SUBTRACTION}
  }

  multiplication(min, max){
    return {left: rand(min, max), right: rand(min, max), operation: c.operations.MULTIPLICATION}
  }

  division(min, max){
    let right = rand(min, max)
    let answer = rand(min, max)
    return {left: right * answer, right, operation: c.operations.DIVISION}
  }
}

SimpleArithmeticGenerator.defaultProps = defaultProps

class SimpleArithmeticEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 16) }
        <br/>
        <CheckboxSet value={ this.state.operations } options={ c.operationsWithLabels } onChange={ (val) => this.handleCheckboxSetChange('operations', val) }></CheckboxSet>
      </div>
    )
  }
}

SimpleArithmeticEditor.defaultProps = defaultProps

const SimpleArithmetic = {
  name: 'SimpleArithmetic',
  title: 'Simple Arithmetic',
  description: 'Practise arithmetic.',
  difficultyLevel: 4,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: SimpleArithmeticGenerator,
  editor: SimpleArithmeticEditor,
}

module.exports = SimpleArithmetic