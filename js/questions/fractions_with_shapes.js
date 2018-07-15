import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  number: 1,
  minDivisor: 2,
  maxDivisor: 12,
}

let WIDTH = 400;
let HEIGHT = 200;
let idCounter = 0;
let RADIUS = 40;

class FractionsWithShapesGenerator extends React.Component {

  updateCanvas(){

    function drawCircle(ctx, x, dividend, divisor, showNumber){
      let deg = Math.PI * 2 / divisor;

      x += RADIUS;
      let y = HEIGHT / 2;

      ctx.fillStyle = '#CCC';
      ctx.translate(x, y);

      doTimes(divisor, (n) => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -RADIUS);
        ctx.arc(0, 0, RADIUS, -Math.PI / 2, -Math.PI / 2 - deg, true);
        ctx.lineTo(0, 0)
        if(!showNumber){
          if(n < dividend){
            ctx.fill();
          }
        }
        ctx.stroke();
        ctx.rotate(deg);
      })
    }

    let ctx = document.getElementById(this.canvasID).getContext('2d');

    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    let num = rand(this.props.number);
    let divisor = rand(this.props.minDivisor, this.props.maxDivisor);
    let dividend = rand(1, divisor - 1);
    let showNumber = Math.random() > 0.5

    doTimes(num, (i) => {
      ctx.save();
      drawCircle(ctx, i * RADIUS * 2.2 + 20, divisor, divisor, showNumber);
      ctx.restore();
    })
    ctx.save()
    drawCircle(ctx, num * RADIUS * 2.2 + 20, dividend, divisor, showNumber);
    ctx.restore();
    if(showNumber){
      ctx.font = '40px monospace';
      if(num > 0){
        ctx.fillText(num, (num + 1) * RADIUS * 2.2 + 50, HEIGHT / 2 + 20);
      }
      ctx.font = '20px monospace';
      ctx.fillText(dividend, (num + 1) * RADIUS * 2.2 + 85, HEIGHT / 2 + 0);
      ctx.moveTo((num + 1) * RADIUS * 2.2 + 80, HEIGHT / 2 + 5)
      ctx.lineTo((num + 1) * RADIUS * 2.2 + 100, HEIGHT / 2 + 5, (num + 1) * RADIUS * 2.2 + 80, HEIGHT / 2 + 0)
      ctx.fillText(divisor, (num + 1) * RADIUS * 2.2 + 85, HEIGHT / 2 + 25);
      ctx.stroke()
    }
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }


  render(){
    this.canvasID = 'fractions-with-shapes-' + (idCounter++);
    return (
      <div className='fractions-with-shapes'>
        <canvas id={ this.canvasID } width={ WIDTH } height={ HEIGHT }></canvas>
      </div>
    )
  }
}

FractionsWithShapesGenerator.defaultProps = defaultProps

class FractionsWithShapesEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Max Number:</label>
        <input type='range' name='number' min='1' max='3' step='1' value={ this.state.number } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.number }</label>
        <br/>
        <label>Min Divisor:</label>
        <input type='range' name='minDivisor' min='2' max='4' step='1' value={ this.state.minDivisor } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.minDivisor }</label>
        <br/>
        <label>Max Divisor:</label>
        <input type='range' name='maxDivisor' min='4' max='10' step='1' value={ this.state.maxDivisor } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.maxDivisor }</label>
      </div>
    )
  }
}

FractionsWithShapesEditor.defaultProps = defaultProps

const FractionsWithShapes = {
  name: 'fractionsWithShapes',
  title: 'Fractions with Shapes',
  description: 'Learn about fractions visually.',
  difficultyLevel:4,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: FractionsWithShapesGenerator,
  editor: FractionsWithShapesEditor,
}

module.exports = FractionsWithShapes