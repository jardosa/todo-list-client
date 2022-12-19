import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { usePostsLazyQuery, useUserQuery } from '../../generated/graphql'
import UserRow from '../../components/molecules/UserRow'
import IndividualPost from '../../components/molecules/IndividualPost'

const User = () => {
    const router = useRouter()
    const { query } = router
    const { data: user } = useUserQuery({
        variables: { input: { _id: query.id as string } },
        skip: !query?.id,
    })

    const [usePostsLazy, { data: posts }] = usePostsLazyQuery()

    useEffect(() => {
        if (query?.id)
            usePostsLazy({
                variables: { searchInput: { userId: query.id as string } },
            })
    }, [query.id])
    return (
        <div className="w-full h-[calc(100vh-60px)] flex flex-col py-10 gap-5 items-center">
            <UserRow user={user?.user} />
            <div className="text-2xl">List of Todos</div>
            {posts?.posts.map((post) => (
                <IndividualPost
                    showCommentCount
                    key={post._id}
                    fullWidth={false}
                    post={post}
                />
            ))}
        </div>
    )
}

export default User
