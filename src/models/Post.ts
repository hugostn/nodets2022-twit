type Post = {
  id: string,
  user_id: string,
  type: string,
  posted_at: Date,
  content: string,
  refer?: string,
}

export default Post;
