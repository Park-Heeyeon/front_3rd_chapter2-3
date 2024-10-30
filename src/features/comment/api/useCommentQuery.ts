import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { Comments } from "../../../entities/comment/model/types"
import { commentApi } from "../../../entities/comment/api/commentApi"

// 댓글 가져오기
export const useCommentsQuery = (postId: number): UseQueryResult<Comments, Error> => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => commentApi.fetchComments(postId),
  })
}
