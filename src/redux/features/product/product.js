import { baseApi } from "../../baseApi/baseApi";


const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: "/products",
                method: "GET",
            }),
            providesTags: ["Products"],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: "/products",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
    })
});

export const { useGetProductsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi;