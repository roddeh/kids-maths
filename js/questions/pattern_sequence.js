import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  length: 3
}

const WIDTH = 500
const HEIGHT = 70
const SIZES = [20, 30, 40];
const SPACE = 10;

let idCounter = 0



class PatternSequenceGenerator extends React.Component {

  updateCanvas(){
    function circle(size){
      return function(ctx, x){
        ctx.beginPath();
        ctx.arc(x + size / 2, HEIGHT - SPACE - size / 2, size / 2, 0, Math.PI * 2, true);
        ctx.stroke();
        return size;
      }
    }

    function square(size){
      return function(ctx, x){
        ctx.beginPath();
        ctx.moveTo(x, HEIGHT - SPACE);
        ctx.lineTo(x + size, HEIGHT - SPACE);
        ctx.lineTo(x + size, HEIGHT - SPACE- size);
        ctx.lineTo(x, HEIGHT - SPACE - size);
        ctx.lineTo(x, HEIGHT - SPACE);
        ctx.stroke();
        return size;
      }
    }

    function triangle(size){
      return function(ctx, x){
        ctx.beginPath();
        ctx.moveTo(x, HEIGHT - SPACE);
        ctx.lineTo(x + size, HEIGHT - SPACE);
        ctx.lineTo(x + size / 2, HEIGHT - SPACE - size);
        ctx.lineTo(x, HEIGHT - SPACE);
        ctx.stroke();
        return size;
      }
    }

    const SHAPES = [
      circle,
      square,
      triangle,
    ];

    
    let ctx = document.getElementById(this.canvasID).getContext('2d')
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    let seq = doTimes(this.props.length, () => {
      return rand(SHAPES)(rand(SIZES));
    })

    let x = SPACE;

    seq.forEach((func) => {
      x += func(ctx, x) + SPACE;
    })
    seq.forEach((func) => {
      x += func(ctx, x) + SPACE;
    })
    seq.forEach((func, i) => {
      if(i < seq.length / 2){
        x += func(ctx, x) + SPACE;  
      }
    })
  }

  componentDidMount(){
    this.updateCanvas()
  }
  
  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'pattern-sequence-' + (idCounter++);
    return (
      <div className='multiplication-with-cubes'>
        <canvas id={ this.canvasID } width={ WIDTH } height={ HEIGHT }></canvas>
      </div>
    )
  }
}

PatternSequenceGenerator.defaultProps = defaultProps

class PatternSequenceEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Sequence Length:</label>
        <input type='range' name='length' min='2' max='5' step='1' value={ this.state.length } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.length }</label>
      </div>
    )
  }
}

PatternSequenceEditor.defaultProps = defaultProps

const PatternSequence = {
  name: 'patternSequence',
  title: 'Pattern Sequence',
  description: 'Determine the next shapes in the pattern',
  difficultyLevel:2,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: PatternSequenceGenerator,
  editor: PatternSequenceEditor,
}

module.exports = PatternSequence