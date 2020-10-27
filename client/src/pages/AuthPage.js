import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'

export const AuthPage = () => {
    const {loading, request} = useHttp()

    const {form, setForm} = useState({
        email: '',
        password: ''
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request ('/api/auth/register', 'POST', {...form})
            console.log('Data:', data);
        } catch (error) {
            
        }
    }

    const loginHandler = async () => {

    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shorten your link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorisation</span>
                        <div>
                            
                            <div class="input-field">
                                <input 
                                    placeholder="Enter email" 
                                    id="email" 
                                    type="text"
                                    name="email"
                                    className='yellow-input'
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div class="input-field">
                                <input 
                                    placeholder="Enter password" 
                                    id="password" 
                                    type="password"
                                    name="password"
                                    className='yellow-input'
                                    onChange={ changeHandler }
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                        className='btn btn-auth yellow darken-3'
                        disabled={loading}
                        >
                            Sign in
                        </button>
                        <button 
                        className='btn btn-auth grey lighten-1 black-text'
                        onClick={ registerHandler }
                        disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}