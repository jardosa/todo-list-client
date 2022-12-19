import React from 'react'
import { useUsersQuery } from '../../generated/graphql'
import UserRow from '../../components/molecules/UserRow'

const Users = () => {
    const { data: users } = useUsersQuery({ variables: { input: {} } })

    return (
        <div className="w-full h-[calc(100vh-60px)] flex flex-col py-5 gap-5 items-center">
            <div className="text-2xl ">Users List</div>
            {users?.users.map((user) => (
                <UserRow showViewProfile user={user} />
            ))}
        </div>
    )
}

export default Users
