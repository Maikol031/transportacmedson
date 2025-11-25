export interface ICrudFactory {
    post(body: any, headers?: any, config?: any): any
    put(body: any, headers?: any, config?: any): any
    delete(headers?: any, config?: any): any
    get(headers?: any, config?: any): any
    readWithQueryParams(query: string, headers?: any, config?: any): any
}