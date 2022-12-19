import React, { useState } from 'react'
import { useCreateCommentMutation } from '../../generated/graphql'
import { PostDocument } from '../../generated/graphql'
import Input from '../atoms/Input'

const AddComment = ({ postId }: { postId: string }) => {
    const [comment, setComment] = useState<string>('')
    const [addComment] = useCreateCommentMutation({
        onCompleted() {
            setComment('')
        },
        refetchQueries: [{ query: PostDocument, variables: { _id: postId } }],
    })

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!comment.trim()) return
        addComment({
            variables: { createCommentInput: { body: comment.trim(), postId } },
        })
    }
    const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setComment(e.target.value)
    }
    return (
        <form className="max-w-[600px] w-full" onSubmit={onSubmit}>
            <Input
                value={comment}
                onChange={onChangeComment}
                placeholder="Add your comment here. Press Enter to submit"
                name="comment"
                className="rounded-lg w-full min-h-[50px]"
            />
        </form>
    )
}

export default AddComment
