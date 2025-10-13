import type { ILogin } from "@/interfaces/ILogin";

export default class Login implements ILogin {
    email: string = '';
    password: string = '';


    constructor(data?: ILogin)
    {
        Object.assign(this, data)
    }

}