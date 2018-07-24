import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: 1,
  maxNumber: 12,
}

const BASE = 5;

class ArithmeticPyramidGenerator extends React.Component {

  render(){

    let min = this.props.minNumber
    let max = this.props.maxNumber

    function table(n, blank = true){
      return (
        <div className="arithmetic-pyramid-row" key={ n }>
          <table key={ n }>
            <tbody>
              <tr>
                {
                  doTimes(n, (i) => {
                    return <React.Fragment key={ i }>
                      <td className='num'>{ num(blank) }</td>
                      <td>{ op()}</td>    
                    </React.Fragment>
                  })
                }
                <td className='num'>{ num(blank) }</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }

    function op(){
      return rand(['+', '-']);
    }

    function num(blank){
      if(blank){
        return '\xA0'
      }
      return rand(min, max);
    }

    return <div className="arithmetic-pyramid">
      {
        doTimes(BASE, (i) => {
          return table(i)
        })
      }
      { table(BASE, false) }
    </div>
  }
}

ArithmeticPyramidGenerator.defaultProps = defaultProps

class ArithmeticPyramidEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 16) }
      </div>
    )
  }
}

ArithmeticPyramidEditor.defaultProps = defaultProps

const ArithmeticPyramid = {
  name: 'arithmeticPyramid',
  title: 'Arithmetic Pyramid',
  difficultyLevel: 3,
  description: 'Practise arithmetic by adding and subtracting numbers to get to the top.',
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: ArithmeticPyramidGenerator,
  editor: ArithmeticPyramidEditor,
}

module.exports = ArithmeticPyramid