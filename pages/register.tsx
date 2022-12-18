

import React, { useEffect, useState } from 'react'
import { useRegisterMutation } from '../generated/graphql'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import { useRouter } from 'next/router'
import validateEmail from '../utils/validateEmail'


const Register = () => {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [firstName, setFirstName] = useState<string>()
    const [lastName, setLastName] = useState<string>()
    const [error, setError] = useState<string>()
    const router = useRouter()

    const [register] = useRegisterMutation({
        onError(error, clientOptions) {
            setError(error.message)
        },
        onCompleted(data) {
            localStorage.setItem('authToken', data.register.authToken)
            router.push('/')
        }
    })

    useEffect(() => {
        setError("")
    }, [email, password, firstName, lastName])

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value.trim())
    }
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value.trim())
    }
    const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFirstName(e.target.value.trim())
    }
    const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setLastName(e.target.value.trim())
    }

    let isFormValid: boolean = false

    if (email && validateEmail(email)
        && password
        && firstName
        && lastName) {
        isFormValid = true
    }


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password && firstName && lastName) {
            register({ variables: { registerInput: { email, firstName, lastName, password } } })
        }
    }

    return (
        <div className='w-full h-screen grid place-items-center'>
            <div className=' m-5 rounded-md outline outline-2 outline-gray-300  max-w-[400px] w-full h-max flex flex-col items-center'>
                <div className='h-[100px] w-full bg-green-300 text-xl grid place-items-center'>Insert Logo Here</div>
                <form onSubmit={onSubmit} className='flex flex-col gap-5 w-full px-5 py-10 relative'>
                    <div className='flex flex-col gap-2'>
                        <div>Email:</div>
                        <div><Input error={!!error} onChange={onChangeEmail} type={'email'} /></div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div>Password:</div>
                        <div><Input error={!!error} onChange={onChangePassword} type={'password'} /></div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div>First Name:</div>
                        <div><Input error={!!error} onChange={onChangeFirstName} type={'text'} /></div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div>Last Name:</div>
                        <div><Input error={!!error} onChange={onChangeLastName} type={'text'} /></div>
                    </div>
                    <Button disabled={!!error || !isFormValid} error={!!error} text={'Register'} iconPosition='right' type={'submit'} icon={<PaperAirplaneIcon className='h-4 w-4' />} />
                    <p className='absolute self-center bottom-2 text-red-400 font-semibold text-center'>
                        {error}
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register