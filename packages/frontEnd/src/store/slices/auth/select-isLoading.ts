import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@/store'
import { IUser } from '@/store/slices/auth/auth.models'

export const isAuthLoadingSelect = (state: RootState) => state.auth.isAuthLoading
export const selectIsLoading = createSelector(
    [isAuthLoadingSelect],
    (isLoading): boolean => {
        return isLoading
    }
)

export const userSelect = (state: RootState) => state.auth.user
export const selectUser = createSelector(
    [userSelect],
    (user): IUser | null => {
        return user
    }
)


