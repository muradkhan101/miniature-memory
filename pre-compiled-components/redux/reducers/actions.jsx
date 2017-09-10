const contentful = require('../../contentful/contentfulAPI');

//Actions
const ADD_CATEGORY = 'ADD_CATEGORY';
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';
const ADD_POST = 'ADD_POST';

const addCategory = category => {
  return { type: ADD_CATEGORY, category };
};

const toggleVisibility = category => {
  return { type: TOGGLE_VISIBILITY, category };
};

const addPost = (category, data) => {
  return { type: ADD_POST, category, data };
};

//Action Handlers

const handleAction = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return Object.assign({}, state, {categories: newCategory(state.categories, action)});
    case TOGGLE_VISIBILITY:
      return Object.assign({}, state, {categories: manageVisibility(state.categories, action)});
    case ADD_POST:
      return Object.assign({}, state, {posts: newPost(state.posts, action)})
    default:
      return state;
  }
};

const newCategory = (state = [], action) => {
  return state.concat({
    category: action.category,
    visible: true
  })
};

const manageVisibility = (state = [], action) => {
  return state.map(e => {
    return {
      category: e.category,
      visible: e.category === action.category ? !e.visible : e.visible
    }
  })
};

const newPost = (state = [], action) => {
  var uniquePost = true;
  for (var i = 0; i < state.length; i++) {
    if (state[i].slug === action.data.slug) {
      uniquePost = false;
      break;
    }
  }
  return ( uniquePost ? state.concat(action.data) : state )
};


const fetchCategories = () => {
  return dispatch => {
    return contentful.client.getEntries({
      content_type: contentful.typeId.category
    }).then(data => {
      var categories = [];
      for (var i = 0; i < data.items.length; i++) {
        categories.push(data.items[i].fields.title);
        dispatch(addCategory(data.items[i].fields.title));
      }
      return categories;
    });
  };
};

function fetchUnloadedPosts(categories, dispatch) {
  return dispatch => {
    let promises = categories.map(function(category) {
      return new Promise((resolve, reject) => {
        contentful.client.getEntries({
          content_type: contentful.typeId.post,
          'fields.tags[ne]': category
        }).then(data => {
          for (let i = 0; i < data.items.length; i++) {
            var something = dispatch(addPost(category, contentful.extractPostInfo(data.items[i])));
          }
          resolve();
        })
      })
    })
    return Promise.all(promises).then(val => {
      return val;
    });
  }
}

module.exports = {
  addCategory,
  toggleVisibility,
  addPost,
  handleAction,
  fetchCategories,
  fetchUnloadedPosts
};
