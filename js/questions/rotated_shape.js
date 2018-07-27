import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import shuffle from '../utils/shuffle'
import QuestionEditor from '../question_editor'

const defaultProps = {
  size: 3,
}

const WIDTH = 500;
const HEIGHT = 200;
let idCounter = 0;

const BLOCK_SIZE = 10;

let SHAPES = {
  '3':[
    `
    111
    010
    111
    `,
    `
    101
    010
    111
    `,
    `
    101
    101
    111
    `,
    `
    101
    101
    110
    `,
    `
    101
    101
    010
    `,
    `
    010
    101
    110
    `,
    `
    010
    101
    111
    `,
    `
    110
    101
    110
    `,
    `
    111
    101
    111
    `,
    `
    010
    101
    010
    `,
    `
    010
    111
    101
    `,
  ],
  '4':[
    `
    1010
    1111
    0010
    1110
    `,
    `
    1110
    1011
    0010
    1111
    `,
    `
    0101
    1111
    0101
    1111
    `,
    `
    1001
    1111
    1010
    1010
    `,
    `
    1001
    1111
    1001
    1100
    `,
    `
    0110
    1100
    0111
    1100
    `,
    `
    1001
    1111
    1101
    0011
    `,
  ],
  '5':[
    `
    10001
    10110
    11101
    10010
    10010
    `,
    `
    10101
    10110
    01101
    11010
    10010
    `,
    `
    10111
    10110
    11101
    01010
    01010
    `,
    `
    10111
    10110
    00101
    01010
    01011
    `,
    `
    10101
    10111
    11101
    01010
    01011
    `,
    `
    11101
    00111
    11101
    11011
    01011
    `,
  ]
}


class RotatedShapeGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d');
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    let shapes = shuffle(SHAPES[this.props.size]);
    this.drawShape(ctx, shapes[0], BLOCK_SIZE, 0, false, '#000');

    shapes = shapes.slice(0, 6)
    shapes.push(shapes[0], shapes[0])

    let answers = shuffle(shapes);

    answers.forEach((a, i) => {
      let yOffset = 0;
      if(i  > 3){
          i -= 4;
          yOffset = 80;
      }
      this.drawShape(ctx, a, (i + 1.5) * BLOCK_SIZE * (this.props.size + 3), yOffset, true, '#999');
    });

  }

  drawShape(ctx, shape, xOffset, yOffset, rotate, colour){
    let blocks = shape.split('');
    blocks = blocks.filter((b) => { return (b === '1' || b === '0') });
    ctx.save()
    ctx.translate(xOffset + (BLOCK_SIZE * this.props.size / 2) + 30, (BLOCK_SIZE * this.props.size / 2) + 40 + yOffset)

    ctx.beginPath()
    ctx.fillStyle = colour;

    if(rotate){
      ctx.rotate(Math.PI * 2 * Math.random());  
    }

    blocks.forEach((b, i) => {
      if(b !== '1'){
        return;
      }
      let y = i % this.props.size;
      let x = Math.floor(i / this.props.size);
      x -= this.props.size / 2;
      y -= this.props.size / 2;
      ctx.rect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      ctx.fill();
    });
    ctx.restore();
  }

  componentDidMount(){
    this.updateCanvas()
  }
  
  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'rotated-shape-' + (idCounter++);
    return (
      <div className='rotated-shape'>
        <span>Draw a circle around all the shapes that match the first one.</span>
        <canvas id={ this.canvasID } width={ WIDTH } height={ HEIGHT }></canvas>
      </div>
    )
  }
}

RotatedShapeGenerator.defaultProps = defaultProps

class RotatedShapeEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Range example:</label>
        <input type='range' name='size' min='3' max='5' step='1' value={ this.state.size } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.size }</label>
      </div>
    )
  }
}

RotatedShapeEditor.defaultProps = defaultProps

const RotatedShape = {
  name: 'rotatedShape',
  title: 'Rotated Shape',
  description: 'Find the shapes that match by mentally rotating them',
  difficultyLevel:2,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: RotatedShapeGenerator,
  editor: RotatedShapeEditor,
}

module.exports = RotatedShape