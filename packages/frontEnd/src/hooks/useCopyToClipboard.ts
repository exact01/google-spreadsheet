import { useState } from 'react'
import { toast } from 'react-toastify'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean>

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null)

    const copy: CopyFn = async text => {
        if (!navigator?.clipboard) {
            return false
        }
        try {
            await navigator.clipboard.writeText(text)
            setCopiedText(text)
            toast.success('Текст скопирован' , { autoClose: 1000 })
            return true
        } catch (error) {
            setCopiedText(null)
            toast.error('Не удалось скопировать', { autoClose: 3000 })
            return false
        }
    }

    return [copiedText, copy]
}
