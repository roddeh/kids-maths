import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import shuffle from '../utils/shuffle'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: 1,
  maxNumber: 8,
  randomiseOrder: false,
}

class MultiplicationSetGenerator extends React.Component {

  render(){
    let content = []
    let multiple = rand(this.props.minNumber, this.props.maxNumber);
    let times = String.fromCodePoint(215)

    for(let i = 1; i <= 12; i++){
      content.push(`${ multiple } ${ times } ${ i }`);
    }

    let max = content[content.length - 1].length;
    if(this.props.randomiseOrder){
      content = shuffle(content);
    }

    content = content.map((c) => {
      if(c.length === max){
        return c + '\xA0=';
      }
      else{
        return c + '\xA0\xA0='; 
      }
    })

    return (
      <div className="multiplication-set">
        { 
          content.map((cont, i ) => {
            return <React.Fragment key={ i }>{ cont }<br/></React.Fragment>
          })
        }
      </div>
    )
  }
}

MultiplicationSetGenerator.defaultProps = defaultProps

class MultiplicationSetEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 16) }
        <br/>
        <label>Randomise Order:</label>
        <input type='checkbox' name='randomiseOrder' defaultChecked={ this.state.randomiseOrder } onChange={ this.handleCheckboxChange }></input>
      </div>
    )
  }
}

MultiplicationSetEditor.defaultProps = defaultProps

const MultiplicationSet = {
  name: 'multiplicationSet',
  title: 'Multiplication Set',
  description: 'Practise multiplication with simple drills',
  difficultyLevel:4,
  layoutType: c.questionShapes.TALL_RECT,
  generator: MultiplicationSetGenerator,
  editor: MultiplicationSetEditor,
}

module.exports = MultiplicationSet