var _this = this;

const React = require('react');
const contentful = require('../../contentful/contentfulAPI');
const Post = require('./Post');

let SingleCategoryContainer = React.createClass({
  displayName: 'SingleCategoryContainer',

  componentDidMount: () => {
    contentful.client.getEntries({
      content_type: contentful.typeID.post,
      'fields.tags[ne]': _this.props.category
    }).then(data => {
      for (let i = 0; i < data.items.length; i++) {
        dispatch(addPost(_this.props.category, contentful.extractPostInfo(data.items[i])));
      }
    });
  },
  getVisibility: () => {
    return _this.props.visible ? 'display: inline-block;' : 'display: none;';
  },
  render: () => {
    return React.createElement(
      'div',
      { 'class': `${_this.props.category}-post-container`, style: _this.getVisibility() },
      _this.props.posts.map(e => {
        return React.createElement(Post, { data: e });
      })
    );
  }
});

module.exports = SingleCategoryContainer;