import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: -5,
  maxNumber: 5,
}

class NumberLineGenerator extends React.Component {  

  render(){
    let operation = rand([c.operations.ADDITION, c.operations.SUBTRACTION]);
    let left = rand(this.props.minNumber, this.props.maxNumber);
    let right = rand(0, this.props.maxNumber);

    let answer;
    if(operation === c.operations.ADDITION){
      answer = left + right;
    }
    else{
      answer = left - right;
    }

    let minPoint = Math.min(left, answer) - 2;
    let maxPoint = Math.max(left, answer) + 2;

    let line = {
      top:'',
      bottom:'',
    };

    function addPoint(point){
      
      if(String(point).length === 1){
        line.top += '\xA0' + point;
      }
      else{
        line.top += point;
      }
      line.bottom += '_|_';  
    }

    function addBreak(){
      line.top += '\xA0\xA0\xA0';
      line.bottom += '__'; 
    }

    for(let i = minPoint; i < maxPoint; i++){
      addPoint(i);
      addBreak();
    }
    addPoint(maxPoint);

    return (
      <div className="number-line">
        { left + ' ' + operation + ' ' + right + ' ' + '= ' }
        <br/>
        <br/>
        <div className="line">
          { line.top }
          <br/>
          { line.bottom }
          <br/>
        </div>
      </div>
    )
  }
}

NumberLineGenerator.defaultProps = defaultProps

class NumberLineEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(-8, 0, 0, 8) }
      </div>
    )
  }
}

NumberLineEditor.defaultProps = defaultProps

const NumberLine = {
  name: 'numberLine',
  title: 'Number Line',
  description: 'Learn about positive and negative numbers with the visual aid of the number line.',
  difficultyLevel:4,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: NumberLineGenerator,
  editor: NumberLineEditor,
}

module.exports = NumberLine