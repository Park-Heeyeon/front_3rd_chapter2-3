import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { tagApi } from "../../../entities/tag/api/tagApi"
import { Tag } from "../../../entities/tag/model/types"
import { Post } from "../../../entities/post/model/types"

// 태그 가져오기
export const useTagsQuery = (): UseQueryResult<Tag[], Error> => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => tagApi.fetchTags(),
  })
}

// 태그별 게시물 가져오기
export const usePostByTagQuery = (tag: string): UseQueryResult<Post[], Error> => {
  return useQuery({
    queryKey: ["posts", "tag", tag],
    queryFn: () => tagApi.fetchPostsByTag(tag),
  })
}
