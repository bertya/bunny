import React, { Component } from 'react';
import _ from 'lodash';

export default (props) => {

  // renderBadge() {
  //   return _.map(this.props.commentsCounter, (count, line) => {
  //     return (
  //       <div key={line}>
  //         {count}
  //       </div>
  //     );
  //   });
  // };

  return (
    <div>
      { props.commentsCounter }
    </div>
  );
}


// class LineCounter extends Component {
//   constructor(props) {
//     super(props);
//     console.log(props);
//   }

//   renderBadge() {
//     return _.map(this.props.commentsCounter, (count, line) => {
//       let style = {
//         top: `${line * 16}px`
//       }
//       return (
//         <div className="comment-badge" key={line} style={style}>
//           {count}
//         </div>
//       );
//     });
//   }

//   render() {
//     return (
//       <div className="badge-wrapper">
//         {this.renderBadge()}
//       </div>
//     );
//   }
// }

// export default LineCounter;