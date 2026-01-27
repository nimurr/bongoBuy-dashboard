import { baseApi } from "../../baseApi/baseApi";


const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllReviews: builder.query({
            query: () => ({
                url: "/reviews/all-review/admin",
                method: "GET",
            }),
            providesTags: ["Review"],
        }),
        approveAdmin: builder.mutation({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: "PATCH",
                data: { isAdminApproved: true },
            }),
            invalidatesTags: ["Review"],
        }),

    })
})

export const { useGetAllReviewsQuery, useApproveAdminMutation } = reviewApi