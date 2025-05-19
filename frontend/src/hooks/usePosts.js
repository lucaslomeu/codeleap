import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export function usePosts() {
    const queryClient = useQueryClient()

    // Fetch posts from the API
    const postsQuery = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const { data } = await axios.get(API_URL)
            return Array.isArray(data) ? data : data.results || []
        }
    })

    // Create a new post
    const createPost = useMutation({
        mutationFn: (newPost) => axios.post(API_URL, newPost),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    });

    // Update an existing post
    const updatePost = useMutation({
        mutationFn: ({ id, ...data }) => axios.patch(`${API_URL}${id}/`, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    });

    // Delete a post 
    const deletePost = useMutation({
        mutationFn: (id) => axios.delete(`${API_URL}${id}/`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    });

    return { postsQuery, createPost, updatePost, deletePost }
}
