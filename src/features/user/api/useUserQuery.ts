import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { User, UserInfo } from "../../../entities/user/model/types"
import { userApi } from "../../../entities/user/api/userApi"

// 전체 사용자 가져오기
export const useUsersQuery = (): UseQueryResult<User[], Error> => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userApi.fetchUsers(),
  })
}

// 사용자 정보 가져오기
export const useUserInfoQuery = (userId: number): UseQueryResult<UserInfo, Error> => {
  return useQuery({
    queryKey: ["userInfo", userId],
    queryFn: () => userApi.fetchUserInfo(userId),
  })
}
