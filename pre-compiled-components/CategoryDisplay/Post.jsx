const React = require('react');

class Post extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <a style ={this.props.visible} className="grid-item post-link" href={`http://blog.tycc.io/posts/${this.props.data.slug}`}>
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
