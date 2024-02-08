import useAuth from '@/hooks/useAuth'
import { Redirect } from 'react-router-dom'
import React, { ReactNode } from 'react'


type Props = {
    children: ReactNode;
}
const ProtectRouteAuthorize = ({ children }: Props) => {
    const isAuth: boolean | null = useAuth()
    if (isAuth !== null && isAuth) {
        return <Redirect to={'/home'} />
    }
    return <>{children}</>
}
export default ProtectRouteAuthorize
