import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'
import CheckboxSet from '../checkbox_set'

const defaultProps = {
  minNumber: 1,
  maxNumber: 12,
  operations: c.operationsArray
}

class MissingOperationGenerator extends React.Component {

  additionMethod(){
    let leftNum = rand(this.props.minNumber, this.props.maxNumber)
    let rightNum = rand(this.props.minNumber, this.props.maxNumber)
    let answer = leftNum + rightNum
    return this.renderLine(leftNum, rightNum, answer)
  }

  subtractionMethod(){
    let leftNum = rand(this.props.minNumber, this.props.maxNumber)
    let rightNum = rand(this.props.minNumber, leftNum)  
    let answer = leftNum - rightNum
    return this.renderLine(leftNum, rightNum, answer)
  }

  multiplicationMethod(){
    let leftNum = rand(this.props.minNumber, this.props.maxNumber)
    let rightNum = rand(this.props.minNumber, this.props.maxNumber)
    let answer = leftNum * rightNum
    return this.renderLine(leftNum, rightNum, answer)
  }

  divisionMethod(){
    let divisor = rand(this.props.minNumber, this.props.maxNumber)
    let answer = rand(this.props.minNumber, this.props.maxNumber)
    let dividend = divisor * answer
    return this.renderLine(dividend, divisor, answer)
  }

  renderLine(left, right, answer){
    return <React.Fragment>{ left + ' ' } <span className='empty-square'></span> { ' ' + right + ' = ' + answer }</React.Fragment>
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

MissingOperationGenerator.defaultProps = defaultProps

class MissingOperationEditor extends QuestionEditor {

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

MissingOperationEditor.defaultProps = defaultProps

const MissingOperation = {
  name: 'missingOperation',
  title: 'Missing Operation',
  description: 'Fill in the missing operation to complete the equation.',
  difficultyLevel:3,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: MissingOperationGenerator,
  editor: MissingOperationEditor,
}

module.exports = MissingOperation