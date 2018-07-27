import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  
}

const SIZE = 300
let idCounter = 0

class TriangleAnglesGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d')
    ctx.clearRect(0, 0, SIZE, SIZE)


    let size = SIZE 
    // let s2 = SIZE / 2
    let s2 = 0

    let points = [
      [rand(size - 20) + 10, 10],
      [rand(size / 2 - 10) + size / 2, size - 10],
      [rand(size / 2 - 10), size - 10],
    ]

    // ctx.save()
    // ctx.translate(s2, s2)
    // ctx.rotate(Math.random() * (Math.PI * 2))

    ctx.beginPath()
    ctx.moveTo(points[0][0] - s2, points[0][1] - s2)
    points.forEach((p) => {
      ctx.lineTo(p[0] - s2, p[1] - s2)
    })
    ctx.closePath()
    window.ctx = ctx
    ctx.stroke()
    // ctx.restore()
  }

  componentDidMount(){
    this.updateCanvas()
  }
  
  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'triangle-angles-' + (idCounter++);
    return (
      <div className='triangle-angles'>
        <span>Measure each of the angles of the triangle and add them together</span>
        <canvas id={ this.canvasID } width={ SIZE } height={ SIZE }></canvas>
      </div>
    )
  }
}

TriangleAnglesGenerator.defaultProps = defaultProps

class TriangleAnglesEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
      </div>
    )
  }
}

TriangleAnglesEditor.defaultProps = defaultProps

const TriangleAngles = {
  name: 'triangleAngles',
  title: 'Triangle Angles',
  description: 'Learn about measuring angles and how they relate to triangles',
  difficultyLevel:6,
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: TriangleAnglesGenerator,
  editor: TriangleAnglesEditor,
}

module.exports = TriangleAngles