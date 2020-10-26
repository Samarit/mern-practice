import React from 'react'

export const AuthPage = () => {
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
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className='btn btn-auth yellow darken-3'>Sign in</button>
                        <button className='btn btn-auth grey lighten-1 black-text'>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}