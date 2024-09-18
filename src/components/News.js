import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';


export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading:false
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=0cd4a673f1274cd4aa8329ff4c7ddd30&page=1&pageSize=20`;
    this.setState({loading:true})
    let news = await fetch(url)
    let parseddata = await news.json()
    console.log(parseddata)
    this.setState({loading:false})
    this.setState({ articles: parseddata.articles, totalresults: parseddata.totalResults })
  }
  handlenextclick = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=0cd4a673f1274cd4aa8329ff4c7ddd30&page=${this.state.page + 1}&pageSize=20`;
      this.setState({loading:true})
      let news = await fetch(url)
      let parseddata = await news.json()
      console.log(parseddata)
      this.setState({loading:false})
      this.setState({
        page: this.state.page + 1,
        articles: parseddata.articles
      })
  }
  handlepreviousclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=0cd4a673f1274cd4aa8329ff4c7ddd30&page=${this.state.page - 1}&pageSize=20`;
    this.setState({loading:true})
    let news = await fetch(url)
    let parseddata = await news.json()
    console.log(parseddata)
    this.setState({loading:false})
    this.setState({
      page: this.state.page - 1,
      articles: parseddata.articles
    })


  }

  render() {

    return (

      <div className="container my-3">
        <h1 className='text-center'>News811 - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem title={element.title ? element.title : " "} description={element.description ? element.description : " "} imageurl={element.urlToImage} readnews={element.url} author={element.author?element.author:"Unknown"} time={element.publishedAt} source={element.source.name} newsid="newsid" />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark " onClick={this.handlepreviousclick}>Previous</button>
          <button type="button" disabled={(this.state.page + 1) > Math.ceil(this.state.totalresults / 20)}  className="btn btn-dark " onClick={this.handlenextclick}>Next</button>
        </div>
      </div>

    )
  }
}
