import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getBearerToken = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjc2M2ZjYTY1MWJjNTk4Mzc3MTFkMCIsImlhdCI6MTY5NDkyNDY3OSwiZXhwIjoxNjk1NTI5NDc5fQ.XsTVZ4LKTP9SzxZseNTX9ncQ-VVHe3djgDLeKBR-xUE";
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://employeeleave.devsujon.com/api/v1/Employee",
    prepareHeaders: (headers) => {
      const token = getBearerToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["employee"],

  endpoints: (builder) => ({
    getEmployee: builder.query({
      query: ({ page, size }) => ({
        url: `/EmployeeList/${page}/${size}/0`,
        method: "GET",
      }),
      providesTags: ["employee"],
    }),
    removeEmployee: builder.mutation({
      query: (id) => ({
        url: `/EmployeeDelete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employee"],
    }),

    addEmployee: builder.mutation({
      query: (data) => ({
        url: "/EmployeeCreate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["employee"],
    }),

    editLEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `/EmployeeUpdate/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["employee"],
    }),
    getEditEmployee: builder.query({
      query: () => ({
        url: "/EmployeeList/1/10/0",
        method: "GET",
      }),
      providesTags: ["employee"],
    }),
  }),
});

export const {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
  useAddEmployeeMutation,
  useEditLEmployeeMutation,
  useGetEditEmployeeQuery,
} = apiSlice;
