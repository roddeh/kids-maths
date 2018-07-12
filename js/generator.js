import React from 'react'
import Layout from './layout'
import parseQuery from './utils/parse_query'
import service from './service'
import QUESTIONS from './questions'

class Generator extends React.Component {


  constructor(props){
    super(props)

    this.state = {loading:true}

    let query = parseQuery()

    service.loadConfig(query.config)
      .then((result) => {
        this.setState({loading:false, configID:query.config, config:result.config})
      })
      .catch((error) => {
        console.log('Handle the error', error);
      })

  }


  render(){
    if(this.state.loading){
      return <div className='loader'>Loading...</div>
    }

    let questions = this.state.config.questions.map((q) => {
      let question = QUESTIONS.find((v) => v.name === q.name)
      return ({name:question.name, config:q, definition:question})
    })

    return (
      <div className='generator'>
        <Layout questions={ questions }></Layout>
      </div>
    )    
  }
}

module.exports = Generator