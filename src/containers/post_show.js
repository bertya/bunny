import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost } from '../actions/action_posts';
import { fetchComments } from '../actions/action_comments';
import AceEditor from 'react-ace';
import _ from 'lodash';

import CommentBox from '../containers/comment_box';
import GeneralComment from '../containers/general_comment';

class PostShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected : {}
    };
  }

  componentDidMount() {
    this.id = this.props.match.params.id;
    this.props.fetchPost(this.id);
  }

  test(selection) {
    this.props.fetchComments(this.id, selection.selectionAnchor.row);
    this.setState({
      selected : {
        id : this.id,
        line : selection.selectionAnchor.row
      }
    });
  }

  processAnotation(commentsObj) {
    // console.log(commentsObj);
    let output = [];
    _.forEach(commentsObj,(value, key)=>{
      if (value == undefined) return;
      output.push({
        row: key,
        column: 0,
        type: 'info',
        text: `${value} comment(s)`
      });
    });

    return output;
  }

  renderAudio(post) {
    if (post.audioUrl !== undefined) {
      return (
        <audio src={post.audioUrl} controls></audio>
      );
    }
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }
    // console.log(post);
    let annotations = this.processAnotation(post.comments);

    return (
      <div>
        <h1 className="mt-5 mb-2">{post.title}</h1>
        <Link to={'/'} className="btn btn-secondary mb-2">
            Home
        </Link>
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="row">
                <AceEditor
                  mode="java"
                  theme="xcode"
                  name="show_editor"
                  width="100%"
                  value = {post.code}
                  onSelectionChange={this.test.bind(this)}
                  readOnly
                  editorProps={{$blockScrolling: true}}
                  annotations={annotations}
                />
                <div className="o-post__meta">
                  {this.renderAudio(post)}
                  <p>Notes:<br/>{post.note}</p>
                </div>
                <GeneralComment selected={this.props.match.params.id} />
              </div>
            </div>
            <div className="col">
              <CommentBox selected={this.state.selected}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return {
    post : posts[ownProps.match.params.id],
    selected : {}
  };
}

export default connect(mapStateToProps, { fetchPost, fetchComments })(PostShow);