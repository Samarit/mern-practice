import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {request, loading} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {}
    }, [request, token])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) return <Loader />
    
    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
}