import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {}

const SIZE = 400;
const NOTCH_SIZE = 5;
let idCounter = 0;

class LinearPlotGenerator extends React.Component {

  generateEquation(){
    let yFactor = rand(1, 3);
    let xFactor = rand(-3, 3);
    let yMod = rand(4);

    if(xFactor === 0){
      xFactor = 1;
    }
    if(yFactor === 0){
      yFactor = 1;
    }
    xFactor *= yFactor;
    yMod *= yFactor;

    if(xFactor === 1){
      xFactor = '';
    }
    if(yFactor === 1){
      yFactor = '';
    }


    let eq = `${ yFactor }y = ${ xFactor }x`;
    if(yMod !== 0){
      let op = Math.random() > 0.5 ? ' + ' : ' - '
      eq += op + yMod;
    }
    return eq;
  }

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d');

    let min = -6;
    let max = 6;
    let increments = max - min;

    ctx.clearRect(0, 0, SIZE, SIZE)

    // x-axis
    ctx.moveTo(0, SIZE / 2);
    ctx.lineTo(SIZE, SIZE / 2);
    // left arrowhead
    ctx.moveTo(0, SIZE / 2);
    ctx.lineTo(NOTCH_SIZE, SIZE / 2 - NOTCH_SIZE);
    ctx.moveTo(0, SIZE / 2);
    ctx.lineTo(NOTCH_SIZE, SIZE / 2 + NOTCH_SIZE);
    // right arrowhead
    ctx.moveTo(SIZE, SIZE / 2);
    ctx.lineTo(SIZE - NOTCH_SIZE, SIZE / 2 - NOTCH_SIZE);
    ctx.moveTo(SIZE, SIZE / 2);
    ctx.lineTo(SIZE - NOTCH_SIZE, SIZE / 2 + NOTCH_SIZE);
    // y-axis
    ctx.moveTo(SIZE / 2, 0);
    ctx.lineTo(SIZE / 2, SIZE);
    // top arrowhead
    ctx.moveTo(SIZE / 2, 0);
    ctx.lineTo(SIZE / 2 - NOTCH_SIZE, NOTCH_SIZE);
    ctx.moveTo(SIZE / 2, 0);
    ctx.lineTo(SIZE / 2 + NOTCH_SIZE, NOTCH_SIZE);
    // bottom arrowhead
    ctx.moveTo(SIZE / 2, SIZE);
    ctx.lineTo(SIZE / 2 - NOTCH_SIZE, SIZE - NOTCH_SIZE);
    ctx.moveTo(SIZE / 2, SIZE);
    ctx.lineTo(SIZE / 2 + NOTCH_SIZE, SIZE - NOTCH_SIZE);

    ctx.stroke();

    let inc = SIZE / increments;

    for(var i = min + 1; i < max; i++){
      ctx.moveTo(i * inc + SIZE / 2, SIZE / 2 + NOTCH_SIZE);
      ctx.lineTo(i * inc + SIZE / 2, SIZE / 2 - NOTCH_SIZE);
      ctx.stroke();
      if(i !== 0){
        ctx.fillText(i, i * inc + SIZE / 2 - NOTCH_SIZE / 2, SIZE / 2 + NOTCH_SIZE * 3);  
      }
      ctx.moveTo(SIZE / 2 + NOTCH_SIZE, i * inc + SIZE / 2);
      ctx.lineTo(SIZE / 2 - NOTCH_SIZE, i * inc + SIZE / 2);
      ctx.stroke();
      if(i !== 0){
        ctx.fillText(-i, SIZE / 2 - NOTCH_SIZE * 4, i * inc + SIZE / 2 + NOTCH_SIZE);
      }
    }
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'linear-plot-' + (idCounter++);
    return (
      <div className='linear-plot'>
        <div className='equation'>{ this.generateEquation() }</div>
        <canvas id={ this.canvasID } width={ SIZE } height={ SIZE }></canvas>
      </div>
    )
  }
}

LinearPlotGenerator.defaultProps = defaultProps

class LinearPlotEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'></div>
    )
  }
}

LinearPlotEditor.defaultProps = defaultProps

const LinearPlot = {
  name: 'linearPlot',
  title: 'Linear Plot',
  description: 'Learn line geometry by plotting simple equations.',
  difficultyLevel:5,
  layoutType: c.questionShapes.DOUBLE_LARGE_SQUARE,
  generator: LinearPlotGenerator,
  editor: LinearPlotEditor,
}

module.exports = LinearPlot