const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const pool = require('../modules/pool');
const router = express.Router();

const openLibrarySearchAPI = (search) => {
    return `https://openlibrary.org/search.json?q=${search}&limit=20`
}

const openLibraryCoverAPI = (cover_i, size = 'M') => {
    return `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg`;
}



router.get('/search', async (req, res) => {
    try {
        console.log(req.query)
        if(!req.query.search) throw new Error('Missing Params')
        const API_URL = openLibrarySearchAPI(req.query.search)
        const API_RES = await axios.get(API_URL);
        const result = API_RES.data.docs.map(row => {
            return {
                title: row.title,
                authors: row.author_name,
                year: row.first_publish_year,
                coverUrl: openLibraryCoverAPI(row.cover_i, 'S'),
            }
        });
        console.log(result)
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unknown Error' });
    }
});



module.exports = router;