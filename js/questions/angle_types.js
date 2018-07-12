import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import pad from '../utils/pad'
import rand from '../utils/rand'
import shuffle from '../utils/shuffle'

const WIDTH = 150;
const HEIGHT = 150;
const ANGLES = [30, 60, 90, 120, 150, 180, 210, 240]

let idCounter = 0;

class AngleTypesGenerator extends React.Component {

  updateCanvas(){
    let angles = shuffle(ANGLES);
    let firstRotation = angles[0];
    let secondRotation = angles[1];

    let ctx = document.getElementById(this.canvasID).getContext('2d');
    ctx.translate(WIDTH / 2, HEIGHT / 2);

    function drawLine(rot){
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.rotate(rot);
      ctx.lineTo(0, -HEIGHT / 2);
      ctx.stroke();
    }
    
    ctx.save();
    drawLine(firstRotation)
    ctx.restore();
    ctx.beginPath();
    ctx.arc(0, 0, 20, firstRotation - Math.PI / 2, secondRotation - Math.PI / 2, firstRotation < secondRotation);
    ctx.stroke();
    drawLine(secondRotation);
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'angle-types-' + (idCounter++);
    return (
      <div className="angle-types">
        <span>Name and measure the angle.</span>
        <canvas id={ this.canvasID } width={ WIDTH } height={ HEIGHT }></canvas>
      </div>
    )    
  }
}

const AngleTypes = {
  name: 'angleTypes',
  title: 'Angle Types',
  description: 'Learn about the different types of angles and how to measure them.',
  difficultyLevel:4,
  layoutType: c.questionShapes.SMALL_SQUARE,
  generator: AngleTypesGenerator,
  editor: null,
}

module.exports = AngleTypes