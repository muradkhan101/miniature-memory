const react = require('react');
const SingleCategoryContainer = require('./SingleCategoryContainer');
const CategoryToggle = require('./CategoryToggle');

let CategoriesContainer = React.createClass({
  getInitialState: () => {
    return {
      buttonStates: this.props.categories.map(e => true)
    }
  },
  render: () => {
    return (
      <div class="card article-container">
        <div class="card-title"><h1>Posts by Category</h1></div>
        <div class="category-toggles flex-row">
          this.props.categories.map((e, i) => {
            <CategoryToggle category={e} index={i} checked={this.state.buttonStates[i]} click={this.toggleCategory}/>
          })
        </div>
        <div class="home-masonry-grid">
          this.props.categories.map((e, i) => {
            <SingleCategoryContainer category={e} visible={this.state.buttonStates[i]}/>
          })
        </div>
      </div>
    )
  },
  toggleCategory: (toggle) => {
    console.log(this);
    var buttons = this.state.buttonStates;
    buttons[toggle.index] = !buttons[toggle.index];
    this.setState({buttonStates: buttons})
  }
})

module.exports = CategoriesContainer;
