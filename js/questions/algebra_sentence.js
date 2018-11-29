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
        { name1 } has <strong>{ leftNum }</strong> { apples(leftNum) } <strong>{ comparator}</strong> than { name2 }.  { name2 } has <strong>{ rightNum }</strong> { apples(rightNum) }, how many does { name1 } have?
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
          { name2 } has { d1 } { apples(d1) } fewer than { name3 }, but { d2 } more than { name1 }.  { name3 } has { num3 } apples. How many apples does everybody else have?
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
          { name1 } has { mult } as many apples as { name2 }.  { name2 } has { d1 } { apples(d1) } fewer than { name3 }, who has { num2 } apples. How many apples does everybody else have?
        </React.Fragment>
      )
    }
    return rand([med1, med2])()
  }

  hard(){
    return 'hard'
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