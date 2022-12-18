import React from 'react'
import { useWhoAmIQuery } from '../../generated/graphql'
import getFullname from '../../utils/selectors/fullName'

const Posts = () => {
const { data: userData, loading } = useWhoAmIQuery()

const fullName = getFullname(userData)

  return (
    <div>{`Posts for ${fullName}`}
    </div>
  )
}

export default Posts