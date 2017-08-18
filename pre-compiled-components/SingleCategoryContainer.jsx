const react = require('react');
const contentful = require('../contentful/contentfulAPI');
const Post = require('./Post');

let SingleCategoryContainer = React.createClass({
  getInitialState: () => {
    return {
      posts: []
    }
  },
  componentDidMount: () => {
    contentful.client.getEntries({
        content_type: contentful.typeID.post,
        'fields.tags[ne]': this.props.category
    }).then((data) => {
      let allPosts = [];
      for (let i = 0; i < data.items.length; i++) {
         allPosts.push(contentful.extractPostInfo(data.items[i]));
      }
      this.setState({posts: allPosts})
    })
  },
  getVisibility: () => {
    return (this.props.visible ? 'display: initial;' : 'display: none;')
  },
  render: () => {
    return (
      <div class={`${this.props.category}-post-container`} style={this.getVisibility()}>
        this.state.posts.map((e) => {
          <Post data={e} />
        })
      </div>
    )
  }
})

module.exports = SingleCategoryContainer;
