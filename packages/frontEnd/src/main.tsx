import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import './vendor/root.scss'
import { setupStore } from '@/store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5'
import { enableMapSet } from 'immer'
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

enableMapSet()

export const store = setupStore()

ReactDOM.createRoot(document.getElementById('btlz') as HTMLElement).render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <QueryParamProvider adapter={ReactRouter5Adapter}>
                    <Router />
                </QueryParamProvider>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
)
