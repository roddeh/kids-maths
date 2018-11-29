import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

const defaultProps = {
  size: 3
}

const WIDTH = 350;
const HEIGHT = 350;
const SIZE = 3
let idCounter = 0;

const PROJECTION_SHAPES_2 = [
  [1, 1, 1, 1],
  [1, 1, 1, 0],
]

const PROJECTION_SHAPES_3 = [
  [1,1,1,1,0,0,1,1,1],
  [1,1,1,1,0,0,1,0,0],
  [1,1,1,1,0,1,1,1,1],
  [1,0,1,1,0,1,1,1,1],
  [1,0,1,1,0,1,1,0,1],
]


class ShapeProjectionsGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d')
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    let w = SIZE
    let h = SIZE
    let l = SIZE

    let ps = this.props.size === 2 ? PROJECTION_SHAPES_2 : PROJECTION_SHAPES_3
    let dim = this.props.size

    let leftShape = rand(ps)
    let rightShape = rand(ps)
    let topShape = rand(ps)
    
    let size = 40;    
    let totalHeight = size * h + (w + l) * size * 0.3;
    let startX = HEIGHT / 2;
    let startY = HEIGHT - (HEIGHT - totalHeight);
    for(let i = 0; i < w; i++){
      for(let j = 0; j < h; j++){
        for(let k = 0; k < l; k++){

          let ls = leftShape[i * dim + j]
          let rs = rightShape[j * dim + k]
          let ts = topShape[k * dim + i]
          if(rs && ts & ls){
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
    this.canvasID = 'shape-projections-' + (idCounter++);
    return (
      <div className='shape-projections'>
        <canvas id={ this.canvasID } width={ WIDTH } height={ HEIGHT }></canvas>
        { this.renderTable('Top') }
        { this.renderTable('Left') }
        { this.renderTable('Right') }
      </div>
    )
  }

  renderTable(lbl){
    return (
      <div className='projection-table'>
        <label>{ lbl }</label>
        <br/>
        <table>
          <tbody>
            {
              doTimes(this.props.size, (i) => {
                return (
                  <tr key={ i }>
                    {
                      doTimes(this.props.size, (j) => {
                        return <td key={ j }></td>
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

ShapeProjectionsGenerator.defaultProps = defaultProps

class ShapeProjectionsEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Size:</label>
        <input type='range' name='size' min='2' max='3' step='1' value={ this.state.size } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.size }</label>
        <br/>        
      </div>
    )
  }
}

ShapeProjectionsEditor.defaultProps = defaultProps

const ShapeProjections = {
  name: 'shapeProjections',
  title: 'Shape Projections',
  description: 'Mentally map 3-Dimensinoal shapes onto their respective projections.',
  difficultyLevel:7,
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: ShapeProjectionsGenerator,
  editor: ShapeProjectionsEditor,
}

module.exports = ShapeProjections