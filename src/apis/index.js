import axios from 'axios'
import { API_ROOT } from '~/utils/constants'


// tất cả function dưới không try catch hay then catch vì sẽ dư thừa code
//catch lỗi tập trung ở 1 chỗ bằng cách dừng axios Interceptors
//Interceptors đánh lỗi ở giữa request hoặc response
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  //luu ý: axios tra kq ve qua property cuar nos laf data
  return response.data
}