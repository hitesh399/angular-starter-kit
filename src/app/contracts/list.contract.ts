export interface ListContract<T> {
    page?: number,
    per_page?: Number,
    total?: Number,
    total_pages?: Number,
    data: T
} 