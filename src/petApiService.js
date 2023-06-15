import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    getPet: builder.query({
      query: (id) => ({ url: "pets", params: { id } }),
      transformResponse: (response) => response.pets[0],
    }),
    getBreeds: builder.query({
      query: (animal) => ({ url: "breeds", params: { animal } }),
      transformResponse: (response) => response.breeds,
    }),
    search: builder.query({
      query: ({ location, breed, animal }) => ({
        url: "pets",
        params: { location, breed, animal },
      }),
      transformResponse: (response) => response.pets,
    }),
  }),
});

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;
