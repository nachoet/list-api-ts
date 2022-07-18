
import axios from 'axios';
import { useState } from 'react';
import { FetchState, PostData } from '../types';

//custom  API Hook

export function useGetPosts() {
    const [fetchState, setFetchState] = useState(FetchState.DEFAULT)
    const [posts, setPosts] = useState<Array<PostData>>([])

   
        const getPosts = async () => {
            try {
            setFetchState(FetchState.LOADING)

            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            const responseData = response.data as Array<PostData>

            setPosts(responseData)
            setFetchState(FetchState.SUCCESS)
        }
        catch (err){
            setFetchState(FetchState.ERROR)
        }
    }
    return [posts,setPosts, fetchState, getPosts] as const
}

