import React from 'react'
import Layout from './layout'

import VerticalAddition from './questions/vertical_addition'
import AdditionWithIcons from './questions/addition_with_icons'
import AngleTypes from './questions/angle_types'
import ArithmeticPyramid from './questions/arithmetic_pyramid'

class Generator extends React.Component {




  render(){

    let questions = [
      {
        // config:{numDigits:1},
        definition: VerticalAddition
      },
      {
        definition: AdditionWithIcons
      },
      {
        definition: AngleTypes
      },
      {
        definition: ArithmeticPyramid
      }
    ]

    return (
      <div className='generator'>
        <Layout questions={ questions }></Layout>
      </div>
    )    
  }
}

module.exports = Generator