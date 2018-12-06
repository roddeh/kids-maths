import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'
import CheckboxSet from '../checkbox_set'

const defaultProps = {
  minNumber: 1,
  maxNumber: 12,
  operations:[c.operations.ADDITION, c.operations.SUBTRACTION, c.operations.DIVISION, c.operations.MULTIPLICATION]
}

class MissingNumbersGenerator extends React.Component {

  additionMethod(){
    let leftNum = rand(this.props.minNumber, this.props.maxNumber)
    let rightNum = rand(this.props.minNumber, this.props.maxNumber)
    let answer = leftNum + rightNum
    return this.createEquation(leftNum, rightNum, answer, c.operations.ADDITION)
  }

  subtractionMethod(){
    let leftNum = rand(this.props.minNumber, this.props.maxNumber)
    let rightNum = rand(this.props.minNumber, leftNum)  
    let answer = leftNum - rightNum
    return this.createEquation(leftNum, rightNum, answer, c.operations.SUBTRACTION)
  }

  multiplicationMethod(){
    let leftNum = rand(this.props.minNumber, this.props.maxNumber)
    let rightNum = rand(this.props.minNumber, this.props.maxNumber)
    let answer = leftNum * rightNum
    return this.createEquation(leftNum, rightNum, answer, c.operations.MULTIPLICATION)
  }

  divisionMethod(){
    let divisor = rand(this.props.minNumber, this.props.maxNumber)
    let answer = rand(this.props.minNumber, this.props.maxNumber)
    let dividend = divisor * answer
    return this.createEquation(dividend, divisor, answer, c.operations.DIVISION)
  }

  createEquation(left, right, answer, operator){
    if(Math.random() > 0.5){
      return <span><span className='empty-square'></span>{ ' ' + operator + ' ' + right + ' = ' + answer }</span>
    }
    else{
      return <span>{ left + ' ' + operator + ' '}<span className='empty-square'></span>{ ' = ' + answer }</span>
    }
  }

  createLine(ind){
    let operationFunctions = {}
    operationFunctions[c.operations.ADDITION] = this.additionMethod
    operationFunctions[c.operations.SUBTRACTION] = this.subtractionMethod
    operationFunctions[c.operations.MULTIPLICATION] = this.multiplicationMethod
    operationFunctions[c.operations.DIVISION] = this.divisionMethod
    return (
      <React.Fragment key={ ind }>
        {
          (operationFunctions[rand(this.props.operations)] || this.additionMethod).apply(this) 
        }
        <br/>
      </React.Fragment>
    )
  }

  render(){
    return (
      <div className="missing-numbers">
        { doTimes(3, (i) => this.createLine(i) ) }
      </div>
    )
  }
}

MissingNumbersGenerator.defaultProps = defaultProps

class MissingNumbersEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 12) }
        <br/>
        <label>Included Operations:</label>
        <br/>
        <CheckboxSet value={ this.state.operations } options={ c.operationsWithLabels } onChange={ (val) => this.handleCheckboxSetChange('operations', val) }></CheckboxSet>
      </div>
    )
  }
}

MissingNumbersEditor.defaultProps = defaultProps

const MissingNumbers = {
  name: 'missingNumbers',
  title: 'Missing Numbers',
  description: 'Fill in the missing numbers to complete the equation.',
  difficultyLevel:3,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: MissingNumbersGenerator,
  editor: MissingNumbersEditor,
}

module.exports = MissingNumbers