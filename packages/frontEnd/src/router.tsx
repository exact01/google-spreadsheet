import { Redirect, Route, Switch } from 'react-router-dom'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { RoutePaths } from '@/utils/constants'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { authSlice, fetchUser } from '@/store/slices/auth'
import React, { useEffect, useRef } from 'react'
import { ProtectRoutePage } from '@/components/protectRoutePage'
import { ProtectRouteAuthorize } from '@/components/protectRouteAuthorize'
import { allLinksAuthUser, allLinksForAuth } from '@/utils/constantsLink'
import { selectIsLoading } from '@/store/slices/auth/select-isLoading'
import PageNotFound from '@/pages/pageNotFound/pageNotFound'
import { Preloader } from '@/components/preloader'
import 'react-toastify/dist/ReactToastify.css'
import './vendor/reactToastify.scss'
import { Slide, ToastContainer, ToastTransition } from 'react-toastify'
import { DefaultPage } from '@/components/defaultPage'
import { Home } from '@/pages/home'

function Router() {
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(selectIsLoading)
    const oneUseEffectRender = useRef(true)
    useEffect(() => {
        if (oneUseEffectRender.current){
            oneUseEffectRender.current = false
            dispatch(fetchUser()).then(() => {
                setTimeout(() => {
                    dispatch(authSlice.actions.setLoaderState(false))
                }, 700)
            })
        }
    }, [])

    return (
        <>
            <ToastContainer
                position='top-center'
                autoClose={6000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
                transition={Slide as ToastTransition}
                draggablePercent={60}
            />
            <Switch>
                { isLoading && <Preloader/> }
                <Route exact path={allLinksForAuth}>
                    <ProtectRouteAuthorize>
                        <Route exact path={RoutePaths.SIGNIN}>
                            <SignIn/>
                        </Route>
                        <Route exact path={RoutePaths.SIGNUP}>
                            <SignUp/>
                        </Route>
                    </ProtectRouteAuthorize>
                </Route>
                <Route exact path={allLinksAuthUser}>
                    <ProtectRoutePage>
                        <Route exact path={RoutePaths.DEFAULTPAGE}>
                            <DefaultPage/>
                        </Route>
                        <Route exact path={RoutePaths.MAIN}>
                            <Home/>
                        </Route>
                    </ProtectRoutePage>
                </Route>
                <Route exact path='/404'>
                    <PageNotFound />
                </Route>
                <Route path='*' component={() => <Redirect to={'/404'}/>}/>
            </Switch>
        </>
    )
}
export default Router
