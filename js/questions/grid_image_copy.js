import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import rand from '../utils/rand'
import QuestionEditor from '../question_editor'

let defaultProps = {
  size: 3,
  rotate: true,
}

let idCounter = 0;

const SIZE = 40;

class GridImageCopyGenerator extends React.Component {

  updateCanvas(){
    if(!this.props.rotate){
      return
    }

    let ctx = document.getElementById(this.canvasID).getContext('2d');
    let rotation = rand(2);

    ctx.beginPath();
    switch(rotation){
      case 0: 
        ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 5, -Math.PI / 2, -Math.PI, true);
        ctx.moveTo(5, SIZE / 2);
        ctx.lineTo(0, SIZE / 2 - 5)
        ctx.moveTo(5, SIZE / 2);
        ctx.lineTo(10, SIZE / 2 - 5)
        break;
      case 1:
        ctx.arc (SIZE / 2, SIZE / 2, SIZE / 2 - 5, -Math.PI / 2, 0);
        ctx.moveTo(SIZE - 5, SIZE / 2);
        ctx.lineTo(SIZE - 10, SIZE / 2 - 5)
        ctx.moveTo(SIZE - 5, SIZE / 2);
        ctx.lineTo(SIZE, SIZE / 2 - 5)
        break;
      case 2:
        ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 5, -Math.PI / 2, Math.PI / 2);
        ctx.moveTo(SIZE / 2, SIZE - 5);
        ctx.lineTo(SIZE / 2 + 5, SIZE);
        ctx.moveTo(SIZE / 2, SIZE - 5);
        ctx.lineTo(SIZE / 2 + 5, SIZE - 10);
        break;
    }
    ctx.stroke();
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    let size = this.props.size;
    this.canvasID = 'grid-image-copy-' + (idCounter++);

    return (
      <div className="grid-image-copy">
        <span>Copy the shape into the grid.</span>
        <br/>
        <br/>
        <table className="shape">
          <tbody>
            {
              doTimes(size, (i) => { 
                return (
                  <tr key={ i }>
                    {
                      doTimes(size, (i) => {
                        if(Math.random() > 0.5){
                          return <td key={ i } className="shade"><span/></td>
                        }
                        else{
                          return <td key={ i }>&nbsp;</td>
                        }
                      })
                    }     
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {
          (() => { return this.props.rotate ? <canvas id={ this.canvasID } width={ SIZE } height={ SIZE }></canvas> : null })()
        }
        <table className="blank">
          <tbody>
            {
              doTimes(size, (i) => { 
                return (
                  <tr key={ i }>
                    {
                      doTimes(size, (i) => { 
                        return <td key={ i }></td>
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

GridImageCopyGenerator.defaultProps = defaultProps

class GridImageCopyEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Grid image size:</label>
        <input type='range' name='size' min='3' max='6' step='1' value={ this.state.size } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.size }</label>
        <br/>
        <label>Rotate image:</label>
        <input type='checkbox' name='rotate' defaultChecked={ this.state.rotate } onChange={ this.handleCheckboxChange }></input>
      </div>
    )
  }
}

GridImageCopyEditor.defaultProps = defaultProps

const GridImageCopy = {
  name: 'gridImageCopy',
  title: 'Grid Image Copy',
  description: 'Copy the image into the grid. Optionally rotate the image to add an extra challenge',
  difficultyLevel:4,
  layoutType: c.questionShapes.WIDE_RECT,
  generator: GridImageCopyGenerator,
  editor: GridImageCopyEditor,
}

module.exports = GridImageCopy