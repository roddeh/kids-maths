import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  
}

class NumberBreakdown2Generator extends React.Component {

  render(){
    let num = String(rand(1000, 9999)).split('')


    return (
      <div className='number-breakdown-2'>
        <p className='num'>{ num }</p>
        <p>
          <span>&nbsp;</span> thousands
        </p>
        <p>
          <span>&nbsp;</span> hundreds
        </p>
        <p>
          <span>&nbsp;</span> tens
        </p>
        <p>
          <span>&nbsp;</span> ones
        </p>

      </div>
    )
  }
}

NumberBreakdown2Generator.defaultProps = defaultProps

class NumberBreakdown2Editor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        
      </div>
    )
  }
}

NumberBreakdown2Editor.defaultProps = defaultProps

const NumberBreakdown2 = {
  name: 'numberBreakdown2',
  title: 'Number Breakdown 2',
  description: 'Learn about breaking numbers down into units, tens, hundreds etc.',
  difficultyLevel:3,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: NumberBreakdown2Generator,
  editor: NumberBreakdown2Editor,
}

module.exports = NumberBreakdown2