import React from 'react'
import c from './constants'
import rand from './utils/rand'

let ss = {
  type: c.questionShapes.SMALL_SQUARE,  
}

let tr = {
  type: c.questionShapes.TALL_RECT,
  rowSpan: 2,
}

let wr = {
  type: c.questionShapes.WIDE_RECT,
  colSpan: 2,
}

let ls = {
  type: c.questionShapes.LARGE_SQUARE,
  colSpan: 2,
  rowSpan: 2,
}

let ds = {
  type: c.questionShapes.DOUBLE_LARGE_SQUARE,
  colSpan: 4,
  rowSpan: 2,
}

let tableLayouts = {
  '1':[   // Small Square only
    [ss, ss, ss, ss],
    [ss, ss, ss, ss],
    [ss, ss, ss, ss],
    [ss, ss, ss, ss],
    [ss, ss, ss, ss],
    [ss, ss, ss, ss],
  ],
  '2':[   // Tall Rect only
    [tr, tr, tr, tr],
    [],
    [tr, tr, tr, tr],
    [],
    [tr, tr, tr, tr],
    [],
  ],
  '3':[   // Tall Rect and Small Square
    [tr, ss, tr, ss],
    [ss, ss],
    [tr, ss, tr, ss],
    [ss, ss],
    [tr, ss, tr, ss],
    [ss, ss],
  ],
  '4':[   // Wide Rect only
    [wr, wr],
    [wr, wr],
    [wr, wr],
    [wr, wr],
    [wr, wr],
    [wr, wr],
  ],
  '5':[   // Small Square and Wide Rect
    [wr, ss, ss],
    [ss, wr, ss],
    [ss, ss, wr],
    [wr, wr],
    [wr, ss, ss],
    [ss, wr, ss],
  ],
  '6':[   // Tall Rect and Wide Rect
    [wr, tr, tr],
    [wr],
    [tr, wr, tr],
    [wr],
    [tr, tr, wr],
    [wr],
  ],
  '7':[   // Small Square, Wide Rect, Tall Rect
    [wr, tr, ss],
    [tr, ss, ss],
    [wr, ss],
    [wr, ss, tr],
    [wr, ss],
    [ss, wr, ss],
  ],
  '8':[   // Large Square only
    [ls, ls],
    [],
    [ls, ls],
    [],
    [ls, ls],
    [],
  ],
  '9':[   // Small Square and Large Square
    [ls, ls],
    [],
    [ss, ss, ss, ss],
    [ls, ss, ss],
    [ls],
    [ss, ss],
    [],
  ],
  '10':[   // Tall Rect and Large Square
    [ls, tr, tr],
    [],
    [ls, ls],
    [],
    [tr, tr, ls],
    [],
  ],
  '11':[   // Tall Rect, Small Square and Large Square
    [ls, tr, tr],
    [],
    [ls, ss, ss],
    [ss, ss],
    [ss, tr, ls],
    [ss],
  ],
  '12':[   // Large Square and Wide Rect
    [ls, wr],
    [wr],
    [wr, ls],
    [wr],
    [ls, wr],
    [wr],
  ],
  '13':[   // Large Square, Wide Rect, Small Square
    [ls, wr],
    [ss, ss],
    [wr, wr],
    [ss, ss, ss, ss],
    [ls, wr],
    [ss, ss],
  ],
  '14':[   // Large Square, Tall Rect and Wide Rect, Small Square
    [ls, wr],
    [wr],
    [tr, tr, ls],
    [],
    [ls, wr],
    [wr],
  ],
  '15':[   // Everything, except double large square
    [ls, wr],
    [ss, tr],
    [wr, ss],
    [tr, ss, ss, tr],
    [ls],
    [ss, ss],
  ],
  '16':[  // Double large square
    [ds],
    [],
    [ds],
    [],
    [ds],
    [],
  ],
  '17':[  // Double large square, small square
    [ds],
    [],
    [ss, ss, ss, ss],
    [ds],
    [],
    [ss, ss, ss, ss],
  ],
  '18':[  // Double large square, tall rect
    [ds],
    [],
    [tr, tr, tr, tr],
    [],
    [ds],
    [],
  ],
  '19':[  // Double large square, tall rect, small square
    [ds],
    [],
    [ss, ss, tr, tr],
    [ss, ss],
    [ds],
    [],
  ],
  '20':[  // Double large square
    [ds],
    [],
    [wr, wr],
    [ds],
    [],
    [wr, wr],
  ],
  '21':[  // Double large square, wide rect, small square
    [ds],
    [],
    [wr, ss, ss],
    [ss,ss, wr],
    [wr, ss, ss],
    [ss,ss, wr],
  ],
  '22':[  // Double large square, wide rect, tall rect
    [ds],
    [],
    [wr, tr, tr],
    [wr],
    [ds],
    [],
  ],
  '23':[  // Double large square, wide rect, tall rect, small square
    [ds],
    [],
    [wr, tr, tr],
    [ss, ss],
    [ds],
    [],
  ],
  '24':[  // Double large square, large square
    [ds],
    [],
    [ls, ls],
    [],
    [ds],
    [],
  ],
  '25':[  // Double large square, large square, small square
    [ds],
    [],
    [ss, ss, ls],
    [ss, ss],
    [ds],
    [],
  ],
  '26':[  // Double large square, large square, tall rect
    [ds],
    [],
    [tr, tr, ls],
    [],
    [ds],
    [],
  ],
  '27':[  // Double large square, large square, tall rect, small square
    [ds],
    [],
    [ss, tr, ls],
    [ss],
    [ds],
    [],
  ],
  '28':[  // Double large square, wide rect, large square
    [ds],
    [],
    [wr, ls],
    [wr],
    [wr, ls],
    [wr],
  ],
  '29':[  // Double large square, wide rect, large square, small square
    [ds],
    [],
    [wr, ls],
    [ss, ss],
    [wr, ls],
    [ss, ss],
  ],
  '30':[  // Double large square, wide rect, large square, tall rect
    [ds],
    [],
    [wr, ls],
    [wr],
    [ls, tr, tr],
    [],
  ],
  '31':[  // Everything
    [ds],
    [],
    [wr, tr, ss],
    [ss, ss, ss],
    [ls, tr, ss],
    [ss],
  ]

};

class Layout extends React.Component {


  render(){
    
    let questions = this.props.questions

    let questionsInLayout = {}
    questionsInLayout[c.questionShapes.SMALL_SQUARE] = []
    questionsInLayout[c.questionShapes.TALL_RECT] = []
    questionsInLayout[c.questionShapes.WIDE_RECT] = []
    questionsInLayout[c.questionShapes.LARGE_SQUARE] = []
    questionsInLayout[c.questionShapes.DOUBLE_LARGE_SQUARE] = []

    let layoutMask = 0;

    questions.forEach((q) => {
      let type = q.definition.layoutType
      questionsInLayout[type].push(q)
      layoutMask = layoutMask | type
    })

    let questionResults = []
    let layout = tableLayouts[layoutMask]
 
    return (<table className='layout'><tbody>
      {
        layout.map((rowLayout, index) => {
          return (
            <tr key={ index }>
              {
                rowLayout.map((cell, ind) => {
                  let question = rand(questionsInLayout[cell.type])
                  return (
                    <td colSpan={ cell.colSpan || 1 } rowSpan={ cell.rowSpan || 1} key={ ind }>
                      {
                        React.createElement(question.definition.generator, question.config)
                      }
                    </td> 
                  )
                })
              }
            </tr>)
        })
      }
      </tbody></table>
    )
  }
}

module.exports = Layout