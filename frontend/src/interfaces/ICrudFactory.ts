export interface ICrudFactory {

    create(body: any, headers?: any, config?: any): any
    update(body: any, headers?: any, config?: any): any
    delete(headers?: any, config?: any): any
    read(headers?: any, config?: any): any
    readWithQueryParams(query: string, headers?: any, config?: any): any

}