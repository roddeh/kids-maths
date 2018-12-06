import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'
import CheckboxSet from '../checkbox_set'

const defaultProps = {
  minNumber: 1,
  maxNumber: 12,
  operations: [c.operations.ADDITION],
  inverseMode: false,
}

const BASE = 5;

class ArithmeticPyramidGenerator extends React.Component {

  render(){

    let min = this.props.minNumber
    let max = this.props.maxNumber
    let ops = this.props.operations
    if(ops.length === 0){
      ops = [c.operations.ADDITION]
    }

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
      return rand(ops)
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
    let options = [
      {label:'Addition', value: c.operations.ADDITION},
      {label:'Subtraction', value: c.operations.SUBTRACTION},
    ]
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 16) }
        <br/>
        <label>Included Operations:</label>
        <br/>
        <CheckboxSet value={ this.state.operations } options={ options } onChange={ (val) => this.handleCheckboxSetChange('operations', val) }></CheckboxSet>        
        <label>Inverse Mode:</label>
        <input type='checkbox' name='inverseMode' defaultChecked={ this.state.inverseMode } onChange={ this.handleCheckboxChange }></input>
      </div>
    )
  }
}

ArithmeticPyramidEditor.defaultProps = defaultProps

const ArithmeticPyramid = {
  name: 'arithmeticPyramid',
  title: 'Arithmetic Pyramid',
  difficultyLevel: 5,
  description: 'Practise arithmetic by adding and subtracting numbers to get to the top.',
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: ArithmeticPyramidGenerator,
  editor: ArithmeticPyramidEditor,
}

module.exports = ArithmeticPyramid