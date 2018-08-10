import React from 'react'
import c from '../constants'
import rand from '../utils/rand'
import doTimes from '../utils/do_times'
import QuestionEditor from '../question_editor'

const defaultProps = {
  vertexCount: 5,
}

let idCounter = 0
const SIZE = 300

const MAX_EDGES = {}
MAX_EDGES[5] = 2
MAX_EDGES[6] = 5
MAX_EDGES[7] = 7
MAX_EDGES[8] = 12

class GraphTraceGenerator extends React.Component {

  updateCanvas(){
    this.drawGraph(this.prepareGraph())
  }

  prepareGraph(){
    // Create Vertices
    let vertices = []
    doTimes(this.props.vertexCount, (i) => {
      vertices.push({edges:[], index:i})
    })
    // Join them in a circle
    doTimes(this.props.vertexCount, (i) => {
      let v1 = vertices[i]
      let v2 = vertices[i + 1]
      if(i === this.props.vertexCount - 1){
        v2 = vertices[0]
      }
      v1.edges.push(v2)
      v2.edges.push(v1)
    })
    // Add additional edges such that there will only be two with an uneven count
    let edgeCount = MAX_EDGES[this.props.vertexCount]
    let current = rand(vertices)
    doTimes(edgeCount, () => {
      let found = false
      let next
      let attempts = 0
      while(true && attempts < 10){
        next = rand(vertices)
        attempts++
        if(current !== next && current.edges.indexOf(next) === -1){
          break
        }
      }

      current.edges.push(next)
      next.edges.push(current)
      current = next
    })
    
    return vertices
  }

  drawGraph(vertices){
    let ctx = document.getElementById(this.canvasID).getContext('2d');
    ctx.clearRect(0, 0, SIZE, SIZE)
    // Draw Graph
    const RAD = 90
    const S2 = SIZE / 2
    vertices.forEach((v1) => {
      v1.edges.forEach((v2) => {
        let p1 = v1.index / this.props.vertexCount * Math.PI * 2
        let p2 = v2.index / this.props.vertexCount * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(Math.sin(p1) * RAD + S2, Math.cos(p1) * RAD + S2)
        ctx.lineTo(Math.sin(p2) * RAD + S2, Math.cos(p2) * RAD + S2)
        ctx.stroke()
      })
    })


    // Draw Vertices
    vertices.forEach((v1) => {
      let p1 = v1.index / this.props.vertexCount * Math.PI * 2
      ctx.beginPath()
      ctx.fillStyle = '#FFF'
      ctx.arc(Math.sin(p1) * RAD + S2, Math.cos(p1) * RAD + S2, 20, 0, Math.PI * 2)
      ctx.stroke()
      ctx.fill()

      // console.log(v1.index);
      // ctx.fillStyle = '#000'
      // ctx.font = '20px monospace'
      // ctx.fillText(v1.index, Math.sin(p1) * RAD + S2, Math.cos(p1) * RAD + S2)
    })
  }

  componentDidMount(){
    this.updateCanvas()
  }

  componentDidUpdate(){
    this.updateCanvas()
  }

  render(){
    this.canvasID = 'graph-trace-' + (idCounter++);
    return (
      <div className='graph-trace'>
        <div>Count the number of edges leaving each vertex.  Then trace the graph with a single stroke without going over any edge more than once.</div>
        <br/>
        <canvas id={ this.canvasID } width={ SIZE } height={ SIZE }></canvas>
      </div>
    )
  }
}

GraphTraceGenerator.defaultProps = defaultProps

class GraphTraceEditor extends QuestionEditor {

  render(){
    return (
      <div className='editor-form'>
        <label>Vertex Count:</label>
        <input type='range' name='vertexCount' min='5' max='8' step='1' value={ this.state.vertexCount } onChange={ this.handleRangeChange }></input>
        <label>{ this.state.vertexCount }</label>
      </div>
    )
  }
}

GraphTraceEditor.defaultProps = defaultProps

const GraphTrace = {
  name: 'graphTrace',
  title: 'Graph Trace',
  description: 'Learn the basics of graph theory by tracing counting and tracing edges',
  difficultyLevel:8,
  layoutType: c.questionShapes.LARGE_SQUARE,
  generator: GraphTraceGenerator,
  editor: GraphTraceEditor,
}

module.exports = GraphTrace