import { Id, toast } from 'react-toastify'

export function errorStoreHandler(message: string, successToastId: Id){
    if (message.includes('500')){
        toast.update(successToastId, { type: toast.TYPE.ERROR, render: 'Произошла ошибка, попробуйте позже', autoClose: 5000, isLoading: false })
    } else if (message.includes('403')){
        toast.update(successToastId, { type: toast.TYPE.ERROR, render: 'Доступ запрещен', autoClose: 5000, isLoading: false })
    } else if (message.includes('429')){
        toast.update(successToastId, { type: toast.TYPE.ERROR, render: 'Rate limit', autoClose: 5000, isLoading: false })
    } else {
        toast.update(successToastId, { type: toast.TYPE.ERROR, render: 'Произошла ошибка, попробуйте позже', autoClose: 5000, isLoading: false })
    }
}

export function errorStoreHandlerNotToastId(errorMessage: string){
    if (errorMessage){
        if (errorMessage.includes('500')){
            toast.error( 'Произошла непредвиденная ошибка, попробуйте позже', { autoClose: 5000 } )
        } else if (errorMessage.includes('403')){
            toast.error( 'Доступ запрещен', { autoClose: 5000 } )
        } else if (errorMessage.includes('429')){
            toast.error( 'Rate limit', { autoClose: 5000 } )
        } else {
            toast.error( 'Произошла ошибка, попробуйте позже', { autoClose: 5000 } )
        }
    } else {
        toast.error('Произошла непредвиденная ошибка, попробуйте позже')
    }
}

