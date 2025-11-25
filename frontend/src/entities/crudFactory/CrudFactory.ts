import type { ICrudFactory } from "@/interfaces/ICrudFactory"
import api from "@/services/AxiosConfig"

export default class CrudFactory implements ICrudFactory {
    private readonly url: string

    constructor(url: string) {
        this.url = url
    }

    async post(body: any, headers?: any, config?: any) {
        return api.post(this.url, body, {
            withCredentials: true,
            ...config,
            headers: {
                ...(config?.headers || {}),
                ...(headers || {})
            }
        });
    }


    async put(id: number, body: any, headers?: any, config?: any) {
        // return api.put(`${this.url}/${id}`, body, { headers, ...config })
    }

    async delete(id: number, headers?: any, config?: any) {
        // return api.delete(`${this.url}/${id}`, { headers, ...config })
    }

    async get(headers?: any, config?: any) {
        return api.get(this.url, { headers, ...config })
    }

    async readWithQueryParams(query: string, headers?: any, config?: any) {
        // return api.get(`${this.url}${query}`, { headers, ...config })
    }
}
