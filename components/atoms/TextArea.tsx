import clsx from "clsx"
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"

interface TextAreaInterface {
    fullWidth?: boolean
    error?: boolean
}

const TextArea: React.FC<TextareaHTMLAttributes<HTMLTextAreaElement> & TextAreaInterface> = (props) => {
    const { className, error = false, ...rest } = props

    return <textarea className={clsx('outline',
        'resize-none',
        'outline-1',
        'outline-gray-300',
        'hover:outline-blue-500',
        'focus:outline-blue-500',
        error && 'outline-red-400 hover:outline-red-400',
        'disabled:opacity-50 disabled:bg-gray-500',
        'transition',
        'w-full',
        'p-2',
        props.fullWidth && 'max-w-[200px]',
        className,
    )}
        {...rest} />
}

export default TextArea