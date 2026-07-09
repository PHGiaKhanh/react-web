import axios from 'axios'
import { API_ROOT } from '~/utils/constants'


// tất cả function dưới không try catch hay then catch vì sẽ dư thừa code
//catch lỗi tập trung ở 1 chỗ bằng cách dừng axios Interceptors
//Interceptors đánh lỗi ở giữa request hoặc response

/**boards**/
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  //luu ý: axios tra kq ve qua property cuar nos laf data
  return response.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  //luu ý: axios tra kq ve qua property cuar nos laf data
  return response.data
}

export const moveCardToAnotherColumnAPI = async ( updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_cards`, updateData)
  return response.data
}

/**columns**/
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  //luu ý: axios tra kq ve qua property cuar nos laf data
  return response.data
}

/**cards**/
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}