import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import plural from '../utils/plural'
import QuestionEditor from '../question_editor'

const EASY = 0
const MEDIUM = 1
const HARD = 2

const defaultProps = {
  difficulty: EASY,
  name1:'Jane',
  name2:'Bill',
  name3:'Kate'
}

function apples(num){
  return plural(num, 'apple', 'apples')
}

class TemplateGenerator extends React.Component {

  easy(){
    let name1 = this.props.name1
    let name2 = this.props.name2

    let leftNum = rand(1, 10)
    let rightNum = rand(leftNum, 10)
    let comparator = rand(['more', 'fewer'])
    
    return (
      <React.Fragment>
        { name1 } has <strong>{ leftNum }</strong> { apples(leftNum) } <strong>{ comparator}</strong> than { name2 }.  { name2 } has <strong>{ rightNum }</strong> { apples(rightNum) }, how many apples does { name1 } have?
      </React.Fragment>
    )
  }

  medium(){
    let name1 = this.props.name1
    let name2 = this.props.name2
    let name3 = this.props.name3

    function med1(){
      let num1 = rand(1, 10)
      let num2 = num1 + rand(1, 5)
      let num3 = num2 + rand(1, 5)
      let d1 = num3 - num2
      let d2 = num2 - num1
      return (
        <React.Fragment>
          { name2 } has <strong>{ d1 }</strong> { apples(d1) } <strong>fewer</strong> than { name3 }, but <strong>{ d2 } more</strong> than { name1 }.  { name3 } has <strong>{ num3 }</strong> apples. How many apples does each person have?
        </React.Fragment>
      )
    }

    function med2(){
      let num1 = rand(1, 5)
      let num2 = num1 + rand(1, 5)
      let d1 = num2 - num1
      let mult = rand(['twice', 'three times', 'four times'])
      return (
        <React.Fragment>
          { name1 } has <strong>{ mult }</strong> as many apples as { name2 }.  { name2 } has <strong>{ d1 }</strong> { apples(d1) } <strong>fewer</strong> than { name3 }, who has <strong>{ num2 }</strong> apples. How many apples does each person have?
        </React.Fragment>
      )
    }
    return rand([med1, med2])()
  }

  hard(){
    let name1 = this.props.name1
    let name2 = this.props.name2
    let name3 = this.props.name3

    function hard1(){
      let num1 = rand(1, 10)
      let num2 = num1 + rand(1, 10)

      let d = num2 - num1
      let s = num2 + num1

      return (
        <React.Fragment>
          { name1 } has <strong>{ d } more</strong> { apples(d) } than { name2 }. { name3 } has as many apples as everybody else <strong>combined</strong>. { name3 } has <strong>{ s }</strong> apples.  How many apples does each person have?
        </React.Fragment>
      )
    }

    function hard2(){
      let num1 = rand(1, 4)
      let num2 = num1 * 2
      let mult = rand(2, 3)
      let num3 = num2 * mult
      let sum = num1 + num2 + num3
      let mText = ['twice', 'three times'][mult - 2]

      return (
        <React.Fragment>
          { name1 } has <strong>{ mText }</strong> as many apples as { name2 } and { name3 } <strong>combined</strong>. { name2 } has <strong>half</strong> as many apples as { name3 }. There are <strong>{ sum }</strong> apples all together.  How many apples does each person have?
        </React.Fragment>
      )
      
    }
    return rand([hard1, hard2])()
  }

  render(){

    let levels = []
    levels[EASY] = this.easy
    levels[MEDIUM] = this.medium
    levels[HARD] = this.hard

    return (
      <div className='algebra-sentence text-question'>
        {
          levels[this.props.difficulty].apply(this)
        }
        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}

TemplateGenerator.defaultProps = defaultProps

class TemplateEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Difficulty:</label>
        <select name='difficulty' value={ this.state.difficulty } onChange={ this.handleSelectChange }>
          <option value={ EASY }>Easy</option>
          <option value={ MEDIUM }>Medium</option>
          <option value={ HARD }>Hard</option>
        </select>
        <br/>
        <label>Child 1:</label>
        <input type='text' name='name1' value={ this.state.name1 } onChange={ this.handleTextInputChange }></input>
        <br/>
        <label>Child 2:</label>
        <input type='text' name='name2' value={ this.state.name2 } onChange={ this.handleTextInputChange }></input>
        <br/>
        <label>Child 3:</label>
        <input type='text' name='name3' value={ this.state.name3 } onChange={ this.handleTextInputChange }></input>
        <br/>
      </div>
    )
  }
}

TemplateEditor.defaultProps = defaultProps

const Template = {
  name: 'algebraSentence',
  title: 'Algebra Sentence',
  description: 'Practise the application of algebra by solving problems.',
  difficultyLevel:5,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: TemplateGenerator,
  editor: TemplateEditor,
}

module.exports = Template