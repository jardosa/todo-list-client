import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import error from "next/error";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/Input";
import { useEffect, useState } from "react";
import { PostsDocument, useCreatePostMutation, usePostsLazyQuery, usePostsQuery, useWhoAmIQuery } from "../generated/graphql";

export default function Home() {
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const { data: user } = useWhoAmIQuery()

  const [createPost] = useCreatePostMutation({refetchQueries: [{query: PostsDocument}]})
  const [usePostsLazy, { data, loading, error }] = usePostsLazyQuery()

  useEffect(() => {
    if (user) {
      usePostsLazy({ variables: { searchInput: { userId: user.whoAmI._id, limit: 10 } } })
    }
  }, [user])

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value.trim())
  }
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value.trim())
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      createPost({ variables: { createPostInput: { title, description } } })
    }
  }
  const isFormValid = title && description

  return (
    <div className="flex w-full h-[calc(100vh-60px)]">
      <div className="bg-green-300 grid place-items-center">
        <div className="outline outline-1 outline-gray-200 max-w-[400px]">
          <form onSubmit={onSubmit} className='flex flex-col gap-5 w-full px-5 py-10 relative'>
            <div className='flex flex-col gap-2'>
              <div>Email:</div>
              <div><Input error={!!error} onChange={onChangeEmail} type={'email'} /></div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>Password:</div>
              <div><Input error={!!error} onChange={onChangePassword} type={'password'} /></div>
            </div>
            <Button disabled={!!error || !isFormValid} error={!!error} iconPosition='right' type={'submit'} icon={<PaperAirplaneIcon className='h-6 w-6' />} />
            <p className='absolute self-center bottom-2 text-red-400 font-semibold text-center'>
              {error}
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
