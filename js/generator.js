import React from 'react'
import Layout from './layout'
import parseQuery from './utils/parse_query'
import doTimes from './utils/do_times'
import service from './service'
import QUESTIONS from './questions'

class Generator extends React.Component {


  constructor(props){
    super(props)

    this.state = {loading:true}

    let query = parseQuery()

    service.loadConfig(query.config)
      .then((result) => {
        this.setState({loading:false, configID:query.config, config:result.config, pages:query.pages || 1})
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
    }).filter((q) => {
      return q.config.enabled
    })

    return (
      <div className='generator'>
        {
          doTimes(this.state.pages, (i) => {
            return (
              <div className='maths-page' key={ i }>
                <Layout key={ i } questions={ questions }></Layout>
              </div>
            )
          })
        }
      </div>
    )    
  }
}

module.exports = Generator