import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import { Link } from 'react-router-dom';
import 'brace/mode/java';
import 'brace/theme/xcode';

import { createPost } from '../actions/action_posts'; 

class PostNew extends Component {
  renderInput(field) {
    const className = 'form-group';

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    );
  }

  renderEditor(field) {
    const className = 'form-group';
    const aceOnBlur = (onBlur) => (_event, editor) => {
      if (!editor) return;
      const value = editor.getValue();
      onBlur(value);
    };
    console.log(field);

    return (
      <div className={className}>
        <label>{field.label}</label>
        {/* <textarea
          className="form-control"
          type="text"
          {...field.input}
        /> */}
        <AceEditor
          mode="java"
          theme="xcode"
          name="new_editor"
          width="100%"
          // onChange={onChange}
          // value={this.state.code}
          onBlur={aceOnBlur(field.input.onBlur)}
          value = {field.input.value}
          editorProps={{$blockScrolling: true}}
        />
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, this.props.authedUser, (postId)=>{
      this.props.history.push(`/posts/${postId}`);
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="mt-3">
        <Field
          label="Title"
          name="title"
          component={this.renderInput}
        />
        <Field
          label="Code"
          name="code"
          component={this.renderEditor}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to={'/'} className="btn btn-secondary ml-2">
            Home
        </Link>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    authedUser: state.authedUser
  };
}

export default reduxForm({
  form: 'PostNewForm'
})(
  connect(mapStateToProps, { createPost })(PostNew)
);

