import { Redirect } from 'react-router-dom'
import React from 'react'

export const DefaultPage = (): JSX.Element => {
    return <Redirect to={'/home'} />
}

