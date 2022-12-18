import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import { PostQuery, useUpdatePostMutation } from "../../generated/graphql"
import { PostKeyToValue } from "../../types/enums/PostStatus.enum"
import Button from "../atoms/Button"
import Input from "../atoms/Input"
import Select from "../atoms/Select"
import TextArea from "../atoms/TextArea"

const IndividualPost = ({ post }: {
    post: PostQuery['post'],
  }) => {
  
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [selectedStatus, setSelectedStatus] = useState<string>()
    const [error, setError] = useState<string>()
  
    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setTitle(e.target.value.trim())
    }
    const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setDescription(e.target.value.trim())
    }
  
    const [updatePost] = useUpdatePostMutation({
      onError(error) {
        setError(error.message)
      }
    })
  
    useEffect(() => {
      if (post?.title) {
        setTitle(post.title)
      }
      if (post?.description) {
        setDescription(post.description)
      }
    }, [])
  
    const isFormValid = title && description
  
    const onSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedStatus(e.target.value)
    };
  
    const options = Object.entries(PostKeyToValue).map(([value, name]) => ({
      name,
      value
    }))
  
    return (
      <form className="outline outline-1 outline-gray-300 w-full rounded-lg p-2 space-y-2">
        <div className='flex flex-col gap-2 '>
          <div>Title:</div>
          <div><Input error={!!error} value={title} onChange={onChangeTitle} type={'text'} /></div>
        </div>
        <div className='flex flex-col gap-2 '>
          <div>Description:</div>
          <div><TextArea error={!!error} value={description} className="min-h-[100px]" onChange={onChangeDescription} /></div>
        </div>
        <div className='flex flex-col gap-2 '>
          <div>Status:</div>
          <div><Select error={!!error} value={selectedStatus} onChange={onSelectStatus} options={options} /></div>
        </div>
        <Button text="Update Todo" disabled={!!error || !isFormValid} error={!!error} iconPosition='right' type={'submit'} icon={<PaperAirplaneIcon className='h-6 w-6' />} />
      </form>
    )
  }

  export default IndividualPost