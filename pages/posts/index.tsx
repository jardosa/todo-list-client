import React from 'react'
import { usePostsQuery, useWhoAmIQuery } from '../../generated/graphql'
import getFullname from '../../utils/selectors/fullName'
import IndividualPost from '../../components/molecules/IndividualPost'
import Link from 'next/link'

const Posts = () => {
    const { data: userData, loading } = useWhoAmIQuery()
    const { data: postsData } = usePostsQuery({
        variables: { searchInput: { userId: userData?.whoAmI?._id as string } },
    })

    const fullName = getFullname(userData)

    return (
        <div className="w-full h-[calc(100vh-60px)] flex items-center flex-col py-5 gap-5">
            <div className="text-2xl">{`Posts for ${fullName}`}</div>
            {!!postsData?.posts?.length ? (
                <div className="w-full gap-5 flex flex-col items-center overflow-auto py-2">
                    {postsData?.posts?.map((post) => (
                        <IndividualPost
                            key={post._id}
                            post={post}
                            showCommentCount
                            fullWidth={false}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-xl font-bold">
                    You have no posts.{' '}
                    <span>
                        <Link
                            className="hover:text-green-400 focus:text-green-400 transition cursor-pointer underline"
                            href={'/'}
                        >
                            Add one!
                        </Link>
                    </span>
                </div>
            )}
        </div>
    )
}

export default Posts
