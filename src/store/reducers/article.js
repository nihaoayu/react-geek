const initialState = {
  channel: [],
  list: []
}

export const reducerArticle = (state = initialState, action) => {
  if (action.type === 'article/channel') {
    return {
      ...state,
      channel: action.list
    }
  }
  if (action.type === 'article/get') {
    return {
      ...state,
      ...action.params
    }
  }
  return state
}