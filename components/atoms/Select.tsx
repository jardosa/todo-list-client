import clsx from "clsx"
import { SelectHTMLAttributes } from "react"

interface SelectInterface {
    fullWidth?: boolean
    error?: boolean
    options: { name: string, value: string }[],
    value?: string
}



const Select: React.FC<SelectHTMLAttributes<HTMLSelectElement> & SelectInterface> = (props) => {
    const { className, error = false, options, value, ...rest } = props

    return <select value={value} className={clsx('outline',
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
        {...rest}>
        {options?.map((option) => <option key={option.value} value={option.value}>{option.name}</option>)}
    </select>
}

export default Select

















// import clsx from "clsx"
// import { InputHTMLAttributes } from "react"
// import { Listbox } from '@headlessui/react'


// interface SelectInterface {
//     value: unknown,
//     onChange: ()
// }

// const Input: React.FC<SelectInterface> = (props) => {
//     const { value, onChange, ...rest } = props

//     return (
//         <Listbox value={value} onChange={(e) => { }}>
//             <Listbox.Button>

//             </Listbox.Button>
//         </Listbox>
//     )
// }

// export default Input