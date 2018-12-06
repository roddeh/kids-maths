import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {}

const VARIABLES = ['a', 'b', 'c', 'x', 'y'];

class SingleVariableAlgebraGenerator extends React.Component {

  render(){
    let multiplier = rand(2, 8);
    let variable = rand(2, 8);
    let modifier = rand(1, 9);

    let modifierSymbol = rand([c.operations.ADDITION, c.operations.SUBTRACTION]);
    let variableSymbol = rand(VARIABLES);

    let answer = multiplier * variable;
    if(modifierSymbol === c.operations.ADDITION){
      answer += modifier
    }
    else{
      answer -= modifier;
    }

    let left =  multiplier + variableSymbol + ' ' + modifierSymbol + ' ' + modifier;

    return (
      <div className="single-variable-algebra">
        { left + ' = ' + answer }
        <br/>
        { doTimes(left.length, () => '\xA0').join('') + ' = ' + doTimes(String(answer).length, () => '\xA0').join('') }
        <br/>
        { doTimes(left.length, () => '\xA0').join('') + ' = ' + doTimes(String(answer).length, () => '\xA0').join('') }
      </div>
    )
  }
}

SingleVariableAlgebraGenerator.defaultProps = defaultProps

class SingleVariableAlgebraEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'></div>
    )
  }
}

SingleVariableAlgebraEditor.defaultProps = defaultProps

const SingleVariableAlgebra = {
  name: 'singleVariableAlgebra',
  title: 'Single Variable Algebra',
  description: 'Learn the concepts of algebra by balancing each side of the equation.',
  difficultyLevel:11,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: SingleVariableAlgebraGenerator,
  editor: SingleVariableAlgebraEditor,
}

module.exports = SingleVariableAlgebra