
import type { Movie } from "../types/movie";
import axios from "axios";

interface Props{
    page: number;
    results: Movie [];
    total_pages: number;
    total_results: number;
}

export  async function fetchMovies(query: string): Promise<Movie[]> {
    const response = await axios.get<Props>('https://api.themoviedb.org/3/search/movie',
        {
            params: {
                query
    
            },
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTkwZDYzNTRlZTVkMTRiNzkwODJjOTMxNDBkYTk1NCIsIm5iZiI6MTc1OTQxNTg0Mi41NzcsInN1YiI6IjY4ZGU4ZTIyMGU2YjhmZjIyYjZkNTExNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o343uUr5A92O3TDqXwiTjJNwFohsRt2lVSYPOR3S_3M`,
            },
        }
    );
    return response.data.results;
}   

