import _ from "lodash";

export function commentsCounter(comments) {
  let total = 0;
  if (comments) {
    total = _.reduce(comments, function(sum, n) {
      return sum + n;
    });
  }
  return total;
}
