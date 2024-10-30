import { NewComment, Comments, CommentInfo } from "../model/types"

export const commentApi = {
  // 댓글 가져오기
  fetchComments: async (postId: number): Promise<Comments> => {
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
      throw error
    }
  },

  // 댓글 추가
  addComment: async (newComment: NewComment): Promise<CommentInfo> => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error("댓글 추가 오류:", error)
      throw error
    }
  },

  // 댓글 업데이트
  updateComment: async (updatedComment: CommentInfo): Promise<CommentInfo> => {
    try {
      const response = await fetch(`/api/comments/${updatedComment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: updatedComment.body }),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
      throw error
    }
  },

  // 댓글 삭제
  deleteComment: async (commentId: number): Promise<CommentInfo> => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
      throw error
    }
  },

  // 댓글 좋아요
  likeComment: async (commentId: number, updateLike: number): Promise<CommentInfo> => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: updateLike }),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
      throw error
    }
  },
}
