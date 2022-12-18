import { PaperAirplaneIcon, PencilSquareIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import { PostQuery, PostStatus, PostsDocument, useRemovePostMutation, useUpdatePostMutation, useWhoAmIQuery } from "../../generated/graphql"
import { PostKeyToValue } from "../../types/enums/PostStatus.enum"
import Button from "../atoms/Button"
import Input from "../atoms/Input"
import Select from "../atoms/Select"
import TextArea from "../atoms/TextArea"
import Link from "next/link"
import getFullname from "../../utils/selectors/fullName"
import clsx from "clsx"
import { useRouter } from "next/router"
import useCheckOwnDocument from "../../utils/hooks/useCheckOwnDocument"

interface IndividualPostInterface {
    post: PostQuery['post']
    showUser?: boolean
    fullWidth?: boolean
    showCommentCount?: boolean
}

const IndividualPost = ({ post, showUser = false, fullWidth = true, showCommentCount = false }: IndividualPostInterface) => {
  
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [selectedStatus, setSelectedStatus] = useState<string>()
    const [updateError, setUpdateError] = useState<string>()
    const [deleteError, setDeleteError] = useState<string>()
    const [mode, setMode] = useState<'read' | 'write'>('read')
    const router = useRouter()
    
    
    const { ownDocument } = useCheckOwnDocument(post.userId as string)

    const isInIndividualPostPage = router.asPath === `/posts/${post._id}`
  
    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTitle(e.target.value)
    }
    const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setDescription(e.target.value)
    }

    const toggleWriteMode = () => {
        setMode('write')
    }

    const toggleReadMode = () => {
        setMode('read')
    }

    const { data: userData, loading } = useWhoAmIQuery()

    const [updatePost] = useUpdatePostMutation({
        onError(error) {
            setUpdateError(error.message)
        },
        onCompleted() {
            setMode('read')
        },
    })

    const [removePost] = useRemovePostMutation({
        onError(error) {
            setDeleteError(error.message)
        },
        onCompleted(){
            if(isInIndividualPostPage) router.push('/')
        },
        refetchQueries: [{ query: PostsDocument, variables: { searchInput: { userId: post.userId, limit: 10 } } }]
    })

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && description && selectedStatus) {
            updatePost({
                variables: {
                    updatePostInput:
                    {
                        _id: post._id, status: PostStatus[selectedStatus as keyof typeof PostStatus],
                        description: description.trim(), title: title.trim(),
                    }
                }
            })
        }
    }
  
    useEffect(() => {
      if (post?.title) {
        setTitle(post.title)
      }
      if (post?.description) {
        setDescription(post.description)
      }
        if (post?.status) {
            setSelectedStatus(post.status)
        }
    }, [])
  
    const isFormValid = title && description
  
    const onSelectStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedStatus(e.target.value)
    };

    const deletePost = () => {
        removePost({ variables: { _id: post._id } })
    }

    useEffect(() => {
        setUpdateError("")
    }, [description, selectedStatus, title])

    const options = Object.entries(PostKeyToValue).map(([value, name]) => ({
      name,
      value
    }))

    const fullName  = getFullname(userData)

    return (
        <form onSubmit={onSubmit} 
            className={clsx("outline outline-1 outline-gray-300 rounded-lg p-2 pb-10 space-y-2 w-full relative",
            fullWidth ? 'max-w-none' : 'max-w-[600px]'
            )}>
            {showUser && <div className='flex flex-col gap-2 '>
                <div>{`User: `}<Link className='hover:text-green-400 focus:text-green-400 transition cursor-pointer underline' href={"/users/" + userData?.whoAmI?._id}>{fullName}</Link></div>
            </div>}
            <div className='flex flex-col gap-2 '>
                <div>Title:</div>
                <div><Input className="disabled:bg-white" disabled={mode === 'read'} error={!!updateError} value={title} onChange={onChangeTitle} type={'text'} /></div>
            </div>
            <div className='flex flex-col gap-2 '>
                <div>Description:</div>
                <div><TextArea disabled={mode === 'read'} error={!!updateError} value={description} className="min-h-[50px] disabled:bg-white" onChange={onChangeDescription} /></div>
            </div>
            <div className='flex flex-col gap-2 '>
                <div>Status:</div>
                <div><Select className="disabled:bg-white" disabled={mode === 'read'} error={!!updateError} value={selectedStatus} onChange={onSelectStatus} options={options} /></div>
            </div>
            {mode === "write" && ownDocument &&
                (<div className="flex flex-row flex-nowrap gap-1">
                    <Button onClick={toggleReadMode} className="hover:bg-red-600" error={true} text="Cancel" icon={<XCircleIcon className='h-6 w-6' />} />
                    <Button type="submit" disabled={!!updateError || !isFormValid} icon={<PaperAirplaneIcon className='h-6 w-6' />} />
                </div>)
            }
            {mode === "read" && ownDocument &&
                <>
                    <Button onClick={toggleWriteMode} text="Update Todo" iconPosition='right' type={'button'} icon={<PencilSquareIcon className='h-6 w-6' />} />
                    <Button onClick={deletePost} text="Delete Todo" iconPosition='right' className="hover:bg-red-600" error={true} type={'button'} icon={<TrashIcon className='h-6 w-6' />} />
                </>
            }
           {showCommentCount && <div>
                <Link className='hover:text-green-400 focus:text-green-400 transition cursor-pointer underline'
                    href={`/posts/${post._id}`}>{`Comments: ${post.comments.length}`}</Link>
            </div>}
            <p className='absolute self-center bottom-2 text-red-400 font-semibold text-center'>
                {updateError || deleteError}
            </p>
        </form>
    )
  }

  export default IndividualPost