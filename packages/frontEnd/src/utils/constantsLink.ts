import { RoutePaths } from '@/utils/constants'

export const linkObject = [
    {
        logoAlt: 'Домой',
        linkTo: RoutePaths.MAIN,
    },
]


const allLinksObject = [
    { linkTo: RoutePaths.MAIN },
]

export const allLinksAuthUser = allLinksObject.map(value => {
    return value.linkTo
})

export const allLinksForAuth = [RoutePaths.SIGNUP, RoutePaths.SIGNIN]
