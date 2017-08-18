var _this = this;

const react = require('react');
const contentful = require('../contentful/contentfulAPI');
const CategoriesContainer = require('./CategoriesContainer');

let CategoryListContainer = React.createClass({
    displayName: 'CategoryListContainer',

    getInitialState: () => {
        return {
            categories: []
        };
    },
    componentDidMount: () => {
        contentful.client.getEntries({
            content_type: contentful.typeID.category
        }).then(data => {
            let allCategories = [];
            for (var i = 0; i < data.items.length; i++) {
                allCategories.push(data.items[i].fields.title);
            }
            _this.setState({ categories: allCategories });
        });
    },
    render: () => {
        return React.createElement(CategoriesContainer, { categories: _this.state.categories });
    }
});