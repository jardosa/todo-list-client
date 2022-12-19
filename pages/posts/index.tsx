import React, { useEffect } from 'react'
import { usePostsLazyQuery, useWhoAmIQuery } from '../../generated/graphql'
import getFullname from '../../utils/selectors/fullName'
import IndividualPost from '../../components/molecules/IndividualPost'
import Link from 'next/link'

const Posts = () => {
    const { data: userData, loading } = useWhoAmIQuery()

    const [usePostsLazy, { data: postsData }] = usePostsLazyQuery({
        fetchPolicy: 'network-only',
    })

    useEffect(() => {
        if (userData?.whoAmI._id) {
            usePostsLazy({
                variables: {
                    searchInput: { userId: userData.whoAmI._id, limit: 10 },
                },
            })
        }
    }, [userData?.whoAmI._id])

    const fullName = getFullname(userData)

    return (
        <div className="w-full h-[calc(100vh-60px)] flex items-center flex-col p-5 gap-5">
            <div className="text-2xl">{`Posts for ${fullName}`}</div>
            {!!postsData?.posts?.length ? (
                <div className="w-full gap-5 flex flex-col items-center overflow-auto py-2 px-2">
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
