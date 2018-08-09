import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  segments: false
}

let idCounter = 0
const SIZE = 200

class CircleGeometryGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d');
    ctx.clearRect(0, 0, SIZE, SIZE);


    let size = SIZE * 0.8
    let s2 = SIZE / 2
    
    ctx.beginPath()
    ctx.arc(s2, s2, size / 2, 0, Math.PI * 2);
    ctx.stroke()

    let degrees = rand(2, 12) * 30
    let radius = rand(1, 20)

    if(this.props.segments){
      ctx.beginPath()
      ctx.fillStyle = '#CCC'
      ctx.moveTo(s2, s2)
      ctx.lineTo(s2, s2 - size / 2)
      ctx.arc(s2, s2, size / 2, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2 / 360 * degrees))
      ctx.lineTo(s2, s2)
      ctx.stroke()
      ctx.closePath()
      ctx.fill()
    }
    else{
      ctx.beginPath()
      ctx.moveTo(s2, s2)
      ctx.lineTo(s2, s2 - size / 2)
      ctx.stroke()
    }

    ctx.fillStyle = '#000'
    ctx.font = '15px monospace'
    ctx.fillText(radius, s2 - 20, s2 -40)
    if(this.props.segments){
      ctx.fillText(degrees + String.fromCodePoint(176), s2 + 3, s2 - 15)  
    }
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'circle-geometry-' + (idCounter++);
    let message = this.props.segments ? 'Calculate the area and circumference of the shaded segment.' : 'Calculate the area of the circle.'
    return (
      <div className='circle-geometry'>
        <div>{ message }</div>
        <div className='question'>
          <canvas id={ this.canvasID } width={ SIZE } height={ SIZE }></canvas>
          <div className='formulas'>
            Circumference =<br/>
            =<br/>
            =<br/>
            <br/>
            Area =<br/>
            =<br/>
            =<br/>

          </div>
        </div>
      </div>
    )
  }
}

CircleGeometryGenerator.defaultProps = defaultProps

class CircleGeometryEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Allow segments</label>
        <input type='checkbox' name='segments' defaultChecked={ this.state.segments } onChange={ this.handleCheckboxChange }></input>
      </div>
    )
  }
}

CircleGeometryEditor.defaultProps = defaultProps

const CircleGeometry = {
  name: 'circleGeometry',
  title: 'Circle Geometry',
  description: 'Learn about calculating the circumference and area of a circle.',
  difficultyLevel:12,
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: CircleGeometryGenerator,
  editor: CircleGeometryEditor,
}

module.exports = CircleGeometry