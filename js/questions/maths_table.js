import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import shuffle from '../utils/shuffle'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const ADDITION = '+'
const MULTIPLICATION = String.fromCodePoint(215)
const NUM_COLS = 5

const defaultProps = {
  rowMinimum: 1,
  rowMaximum: 12,
  colMinimum: 1,
  colMaximum: 12,
  operation: ADDITION,
}

class MathsTableGenerator extends React.Component {

  prepareNumbers(min, max){
    let numbers = [];
    doTimes(max - min + 1, (i) => {
      numbers.push(min + i)
    })
    // This protects the case when the user enters nonsensical min/max
    while(numbers.length < NUM_COLS){
      numbers.push(max)
    }
    return numbers;
  }

  render(){
    let xNumbers = this.prepareNumbers(this.props.rowMinimum, this.props.rowMaximum);
    let firstRow = shuffle(xNumbers).slice(0, NUM_COLS);
    firstRow.unshift(this.props.operation);
    let rows = [firstRow];

    let yNumbers = this.prepareNumbers(this.props.colMinimum, this.props.colMaximum);
    yNumbers = shuffle(yNumbers).slice(0, NUM_COLS);

    doTimes(NUM_COLS, (i) => {
      let cells = [yNumbers[i]];
      doTimes(NUM_COLS, () => cells.push('\xA0'));
      rows.push(cells);
    })

    return (
      <div className="maths-table">
        <table>
          <tbody>
            {
              rows.map((row, i) => {
                return (
                  <tr key={ i }>
                    {
                      row.map((cell, j) => {
                        return <td key={ j }> { cell } </td>
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

MathsTableGenerator.defaultProps = defaultProps

class MathsTableEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Row Minimum:</label>
        <input type='range' name='rowMinimum' min='1' max='12' step='1' value={ this.state.rowMinimum } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.rowMinimum }</label>
        <br/>
        <label>Row Maximum:</label>
        <input type='range' name='rowMaximum' min='1' max='12' step='1' value={ this.state.rowMaximum } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.rowMaximum }</label>
        <br/>
        <label>Column Minimum:</label>
        <input type='range' name='colMinimum' min='1' max='12' step='1' value={ this.state.colMinimum } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.colMinimum }</label>
        <br/>
        <label>Column Maximum:</label>
        <input type='range' name='colMaximum' min='1' max='12' step='1' value={ this.state.colMaximum } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.colMaximum }</label>
        <br/>
        <label>Operation:</label>
        <select name='operation' value={ this.state.operation } onChange={ this.handleSelectChange }>
          <option value={ ADDITION }>Addition</option>
          <option value={ MULTIPLICATION }>Multiplication</option>
        </select>
      </div>
    )
  }
}

MathsTableEditor.defaultProps = defaultProps

const MathsTable = {
  name: 'mathsTable',
  title: 'Maths Table',
  description: 'Practice addition and multiplication in a table layout',
  difficultyLevel:3,
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: MathsTableGenerator,
  editor: MathsTableEditor,
}

module.exports = MathsTable