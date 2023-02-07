export interface Driver {
    id: number,
    name: string | null | undefined,
    surname: string | null | undefined,
    email: string ,
    address: string | null | undefined,
    password: string,
    profilePicture: string,
    telephoneNumber: string | null | undefined,
    blocked: boolean,
    active: boolean
}
