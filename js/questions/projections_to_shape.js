import React from 'react'
import c from '../constants'
import doTimes from '../utils/do_times'
import rand from '../utils/rand'
import shuffle from '../utils/shuffle'
import QuestionEditor from '../question_editor'

const defaultProps = {}

const WIDTH = 350;
const HEIGHT = 350;
const SIZE = 3
let idCounter = 0;


const SHAPES = [
  [
    [1,1,1,0,0,1,0,0,1],
    [1,0,0,1,0,0,1,1,1],
    [0,0,1,0,0,1,1,1,1],
  ],

  [
    [1,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,0,1,0,0],
    [1,1,1,0,0,1,0,0,1],
  ],
  [
    [1,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,0,1,0,0],
    [1,1,1,0,0,1,1,1,1],
  ],
  [
    [0,1,0,1,1,1,0,1,0],
    [1,1,1,1,1,1,1,1,1],
    [0,1,0,1,1,1,0,1,0],
  ],


]

class ProjectionsToShapeGenerator extends React.Component {

  updateCanvas(){
    let ctx = document.getElementById(this.canvasID).getContext('2d')
    ctx.clearRect(0, 0, WIDTH, HEIGHT)

    const SIZE = 80

    doTimes(30, (i) => {
      doTimes(50, (j) => {
        let offset = j % 2 === 0 ? SIZE / 2 : 0
        ctx.beginPath()
        ctx.arc(i * SIZE + offset, j * SIZE / 4, 1, 0, Math.PI * 2);
        ctx.fill()
      })
    })
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'projections-to-shapes-' + (idCounter++);
    let sides = rand(SHAPES)
    return (
      <div className='projections-to-shapes'>
        <canvas id={ this.canvasID } width={ WIDTH } height={ HEIGHT }></canvas>
        { this.renderTable('Top', sides[0]) }
        { this.renderTable('Left', sides[1]) }
        { this.renderTable('Right', sides[2]) }
      </div>
    )
  }

  renderTable(lbl, shape){
    return (
      <div className='projection-table'>
        <label>{ lbl }</label>
        <br/>
        <table>
          <tbody>
            {
              doTimes(SIZE, (i) => {
                return (
                  <tr key={ i }>
                    {
                      doTimes(SIZE, (j) => {
                        if(shape[i * 3 + j]){
                          return <td key={ j } className='fill'></td>
                        }
                        else{
                          return <td key={ j }></td>
                        }
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

ProjectionsToShapeGenerator.defaultProps = defaultProps

class ProjectionsToShapeEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
      </div>
    )
  }
}

ProjectionsToShapeEditor.defaultProps = defaultProps

const ProjectionsToShape = {
  name: 'projectionsToShape',
  title: 'Projections to Shape',
  description: 'Convert the projections of each face into a 3-Dimensional shape.',
  difficultyLevel:8,
  layoutType: c.questionShapes.DOUBLE_LARGE_SQUARE,
  generator: ProjectionsToShapeGenerator,
  editor: ProjectionsToShapeEditor,
}

module.exports = ProjectionsToShape