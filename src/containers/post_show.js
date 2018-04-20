import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, updatePostReaded } from "../actions/action_posts";
import { fetchComments } from "../actions/action_comments";
import AceEditor from "react-ace";
import _ from "lodash";
import authService from "../services/service_auth";

import CommentBox from "../containers/comment_box";
import GeneralComment from "../containers/general_comment";

import { commentsCounter } from "../helpers";

class PostShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {}
    };
  }

  componentDidMount() {
    this.id = this.props.match.params.id;
    this.props.fetchPost(this.id);
  }

  handleLineSelect(selection) {
    this.props.fetchComments(this.id, selection.selectionAnchor.row);
    this.setState({
      selected: {
        id: this.id,
        line: selection.selectionAnchor.row
      }
    });
  }

  processAnotation(commentsObj) {
    // console.log(commentsObj);
    let output = [];
    _.forEach(commentsObj, (value, key) => {
      if (value === undefined || key === "general") return;
      output.push({
        row: key,
        column: 0,
        type: "info",
        text: `${value} comment(s)`
      });
    });

    return output;
  }

  renderAudio(post) {
    if (post.audioUrl !== undefined) {
      return <audio src={post.audioUrl} controls />;
    }
  }

  userCheck() {
    const user = this.props.authedUser;
    const post = this.props.post;
    const readed = post.user.readed;
    if (user === null || post.user.uid !== user.uid) {
      return;
    }
    let commentsCount = commentsCounter(post.comments);
    if (readed === undefined || readed !== commentsCount) {
      // this.props.updatePostReaded();
      this.props.updatePostReaded(this.props.match.params.id, commentsCount);
    }
  }

  render() {
    const { post } = this.props;
    const { authedUser } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    this.userCheck();

    const badgeClass = `mb-3 badge badge-primary badge-pill badge-mode--${
      post.mode ? post.mode : "java"
    }`;
    let annotations = this.processAnotation(post.comments);
    return (
      <div>
        <Link to={"/"} className="btn btn-outline-secondary mt-2">
          Back
        </Link>
        <h1 className="mt-2 mb-0">{post.title}</h1>
        <span className={badgeClass}>{post.mode ? post.mode : "java"}</span>
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="row">
                <AceEditor
                  mode={post.mode ? post.mode : "java"}
                  theme="tomorrow"
                  name="show_editor"
                  width="100%"
                  value={post.code}
                  onSelectionChange={this.handleLineSelect.bind(this)}
                  readOnly
                  editorProps={{ $blockScrolling: true }}
                  setOptions={{ useWorker: false }}
                  annotations={annotations}
                />
                <div className="o-post__meta">
                  {this.renderAudio(post)}
                  <p>
                    Notes:<br />
                    {post.note}
                  </p>
                </div>
                <GeneralComment selected={this.props.match.params.id} />
              </div>
            </div>
            <div className="col">
              <CommentBox selected={this.state.selected} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts, authedUser }, ownProps) {
  return {
    post: posts[ownProps.match.params.id],
    authedUser,
    selected: {}
  };
}

export default connect(mapStateToProps, {
  fetchPost,
  fetchComments,
  updatePostReaded
})(PostShow);
