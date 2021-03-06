import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import MarkdownRenderer from 'react-markdown-renderer';
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import DateFormat from 'dateformat';

class PostsShow extends Component {

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  renderMarkdown(body) {
    return (
      <div>
        {Parser(body)}
      </div>
    )
  }

  formatStartDate(date) {
    return DateFormat(date, "dddd - mmmm dS - yyyy, h:MM TT");
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div className="blogContainer">
        <div className="blog-title">
          <h1>{post.title}</h1>
        </div>
        <div className="blog-details">
          RICHARD GURNEY
        </div>
        <div className="blog-details">
          {this.formatStartDate(post.createdAt)}
        </div>


        <div className="card-body">
          <div className="card-text">
            {this.renderMarkdown(post.body)}
          </div>
          <div className="card-subtitle mb-2 text-muted">
            RG- <Link to="/">Back</Link>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-danger"
          onClick={this.onDeleteClick.bind(this)}
        > Delete
        </button>
      </div>
    )
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
