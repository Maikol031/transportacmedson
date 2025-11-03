import type { ICrudFactory } from "@/interfaces/ICrudFactory"

export default class CrudFactory implements ICrudFactory {
    private readonly url: string

    constructor(url: string) {
        this.url = url
    }

    async create(body: any, headers?: any, config?: any) {
        console.log(body, this.url)
        // return api.post(this.url, body, { headers, ...config })
    }

    async update(id: number, body: any, headers?: any, config?: any) {
        // return api.put(`${this.url}/${id}`, body, { headers, ...config })
    }

    async delete(id: number, headers?: any, config?: any) {
        // return api.delete(`${this.url}/${id}`, { headers, ...config })
    }

    async read(headers?: any, config?: any) {
        // return api.get(this.url, { headers, ...config })
    }

    async readWithQueryParams(query: string, headers?: any, config?: any) {
        // return api.get(`${this.url}${query}`, { headers, ...config })
    }
}
