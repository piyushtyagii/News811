import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],       // ✅ Always start as an array
      page: 1,
      loading: false,
      totalresults: 0,
      error: null         // ✅ Track API errors
    };
  }

  fetchNews = async (page) => {
    try {
      this.setState({ loading: true, error: null });
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=0cd4a673f1274cd4aa8329ff4c7ddd30&page=${page}&pageSize=20`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const parseddata = await response.json();

      this.setState({
        page: page,
        articles: Array.isArray(parseddata.articles) ? parseddata.articles : [],
        totalresults: parseddata.totalResults || 0,
        loading: false
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({
        loading: false,
        error: error.message,
        articles: []
      });
    }
  };

  async componentDidMount() {
    this.fetchNews(1);
  }

  handlenextclick = () => {
    this.fetchNews(this.state.page + 1);
  };

  handlepreviousclick = () => {
    this.fetchNews(this.state.page - 1);
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className='text-center'>News811 - Top Headlines</h1>

        {this.state.loading && <Spinner />}

        {this.state.error && !this.state.loading && (
          <p className="text-center text-danger">
            Failed to load news: {this.state.error}
          </p>
        )}

        {!this.state.loading && this.state.articles.length === 0 && !this.state.error && (
          <p className="text-center">No articles available.</p>
        )}

        <div className="row">
          {!this.state.loading && Array.isArray(this.state.articles) &&
            this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <Newsitem
                  title={element.title || " "}
                  description={element.description || " "}
                  imageurl={element.urlToImage}
                  readnews={element.url}
                  author={element.author || "Unknown"}
                  time={element.publishedAt}
                  source={element.source?.name}
                  newsid="newsid"
                />
              </div>
            ))
          }
        </div>

        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlepreviousclick}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={(this.state.page + 1) > Math.ceil(this.state.totalresults / 20)}
            className="btn btn-dark"
            onClick={this.handlenextclick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

