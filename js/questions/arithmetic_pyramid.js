import React from 'react'
import c from '../constants'
import doTimes from '../do_times'
// import pad from '../pad'
import rand from '../rand'

const BASE = 5;

class ArithmeticPyramid extends React.Component {

  render(){

    let min = this.props.minNumber
    let max = this.props.maxNumber

    function table(n, blank = true){
      return (
        <div className="arithmetic-pyramid-row">
        <table key={ n }>
          <tr>
            {
              doTimes(n, () => {
                return <React.Fragment>
                  <td className='num'>{ num(blank) }</td>
                  <td>{ op()}</td>    
                </React.Fragment>
              })
            }
            <td className='num'>{ num(blank) }</td>
          </tr>
        </table>
        </div>
      )
    }

    function op(){
      return rand(['+', '-']);
    }

    function num(blank){
      if(blank){
        return '\xA0'
      }
      return rand(min, max);
    }

    return <div className="arithmetic-pyramid">
      {
        doTimes(BASE, (i) => {
          return table(i)
        })
      }
      { table(BASE, false) }
    </div>
  }
}

ArithmeticPyramid.layoutType = c.questionShapes.LARGE_SQUARE;

ArithmeticPyramid.defaultProps = {
  minNumber: 1,
  maxNumber: 12,
}

module.exports = ArithmeticPyramid