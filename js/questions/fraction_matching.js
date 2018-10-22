import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import shuffle from '../utils/shuffle'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minDivisor: 2,
  maxDivisor: 12,
}

let idCounter = 0
const WIDTH = 300
const HEIGHT = 150

let RADIUS = 25

class TemplateGenerator extends React.Component {

  

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d')
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    function makeFrac(min, max){
      let divisor = rand(min, max);
      let dividend = rand(1, divisor - 1);
      return {divisor, dividend};
    }

    function drawCircle(ctx, x){
      let {dividend, divisor} = makeFrac(2, 12)
    
      let deg = Math.PI * 2 / divisor;
      x += RADIUS;
      let y = HEIGHT / 3;
      ctx.fillStyle = '#CCC';
      ctx.save()
      ctx.translate(x, y);

      doTimes(divisor, (n) => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -RADIUS);
        ctx.arc(0, 0, RADIUS, -Math.PI / 2, -Math.PI / 2 - deg, true);
        ctx.lineTo(0, 0)
        if(n < dividend){
          ctx.fill();
        }
        ctx.stroke();
        ctx.rotate(deg);
      })
      ctx.restore()
      return {dividend, divisor}
    }

    function drawSquare(ctx, x){
      let {dividend, divisor} = makeFrac(1, 5)
      divisor *= 2
      if(Math.random() > 0.5){
        dividend *= 2
      }

      let h = RADIUS / divisor * 4

      for(let i = 0; i < divisor; i++){
        console.log(i, divisor)
        let xp = i % 2 * RADIUS + x 
        let yp = Math.floor(i / 2) * h + HEIGHT / 5
        ctx.beginPath()
        ctx.rect(xp, yp, RADIUS, h)
        if(i < dividend){
          ctx.fill()  
        }
        ctx.stroke()
      }
      return {dividend, divisor}
    }

    function drawPolygon(ctx, x){
      let {dividend, divisor} = makeFrac(3, 8)

      let cx = x + RADIUS
      let cy = HEIGHT / 3

      for(let i = 0; i < divisor; i++){
        let x1 = Math.sin(i / divisor * Math.PI * 2) * RADIUS + cx
        let y1 = Math.cos(i / divisor * Math.PI * 2) * RADIUS + cy
        let x2 = Math.sin((i + 1) / divisor * Math.PI * 2) * RADIUS + cx
        let y2 = Math.cos((i + 1) / divisor * Math.PI * 2) * RADIUS + cy

        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.lineTo(cx, cy)
        if(i < dividend){
          ctx.fill()  
        }
        ctx.stroke()
      }
      return {dividend, divisor}
    }

    
    const METHODS = [drawCircle, drawSquare, drawPolygon]
    let fractions = []

    ctx.fillStyle = '#CCC'
    for(let i = 0; i < 4; i++){
      let x = 30 + i * 70
      let m = rand(METHODS)
      fractions.push(m(ctx, x))
    }

    fractions = shuffle(fractions)
    
    fractions.forEach((f, i) => {
      let x = 50 + i * 70
      let y = HEIGHT / 3 * 2
      ctx.fillStyle = '#000'
      ctx.font = '20px monospace'
      ctx.fillText(f.dividend, x, y + 10)
      ctx.fillText(f.divisor, x, y + 35)
      ctx.beginPath()
      ctx.moveTo(x - 5, y + 15)
      ctx.lineTo(x + 20, y + 15)
      ctx.stroke()

    })




  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'fraction-matching-' + (idCounter++);
    return (
      <div className='fraction-matching'>
        <canvas id={ this.canvasID } width={ WIDTH } height={ HEIGHT }></canvas>
      </div>
    )
  }
}

TemplateGenerator.defaultProps = defaultProps

class TemplateEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        
      </div>
    )
  }
}

TemplateEditor.defaultProps = defaultProps

const Template = {
  name: 'fractionMatching',
  title: 'Fraction Matching',
  description: 'Start learning about fractions by matching the visual representation with the written fraction.',
  difficultyLevel:5,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: TemplateGenerator,
  editor: TemplateEditor,
}

module.exports = Template