import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import shuffle from '../utils/shuffle'
import QuestionEditor from '../question_editor'

const defaultProps = {
  childsName: 'Yugo',
}

const THINGS = ['apples', 'bananas', 'oranges', 'mangoes', 'watermelons']
const DENOMINATIONS = [5, 10, 20, 50]

class MoneyMathGenerator extends React.Component {

  render(){
    let minQuantity = 2;
    let maxQuantity = 8;

    let things = shuffle(THINGS)
    let denominations = shuffle(DENOMINATIONS);

    return (
      <div className="money-math text-question">
        { this.props.childsName + ' ' } 
        wants to buy <strong>{ rand(minQuantity, maxQuantity) + ' ' + things[0] } </strong>
        for <strong>{ denominations[0] }c </strong>
        and <strong>{ rand(minQuantity, maxQuantity) + ' ' + things[1] } </strong>
        for <strong>{ denominations[1] }c, </strong>
        how much money does { this.props.childsName } need?
    </div>
    )
  }
}

MoneyMathGenerator.defaultProps = defaultProps

class MoneyMathEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Child's Name:</label>
        <input type='text' name='childsName' value={ this.state.childsName } onChange={ this.handleTextInputChange }></input>
      </div>
    )
  }
}

MoneyMathEditor.defaultProps = defaultProps

const MoneyMath = {
  name: 'moneyMath',
  title: 'Money Math',
  description: 'Learn the basics of money based arithmetic combining multiplication and addition',
  difficultyLevel:7,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: MoneyMathGenerator,
  editor: MoneyMathEditor,
}

module.exports = MoneyMath