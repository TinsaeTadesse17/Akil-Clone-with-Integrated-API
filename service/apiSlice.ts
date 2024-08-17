import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const opportunitiesApi = createApi({
    reducerPath: "Opportunities",
    baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com/"}),
    endpoints: (builder) => ({
      getAllOpportunities: builder.query({
            query: () => "/opportunities/search"
        }),
        getSingleOpportunity: builder.query({
            query: (id) => `/opportunities/${id}`
        })
    })
})

export const { useGetAllOpportunitiesQuery, useGetSingleOpportunityQuery } = opportunitiesApi