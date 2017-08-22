const React = require('react');

class Post extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <a className="grid-item post-link" href={`blog.khanmurad.com/post/${this.props.data.slug}`}>
        <div className="post cover-image" style={{'backgroundImage': `url("https://source.unsplash.com/featured/?${this.props.data.categories[0]}")`}}>
          <div className="post-title">
            <h3>{this.props.data.title}</h3>
          </div>
          <div className="post-summary">
            <p>{this.props.data.summary}</p>
          </div>
        </div>
      </a>
    )
  }
}

module.exports = Post;
