import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactMic } from 'react-mic';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/xcode';

import { createPost } from '../actions/action_posts'; 

class PostNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record : false,
      blob : null,
      timer : 90,
    };
  }

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


  renderNote(field) {
    return (
      <div className="form-group">
        <label htmlFor="content">Leave additonal note</label>
        <textarea
          className="form-control form-textarea"
          {...field.input}
        ></textarea>
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
    this.props.createPost(values, this.state.blob, this.props.authedUser, (postId)=>{
      this.props.history.push(`/posts/${postId}`);
    });
  }

  startRecording = () => {
    this.setState({
      record: true,
      timer: 90
    });

    this.countDown = setInterval(()=>{
      if (this.state.timer === 0) {
        clearInterval(this.countDown);
      }
      this.setState({
        timer: this.state.timer - 1
      })
    }, 1000);
  }
 
  stopRecording = () => {
    this.setState({
      record: false
    });

    clearInterval(this.countDown);
  }
 
  onStop = (recordedBlob) => {
    this.setState({
      blob: recordedBlob
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
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
          <Field
            label="Note"
            name="note"
            component={this.renderNote}
          />
          <div className="m-audio form-group">
            <label>Add audio to explain your thoughts</label>
            <div className="m-audio__wrap">
              <div className="m-audio__timer">
              <div >{this.state.timer}s</div>
              </div>
              <div className="m-audio__wave">
              <ReactMic
                record={this.state.record}
                className="sound-wave"
                onStop={this.onStop}
                strokeColor="#484848"
                backgroundColor="#FFFFFF" />
              </div>
            </div>
            <div className="btn-group mt-1">
              <button onClick={this.startRecording} type="button" className="btn btn-success btn-sm">Start</button>
              <button onClick={this.stopRecording} type="button" className="btn btn-danger btn-sm">Stop</button>
            </div>
            <audio className="mt-1" controls src={this.state.blob ? this.state.blob.blobURL : '' }></audio>
          </div>
          <div className="mt-5">
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to={'/'} className="btn btn-secondary ml-2">
              Home
          </Link>
          </div>
        </form>
      </div>
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

