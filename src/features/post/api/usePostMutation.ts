import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import { postApi } from "../../../entities/post/api/postApi"
import { NewPost, Post } from "../../../entities/post/model/types"

// 게시물 추가
export const useAddPostMutation = (): UseMutationResult<Post, Error, NewPost> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newPost: NewPost) => postApi.addPost(newPost),
    onSuccess: (response: Post) => {
      // 현재 'posts' 쿼리 데이터를 가져옴
      const posts = queryClient.getQueryData<Post[]>(["posts"]) || []
      // 새로운 게시물을 앞에 추가하여 쿼리 데이터 업데이트
      queryClient.setQueryData(["posts"], [response, ...posts])
    },
  })
}

// 게시물 업데이트
export const useUpdatePostMutation = (): UseMutationResult<Post, Error, Post> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updatedPost: Post) => postApi.updatePost(updatedPost),
    onSuccess: (response: Post) => {
      // 현재 'posts' 쿼리 데이터를 가져옴
      const posts = queryClient.getQueryData<Post[]>(["posts"]) || []
      // 업데이트된 게시물로 목록 업데이트
      const updatePosts = posts.map((post) => (post.id === response.id ? response : post))
      // 쿼리 데이터 업데이트
      queryClient.setQueryData(["posts"], updatePosts)
    },
  })
}

// 게시물 삭제
export const useDeletePostMutation = (): UseMutationResult<number, Error, number> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await postApi.deletePost(id) // Promise를 반환하도록 await 사용
      return id // 삭제한 ID를 반환
    },
    onSuccess: (id: number) => {
      // 현재 'posts' 쿼리 데이터를 가져옴
      const posts = queryClient.getQueryData<Post[]>(["posts"]) || []

      // 삭제할 게시물을 제외한 목록 필터링
      const filteredPosts = posts.filter((post) => post.id !== id)

      // 쿼리 데이터 업데이트
      queryClient.setQueryData(["posts"], filteredPosts)
    },
  })
}
