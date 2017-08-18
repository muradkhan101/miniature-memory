var _this = this;

const react = require('react');
const contentful = require('../contentful/contentfulAPI');
const Post = require('./Post');

let SingleCategoryContainer = React.createClass({
  displayName: 'SingleCategoryContainer',

  getInitialState: () => {
    return {
      posts: []
    };
  },
  componentDidMount: () => {
    contentful.client.getEntries({
      content_type: contentful.typeID.post,
      'fields.tags[ne]': _this.props.category
    }).then(data => {
      let allPosts = [];
      for (let i = 0; i < data.items.length; i++) {
        allPosts.push(contentful.extractPostInfo(data.items[i]));
      }
      _this.setState({ posts: allPosts });
    });
  },
  getVisibility: () => {
    return _this.props.visible ? 'display: initial;' : 'display: none;';
  },
  render: () => {
    return React.createElement(
      'div',
      { 'class': `${_this.props.category}-post-container`, style: _this.getVisibility() },
      'this.state.posts.map((e) => ',
      React.createElement(Post, { data: e }),
      ')'
    );
  }
});

module.exports = SingleCategoryContainer;