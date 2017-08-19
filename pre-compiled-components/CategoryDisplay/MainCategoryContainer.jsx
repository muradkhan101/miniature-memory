const react = require('react');
const contentful = require('../contentful/contentfulAPI');
const CategoriesContainer = require('./CategoriesContainer');

let CategoryListContainer = react.createClass({
    getInitialState: () => {
        return {
            categories: []
        }
    },
    componentDidMount: () => {
        contentful.client.getEntries({
          content_type: contentful.typeID.category
        }).then((data)=>{
          let allCategories = [];
          for (var i = 0; i < data.items.length; i++) {
            allCategories.push(data.items[i].fields.title);
          }
          this.setState({categories: allCategories})
        })
    },
    render: () => {
      return (
          (<CategoriesContainer categories={this.state.categories} />)
        )
    }
})
