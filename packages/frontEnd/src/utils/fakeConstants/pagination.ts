import { IUserTelegram } from '@/api/telegramUsers/telegramUsers.models'


const fakeItemPagination: IUserTelegram = {
    id: 0,
    idTelegram: 0,
    firstName: 'null',
    lastName: null,
    userName: null,
    balance: 0,
    status: false,
    botId: 0,
}

export const paginationFake: IUserTelegram[] = []

for (let i = 0; i < 18; i++) {
    const fake: IUserTelegram = {
        ...fakeItemPagination,
        id: i,
    }
    paginationFake.push(fake)
}
