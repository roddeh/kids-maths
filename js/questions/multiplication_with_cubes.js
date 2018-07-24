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
    ctx.fillStyle = '#FFF';
    ctx.strokeStyle = '#000';
    
    // Top Face
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + s * 0.75, y - s * yMod);
    ctx.lineTo(x + s * 1.5, y);
    ctx.lineTo(x + s * 0.75, y + s * yMod);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.stroke();  
    // Left Face
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + s);
    ctx.lineTo(x + s * 0.75, y + s * (1 + yMod));
    ctx.lineTo(x + s * 0.75, y + s * yMod);
    ctx.lineTo(x, y);
    ctx.fill();
    ctx.stroke();
    // // Right Face
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
  difficultyLevel:0,
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: MultiplicationWithCubesGenerator,
  editor: MultiplicationWithCubesEditor,
}

module.exports = MultiplicationWithCubes


// 'use strict';

// const c = require('../constants');
// // const zerosToSpace = require('../zeros_to_space');
// // const doTimes = require('../do_times');
// const rand = require('roddeh-rand');
// const prepareConfig = require('../prepare_config');

// let config = {
//   minNumber: 1,
//   maxNumber: 8,
// }


// let SIZE = 400;
// let idCounter = 0;

// function draw(canvasID){
//   let canvas = document.getElementById(canvasID);
//   let ctx = canvas.getContext('2d');

//   let w = rand(config.minNumber, config.maxNumber);
//   let h = rand(config.minNumber, config.maxNumber);
//   let l = rand(config.minNumber, config.maxNumber);

//   let max = Math.max(w, h, l);

//   let size = 50;

//   if(max > 3){
//     size = 40;
//   }
//   if(max > 5){
//     size = 20;
//   }
//   if(max > 8){
//     size = 15;
//   }

  

//   // let totalWidth = size * 0.75 * (w + l);
//   let totalHeight = size * h + (w + l) * size * 0.3;

//   let startX = SIZE / 2;
//   let startY = SIZE - (SIZE - totalHeight);



//   for(let i = 0; i < w; i++){
//     for(let j = 0; j < h; j++){
//       for(let k = 0; k < l; k++){

//         let y = startY - j * size;
//         y += k * size * 0.3;
//         y += i * size * 0.3;

//         let x = startX + i * size * 0.75;
//         x -= k * size * 0.75;
//         drawCube(ctx, x, y, size);
//       }
//     }
//   }
// }

// function drawCube(ctx, x, y, s){

//   let yMod = 0.3;
//   ctx.fillStyle = '#FFF';
//   ctx.strokeStyle = '#000';
  
//   // Top Face
//   ctx.beginPath();
//   ctx.moveTo(x, y);
//   ctx.lineTo(x + s * 0.75, y - s * yMod);
//   ctx.lineTo(x + s * 1.5, y);
//   ctx.lineTo(x + s * 0.75, y + s * yMod);
//   ctx.lineTo(x, y);
//   ctx.fill();
//   ctx.stroke();  
//   // Left Face
//   ctx.beginPath();
//   ctx.moveTo(x, y);
//   ctx.lineTo(x, y + s);
//   ctx.lineTo(x + s * 0.75, y + s * (1 + yMod));
//   ctx.lineTo(x + s * 0.75, y + s * yMod);
//   ctx.lineTo(x, y);
//   ctx.fill();
//   ctx.stroke();
//   // // Right Face
//   ctx.beginPath();
//   ctx.moveTo(x + s * 0.75, y + s * (1 + yMod));
//   ctx.lineTo(x + s * 1.5, y + s);
//   ctx.lineTo(x + s * 1.5, y);
//   ctx.lineTo(x + s * 0.75, y + s * yMod);
//   ctx.lineTo(x + s * 0.75, y + s * (1 + yMod));
//   ctx.fill();
//   ctx.stroke();
// }

// function generateQuestion(){
//   let canvasID = 'multiplication-with-cubes-' + (idCounter++);
//   let html = `
//     <div class="multiplication-with-cubes">
//       <canvas id="${ canvasID }" width="${ SIZE }" height="${ SIZE }"></canvas>
//       <div>&nbsp;&nbsp;&nbsp;&nbsp; &times; &nbsp;&nbsp;&nbsp;&nbsp; &times; &nbsp;&nbsp;&nbsp;&nbsp; = &nbsp;&nbsp;&nbsp;&nbsp;</div>
//     </div>
//   `
//   return {html, finalise:() => {
//     draw(canvasID);
//   }}
// }

// let multiplicationWithCubes = {
//   type: c.questionShapes.LARGE_SQUARE,
//   prepare(cfg){
//     config = prepareConfig(cfg || {}, config);
//     return this;
//   },
//   generateQuestion,
// };

// module.exports = multiplicationWithCubes;