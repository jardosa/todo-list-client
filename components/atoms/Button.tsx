import clsx from "clsx"
import { ReactNode, ButtonHTMLAttributes } from "react"

interface ButtonInterface {
    fullWidth?: boolean
    text?: string
    icon?: ReactNode
    iconPosition?: 'left' | 'right'
    error?: boolean
}

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & ButtonInterface> = (props) => {
    const { className, text = "Submit", fullWidth = false, icon = null, iconPosition = 'left', error = false, ...rest } = props
    return <button className={clsx('flex flex-row justify-center items-center gap-3',
        'p-2',
        'transition',
        'w-full rounded-sm text-white text-center',
        props.fullWidth && 'max-w-[200px]',
        'disabled:opacity-60',
        error ? 'bg-red-400' : 'bg-blue-400 enabled:hover:bg-green-400',
        className)} {...rest}>

        {icon && iconPosition === 'left' &&
            <div>
                {icon}
            </div>
        }
        <div className='sm:block hidden'>
            {text}
        </div>
        {icon && iconPosition === 'right' &&
            <div>
                {icon}
            </div>
        }
    </button>
}

export default Button