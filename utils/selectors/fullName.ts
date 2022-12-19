import { UserQuery, WhoAmIQuery, UsersQuery } from './../../generated/graphql'

const getFullname = (userData: WhoAmIQuery | undefined): string => {
    return `${userData?.whoAmI.firstName} ${userData?.whoAmI.lastName}`
}

export default getFullname

export const getCommenterFullName = (
    userData: UserQuery | undefined
): string => {
    return `${userData?.user?.firstName} ${userData?.user?.lastName}`
}

export const getUserFullName = (
    user: UserQuery['user'] | undefined
): string => {
    return `${user?.firstName} ${user?.lastName}`
}
