export interface CommentInfo {
  id: number
  body: string
  postId: number
  likes?: number
  user: {
    id: number
    username: string
    fullName: string
  }
}

export interface Comments {
  comments: CommentInfo[]
  limit: number
  skip: number
  total: number
}

export interface NewComment {
  body: string
  postId: number
  userId: number
}
