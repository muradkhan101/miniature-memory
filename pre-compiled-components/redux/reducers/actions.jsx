//Actions
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY';
export const ADD_POST = 'ADD_POST';

export const addCategory = (category) =>  {
  return {type: ADD_CATEGORY, category}
}

export const toggleVisibility = (category) => {
  return {type: TOGGLE_VISIBILITY, category}
}

export const addPost = (category, data) => {
  return {type: ADD_POST, category, data}
}
//Action Handlers

export const handleAction = (state = {}, action) => {
  switch (action.type) {
    case (ADD_CATEGORY):
      return newCategory(state, action);
      break;
    case (TOGGLE_VISIBILITY):
      return manageVisibility(state, action);
      break;
    case (ADD_POST):
      return newPost(state, action);
    default:
      return state;
  }
}

const newCategory = (state = [], action) => {
  return (Object.assign({}, state, {
      [action.category]: {
        posts: [],
        visible: true
    }
  }));
}

const manageVisibility = (state = [], action) => {
    return (Object.assign({}, state, {
      [action.category]: {
        posts: [...state[action.category].posts],
        visible: !state[action.category].visible
      }
    }))
}

const newPost = (state = [], action) => {
  return (Object.assign({}, state, {
    [action.category]: {
      posts: [...state[action.category].posts, action.data],
      visible: state[action.category].visible
    }
  }))
}
