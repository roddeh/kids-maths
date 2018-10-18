import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  displayGrid: true,
}

const SHAPES = [
  '3R,2D,1R,2D,3L,2U,1L,2U',
  '2R,2D,2R,2D,4L,4U',
  '4R,4D,2L,3U,2L,1U',
  '4R,2D,2L,2D,2R,2D,4L,6U',
  '2R,2D,2R,2D,2R,2D,6L,6U',
  '3R,3D,1R,1D,3L,3U,1L,1U',
]

const GRID_SIZE = 30

let idCounter = 0
const SIZE = 300

const DIR = {
  R:[1,0,0,-1.1],
  L:[-1,0,0,0.5],
  U:[0,-1,-0.7,0],
  D:[0,1,0.5,0],
}

class TemplateGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d')
    ctx.clearRect(0, 0, SIZE, SIZE)

    let dim = rand(1, 2)

    let gridSize = GRID_SIZE / dim

    if(this.props.displayGrid){
      for(let i = 0; i <= SIZE; i+= gridSize){
        ctx.beginPath()
        ctx.strokeStyle = '#CCC'
        ctx.lineWidth = 0.5
        ctx.moveTo(i, 0)
        ctx.lineTo(i, SIZE)
        ctx.stroke()
        ctx.moveTo(0, i)
        ctx.lineTo(SIZE, i)
        ctx.stroke()
      }
    }

    let shape = rand(SHAPES)
    let steps = shape.split(',')

    let currX = (dim) * gridSize
    let currY = (dim) * gridSize 

    

    ctx.beginPath()
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 1
    ctx.moveTo(currX, currY)

    let missingIndex = rand(steps.length - 1)

    steps.forEach((step, i) => {
      let [dist, dir] = step.split('')
      dist *= dim
      let [x, y, labelX, labelY] = DIR[dir]

      let nextX = currX + x * dist * gridSize
      let nextY = currY + y * dist * gridSize
      ctx.lineTo(nextX, nextY)

      labelX = currX + (nextX - currX) / 2 - 5 + labelX * 20
      labelY = currY + (nextY - currY) / 2 + 10 + labelY * 20

      ctx.font = '16px monospace'
      let text = i === missingIndex ? '?' : dist
      ctx.fillText(text, labelX, labelY)

      currX = nextX
      currY = nextY
    })

    ctx.stroke()
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'perimeter-and-area-' + (idCounter++);
    return (
      <div className='perimeter-and-area'>
        <canvas id={ this.canvasID } width={ SIZE } height={ SIZE }></canvas>
        <div className='questions'>
          <label>? =</label><br/>
          <label>Perimeter =</label><br/>
          <label>Area =</label><br/>
        </div>
      </div>
    )
  }
}

TemplateGenerator.defaultProps = defaultProps

class TemplateEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Display Grid:</label>
        <input type='checkbox' name='displayGrid' defaultChecked={ this.state.displayGrid } onChange={ this.handleCheckboxChange }></input>
      </div>
    )
  }
}

TemplateEditor.defaultProps = defaultProps

const Template = {
  name: 'perimeterAndArea',
  title: 'Perimeter and Area',
  description: 'Learn about the calculation of perimeter and are of right angles shapes.',
  difficultyLevel:7,
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: TemplateGenerator,
  editor: TemplateEditor,
}

module.exports = Template