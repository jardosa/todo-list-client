import { ChevronRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { UserQuery, usePostsQuery, PostStatus, usePostsLazyQuery } from '../../generated/graphql'
import { getUserFullName } from '../../utils/selectors/fullName'
import { useEffect } from 'react'

const UserRow = ({
    user,
    showViewProfile,
}: {
    user: UserQuery['user'] | undefined
    showViewProfile?: boolean
}) => {
    const fullName = getUserFullName(user)
    const [usePostsLazy, { data: postsData }] = usePostsLazyQuery({
        fetchPolicy: 'network-only'
    })

    useEffect(() => {
        if (user?._id)
            usePostsLazy({
                variables: { searchInput: { userId: user?._id as string } },
            })
    }, [user?._id])

    const filterPostsByStatus = (status: string) => {
        return postsData?.posts?.filter((post) => post.status === status)
    }
    return (
        <div className="w-full max-w-[600px] outline outline-1 outline-gray-300 flex flex-col p-2 gap-1">
            <div className="text-xl">
                <Link
                    className="hover:text-green-400 focus:text-green-400 transition cursor-pointer"
                    href={`/users/${user?._id}`}
                >
                    {fullName}
                </Link>
            </div>
            <div className='text-lg'>
                Email Address: {user?.email}
            </div>
            <div>Total Number of Todos: {postsData?.posts.length}</div>
            <div>
                Completed Todos:{' '}
                {filterPostsByStatus(PostStatus.Completed)?.length}
            </div>
            <div>
                In Progress Todos:{' '}
                {filterPostsByStatus(PostStatus.InProgress)?.length}
            </div>
            <div>
                Not Started Todos:{' '}
                {filterPostsByStatus(PostStatus.NotStarted)?.length}
            </div>
            <div>
                Not Completed Todos:{' '}
                {filterPostsByStatus(PostStatus.NotCompleted)?.length}
            </div>

            {showViewProfile && (
                <Link
                    className="inline-flex items-center hover:text-green-400 focus:text-green-400 transition cursor-pointer underline"
                    href={`/users/${user?._id}`}
                >
                    View Profile
                    <span>
                        <ChevronRightIcon className="w-5 h-5" />
                    </span>
                </Link>
            )}
        </div>
    )
}

export default UserRow
