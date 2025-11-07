import { PostCoverImage } from "../PostCoverImage"
import { PostSummary } from "../PostSummary"
import { findAllPublicPostsCached } from "@/lib/post/queries/public"


export async function PostsLists() {
  const posts = await findAllPublicPostsCached()

  if (posts.length <= 1) return null

  return (
    <div className="grid grid-cols-1 mb-16 gap-8 sm:grid-cols-2 md:grid-cols-3">
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`

        return(
          <div className="flex flex-col gap-4 group" key={post.id}>
            <PostCoverImage
              LinkProps={{
                href: postLink,
              }}
              imageProps={{
                width: 1200,
                height: 820,
                src: post.coverImageUrl,
                alt: post.title,
              }}
            />

              <PostSummary
                postLink={postLink}
                postHeading='h2'
                createdAt={post.createdAt}
                title={post.title}
                excerpt={post.excerpt}
              />
          </div>
        )
      })}
    </div>
  )
}
