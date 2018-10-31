import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import shuffle from '../utils/shuffle'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: 6,
  maxNumber: 8,
}

const SHAPES = [
  `
    00011
    22333
    24445
    67775
    66888
  `,
  `
    01112
    03442
    03345
    66655
    77888
  `,
  `
    00111
    20344
    22355
    66375
    68877
  `
]

const MAX_SHAPE_NUM = 8
const TABLE_SIZE = 5

class FindToAddGenerator extends React.Component {

  render(){
    let answer = rand(this.props.minNumber, this.props.maxNumber)

    function makeCombos(answer, size){
      let combos = []
      for(let i = 0; i < size - 1; i++){
        let x = rand(0, answer)
        combos.push(x)
        answer -= x
      }
      combos.push(answer)
      return [combos]
    }


    function makeTwoCombos(answer){
      let combos = []
      for(let i = 0; i <= answer / 2; i++){
        combos.push([answer - i, i])
      }
      return combos
    }

    function makeThreeCombos(answer){
      let combos = []
      let twoCombos = makeTwoCombos(answer)
      twoCombos.forEach((two) => {
        let a = two[0]
        let temp = makeTwoCombos(two[1])
        temp.forEach((t) => {
          combos.push([a, t[0], t[1]])
        })
      })
      return combos
    }

    function clearWhite(input){
      return input.split('')
        .filter((c) => {
          return !isNaN(parseInt(c))
        })
        .join('')
    }

    function determineLengths(shape){
      let counts = []
      shape.split('').forEach((c) => {
        c = parseInt(c)
        let v = counts[parseInt(c)]
        counts[c] = v + 1 || 1
      })
      return counts
    }

    function getSums(lengths, combos){
      return lengths.map((l) => {
        return shuffle(rand(combos[l]))
      })
    }

    function getTable(shape){
      let table = []
      for(let i = 0; i < TABLE_SIZE * TABLE_SIZE; i++){
        let c = i % TABLE_SIZE
        let r = Math.floor(i / TABLE_SIZE)
        if(c === 0){
          table[r] = []
        }
        table[r][c] = parseInt(shape.charAt(i))
      }
      return table
    }

    let combinations = {}
    combinations['2'] = makeTwoCombos(answer)
    combinations['3'] = makeThreeCombos(answer)

    let shape = clearWhite(rand(SHAPES))
    let lengths = determineLengths(shape)
    let sums = getSums(lengths, combinations)
    let table = getTable(shape)

    return (
      <div className='find-to-add'>
        <p>Circle groups of numbers that sum to { answer }</p>
        <table>
          <tbody>
            {
              table.map((row, i ) => {
                return (
                  <tr key={ i }>
                    {
                      row.map((col, j) => {
                        return (<td key={ j }>{ sums[col].pop() }</td>)
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

FindToAddGenerator.defaultProps = defaultProps

class FindToAddEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Maximum Number:</label>
        { this.renderMinMaxRange(4, 8, 8, 16) }
      </div>
    )
  }
}

FindToAddEditor.defaultProps = defaultProps

const FindToAdd = {
  name: 'findToAdd',
  title: 'Find to Add',
  description: 'Practise addition by circling the groups of numbers that add to a specified total.',
  difficultyLevel:3,
  layoutType: c.questionShapes.TALL_RECT,
  generator: FindToAddGenerator,
  editor: FindToAddEditor,
}

module.exports = FindToAdd