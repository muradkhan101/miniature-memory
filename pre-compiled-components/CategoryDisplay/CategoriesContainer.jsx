const React = require('react');
const SingleCategoryContainer = require('./SingleCategoryContainer');
const actions = require('../redux/reducers/actions')
const CategoryToggle = require('./CategoryToggle');
const Post = require('./Post');

class CategoriesContainer extends React.Component{
  constructor(props) {
    super(props);
    this.toggleCategory = this.toggleCategory.bind(this);
  }
  toggleCategory(toggle) {
    this.props.dispatch(actions.toggleVisibility(toggle));
  }
  checkVisibility(category) {
    for (var i = 0; i < this.props.categories; i++) {
      if (this.props.categories[i][0] === category) return this.props.categories[i].visible;
    }
  }
  getVisibility(post, category) {
    return (checkVisibility(category) ? {display: 'inline-block'} : {display: 'none'})
  }
  render() {
    return (
      <div>
        <div className="card-title"><h1>Posts by Category</h1></div>
        <div className="category-toggles flex-row">
          {this.props.categories.map((e, i) => {
            return <CategoryToggle key={e.category} category={e.category} checked={e.visible} click={this.toggleCategory}/>
          })}
        </div>
        <div className="home-masonry-grid">
          {this.props.posts.map((e, i) => {
            return <Post data={e} key={i} style={this.getVisibility(e, categories[0])}/>
          })}
        </div>
      </div>
    )
  }
}

module.exports = CategoriesContainer;
