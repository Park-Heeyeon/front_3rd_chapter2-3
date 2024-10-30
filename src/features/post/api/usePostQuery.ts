import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { postApi } from "../../../entities/post/api/postApi"
import { Post } from "../../../entities/post/model/types"

// 게시물 가져오기
export const usePostsQuery = (limit: string, skip: string): UseQueryResult<Post[], Error> => {
  return useQuery({
    queryKey: ["posts", { limit, skip }],
    queryFn: () => postApi.fetchPosts(limit, skip),
  })
}
