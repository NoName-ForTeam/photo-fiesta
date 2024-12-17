type Post = {
  images?: { url: string }[]
}

export const getPostImages = (post: Post): string[] => {
  return post?.images?.map(img => img.url) ?? []
}
