const contentful = require('../../../contentful/contentfulAPI');

//Actions
const ADD_CATEGORY = 'ADD_CATEGORY';
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';
const ADD_POST = 'ADD_POST';
const GOT_POST = 'GOT_POST';

const addCategory = category => {
  return { type: ADD_CATEGORY, category };
};

const toggleVisibility = category => {
  return { type: TOGGLE_VISIBILITY, category };
};

const addPost = (category, data) => {
  return { type: ADD_POST, category, data };
};

const gotPosts = category => {
  return {type: GOT_POST, category};
}
//Action Handlers

const handleAction = (state = {}, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return Object.assign({}, state, newCategory(state[action.category], action));
    case TOGGLE_VISIBILITY:
      return Object.assign({}, state, {[action.category]: manageVisibility(state[action.category], action)});
    case ADD_POST:
      return Object.assign({}, state, {[action.category]: newPost(state[action.category], action)});
    case GOT_POST:
      return Object.assign({}, state, {[action.category]: gotPost(state[action.category], action)});
    default:
      return state;
  }
};

const newCategory = (state = {}, action) => {
  return {
    [action.category]: {
      posts: [],
      visible: true,
      got_posts: false,
      category: action.category
    }}
};

const manageVisibility = (state = {}, action) => {
  return Object.assign({}, state, {
      visible: !state.visible,
    });
};

const newPost = (state = {}, action) => {
  return Object.assign({}, state, {
      posts: [...state.posts, action.data]
    });
};

const gotPost = (state = {}, action) => {
  return Object.assign({}, state, {
      got_posts: true
    });
};

const fetchCategories = () => {
  return dispatch => {
    return contentful.client.getEntries({
      content_type: contentful.typeID.category
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
          content_type: contentful.typeID.post,
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
  ADD_CATEGORY,
  TOGGLE_VISIBILITY,
  ADD_POST,
  addCategory,
  toggleVisibility,
  addPost,
  handleAction,
  fetchCategories,
  fetchUnloadedPosts
};
