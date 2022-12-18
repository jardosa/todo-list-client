import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useLoginMutation } from '../generated/graphql'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Login = () => {
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [error, setError] = useState<string>()
    const router = useRouter()
    const [login] = useLoginMutation({
        onError: (error) => {
            setError(error.message)
        }, 
        onCompleted(data) {
            localStorage.setItem('authToken',data.login.authToken)
            router.push('/')
        }
    })
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            login({ variables: { email: email.trim(), password } })
        }
    }

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value)
    }
    
    const isFormValid = email && password

    useEffect(() => {
        setError("")
    }, [email, password])


    return (
        <div className='w-full h-screen grid place-items-center'>
            <div className='m-5 rounded-md outline outline-2 outline-gray-300  max-w-[400px] w-full h-max flex flex-col items-center'>
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
                    <Button disabled={!!error || !isFormValid} error={!!error} iconPosition='right' type={'submit'} icon={<PaperAirplaneIcon className='h-6 w-6' />} />
                    <Link className='hover:text-green-400 focus:text-green-400 transition cursor-pointer underline' href={'/register'}>Don't have an account? Register.</Link>
                    <p className='absolute self-center bottom-2 text-red-400 font-semibold text-center'>
                        {error}
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login