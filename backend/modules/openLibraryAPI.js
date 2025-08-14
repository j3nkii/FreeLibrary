// import axios from "axios";
const axios = require('axios')

const BASE_URL = "https://openlibrary.org";





const openLibrarySearchAPI = (search) => {
    return `https://openlibrary.org/search.json?q=${search}&limit=20`
}

const openLibraryCoverAPI = (cover_i, size = 'M') => {
    return `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg`;
}

const openLibraryWorksAPI = (olKey) => {
    return `https://openlibrary.org${olKey}.json`
}

const openLibraryAuthorsAPI = (olKey) => {
    return `https://openlibrary.org${olKey}.json`
}

const searchOneAPI = (olKey) => {
    return `https://openlibrary.org/search.json?q=key:${olKey}&limit=1`
}










// const getBookDetails = async (workKey) => {
//     try {
//         const WORKS_URL = openLibraryWorksAPI(workKey)
//         console.log(WORKS_URL)
//         const workRes = await axios.get(WORKS_URL);
//         const workData = workRes.data;
//         let authors = [];
//         if (workData.authors) {
//             const authorPromises = workData.authors.map(async (a) => {
//                 const authorId = a.author.key; // e.g. "/authors/OL23919A"
//                 const AUTHOR_URL = openLibraryAuthorsAPI(authorId);
//                 console.log(AUTHOR_URL)
//                 const authorRes = await axios.get(AUTHOR_URL);
//                 return authorRes.data.name;
//             });
//             authors = await Promise.all(authorPromises);
//         }
//         let coverUrl = null;
//         if (workData.covers && workData.covers.length > 0) {
//             const coverId = workData.covers[0];
//             coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`; // L, M, S
//         }
//         const completeObject = {
//             title: workData.title,
//             description: workData.description?.value || workData.description || null,
//             authors,
//             coverUrl,
//             firstPublishDate: workData.first_publish_date || null,
//             key: workData.key
//         };
//         console.log(completeObject)
//         return completeObject;
//     } catch (err) {
//         console.error("Error fetching work details:", err.message);
//         throw err;
//     }
// }



module.exports = {
    getWorkDetails
}