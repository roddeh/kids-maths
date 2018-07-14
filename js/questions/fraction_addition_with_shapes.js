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

let WIDTH = 150;
let HEIGHT = 140;
let idCounter = 0;
let RADIUS = 16;

class FractionAdditionWithShapesGenerator extends React.Component {

  updateCanvas(){

    function makeFrac(){
      console.log(this.props.number + 1);
      let num = rand(this.props.number);
      let divisor = rand(this.props.minDivisor, this.props.maxDivisor);
      let dividend = rand(1, divisor - 1);
      return {num, divisor, dividend};
    }


    function drawPies(num, divisor, dividend, ctx){
      ctx.clearRect(0, 0, WIDTH, HEIGHT)
      let xOff = (WIDTH - ((num + 1) * RADIUS * 2.2)) / 2;
      doTimes(num, (i) => {
        ctx.save();
        drawCircle(ctx, i * RADIUS * 2.2 + xOff, divisor, divisor);
        ctx.restore();
      })
      ctx.save()
      drawCircle(ctx, num * RADIUS * 2.2 + xOff, dividend, divisor);
      ctx.restore()
    }

    function drawCircle(ctx, x, dividend, divisor){
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
        if(n < dividend){
          ctx.fill();
        }
        ctx.stroke();
        ctx.rotate(deg);
      })
    }

    let frac1 = makeFrac.apply(this);
    let frac2 = makeFrac.apply(this);

    drawPies(frac1.num, frac1.divisor, frac1.dividend, document.getElementById(this.canvasLeftID).getContext('2d'))
    drawPies(frac2.num, frac1.divisor, frac1.dividend, document.getElementById(this.canvasRightID).getContext('2d'))
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }


  render(){
    this.canvasLeftID = 'fraction-addition-with-shapes-' + (idCounter++);
    this.canvasRightID = 'fraction-addition-with-shapes-' + (idCounter++);

    return (
      <div className='fraction-addition-with-shapes'>
        <div className='pies'>
          <canvas id={ this.canvasLeftID } width={ WIDTH } height={ HEIGHT }></canvas>
          <span className='symbol'>+</span>
          <canvas id={ this.canvasRightID } width={ WIDTH } height={ HEIGHT }></canvas>
          <span className='symbol'>=</span>
        </div>
        <div className='equation'>
          <span className='blocker'></span>
          <span className='symbol'>+</span>
          <span className='blocker'></span>
          <span className='symbol'>=</span>
        </div>
      </div>
    )
  }
}

FractionAdditionWithShapesGenerator.defaultProps = defaultProps

class FractionAdditionWithShapesEditor extends QuestionEditor {

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
        <br/>
        
      </div>
    )
  }
}

FractionAdditionWithShapesEditor.defaultProps = defaultProps

const FractionAdditionWithShapes = {
  name: 'fractionAdditionWithShapes',
  title: 'Fraction Addition with Shapes',
  description: 'Learn about addition of fractions visually',
  difficultyLevel:4,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: FractionAdditionWithShapesGenerator,
  editor: FractionAdditionWithShapesEditor,
}

module.exports = FractionAdditionWithShapes




// 'use strict';

// const c = require('../constants');
// // const zerosToSpace = require('../zeros_to_space');
// const doTimes = require('../do_times');
// const rand = require('roddeh-rand');
// const prepareConfig = require('../prepare_config');

// let config = {
//   minNumber: 0,
//   maxNumber: 3,
//   minDivisor: 2,
//   maxDivisor: 12,
// }


// let WIDTH = 150;
// let HEIGHT = 140;
// let idCounter = 0;
// let RADIUS = 16;

// function draw(canvasLeftID, canvasRightID){
//   let frac1 = makeFrac();
//   let frac2 = makeFrac();
//   drawPies(frac1.num, frac1.divisor, frac1.dividend, document.getElementById(canvasLeftID).getContext('2d'))
//   drawPies(frac2.num, frac1.divisor, frac1.dividend, document.getElementById(canvasRightID).getContext('2d'))
// }

// function makeFrac(){
//   let num = rand(config.minNumber, config.maxNumber);
//   let divisor = rand(config.minDivisor, config.maxDivisor);
//   let dividend = rand(1, divisor - 1);
//   return {num, divisor, dividend};
// }


// function drawPies(num, divisor, dividend, ctx){
  

//   let xOff = (WIDTH - ((num + 1) * RADIUS * 2.2)) / 2;

//   doTimes(num, (i) => {
//     ctx.save();
//     drawCircle(ctx, i * RADIUS * 2.2 + xOff, divisor, divisor);
//     ctx.restore();
//   })
//   drawCircle(ctx, num * RADIUS * 2.2 + xOff, dividend, divisor);

// }

// function drawCircle(ctx, x, dividend, divisor){
//   let deg = Math.PI * 2 / divisor;

//   x += RADIUS;
//   let y = HEIGHT / 2;

//   ctx.fillStyle = '#CCC';
//   ctx.translate(x, y);

//   doTimes(divisor, (n) => {
//     ctx.beginPath();
//     ctx.moveTo(0, 0);
//     ctx.lineTo(0, -RADIUS);
//     ctx.arc(0, 0, RADIUS, -Math.PI / 2, -Math.PI / 2 - deg, true);
//     ctx.lineTo(0, 0)
//     if(n < dividend){
//       ctx.fill();
//     }
//     ctx.stroke();
//     ctx.rotate(deg);
//   })
// }



// function generateQuestion(){
//   let canvasLeftID = 'fraction-addition-with-shapes-' + (idCounter++);
//   let canvasRightID = 'fraction-addition-with-shapes-' + (idCounter++);
//   let html = `
//     <div class='fraction-addition-with-shapes'>
//       <div class='pies'>
//         <canvas id='${ canvasLeftID }' width='${ WIDTH }' height='${ HEIGHT }'></canvas>
//         <span class='symbol'>+</span>
//         <canvas id='${ canvasRightID }' width='${ WIDTH }' height='${ HEIGHT }'></canvas>
//         <span class='symbol'>=</span>
//       </div>
//       <div class='equation'>
//         <span class='blocker'></span>
//         <span class='symbol'>+</span>
//         <span class='blocker'></span>
//         <span class='symbol'>=</span>
//       </div>
//     </div>
//   `
//   return {html, finalise:() => {
//     draw(canvasLeftID, canvasRightID);
//   }}
// }

// let fractionsWithShapes = {
//   type: c.questionShapes.WIDE_RECT,
//   prepare(cfg){
//     config = prepareConfig(cfg || {}, config);
//     return this;
//   },
//   generateQuestion,
// };

// module.exports = fractionsWithShapes;