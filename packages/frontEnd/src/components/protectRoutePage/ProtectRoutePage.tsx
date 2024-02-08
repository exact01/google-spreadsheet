import useAuth from '@/hooks/useAuth'
import { Redirect } from 'react-router-dom'

interface IProps {
    children: any
}

const ProtectRoutePage = ({ children }: IProps) => {
    const isAuth: boolean | null = useAuth()
    if (isAuth !== null && !isAuth) {
        return <Redirect to={'/sign-in'} />
    }
    return children
}
export default ProtectRoutePage
