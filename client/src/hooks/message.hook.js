import { useCallback } from "react"

export const useMessage = () => {
    return useCallback((text) => {
        if (window.M && text) { // M is Materialize API
            window.M.toast({ html: text })
        }
    }, [])
}