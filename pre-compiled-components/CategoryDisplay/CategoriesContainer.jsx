const react = require('react');
const SingleCategoryContainer = require('./SingleCategoryContainer');
const CategoryToggle = require('./CategoryToggle');

let CategoriesContainer = react.createClass({
  render: () => {
    return (
      <div class="card article-container">
        <div class="card-title"><h1>Posts by Category</h1></div>
        <div class="category-toggles flex-row">
          this.props.categories.map((e, i) => {
            <CategoryToggle category={e.category} checked={e.visible} click={this.toggleCategory}/>
          })
        </div>
        <div class="home-masonry-grid">
          this.props.categories.map((e, i) => {
            <SingleCategoryContainer category={e.category} posts={e.posts} visible={e.visible}/>
          })
        </div>
      </div>
    )
  },
  toggleCategory: (toggle) => {
    dispatch(toggleVisibility(toggle.category));
  }
})

module.exports = CategoriesContainer;
