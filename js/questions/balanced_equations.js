import React from 'react'
import c from '../constants'  
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'
import CheckboxSet from '../checkbox_set'

const defaultProps = {
  operations: c.operationsArray
}

class BalancedEquationsGenerator extends React.Component {


  makeEquation(i){

    

    function addition(result){
      let left
      let right
      if(isNaN(result)){
        left = rand(0, 12)
        right = rand(0, 12)
        result = left + right
      }
      else{
        left = rand(0, result)
        right = result - left
      }
      return {left, right, symbol: c.operations.ADDITION, result}
    }


    function subtraction(result){
      let left
      let right
      if(isNaN(result)){
        left = rand(0, 12)
        right = rand(0, left)
        result = left - right
      }
      else{
        right = rand(0, result)
        left = result + right
      }
      return {left, right, symbol: c.operations.SUBTRACTION, result}
    }

    function multiplication(){
      let left = rand(1, 6)
      let right = rand(1, 6)
      let result = left * right
      return {left, right, symbol: c.operations.MULTIPLICATION, result}
    }

    function divison(){
      let right = rand(1, 6)
      let result = rand(1, 6)
      let left = right * result      
      return {left, right, symbol: c.operations.DIVISION, result}
    }

    function renderEquation(eq, replace){
      if(replace || Math.random() < 0.2){
        if(Math.random() > 0.5){
          return <React.Fragment>{ eq.left + ' ' + eq.symbol + ' '}<span className='empty-square'></span></React.Fragment>
        }
        else{
          return <React.Fragment><span className='empty-square'></span>{ ' ' + eq.symbol + ' ' + eq.right}</React.Fragment>
        }
      }
      else{
        return eq.left + ' ' + eq.symbol + ' ' + eq.right
      }
    }


    let methods = {}
    methods[c.operations.ADDITION] = addition
    methods[c.operations.SUBTRACTION] = subtraction
    methods[c.operations.MULTIPLICATION] = multiplication
    methods[c.operations.DIVISION] = divison

    let ops = this.props.operations.slice()
    // Ensure that addition is always there.  We will need it to balance the multiplication and/or divison.
    if(ops.indexOf(c.operations.ADDITION) === -1){
      ops.push(c.operations.ADDITION)
    }


    let leftMethods = ops.map((op) => methods[op])
    let rightMethods = ops.filter((op) => op === c.operations.ADDITION || op === c.operations.SUBTRACTION)
      .map((op) => methods[op])


    let left = rand(leftMethods)()
    let right = rand(rightMethods)(left.result)
    let replaceLeft = Math.random() > 0.5

    console.log(left.result, right.result)

    return (
      <div key={ i }>
        { renderEquation(left, replaceLeft) } 
        { ' = ' }
        { renderEquation(right, !replaceLeft) } 
      </div>
    )
  }

  render(){
    return (
      <div className='balanced-equations'>
        {
          doTimes(3, this.makeEquation, this)
        }
      </div>
    )
  }
}

BalancedEquationsGenerator.defaultProps = defaultProps

class BalancedEquationsEditor extends QuestionEditor {
  render(){
    return (
      <div className='editor-form'>
        <CheckboxSet value={ this.state.operations } options={ c.operationsWithLabels } onChange={ (val) => this.handleCheckboxSetChange('operations', val) }></CheckboxSet>     
      </div>
    )
  }
}

BalancedEquationsEditor.defaultProps = defaultProps

const BalancedEquations = {
  name: 'balancedEquations',
  title: 'Balanced Equations',
  description: 'Reenforce the meaning of the equals symbol by balancing each side of simple equations.',
  difficultyLevel:4,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: BalancedEquationsGenerator,
  editor: BalancedEquationsEditor,
}

module.exports = BalancedEquations