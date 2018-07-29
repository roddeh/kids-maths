import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  minNumber: 1,
  maxNumber: 8,
}

const SIZE = 400;
let idCounter = 0;


class MultiplicationWithCubesGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d')

    ctx.clearRect(0, 0, SIZE, SIZE)
    let w = rand(this.props.minNumber, this.props.maxNumber);
    let h = rand(this.props.minNumber, this.props.maxNumber);
    let l = rand(this.props.minNumber, this.props.maxNumber);

    let sum = w + h + l
    let size = 40;

    if(sum >= 10){
      size = 35
    }
    if(sum >= 15){
      size = 25
    }
    if(sum >= 20){
      size = 15
    }
    if(sum >= 25){
      size = 12
    }
    
    let totalHeight = size * h + (w + l) * size * 0.3;
    let startX = SIZE / 2;
    let startY = SIZE - (SIZE - totalHeight);
    for(let i = 0; i < w; i++){
      for(let j = 0; j < h; j++){
        for(let k = 0; k < l; k++){
          let y = startY - j * size;
          y += k * size * 0.3;
          y += i * size * 0.3;
          let x = startX + i * size * 0.75;
          x -= k * size * 0.75;
          this.drawCube(ctx, x, y, size);
        }
      }
    }
  }

  drawCube(ctx, x, y, s){
    let yMod = 0.3;
    ctx.strokeStyle = '#000';
    
    // Top Face
    ctx.fillStyle = '#FFF';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + s * 0.75, y - s * yMod);
    ctx.lineTo(x + s * 1.5, y);
    ctx.lineTo(x + s * 0.75, y + s * yMod);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.stroke();  
    // Left Face
    ctx.fillStyle = '#CCC';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + s);
    ctx.lineTo(x + s * 0.75, y + s * (1 + yMod));
    ctx.lineTo(x + s * 0.75, y + s * yMod);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.stroke();
    // // Right Face
    ctx.fillStyle = '#999';
    ctx.beginPath();
    ctx.moveTo(x + s * 0.75, y + s * (1 + yMod));
    ctx.lineTo(x + s * 1.5, y + s);
    ctx.lineTo(x + s * 1.5, y);
    ctx.lineTo(x + s * 0.75, y + s * yMod);
    ctx.lineTo(x + s * 0.75, y + s * (1 + yMod));
    ctx.fill();
    ctx.stroke();
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'multiplication-with-cubes-' + (idCounter++);
    return (
      <div className='multiplication-with-cubes'>
        <canvas id={ this.canvasID } width={ SIZE } height={ SIZE }></canvas>
      </div>
    )
  }
}

MultiplicationWithCubesGenerator.defaultProps = defaultProps

class MultiplicationWithCubesEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        { this.renderMinMaxRange(1, 5, 5, 12) }
      </div>
    )
  }
}

MultiplicationWithCubesEditor.defaultProps = defaultProps

const MultiplicationWithCubes = {
  name: 'multiplicationWithCubes',
  title: 'Multiplication with Cubes',
  description: '',
  difficultyLevel:6,
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: MultiplicationWithCubesGenerator,
  editor: MultiplicationWithCubesEditor,
}

module.exports = MultiplicationWithCubes