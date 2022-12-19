import clsx from 'clsx'
import Link from 'next/link'
import {
    CommentQuery,
    PostDocument,
    useRemoveCommentMutation,
    useUpdateCommentMutation,
} from '../../generated/graphql'
import { getCommenterFullName } from '../../utils/selectors/fullName'
import Button from '../atoms/Button'
import { useState } from 'react'
import TextArea from '../atoms/TextArea'
import useCheckOwnDocument from '../../utils/hooks/useCheckOwnDocument'

const Comment = ({
    comment,
    fullWidth = false,
}: {
    comment: CommentQuery['comment']
    fullWidth?: boolean
}) => {
    const [viewMode, setViewMode] = useState<'read' | 'edit' | 'delete'>('read')
    const [body, setBody] = useState<string>('')

    const { ownDocument, userData } = useCheckOwnDocument(
        comment?.userId as string
    )
    const fullName = userData && getCommenterFullName(userData)
    const placeholderDateTime = new Date().toUTCString()

    const [updateComment] = useUpdateCommentMutation({
        onCompleted() {
            setViewMode('read')
        },
    })

    const [removeComment] = useRemoveCommentMutation({
        onCompleted() {
            setViewMode('read')
        },
        refetchQueries: [
            { query: PostDocument, variables: { _id: comment?.postId } },
        ],
    })

    const onChangeComment = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        setBody(e.target.value)
    }
    const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.code !== 'Enter') return
        updateComment({
            variables: {
                updateCommentInput: {
                    _id: comment?._id as string,
                    body: body.trim(),
                },
            },
        })
    }

    const buttonClickUpdate = () => {
        updateComment({
            variables: {
                updateCommentInput: {
                    _id: comment?._id as string,
                    body: body.trim(),
                },
            },
        })
    }

    const buttonClickCancel = () => {
        setViewMode('read')
        setBody(comment?.body as string)
    }

    const buttonClickDelete = () => {
        removeComment({ variables: { _id: comment?._id as string } })
    }

    const setViewToEdit = () => {
        setViewMode('edit')
        setBody(comment?.body as string)
    }

    return (
        <div
            className={clsx(
                'outline outline-gray-300 rounded-lg p-2 w-full flex flex-col gap-2',
                fullWidth ? 'max-w-none' : 'max-w-[600px]'
            )}
        >
            <div className="w-full text-lg">
                <Link
                    className="hover:text-green-400 focus:text-green-400 transition cursor-pointer underline"
                    href={`/users/${comment?.userId}`}
                >
                    {fullName}
                </Link>
            </div>
            <div className="text-base">{comment?.updatedAt}</div>
            {(viewMode === 'read' || viewMode === 'delete') && (
                <div className="leading-5 text-sm">{comment?.body}</div>
            )}
            {viewMode === 'edit' && (
                <TextArea
                    onChange={onChangeComment}
                    onKeyUp={onKeyUp}
                    value={body}
                    className="leading-5 text-sm"
                />
            )}
            {viewMode === 'read' && ownDocument && (
                <div className="flex flex-row flex-nowrap gap-2">
                    <Button
                        onClick={setViewToEdit}
                        className="max-w-[90px] max-h-[30px]"
                        text="Edit"
                    />
                    <Button
                        onClick={() => setViewMode('delete')}
                        className="max-w-[90px] max-h-[30px] hover:bg-red-600"
                        text="Delete"
                        error={true}
                    />
                </div>
            )}
            {viewMode === 'edit' && (
                <div className="flex flex-row flex-nowrap gap-2">
                    <Button
                        onClick={buttonClickUpdate}
                        className="max-w-[90px] max-h-[30px]"
                        text="Update"
                    />
                    <Button
                        onClick={buttonClickCancel}
                        className="max-w-[90px] max-h-[30px] hover:bg-red-600"
                        text="Cancel"
                        error={true}
                    />
                </div>
            )}
            {viewMode === 'delete' && (
                <>
                    <div>Are you sure?</div>
                    <div className="flex flex-row flex-nowrap gap-2">
                        <Button
                            onClick={buttonClickCancel}
                            className="max-w-[90px] max-h-[30px]"
                            text="No"
                        />
                        <Button
                            onClick={buttonClickDelete}
                            className="max-w-[90px] max-h-[30px] hover:bg-red-600"
                            text="Yes"
                            error={true}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default Comment
