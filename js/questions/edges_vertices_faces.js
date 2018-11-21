import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  rangeValue: 3,
  booleanValue:false,
}

let idCounter = 0
const SIZE = 150

let RADIUS = 30
const OFFSETS = {
  3:0,
  4:-Math.PI / 4,
  5:-Math.PI / 5,
  6:-Math.PI / 6 * 3,
  7:-Math.PI / 7 * 4,
  8:-Math.PI / 2,
}



class EdgesVerticesFacesGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d')
    ctx.clearRect(0, 0, SIZE, SIZE)


    function getPolygonPoints(ctx, sides, x, y){
      let offset = OFFSETS[sides]
      let points = []
      for(let i = 0; i < sides; i++){
        let x1 = Math.sin(i / sides * Math.PI * 2 + offset) * RADIUS + x
        let y1 = Math.cos(i / sides * Math.PI * 2 + offset) * RADIUS + y
        let x2 = Math.sin((i + 1) / sides * Math.PI * 2 + offset) * RADIUS + x
        let y2 = Math.cos((i + 1) / sides * Math.PI * 2 + offset) * RADIUS + y
        points.push([x1, y1])
      }
      return points
    }

    let sides = rand(3, 8)

    let h1 = getPolygonPoints(ctx, sides, 10 + RADIUS, SIZE - 10 - RADIUS)
    let h2 = getPolygonPoints(ctx, sides, 50 + RADIUS, SIZE - 50 - RADIUS)

    ctx.fillStyle = '#FFF'

    h1.forEach((p1, i) => {
      let p2 = h2[i]
      let p3 = h2[i + 1]
      let p4 = h1[i + 1]
      if(!p3 || !p4){
        return
      }
      ctx.beginPath()
      ctx.moveTo(p1[0], p1[1])
      ctx.lineTo(p2[0], p2[1])
      ctx.lineTo(p3[0], p3[1])
      ctx.lineTo(p4[0], p4[1])
      ctx.lineTo(p1[0], p1[1])
      ctx.fill()
      ctx.stroke()
    })

    ctx.beginPath()
    h1.forEach((p, i) => {
      if(i === 0){
        ctx.moveTo(p[0], p[1])
      }
      else{
        ctx.lineTo(p[0], p[1])
      }
    })
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'edges-vertices-faces-' + (idCounter++);
    return (
      <div className='edges-vertices-faces'>
        <canvas id={ this.canvasID } width={ SIZE } height={ SIZE }></canvas>
        <p>
          Name of Shape:<br/><br/>
          Edges:<br/>
          Faces:<br/>
          Vertices:<br/>
        </p>
      </div>
    )
  }
}

EdgesVerticesFacesGenerator.defaultProps = defaultProps

class EdgesVerticesFacesEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
      </div>
    )
  }
}

EdgesVerticesFacesEditor.defaultProps = defaultProps

const EdgesVerticesFaces = {
  name: 'edgesVerticesFaces',
  title: 'Edges Vertices Faces',
  description: 'Learn about the properties of 3D shapes.',
  difficultyLevel:4,
  layoutType: c.questionShapes.TALL_RECT,
  generator: EdgesVerticesFacesGenerator,
  editor: EdgesVerticesFacesEditor,
}

module.exports = EdgesVerticesFaces