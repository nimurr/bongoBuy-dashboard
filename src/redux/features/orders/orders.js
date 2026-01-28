import { baseApi } from "../../baseApi/baseApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: ({
                status,
                page,
                limit,
            }) => ({
                url: `/orders?page=${page}&limit=${limit}&status=${status}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetAllOrdersQuery } = orderApi