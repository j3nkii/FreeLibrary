const axios = require('axios')



const openLibraryCoverAPI = (cover_i, size = 'M') => {
    return `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg`;
}

// const openLibraryWorksAPI = (olKey) => {
//     return `https://openlibrary.org${olKey}.json`
// }

// const openLibraryAuthorsAPI = (olKey) => {
//     return `https://openlibrary.org${olKey}.json`
// }

// const searchOneAPI = (olKey) => {
//     return `https://openlibrary.org/search.json?q=key:${olKey}&limit=1`
// }

// const openLibrarySearchAPIurl = (search) => {
//     return `https://openlibrary.org/search.json?q=${search}&limit=20`
// }



const olSearchAPI = async (searchTerm) => {
    try {
        const API_URL = `https://openlibrary.org/search.json?q=${searchTerm}&limit=20`
        const API_RES = await axios.get(API_URL);
        return API_RES.data.docs.map( row => ({
            ...row,
            coverUrl: openLibraryCoverAPI(row.cover_i)
        }));
    } catch (error) {
        throw error;
    }
}



const olBookDetailsAPI = async (olKey) => {
    try {
        const API_URL = `https://openlibrary.org/search.json?q=key:${olKey}&limit=1`
        const API_RES = await axios.get(API_URL);
        const WORKS_API_RESPONSE = await axios.get(`https://openlibrary.org${olKey}.json`);
        if(API_RES.data.docs.length < 1) throw new Error(`No book found using: ${olKey}`)
        API_RES.data.docs[0].cover_url = openLibraryCoverAPI(API_RES.data.docs[0].cover_i);
        API_RES.data.docs[0].description = WORKS_API_RESPONSE.data.description
        return API_RES.data.docs[0];
    } catch (error) {
        throw error;
    }

}



module.exports = {
    olBookDetailsAPI,
    olSearchAPI,
}