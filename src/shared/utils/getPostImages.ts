type Post = {
  images?: { url: string }[]
}

export const getPostImages = (post: Post | null | undefined): string[] => {
  return post?.images?.map(img => img.url) ?? []
}
