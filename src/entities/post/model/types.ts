export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
  views?: number
  author?: {
    id: number
    username: string
    image: string
  }
}

export interface NewPost {
  title: string
  body: string
  userId: number
}
