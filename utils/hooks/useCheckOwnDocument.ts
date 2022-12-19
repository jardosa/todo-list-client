import { useWhoAmIQuery, useUserQuery } from '../../generated/graphql'

const useCheckOwnDocument = (_id: string) => {
    const { data: whoAmIData } = useWhoAmIQuery()
    const { data: userData } = useUserQuery({ variables: { input: { _id } } })

    return {
        ownDocument: whoAmIData?.whoAmI?._id === userData?.user?._id,
        userData,
        whoAmIData,
    }
}

export default useCheckOwnDocument
