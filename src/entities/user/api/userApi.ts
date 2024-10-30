import { User, UserInfo } from "../model/types"

export const userApi = {
  // 전체 사용자 가져오기
  fetchUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch("/api/users?limit=0&select=username,image")
      const data = await response.json()
      return data
    } catch (error) {
      console.error("전체 사용자의 이름과 이미지 가져오기 오류:", error)
      throw error
    }
  },

  // 사용자 정보 가져오기
  fetchUserInfo: async (userId: number): Promise<UserInfo> => {
    try {
      const response = await fetch(`/api/users/${userId}`)
      const userData = await response.json()
      return userData
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
      throw error
    }
  },
}
