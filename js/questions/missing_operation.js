import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'
import CheckboxSet from '../checkbox_set'

const ADDITION = '+'
const SUBTRACTION = '-'
const MULTIPLICATION = String.fromCodePoint(215)
const DIVISION = String.fromCodePoint(0x00F7)

const defaultProps = {
  minNumber: 1,
  maxNumber: 12,
  operations:[ADDITION, SUBTRACTION, DIVISION, MULTIPLICATION]
}

class MissingOperationGenerator extends React.Component {

  additionMethod(){
    let leftNum = rand(this.props.minNumber, this.props.maxNumber)
    let rightNum = rand(this.props.minNumber, this.props.maxNumber)
    let answer = leftNum + rightNum
    return leftNum + ' _ ' + rightNum + ' = ' + answer
  }

  subtractionMethod(){
    let leftNum = rand(this.props.minNumber, this.props.maxNumber)
    let rightNum = rand(this.props.minNumber, leftNum)  
    let answer = leftNum - rightNum
    return leftNum + ' _ ' + rightNum + ' = ' + answer 
  }

  multiplicationMethod(){
    let leftNum = rand(this.props.minNumber, this.props.maxNumber)
    let rightNum = rand(this.props.minNumber, this.props.maxNumber)
    let answer = leftNum * rightNum
    return leftNum + ' _ ' + rightNum + ' = ' + answer
  }

  divisionMethod(){
    let divisor = rand(this.props.minNumber, this.props.maxNumber)
    let answer = rand(this.props.minNumber, this.props.maxNumber)
    let dividend = divisor * answer
    return dividend + ' _ ' + divisor + ' = ' + answer
  }

  createLine(ind){
    let operationFunctions = {}
    operationFunctions[ADDITION] = this.additionMethod
    operationFunctions[SUBTRACTION] = this.subtractionMethod
    operationFunctions[MULTIPLICATION] = this.multiplicationMethod
    operationFunctions[DIVISION] = this.divisionMethod
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
     let options = [
      {label:'Addition', value:ADDITION},
      {label:'Subtraction', value:SUBTRACTION},
      {label:'Multiplication', value:MULTIPLICATION},
      {label:'Division', value:DIVISION},
    ]
    return (
      <div className='editor-form'>
        <label>Min Number:</label>
        <input type='range' name='minNumber' min='1' max='5' step='1' value={ this.state.minNumber } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.minNumber }</label>
        <br/>
        <label>Max Number:</label>
        <input type='range' name='maxNumber' min='1' max='5' step='1' value={ this.state.maxNumber } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.maxNumber }</label>
        <br/>
        <label>Included Operations:</label>
        <br/>
        <CheckboxSet value={ this.state.operations } options={ options } onChange={ (val) => this.handleCheckboxSetChange('operations', val) }></CheckboxSet>
      </div>
    )
  }
}

MissingOperationEditor.defaultProps = defaultProps

const MissingOperation = {
  name: 'missingOperation',
  title: 'Missing Operation',
  description: 'Fill in the missing operation to complete the equation.',
  difficultyLevel:2,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: MissingOperationGenerator,
  editor: MissingOperationEditor,
}

module.exports = MissingOperation