import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: 1,
  maxNumber: 8,
}

class MultiplicationSquaresGenerator extends React.Component {

  render(){
    return (
      <div className='multiplication-squares'>
        <table>
          <tbody>
            <tr>
              <td className='multiplication-symbol'>{ String.fromCodePoint(215) }</td>
              <td className='top-number'>___</td>
              <td className='equals-symbol' rowSpan='2'>=</td>
            </tr>
            <tr>
              <td className='left-number'>___</td>
              <td className='blocks-cell'>
                { this.makeBlockTable(rand(this.props.minNumber, this.props.maxNumber), rand(this.props.minNumber, this.props.maxNumber)) }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  makeBlockTable(left, top){
    return (
      <table className='blocks'>
        <tbody>
          {
            doTimes(left, (i) => {
              return (
                <tr key={ i }>
                  {
                    doTimes(top, (j) => {
                      return (
                        <td key={ j }></td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}

MultiplicationSquaresGenerator.defaultProps = defaultProps

class MultiplicationSquaresEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 12) }
      </div>
    )
  }
}

MultiplicationSquaresEditor.defaultProps = defaultProps

const MultiplicationSquares = {
  name: 'multiplicationSquares',
  title: 'Multiplication Squares',
  description: 'Visualise multiplication with a grid of squares',
  difficultyLevel:4,
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: MultiplicationSquaresGenerator,
  editor: MultiplicationSquaresEditor,
}

module.exports = MultiplicationSquares
