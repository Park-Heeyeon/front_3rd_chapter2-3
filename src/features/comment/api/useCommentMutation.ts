import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import { CommentInfo, Comments, NewComment } from "../../../entities/comment/model/types"
import { commentApi } from "../../../entities/comment/api/commentApi"

// 댓글 추가
export const useAddCommentQuery = (): UseMutationResult<CommentInfo, Error, NewComment> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (newComment: NewComment) => commentApi.addComment(newComment),
    onSuccess: (response: CommentInfo) => {
      // 댓글 추가 후 쿼리 데이터 업데이트
      queryClient.setQueryData(["comments", response.postId], (prevComments: Comments) => {
        const updatedComments = { ...prevComments, comments: [...prevComments.comments, { ...response, likes: 0 }] }
        return updatedComments
      })
    },
  })
}

// 댓글 업데이트
export const useUpdateCommentQuery = (): UseMutationResult<CommentInfo, Error, CommentInfo> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (updatedComment: CommentInfo) => commentApi.updateComment(updatedComment),
    onSuccess: (response: CommentInfo) => {
      queryClient.setQueryData(["comments", response.postId], (prevComments: Comments) => {
        const updatedComments = {
          ...prevComments,
          comments: prevComments.comments.map((comment) => (comment.id === response.id ? response : comment)),
        }
        return updatedComments
      })
    },
  })
}

// 댓글 삭제
export const useDeleteCommentQuery = (): UseMutationResult<CommentInfo, Error, number> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (commentId: number) => commentApi.deleteComment(commentId),
    onSuccess: (response: CommentInfo) => {
      queryClient.setQueryData(["comments", response.postId], (prevComments: Comments) => {
        const updatedComments = {
          ...prevComments,
          comments: prevComments.comments.filter((comment) => comment.id !== response.id),
        }
        return updatedComments
      })
    },
  })
}

// 댓글 좋아요
export const useLikeCommentMutation = (): UseMutationResult<
  CommentInfo,
  Error,
  { commentId: number; updateLike: number }
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ commentId, updateLike }) => commentApi.likeComment(commentId, updateLike),
    onSuccess: (response: CommentInfo) => {
      queryClient.setQueryData(["comments", response.postId], (prevComments: Comments) => {
        const updatedComments = {
          ...prevComments,
          comments: prevComments.comments.map((comment) =>
            comment.id === response.id ? { ...response, likes: (response.likes ?? 0) + 1 } : comment,
          ),
        }
        return updatedComments
      })
    },
  })
}
