import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import React, { useEffect, useState } from "react";
import { PostsDocument, useCreatePostMutation, usePostsLazyQuery, useWhoAmIQuery } from "../generated/graphql";
import TextArea from "../components/atoms/TextArea";
import IndividualPost from "../components/molecules/IndividualPost";

export default function Home() {
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [error, setError] = useState<string>()
  const { data: user } = useWhoAmIQuery()

  const [createPost] = useCreatePostMutation(
    {
      onError(error) { setError(error.message) },
      onCompleted() {
        setDescription("")
        setTitle("")
      },
      refetchQueries: [{ query: PostsDocument, variables: { searchInput: { userId: user?.whoAmI._id, limit: 10 } } }],
    }

  )
  const [usePostsLazy, { data, loading }] = usePostsLazyQuery({ fetchPolicy: 'network-only' })

  useEffect(() => {
    if (user?.whoAmI._id) {
      usePostsLazy({ variables: { searchInput: { userId: user.whoAmI._id, limit: 10 } } })
    }
  }, [user?.whoAmI._id])

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value.trim())
  }
  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value.trim())
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      await createPost({ variables: { createPostInput: { title, description } } })
    }
  }
  const isFormValid = title && description

  return (
    <div className="flex w-full h-[calc(100vh-60px)] sm:flex-row flex-col">
      <div className="flex justify-center items-center border-b sm:border-r w-full sm:max-w-[450px]">
        <div className="outline outline-1 outline-gray-200 grid max-w-none  sm:max-w-[400px] w-full m-3">
          <form onSubmit={onSubmit} className='flex flex-col gap-5 w-full px-5 py-10 relative'>
            <div className="text-2xl font-bold">Add Todos here</div>

            <div className='flex flex-col gap-2'>
              <div>Title:</div>
              <div><Input error={!!error} onChange={onChangeTitle} type={'text'} value={title}/></div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>Description:</div>
              <div><TextArea error={!!error} className="min-h-[100px]" onChange={onChangeDescription} value={description}/></div>
            </div>
            <Button disabled={!!error || !isFormValid} error={!!error} iconPosition='right' type={'submit'} icon={<PaperAirplaneIcon className='h-6 w-6' />} />
            <p className='absolute self-center bottom-2 text-red-400 font-semibold text-center'>
              {error}
            </p>
          </form>
        </div>
      </div>
      <div className="w-full flex flex-col p-5 gap-5 overflow-y-auto">
        <div className="text-2xl font-bold">Last 10 Todos</div>
        {data?.posts.map((post) => (<div>
          <IndividualPost showCommentCount key={post._id} post={post} />
        </div>))}
        {!data?.posts?.length && <div className="text-xl font-bold">
            You have no posts. Add one!
          </div>}

        <div className="w-full">

        </div>
      </div>
    </div>
  )
}
