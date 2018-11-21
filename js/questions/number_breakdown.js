import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  
}

class NumberBreakdownGenerator extends React.Component {

  render(){
    let num = String(rand(1000, 9999)).split('')

    function makeRow(n, i){
      return (
        <tr key={ i }>
          <td className='sum'>{ n } &times; { Math.pow(10, 3 - i) } =</td>
          {
            doTimes(4, (j) => {
              let content = i <= j ? '\xA0' : '0'
              return (
                <td key={ j }>{content}</td>
              )
            })
          }
        </tr>
      )
    }


    return (
      <div className='number-breakdown'>
        <table>
          <tbody>
            {
              num.map(makeRow)
            }
            <tr className='final-sum'>
              <td className='sum'>+</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

NumberBreakdownGenerator.defaultProps = defaultProps

class NumberBreakdownEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        
      </div>
    )
  }
}

NumberBreakdownEditor.defaultProps = defaultProps

const NumberBreakdown = {
  name: 'numberBreakdown',
  title: 'Number Breakdown',
  description: 'Learn about breaking numbers down into units, tens, hundreds etc.',
  difficultyLevel:3,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: NumberBreakdownGenerator,
  editor: NumberBreakdownEditor,
}

module.exports = NumberBreakdown