import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { usePostLazyQuery, useWhoAmIQuery } from '../../generated/graphql'
import IndividualPost from '../../components/molecules/IndividualPost'
import Comment from '../../components/molecules/Comment'
import AddComment from '../../components/molecules/AddComment'

const Post = () => {
    const router = useRouter()
    const { query } = router
    const [lazyPostFetch, { data, loading, error }] = usePostLazyQuery()

    const { data: userData } = useWhoAmIQuery()

    useEffect(() => {
        if (query.id) {
            lazyPostFetch({ variables: { _id: query.id as string } })
        }
    }, [query.id])
    if (!data?.post) {
        return null
    }

    return (
        <div className="flex w-full h-[calc(100vh-60px)] flex-col items-center justify-start py-10 px-5 gap-5">
            {!data?.post && <PostNotAvailable />}
            {data?.post && (
                <IndividualPost
                    fullWidth={false}
                    key={data?.post._id}
                    post={data?.post}
                />
            )}
            <div className="text-2xl">Comments</div>
            <AddComment postId={data?.post._id} />
            <div className="gap-5 max-w-[600px] w-full flex flex-col items-center overflow-y-auto py-5 px-1">
                {data?.post?.comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))}
            </div>
        </div>
    )
}

export default Post

const PostNotAvailable = () => {
    return <div>Post not available</div>
}
