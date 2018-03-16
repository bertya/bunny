import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchComments, createComment } from '../actions/action_comments';
import { login } from '../actions/action_auth';
import _ from 'lodash';

class CommentBox extends Component {
  componentDidMount() {
    this.props.fetchComments(this.props.postId, this.props.line);
  }

  renderComments() {
    if (this.props.comments === null) {
      return (
        <li className="list-group-item">No comment yet</li>
      );
    }

    return _.map(this.props.comments, (comment, key) => {
      let time = new Date(comment.timestamp);
      return (
        <li key={key} className="list-group-item">
          <div className="w-100">{time.toLocaleString()} by {comment.user.name}</div>
          <p className="m-commentbox__body">{comment.content}</p>
        </li>
      );
    });
  }

  renderTextArea(field) {
    const { meta: { touched, error } } = field;
    let klass = `form-control ${touched && error ? 'is-invalid' : ''}`;
    return (
      <div className="form-group">
        <label htmlFor="content">Leave a comment</label>
        <textarea
          className={klass}
          {...field.input}
        ></textarea>
        <div className="invalid-feedback">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createComment(this.props.postId, this.props.line, values, this.props.authedUser, () => {
      this.props.reset();
      this.props.fetchComments(this.props.postId, this.props.line);
    });
  }

  googleLogin() {
    this.props.login();
  }

  renderForm(handleSubmit) {
    if (this.props.authedUser !== null) {
      return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Content"
            name="content"
            component={this.renderTextArea}
          />
          <button type="submit" className="btn btn-dark">Submit</button>
        </form>
      );
    } else {
      return (
        <div>
          <div>Please login to comment</div>
          <button className="btn btn-dark" onClick={this.googleLogin.bind(this)}>Login</button>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    if (this.props.line == undefined) {
      return (
        <div>Select line to view comments</div>
      );
    }
    return (
      <div>
        <div className="comment-wrap">
          <ul className="list-group">
            {this.renderComments()}
          </ul>
        </div>
        <div className="mt-2">
          {this.renderForm(handleSubmit)}
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.content) {
    errors.content = 'Cannot be empty';
  }

  return errors;
}

function mapStateToProps(state, ownProps) {
  return {
    comments: state.comments,
    postId: ownProps.selected.id,
    line: ownProps.selected.line,
    authedUser: state.authedUser
  };
}

export default reduxForm({
  validate,
  form: 'CommentNewForm'
})(
  connect(mapStateToProps, { createComment, fetchComments, login })(CommentBox)
);