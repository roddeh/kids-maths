import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  rangeValue: 3,
  booleanValue:false,
}

const SIZE = 300
let idCounter = 0

const TRIPLES = [
  [3,4,5],
  [5,12,13],
  [8,15,17],
]

class PythagorasGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d')
    ctx.clearRect(0, 0, SIZE, SIZE)

    let scale = rand(1, 3)
    let triple = rand(TRIPLES).map((v) => v * scale)

    if(Math.random() > 0.5){
      this.drawTallTriangle(ctx, triple)
    }
    else{
      this.drawWideTriangle(ctx, triple)
    }

  }

  drawTallTriangle(ctx, triple){
    let size = SIZE * 0.8
    let height = size
    let width = size / triple[1] * triple[0]
    // Switch the triples around 
    let temp = triple[0]
    triple[0] = triple[1]
    triple[1] = temp
    this.drawTriangle(ctx, triple, width, height)
  }

  drawWideTriangle(ctx, triple){
    let size = SIZE * 0.8
    let height = size / triple[1] * triple[0]
    let width = size
    this.drawTriangle(ctx, triple, width, height)
  }

  drawTriangle(ctx, triple, width, height){


    ctx.font = '20px monospace'
    ctx.save()

    let a = triple[0]
    let b = triple[1]
    let c = triple[2]

    switch(rand(2)){
      case 0: 
        a = 'x'
        break
      case 1: 
        b = 'x'
        break
      case 2: 
        c = 'x'
        break
    }

    switch(3){
      case 0: 
        ctx.fillText(a, (SIZE - width) / 2 - 20, SIZE / 2)
        ctx.fillText(b, SIZE / 2, SIZE / 2 + height / 2 + 20)
        ctx.fillText(c, SIZE / 2 + 10, SIZE / 2 - 10)
        break
      case 1:
        ctx.fillText(a, SIZE / 2 + width / 2 + 5, SIZE / 2)
        ctx.fillText(b, SIZE / 2, SIZE / 2 + height / 2 + 20)
        ctx.fillText(c, SIZE / 2 - 20, SIZE / 2 - 15)
        ctx.scale(-1, 1)
        ctx.translate(-SIZE, 0)
        break
      case 2:
        ctx.fillText(a, SIZE / 2 - width / 2 - 30, SIZE / 2)
        ctx.fillText(b, SIZE / 2, SIZE / 2 - height / 2 - 10)
        ctx.fillText(c, SIZE / 2 + 20, SIZE / 2 + 15)
        ctx.scale(1, -1)
        ctx.translate(0, -SIZE)
        break
      case 3:
        ctx.fillText(a, SIZE / 2 + width / 2 + 5, SIZE / 2)
        ctx.fillText(b, SIZE / 2, SIZE / 2 - height / 2 - 10)
        ctx.fillText(c, SIZE / 2 - 25, SIZE / 2 + 20)
        ctx.scale(-1, -1)
        ctx.translate(-SIZE, -SIZE)
        break

    }

    ctx.beginPath()
    ctx.moveTo((SIZE - width) / 2, (SIZE - height) / 2)
    ctx.lineTo((SIZE - width) / 2, (SIZE - height) / 2 + height)
    ctx.lineTo((SIZE - width) / 2 + width, (SIZE - height) / 2 + height)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()


  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
  
    this.canvasID = 'pythagoras-' + (idCounter++)
    return (
      <div className='pythagoras'>
        <canvas id={ this.canvasID } width={ SIZE } height={ SIZE }></canvas>
      </div>
    )
  }
}

PythagorasGenerator.defaultProps = defaultProps

class PythagorasEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        
      </div>
    )    
  }
}

PythagorasEditor.defaultProps = defaultProps

const Pythagoras = {
  name: 'pythagoras',
  title: 'Pythagoras',
  description: 'Practise Pythagoras theorem by determining the missing value.',
  difficultyLevel:8,
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: PythagorasGenerator,
  editor: PythagorasEditor,
}

module.exports = Pythagoras