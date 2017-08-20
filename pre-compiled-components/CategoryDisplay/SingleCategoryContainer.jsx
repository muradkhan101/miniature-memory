const react = require('react');
const contentful = require('../contentful/contentfulAPI');
const Post = require('./Post');

let SingleCategoryContainer = react.createClass({
  componentDidMount: () => {
    contentful.client.getEntries({
        content_type: contentful.typeID.post,
        'fields.tags[ne]': this.props.category
    }).then((data) => {
      for (let i = 0; i < data.items.length; i++) {
         dispatch(addPost(this.props.category, contentful.extractPostInfo(data.items[i])));
      }
    })
  },
  getVisibility: () => {
    return (this.props.visible ? 'display: inline-block;' : 'display: none;')
  },
  render: () => {
    return (
      <div class={`${this.props.category}-post-container`} style={this.getVisibility()}>
        this.props.posts.map((e) => {
          <Post data={e} />
        })
      </div>
    )
  }
})

module.exports = SingleCategoryContainer;
