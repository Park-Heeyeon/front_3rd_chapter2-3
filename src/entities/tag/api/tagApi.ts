import { Post } from "../../post/model/types"
import { Tag } from "../model/types"

export const tagApi = {
  // 태그 가져오기
  fetchTags: async (): Promise<Tag[]> => {
    try {
      const response = await fetch("/api/posts/tags")
      const data = await response.json()
      return data
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
      throw error
    }
  },

  // 태그별 게시물 가져오기
  fetchPostsByTag: async (tag: string): Promise<Post[]> => {
    try {
      const response = await fetch(`/api/posts/tag/${tag}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
      throw error
    }
  },
}
