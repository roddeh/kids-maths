import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {}

const SIZE = 300
let idCounter = 0

class FourColourMapTheoremGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d')
    ctx.beginPath()
    ctx.fillStyle = '#FFF'

    function drawRect(size){
      let p = (SIZE - size) / 2
      ctx.beginPath()
      ctx.rect(p, p, size, size)
      ctx.fill()
      ctx.stroke()
    }

    function drawDiamond(size){
      let s1 = SIZE / 2
      let s2 = size / 2  
      ctx.beginPath()
      ctx.moveTo(s1, s1 - s2)
      ctx.lineTo(s1 + s2, s1)
      ctx.lineTo(s1, s1 + s2)
      ctx.lineTo(s1 - s2, s1)
      ctx.lineTo(s1, s1 - s2)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }

    function drawCircle(size){
      ctx.beginPath()
      ctx.arc(SIZE / 2, SIZE / 2, size / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }

    function drawCross(size){
      let s1 = SIZE / 2
      let s2 = size / 2
      ctx.beginPath()
      ctx.moveTo(s1, s1 - s2)
      ctx.lineTo(s1, s1 + s2)
      ctx.moveTo(s1 - s2, s1)
      ctx.lineTo(s1 + s2, s1)
      ctx.stroke()
    }

    function drawCross2(size){
      let s1 = SIZE / 2
      let s2 = size / 2
      ctx.beginPath()
      ctx.moveTo(s1 - s2, s1 - s2)
      ctx.lineTo(s1 + s2, s1 + s2)
      ctx.moveTo(s1 + s2, s1 - s2)
      ctx.lineTo(s1 - s2, s1 + s2)
      ctx.stroke()
    }

    let functions = [
      drawCircle,
      drawDiamond,
      drawCross,
      drawCross2
    ]

    function drawShapes(size){
      drawRect(size)
      functions.forEach((f) => {
        if(Math.random() > 0.5){
          f(size)
        }
      })
    }

    drawShapes(300)
    drawShapes(150)
    drawShapes(75)
  }

  componentDidMount(){
    this.updateCanvas()
  }
  
  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'four-colour-map-theorem-' + idCounter++
    return (
      <div className='four-colour-map-theorem'>
        <div>Choose exactly four colours to colour in each shape.  Make sure that no two adjacent shapes share the same colour.</div>
        <br/>
        <canvas id={ this.canvasID } width={ SIZE } height={ SIZE }></canvas>
      </div>
    )
  }
}

FourColourMapTheoremGenerator.defaultProps = defaultProps

const FourColourMapTheorem = {
  name: 'fourColourMapTheorem',
  title: 'Four Colour Map Theorem',
  description: 'Learn the basics of four colour map theorem by colouring in maps.',
  difficultyLevel:7,
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: FourColourMapTheoremGenerator,
  editor: null,
}

module.exports = FourColourMapTheorem