

export type User = { //db
    id: number;
    username: string;
    password: string;
    avatar: string;
    createdAt: number;
    updatedAt: number;
}

export const users: Array<User> = [
    {
        id: 1,
        username: 'subzip',
        password: '123',
        avatar: '/avatar.svg',
        createdAt: 18543885,
        updatedAt: 18543885
    },
    {
        id: 2,
        username: 'diemiradie',
        password: '123',
        avatar: '/avatar.svg',
        createdAt: 18543885,
        updatedAt: 18543885
    },
    {
        id: 3,
        username: 'dsds',
        password: '123',
        avatar: '/avatar.svg',
        createdAt: 18543885,
        updatedAt: 18543885
    },
    {
        id: 4,
        username: 'fsdfsd',
        password: '123',
        avatar: '/avatar.svg',
        createdAt: 18543885,
        updatedAt: 18543885
    },
    {
        id: 5,
        username: 'dsffsdfsdter',
        password: '123',
        avatar: '/avatar.svg',
        createdAt: 18543885,
        updatedAt: 18543885
    },
]