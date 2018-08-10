import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: 2,
  maxNumber: 12,
}

let idCounter = 0
const SIZE = 150
// const BUFFER = 20

let POSITIONS = [
  [20, 20],
  [70, 60],
  [50, 90],
  [120, 120],
  [110, 30],
  [120, 80],
  [20, 110],
  [30, 50],
]


class FindMultiplesGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d')
    ctx.clearRect(0, 0, SIZE, SIZE)
    ctx.font = '20px monospace'


    POSITIONS.forEach((p) => {
      let multiplier = rand(this.props.minNumber, this.props.maxNumber)
      let number = multiplier * this.multiple  
      if(Math.random() > 0.5){
        number = multiplier * rand(this.props.minNumber, this.props.maxNumber)
      }
      ctx.fillText(number, p[0], p[1])  
    })
    


    // let taken = []

    // doTimes(7, () => {
    //   let multiplier = rand(this.props.minNumber, this.props.maxNumber)
    //   let number = multiplier * this.multiple  
    //   if(Math.random() > 0.5){
    //     number = multiplier * rand(this.props.minNumber, this.props.maxNumber)
    //   }

    //   let x
    //   let y

    //   while(true){
    //     x = rand(BUFFER, SIZE - BUFFER * 2)
    //     y = rand(BUFFER, SIZE - BUFFER * 2)
    //     if(taken.length === 0){
    //       break
    //     }
    //     let clash = false
    //     for(let i = 0; i < taken.length; i++){
    //       let t = taken[i]
    //       let dx = x - t[0]
    //       let dy = y - t[1]
    //       let distance = Math.sqrt(dx * dx + dy * dy)
    //       if(distance < 30){
    //         clash = true
    //       }
    //     }
    //     if(!clash){
    //       break
    //     }
    //   }

    //   ctx.fillText(number, x, y)
    //   taken.push([x, y])
    //   return
    // })
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'find-multiples-' + (idCounter++);
    this.multiple = rand(this.props.minNumber, this.props.maxNumber)
    return (
      <div className='find-multiples'>
        <div>Circle all the numbers that are a multiple of <strong>{ this.multiple }</strong></div>
        <canvas id={ this.canvasID } width={ SIZE } height={ SIZE }></canvas>
      </div>
    )
  }
}

FindMultiplesGenerator.defaultProps = defaultProps

class FindMultiplesEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(2, 5, 5, 12) }
      </div>
    )
  }
}

FindMultiplesEditor.defaultProps = defaultProps

const FindMultiples = {
  name: 'findMultiples',
  title: 'Find Multiples',
  description: 'Practise addition and subtraction by identifying the multiples of a given number',
  difficultyLevel:4,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: FindMultiplesGenerator,
  editor: FindMultiplesEditor,
}

module.exports = FindMultiples