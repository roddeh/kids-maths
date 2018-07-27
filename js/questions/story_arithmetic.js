import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import plural from '../utils/plural'
import QuestionEditor from '../question_editor'
import CheckboxSet from '../checkbox_set'

const ADDITION = '+'
const SUBTRACTION = '-'
const MULTIPLICATION = String.fromCodePoint(215)
const DIVISION = String.fromCodePoint(0x00F7)

const defaultProps = {
  childsName: 'Yugo',
  minNumber: 1,
  maxNumber: 12,
  operations: [ADDITION]
}

function prepareAdditionNumbers(){
  return [
    rand(this.props.minNumber, this.props.maxNumber),
    rand(this.props.minNumber, this.props.maxNumber),
  ]
}

function prepareSubtractionNumbers(){
  let leftNum = rand(this.props.minNumber, this.props.maxNumber)
  let rightNum = rand(this.props.minNumber, leftNum)
  return [leftNum, rightNum]
}

function prepareMultiplicationNumbers(){
  return prepareAdditionNumbers.apply(this)
}

function prepareDivisionNumbers(){
  let divisor = rand(2, this.props.maxNumber);
  let answer = rand(2, this.props.maxNumber);
  let leftNum = divisor * answer;
  let rightNum = divisor;
  return [leftNum, rightNum]
}

// ADDITION

function additionAppleStory(leftNum, rightNum){
  return (
    <React.Fragment>
      { this.props.childsName } has <strong>{ leftNum }</strong> { plural(leftNum, 'apple', 'apples') } but then he buys <strong>{ rightNum }</strong> more { plural(rightNum, 'apple.', 'apples.') } How many apples does { this.props.childsName } have now?
    </React.Fragment>
  )
}

function additionGuppyStory(leftNum, rightNum){
  return (
    <React.Fragment>
      { this.props.childsName } has <strong>{ leftNum }</strong> pet { plural(leftNum, 'guppy.', 'guppies.') } Then <strong>{ rightNum }</strong> baby { plural(rightNum, 'guppy was ', 'guppies were') } born. How many guppies does { this.props.childsName } have now?
    </React.Fragment>
  )
}

function subtractionAppleStory(leftNum, rightNum){
  return (
    <React.Fragment>
      { this.props.childsName } has <strong>{ leftNum }</strong> { plural(leftNum, 'apple', 'apples') } but then he eats <strong>{ rightNum }</strong> { plural(rightNum, 'apple.', 'apples.') } How many apples does { this.props.childsName } have left?
    </React.Fragment>
  )
}

function subtractionSharkStory(leftNum, rightNum){
  return (
    <React.Fragment>
      There { plural(leftNum, 'was', 'were') } <strong>{ leftNum }</strong> fish in the ocean. Then a shark ate <strong>{ rightNum }</strong> of them. How many fish were left in the ocean.
    </React.Fragment>
  )
}

function multiplicationAppleStory(leftNum, rightNum){
  return (
    <React.Fragment>
      { this.props.childsName } has <strong>{ leftNum }</strong> { plural(leftNum, 'bag', 'bags') } of apples. Each bag has <strong>{ rightNum }</strong> { plural(rightNum, 'apple', 'apples') } inside. How many apples does { this.props.childsName } have?
    </React.Fragment>
  )
}

function multiplicationTrainStory(leftNum, rightNum){
  return (
    <React.Fragment>
      There { plural(leftNum, 'is', 'are') } <strong>{ leftNum }</strong> { plural(leftNum, 'train', 'trains') } in the station. Each train has <strong>{ rightNum }</strong> { plural(rightNum, 'carriage.', 'carriages.') } How many carriages all together?
    </React.Fragment>
  )
}

function divisionAppleStory(leftNum, rightNum){
  return (
    <React.Fragment>
      { this.props.childsName } has <strong>{ leftNum }</strong> { plural(leftNum, 'apple', 'apples') }. { this.props.childsName } wants to share the apples equally with their <strong>{ rightNum }</strong> { plural(rightNum, 'friend', 'friends') }. How many apples does each friend get?
    </React.Fragment>
  )
}


function divisionTrainStory(leftNum, rightNum){
  return (
    <React.Fragment>
      There are <strong>{ leftNum }</strong> { plural(leftNum, 'carriage', 'carriages') } waiting to depart. There are <strong>{ rightNum }</strong> diesel engines ready to pull the { plural(leftNum, 'carriage', 'carriages') }. How many carriages should each diesel engine pull?
    </React.Fragment>
  )
}

let operationStories = {}

operationStories[ADDITION] = {
  prepare:prepareAdditionNumbers,
  stories:[
    additionAppleStory,
    additionGuppyStory,
  ]
}

operationStories[SUBTRACTION] = {
  prepare:prepareSubtractionNumbers,
  stories:[
    subtractionAppleStory,
    subtractionSharkStory,
  ]
}

operationStories[MULTIPLICATION] = {
  prepare:prepareMultiplicationNumbers,
  stories:[
    multiplicationAppleStory,
    multiplicationTrainStory,
  ]
}

operationStories[DIVISION] = {
  prepare:prepareDivisionNumbers,
  stories:[
    divisionAppleStory,
    divisionTrainStory,
  ]
}

class StoryArithmeticGenerator extends React.Component {

  render(){
    let operations = this.props.operations.map((o) => {
      return operationStories[o]
    })

    let operation = rand(operations)
    if(!operation){
      operation = operationStories[ADDITION]
    }

    let [leftNum, rightNum] = operation.prepare.apply(this)
    let story = rand(operation.stories)

    return (
      <div className='story-arithmetic text-question'>
        { story.apply(this, [leftNum, rightNum]) }
      </div>
    )
  }
}

StoryArithmeticGenerator.defaultProps = defaultProps

class StoryArithmeticEditor extends QuestionEditor {

  render(){
    let options = [
      {label:'Addition', value:ADDITION},
      {label:'Subtraction', value:SUBTRACTION},
      {label:'Multiplication', value:MULTIPLICATION},
      {label:'Division', value:DIVISION},
    ]
    return (
      <div className='editor-form'>
        <label>Child's Name:</label>
        <input type='text' name='childsName' value={ this.state.childsName } onChange={ this.handleTextInputChange }></input>
        <br/>
        { this.renderMinMaxRange(1, 5, 5, 12) }
        <br/>
        <label>Included Operations:</label>
        <br/>
        <CheckboxSet value={ this.state.operations } options={ options } onChange={ (val) => this.handleCheckboxSetChange('operations', val) }></CheckboxSet>
      </div>
    )
  }
}

StoryArithmeticEditor.defaultProps = defaultProps

const StoryArithmetic = {
  name: 'storyArithmetic',
  title: 'Story Arithmetic',
  description: 'Practise arithmetic in the context of a mini story.',
  difficultyLevel:2,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: StoryArithmeticGenerator,
  editor: StoryArithmeticEditor,
}

module.exports = StoryArithmetic