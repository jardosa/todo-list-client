import React, { useState } from 'react'
import { useCreateCommentMutation } from '../../generated/graphql'
import TextArea from '../atoms/TextArea'
import { PostDocument } from '../../generated/graphql'


const AddComment = ({ postId }: { postId: string }) => {

    const [comment, setComment] = useState<string>('')
    const [addComment] = useCreateCommentMutation({
        onCompleted() {
            setComment('')
        },
        refetchQueries: [{ query: PostDocument, variables: { _id: postId } }],
    })

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addComment({ variables: { createCommentInput: { body: comment, postId } } })
    }

    const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setComment(e.target.value.trim())
    }
    const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.code !== 'Enter') return
        addComment({ variables: { createCommentInput: { body: comment, postId } } })
    }
    return (
        <form className='max-w-[600px] w-full' onSubmit={onSubmit}>
            <TextArea value={comment} onChange={onChangeComment} onKeyUp={onKeyUp} placeholder='Add your comment here. Press Enter to submit' name='comment' className="rounded-lg w-full min-h-[50px]" />
        </form>
    )
}

export default AddComment