
//Actions
const ADD_CATEGORY = 'ADD_CATEGORY';
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';
const ADD_POST = 'ADD_POST';
const GOT_POST = 'GOT_POST';
const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_POSTS = 'GET_POSTS';

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
const getPosts = (category) => {
  return {type: GET_POSTS, category};
}
const getCategories = () => {
  return {type: GET_CATEGORIES, category};
}
//Action Handlers

const handleAction = (state = {loadedCategories: false}, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return Object.assign({}, state, newCategory(state[action.category], action));
    case TOGGLE_VISIBILITY:
      return Object.assign({}, state, manageVisibility(state[action.category], action));
    case ADD_POST:
      return Object.assign({}, state, newPost(state[action.category], action));
    case GOT_POST:
      return Object.assign({}, state, gotPost(state[action.category], action));
    case GET_POSTS:
      fetchPostsByCategory()
      return state;
    case GET_CATEGORIES:
      fetchCategories();
      return Object.assign({}, state, {loadedCategories: true})
    default:
      return state;
  }
};

const newCategory = (state = {}, action) => {
  return {
    [action.category]: {
      posts: [],
      visible: true,
      got_posts: false
    }}
};

const manageVisibility = (state = {}, action) => {
  return Object.assign({}, state, {
      visible: !state.visible,
    });
};

const newPost = (state = {}, action) => {
  return Object.assign({}, state, {
      posts: [...state[action.category].posts, action.data]
    });
};

const gotPost = (state = {}, action) => {
  return Object.assign({}, state, {
      got_posts: true
    });
};

const fetchCategories = () => {
  return (dispatch) => {
      return contentful.client.getEntries({
        content_type: contentful.typeID.category
      }).then((data) => {
        for (var i = 0; i < data.items.length; i++) {
          dispatch(addCategory(data.items[i].fields.title));
        }
      })
  }
}

const fetchUnloadedPosts = (state) => {
  return (dispatch) => {
    for (let category in Object.keys(state)) {
      if (!state[category].got_posts)
        return (new Promise((res, rej) => {
          res(dispatch(fetchPostsByCategory(category)))
        })).then(() => {
          dispatch(gotPosts(category))
        })
    }
  }
}

const fetchPostsByCategory = (category) => {
  return (dispatch) => {
    return contentful.client.getEntries({
        content_type: contentful.typeID.post,
        'fields.tags[ne]': category
    }).then((data) => {
      for (let i = 0; i < data.items.length; i++) {
         dispatch(addPost(category, contentful.extractPostInfo(data.items[i])));
      }
    }).then(() => {
      dispatch(gotPost(category));
    })
  }
}
module.exports = {
  ADD_CATEGORY,
  TOGGLE_VISIBILITY,
  ADD_POST,
  GET_POSTS,
  GET_CATEGORIES,
  addCategory,
  toggleVisibility,
  addPost,
  handleAction,
  fetchCategories,
  fetchUnloadedPosts,
  fetchPostsByCategory
}
