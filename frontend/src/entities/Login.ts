import CrudFactory from "./crudFactory/CrudFactory";
import type { ILogin } from "@/interfaces/ILogin";
import { Sanitizer } from '@/utils/Sanitizer'
import { R } from "@/validation/rules";
import { getToast } from "@/plugins/toast";
import { router } from "@/routes/index";
import { setAccessToken, setUser } from "@/stores/authStore";

export default class Login extends CrudFactory implements ILogin {
    email: string = '';
    senha: string = '';



    readonly rules = {
        senha: { required: R.required() },
        email: { required: R.required(), email: R.email() },
    };


    constructor(data?: ILogin) {
        super("/auth/login")
        Object.assign(this, data)
    }


    toJson(): ILogin {
        return Sanitizer.sanitizeObject({
            email: this.email,
            senha: this.senha
        })
    }

    async login(payload: ILogin) {
        const toast = getToast();
        try {
            const response = await this.post(payload, { withCredentials: true })
            setAccessToken(response?.data?.accessToken);
            setUser(response?.data?.user)
            toast.success("login realizado com sucesso!");
            router.push({ name: "home" });
        } catch (error: any) {
            if(error.response.status === 429) {
                toast.error(error?.response?.data)
            }else {
                toast.error(error?.response?.data.error)
            }

        }
    }

}