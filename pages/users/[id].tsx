import { useRouter } from 'next/router'
import React, { use, useEffect } from 'react'
import { usePostsLazyQuery, useUserLazyQuery, useUserQuery } from '../../generated/graphql'
import UserRow from '../../components/molecules/UserRow'
import IndividualPost from '../../components/molecules/IndividualPost'

const User = () => {
    const router = useRouter()
    const { query } = router

    const [useUsersLazy, { data: user }] = useUserLazyQuery({ fetchPolicy: 'network-only' })
    useEffect(() => {
        if (query.id) {
            useUsersLazy({ variables: { input: { _id: query?.id as string } } })
        }
    }, [query.id])

    const [usePostsLazy, { data: posts }] = usePostsLazyQuery({
        fetchPolicy: 'network-only'
    })

    useEffect(() => {
        if (user?.user?._id)
            usePostsLazy({
                variables: { searchInput: { userId: user?.user?._id as string } },
            })
    }, [user?.user?._id])
    return (
        <div className="w-full h-[calc(100vh-60px)] flex flex-col py-10 gap-5 items-center p-5">
            <UserRow user={user?.user} />
            <div className="text-2xl">List of Todos</div>
            {!posts?.posts.length && <div className="text-xl font-bold">
                No posts currently.
            </div>}
            <div className="max-w-[600px] w-full h-[calc(100vh-60px)] flex flex-col gap-5 p-1 overflow-auto items-center">
                {posts?.posts.map((post) => (
                    <IndividualPost
                        showCommentCount
                        key={post._id}
                        fullWidth={false}
                        post={post}
                    />
                ))}
            </div>
        </div>
    )
}

export default User
