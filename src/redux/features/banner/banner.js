import { baseApi } from "../../baseApi/baseApi";


const bannerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBanner: builder.query({
            query: () => ({
                url: "/banner-ads/all-for-admin",
                method: "GET",
            }),
        }),
        createBanner: builder.mutation({
            query: (data) => ({
                url: "/banner-ads",
                method: "POST",
                body: data,
            }),
        }),
        updateBanner: builder.mutation({
            query: ({ id, data }) => ({
                url: `/banner-ads/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `/banner-ads/${id}`,
                method: "DELETE",
            }),
        }),
    })
})

export const { useGetBannerQuery , useCreateBannerMutation , useUpdateBannerMutation , useDeleteBannerMutation } = bannerApi