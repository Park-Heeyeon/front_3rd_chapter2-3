import { NewPost, Post } from "../model/types"

export const postApi = {
  // 게시물 가져오기
  fetchPosts: async (limit: string, skip: string): Promise<Post[]> => {
    try {
      const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
      throw error
    }
  },

  // 게시물 추가
  addPost: async (newPost: NewPost): Promise<Post> => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error("게시물 추가 오류:", error)
      throw error
    }
  },

  // 게시물 업데이트
  updatePost: async (updatedPost: Post): Promise<Post> => {
    try {
      const response = await fetch(`/api/posts/${updatedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      })
      const data = await response.json()
      return data
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
      throw error
    }
  },

  // 게시물 삭제
  deletePost: async (id: number): Promise<void> => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
      throw error
    }
  },

  // 게시물 검색
  searchPost: async (searchQuery: string): Promise<Post[]> => {
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error("게시물 검색 오류:", error)
      throw error
    }
  },
}
