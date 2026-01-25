type iOptions= {
    page?: number | string,
    limit?: number | string,
    SortOrder?:string,
    sortBy?:string
}

type IOptionsResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
}


const paginationSorting = (options : iOptions) :IOptionsResult => {

    const page : number = Number(options.page) || 1
    const limit: number = Number(options.limit) || 3
    const skip = (page -1) * limit


    const sortBy: string = options.sortBy || "createdAt"
    const sortOrder :string = options.SortOrder || "desc"

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }


}

export default paginationSorting