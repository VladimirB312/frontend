const Access_Key = 'CxRMUvkYgKq2RiqPAK1uXm2cb-yo5tzY_Emrf2SQey8'

export const fetchRequest = async (query: string, currentPage: number) => {
    const data = await fetch(
        `https://api.unsplash.com/search/photos?page=${currentPage}&query=${query}&client_id=${Access_Key}`
    );
    return await data.json()
}