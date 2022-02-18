const initialState = {
  channel: []
}

export const reducerArticle = (state = initialState, action) => {
  if (action.type === 'article/channel') {
    return {
      ...state,
      channel: action.list
    }
  }
  return state
}