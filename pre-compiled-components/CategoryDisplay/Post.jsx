const react = require('react');

let Post = react.createClass({
  render: () => {
    return (
      <a class="grid-item post-link" href={`blog.khanmurad.com/post/${this.props.data.slug}`}>
        <div class="post cover-image" style={`background-image: url("https://source.unsplash.com/featured/?${this.props.data.categories[0]}");`}>
          <div class="post-title">
            <h3>{this.props.data.title}</h3>
          </div>
          <div class="post-summary">
            <p>{this.props.data.summary}</p>
          </div>
        </div>
      </a>
    )
  }
})

module.exports = Post;
