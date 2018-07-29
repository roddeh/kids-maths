import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  intervals: true,
  hours24: false,
}

const WIDTH = 300
const HEIGHT = 150
let idCounter = 0

class ClockTimeGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d');
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    this.drawEmptyAnalog(ctx)
    this.drawEmptyDigitalClock(ctx)
    
    let hour
    let min
    if(this.props.hours24){
       hour = rand(0, 23)
    }
    else{
       hour = rand(1, 12)
    }

    if(this.props.intervals){
      min = rand(3) * 15
    }
    else{
       min = rand(59)
    }

    if(Math.random() > 0.5){
      this.drawAnalogTime(ctx, hour, min)
    }
    else{
      this.drawDigitalTime(ctx, hour, min)
    }
  }

  drawEmptyAnalog(ctx){
    let size = HEIGHT * 0.8
    let pos = HEIGHT / 2
    ctx.beginPath()
    ctx.arc(pos, pos, size / 2, 0, Math.PI * 2);
    ctx.stroke()
    ctx.save()
    ctx.translate(pos, pos)
    doTimes(60, (i) => {
      ctx.beginPath()
      ctx.moveTo(0, -size * 0.48)
      if(i % 5 === 0){
        ctx.lineTo(0, - size * 0.4)
      }
      else{
        ctx.lineTo(0, - size * 0.45)
      }
      ctx.rotate(Math.PI * 2 / 60)
      ctx.stroke()
    })
    ctx.restore()

    ctx.arc(pos, pos, size / 40, 0, Math.PI * 2);
    ctx.fill()
  }

  drawEmptyDigitalClock(ctx){
    ctx.beginPath()
    ctx.rect(WIDTH * 0.55, HEIGHT * 0.3, WIDTH * 0.4, HEIGHT * 0.4)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(WIDTH * 0.75, HEIGHT * 0.44, HEIGHT / 50, 0, Math.PI * 2);
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(WIDTH * 0.75, HEIGHT * 0.56, HEIGHT / 50, 0, Math.PI * 2);
    ctx.stroke()
  }

  drawAnalogTime(ctx, hour, min){
    let pos = HEIGHT / 2
    let size = HEIGHT * 0.8

    // Draw Hour Hand
    ctx.save()
    ctx.translate(pos, pos)
    ctx.rotate(Math.PI * 2 / 12 * (hour + min / 60) + Math.PI)
    ctx.moveTo(0, 0)
    ctx.lineTo(0, size * 0.2)
    ctx.stroke()
    ctx.restore()
    // Draw Minute Hand
    ctx.save()
    ctx.translate(pos, pos)
    ctx.rotate(Math.PI * 2 / 60 * min + Math.PI)
    ctx.moveTo(0, 0)
    ctx.lineTo(0, size * 0.35)
    ctx.stroke()
    ctx.restore()
  }

  drawDigitalTime(ctx, hour, min){
    if(hour < 10){
      hour = '0' + hour
    }
    if(min < 10){
      min = '0' + min 
    }
    ctx.font = '40px monospace'
    ctx.fillText(hour, WIDTH * 0.57, HEIGHT * 0.58) 
    ctx.fillText(min, WIDTH * 0.77, HEIGHT * 0.58) 
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'clock-time-' + (idCounter++);
    return (
      <div className='clock-time'>
        <canvas id={ this.canvasID } width={ WIDTH } height={ HEIGHT }></canvas>
      </div>
    )    
  }
}

ClockTimeGenerator.defaultProps = defaultProps

class ClockTimeEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Use 24hr time</label>
        <input type='checkbox' name='hours24' defaultChecked={ this.state.hours24 } onChange={ this.handleCheckboxChange }></input>
        <br/>
        <label>Limit to 15 minute intervals</label>
        <input type='checkbox' name='intervals' defaultChecked={ this.state.intervals } onChange={ this.handleCheckboxChange }></input>
      </div>
    )
  }
}

ClockTimeEditor.defaultProps = defaultProps

const ClockTime = {
  name: 'clockTime',
  title: 'Clock Time',
  description: 'Practise converting between digital and analog time formats',
  difficultyLevel:5,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: ClockTimeGenerator,
  editor: ClockTimeEditor,
}

module.exports = ClockTime