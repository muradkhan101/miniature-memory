const React = require('react');
const SingleCategoryContainer = require('./SingleCategoryContainer');
const CategoryToggle = require('./CategoryToggle');

class CategoriesContainer extends React.Component{
  constructor(props) {
    super(props);
    var categories = [];
    for (let category in this.props.categories) {
      categories.push(this.props.categories[category]);
    }
    this.state = {categories}
  }
  render() {
    return (
      <div class="card article-container">
        <div class="card-title"><h1>Posts by Category</h1></div>
        <div class="category-toggles flex-row">
          {this.state.categories.map((e, i) => {
            return <CategoryToggle key={e.category} category={e.category} checked={e.visible} click={this.props.toggleCategory}/>
          })}
        </div>
        <div class="home-masonry-grid">
          {this.state.categories.map((e, i) => {
            return <SingleCategoryContainer key={e.category} category={e.category} posts={e.posts} visible={e.visible}/>
          })}
        </div>
      </div>
    )
  }
}

module.exports = CategoriesContainer;
