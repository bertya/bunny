import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchGeneralComments, createGeneralComment } from '../actions/action_comments';
import { login } from '../actions/action_auth';
import _ from 'lodash';

class GeneralComment extends Component {
  componentDidMount() {
    this.props.fetchGeneralComments(this.props.postId);
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
          <p>{comment.content}</p>
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
    this.props.createGeneralComment(this.props.postId, values, this.props.authedUser, () => {
      this.props.reset();
      this.props.fetchGeneralComments(this.props.postId);
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
    return (
      <div className="comment-general">
        <h3>Comments:</h3>
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
    comments: state.generalComments,
    postId: ownProps.selected,
    authedUser: state.authedUser
  };
}

export default reduxForm({
  validate,
  form: 'GeneralCommentNewForm'
})(
  connect(mapStateToProps, { createGeneralComment, fetchGeneralComments, login })(GeneralComment)
);