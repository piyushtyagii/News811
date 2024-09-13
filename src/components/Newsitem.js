
import React, { Component } from 'react'

export default class Newsitem extends Component {

  render() {

    let { title, description, imageurl, readnews, author, time ,source} = this.props
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img src={imageurl} className="card-img-top" alt="..." />
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {source}
          </span>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(time).toGMTString()}</small></p>
            <a href={readnews} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div></div>
    )
  }
}
