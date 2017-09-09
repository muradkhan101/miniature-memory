const React = require('react');
const SingleCategoryContainer = require('./SingleCategoryContainer');
const actions = require('../redux/reducers/actions')
const CategoryToggle = require('./CategoryToggle');

class CategoriesContainer extends React.Component{
  constructor(props) {
    super(props);
    this.toggleCategory = this.toggleCategory.bind(this);
  }
  toggleCategory(toggle) {
    this.props.dispatch(actions.toggleVisibility(toggle));
  }
  render() {
    var categories = [];
    for (let category in this.props.categories) {
      categories.push(this.props.categories[category]);
    }
    return (
      <div>
        <div className="card-title"><h1>Posts by Category</h1></div>
        <div className="category-toggles flex-row">
          {categories.map((e, i) => {
            return <CategoryToggle key={e.category} category={e.category} checked={e.visible} click={this.toggleCategory}/>
          })}
        </div>
        <div className="home-masonry-grid">
          {categories.map((e, i) => {
            return <SingleCategoryContainer key={e.category} category={e.category} posts={e.posts} visible={e.visible}/>
          })}
        </div>
      </div>
    )
  }
}

module.exports = CategoriesContainer;
