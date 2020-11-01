import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const {request} = useHttp()
    const [link, setLink] = useState('')

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                console.log(data);
                history.push(`/detail/${data.link._id}`)
            } catch (error) {}
        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className="row">
            <div className="col col-create s8 offset-s2">
                <div className="input-field">
                    <input 
                        placeholder="Paste the link" 
                        id="link" 
                        type="text"
                        value={ link }
                        onChange={ (e) => {setLink(e.target.value)} }
                        onKeyPress={ pressHandler }
                    />
                    <label htmlFor="link">Paste the link and press <strong>Enter</strong></label>
                </div>
            </div>
        </div>
    )
}