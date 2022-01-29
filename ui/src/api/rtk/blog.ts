import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQry } from './baseQry';

// Create your service using a base URL and expected endpoints
export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: baseQry(),
  tagTypes:["Blogs"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (name: string) => ({
          url: `blogs`,
        //   headers: {
        //     'content-type': 'text/plain',
        //  },

      }) ,
      providesTags: ["Blogs"],     
    }),
    getABlog: builder.query({
      query: (id: string) => ({
          url: `blogs/${id}`,
        //   headers: {
        //     'content-type': 'text/plain',
        //  },

      }) ,      
    }),
    saveBlog: builder.mutation({
        query: (blog) => {
            console.log(blog);
            const formData = new FormData();
            blog.image && formData.append("image", blog.image); 
            blog.id && formData.append("id", blog.id); 
            blog.description && formData.append("description", blog.description); 
            blog.meta_description && formData.append("meta_description", blog.meta_description); 
            blog.meta_keywords && formData.append("meta_keywords", blog.meta_keywords); 
            blog.name && formData.append("name", blog.name); 
            formData.append("status", `${blog.status ?? 0}`); 

            return {            
                url: `blogs/${blog?.id ?? 0 }`,
                method: 'POST',
                body: formData
                //   headers: {
                //     'content-type': 'text/plain',
                //  },

            }
        } ,  
        invalidatesTags: ["Blogs"],   
    }),
    deleteBlog: builder.mutation({
      query: (blog) => ({
          url: `blogs/${blog.id }`,
          method: 'DELETE',
          body: blog
          //   headers: {
          //     'content-type': 'text/plain',
          //  },

      }) , 
      invalidatesTags: ["Blogs"],    
    })
  })
});


export const { useGetBlogsQuery, useSaveBlogMutation, useDeleteBlogMutation, useGetABlogQuery } = blogsApi;

