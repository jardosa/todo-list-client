import clsx from "clsx"
import { InputHTMLAttributes } from "react"

interface InputInterface {
    fullWidth?: boolean
    error?: boolean
}

const Input: React.FC<InputHTMLAttributes<HTMLInputElement> & InputInterface> = (props) => {
    const { className, error = false, ...rest } = props

    return <input className={clsx('outline',
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

export default Input