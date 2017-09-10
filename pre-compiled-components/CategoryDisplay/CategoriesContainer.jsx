const React = require('react');
const SingleCategoryContainer = require('./SingleCategoryContainer');
const actions = require('../redux/reducers/actions')
const CategoryToggle = require('./CategoryToggle');
const Post = require('./Post');

class CategoriesContainer extends React.Component{
  constructor(props) {
    super(props);
    this.toggleCategory = this.toggleCategory.bind(this);
    this.checkVisibility = this.checkVisibility.bind(this);
    this.getVisibility = this.getVisibility.bind(this);
  }
  toggleCategory(toggle) {
    this.props.dispatch(actions.toggleVisibility(toggle));
  }
  checkVisibility(category) {
    for (var i = 0; i < this.props.categories.length; i++) {
      if (this.props.categories[i].category === category) return this.props.categories[i].visible;
    }
  }
  getVisibility(post, category) {
    return (this.checkVisibility(category) ? {display: 'inline-block'} : {display: 'none'})
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
          <div class='grid-sizer'></div>
          {this.props.posts.map((e, i) => {
            return <Post data={e} key={i} visible={this.getVisibility(e, e.categories[0])}/>
          })}
        </div>
      </div>
    )
  }
}

module.exports = CategoriesContainer;
