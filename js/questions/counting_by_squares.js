import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: 1,
  maxNumber: 8,
  maxMultiple:10,
}

class CountingBySquaresGenerator extends React.Component {

  render(){
    function makeBlockTable(rows, cols){
      return (
        <table className='blocks'>
          <tbody>
          {
            doTimes(rows, (i) => {
              return (
                <tr key={ i }>
                  {
                    doTimes(cols, (j) => {
                      return <td key={ j }></td>
                    })
                  }
                  <td className="equals">=</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      )
    }

    return (
      <div className="counting-by-squares">
        { makeBlockTable(this.props.maxMultiple, rand(this.props.minNumber, this.props.maxNumber)) }
      </div>
    )
  }
}

CountingBySquaresGenerator.defaultProps = defaultProps

class CountingBySquaresEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 12) }
        <br/>
        <label>Max multiple:</label>
        <input type='range' name='maxMultiple' min='5' max='12' step='1' value={ this.state.maxMultiple } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.maxMultiple }</label>
      </div>
    )
  }
}

CountingBySquaresEditor.defaultProps = defaultProps

const CountingBySquares = {
  name: 'countingBySquares',
  title: 'Counting by Squares',
  description: 'Teach the fundamentals of multiplication by counting up rows of squares.',
  difficultyLevel:4,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: CountingBySquaresGenerator,
  editor: CountingBySquaresEditor,
}

module.exports = CountingBySquares