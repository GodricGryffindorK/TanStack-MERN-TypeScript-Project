import '../App.css';
import { FormEvent, Fragment, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../utils/register-user';
import { registrationForm } from '../types/types';
import { useMutation } from '@tanstack/react-query';
export const Register = () => {
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn: register
    })
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // User registration
    
    async function register(form: registrationForm) {
        const res = await registerUser(form);
        if (res.status === 201) navigate('/');
        if (res.status === 409) setError(res.data);
    }

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        const form: registrationForm = {
            name: name,
            email: email,
            password: password
        }
        mutation.mutate(form)
    }

    // Password visibility
    const togglePassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    return (
        <div className='m-0 p-0 flex items-center justify-center w-screen h-screen bg-neutral-900'>
            {mutation.isPending ? (
                'Adding todo...'
            ) : (
                <>
                    {mutation.isError ? (
                        <div>An error occurred: {mutation.error.message}</div>
                    ) : null}

                    {mutation.isSuccess ? <div>Todo added!</div> : null}

                    <form
                        className='flex flex-col justify-between w-72'
                        onSubmit={onSubmit}>
                        <h1 className='text-white text-center text-4xl'>Register</h1>
                        <div className='p-3 mt-5 flex flex-col justify-between border rounded-lg border-neutral-700 bg-neutral-800'>
                            <label className='text-white'>Name</label>
                            <input
                                className='px-1 py-0.5 text-white border rounded border-neutral-700 bg-neutral-900 focus:border-blue-500 focus:outline-none'
                                value={name}
                                onChange={(x) => setName(x.target.value)}
                                type='text'
                            />
                            <label className='text-white mt-2'>Email</label>
                            <input
                                className='px-1 py-0.5 text-white border rounded border-neutral-700 bg-neutral-900 focus:border-blue-500 focus:outline-none'
                                value={email}
                                onChange={(x) => setEmail(x.target.value)}
                                type='email'
                            />
                            <label className='text-white mt-2'>Password</label>
                            <input
                                className='px-1 py-0.5 text-white border rounded border-neutral-700 bg-neutral-900 focus:border-blue-500 focus:outline-none'
                                value={password}
                                onChange={(x) => setPassword(x.target.value)}
                                type={showPassword ? 'text' : 'password'}
                            />
                            <div>
                                <input
                                    type='checkbox'
                                    checked={showPassword}
                                    onChange={togglePassword}
                                />
                                <label className='text-white text-sm'> Show Password</label>
                            </div>
                            <label>{error}</label>
                            <input
                                className='text-white mt-2 py-0.5 bg-green-500 rounded cursor-pointer'
                                type='submit'
                                value='Register'
                            />
                        </div>

                        <label className='text-white text-center mt-3'>Already have an account?
                            <Link className='text-blue-500' to='/'> Login↗</Link>
                        </label>
                    </form>
                </>
            )}
        </div >
    )
}