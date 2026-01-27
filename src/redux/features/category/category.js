import { baseApi } from "../../baseApi/baseApi";


const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: "/categories",
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: "/categories",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Categories"],
        }),
        updateCategory: builder.mutation({
            query: ({ id, data }) => ({
                url: `/categories/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Categories"],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories"],
        }),
    })
})

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi