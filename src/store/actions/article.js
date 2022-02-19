import request from '@/utils/request'

export const getChannelAction = () => {
  return async (dispatch) => {
    const { data } = await request.get('/channels')
    dispatch({ type: 'article/channel', list: data.channels })
  }
}
export const getArticleAction = (datas) => {
  return async (dispatch) => {
    const { data: { page, per_page, results, total_count } } = await request.get('/mp/articles', { params: datas })
    const params = {
      page,
      pageSize: per_page,
      list: results.map(item => {
        return {
          ...item,
          cover: item.cover.images[0]
        }
      }),
      total: total_count
    }
    dispatch({ type: 'article/get', params })
  }
}
export const delArticleAction = (id, params) => {
  return async (dispatch) => {
    await request.delete(`/mp/articles/${id}`)
    dispatch(getArticleAction(params))
  }
}

export const addArticleAction = (data, draft, isEdit) => {
  return async (dispatch, getState) => {
    if (isEdit) {
      await request.put(`/mp/articles/${data.id}?draft=${draft}`, data)
    } else {
      await request.post(`/mp/articles?draft=${draft}`, data)
    }

    // dispatch({ type: , payload})
  }
}