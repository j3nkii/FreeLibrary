const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const pool = require('../modules/pool');
const router = express.Router();
const { olBookDetailsAPI, olSearchAPI } = require('../modules/openLibraryAPI');



router.get('/search', async (req, res) => {
    try {
        if(!req.query.search) throw new Error('Missing Params')
        const API_RES = await olSearchAPI(req.query.search);
        const result = API_RES.map(row => {
            return {
                olKey: row.key,
                title: row.title,
                authors: row.author_name,
                year: row.first_publish_year,
                coverUrl: row.cover_url,
            }
        });
        console.log(result)
        res.status(200).json({ success: true, data: API_RES });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unknown Error' });
    }
});



router.post('/', async (req, res) => {
    // okay. so now we need to add a search locally before adding it to db. roger, and a transactional thing so we can add a media+user to a relational table.
    const client = await pool.connect();
    try {
        const { olKey, userID } = req.body;
        const API_RESPONSE = await olBookDetailsAPI(olKey);
        const { title, key, cover_url, author_name, author_key, first_publish_year, cover_i, description } = API_RESPONSE
        const params = [
            title,
            'book',
            description,
            first_publish_year,
            cover_url,
            key,
            { authors: author_name },
            {}
        ];
        client.query('BEGIN;');
        const { rows: [ doesExist ] } = await client.query('SELECT true FROM media WHERE external_id = $1', [ key ]);
        let result;
        if(!doesExist){
            result = await client.query(`
                INSERT INTO media (title, type, description, release_year, image_url, external_id, creators, metadata)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *;
            `, params)
        }
        console.log(result.rows[0])
        await client.query(`
            INSERT INTO user_media (user_id, media_id)
            VALUES ($1, $2)
        `, [ userID, result.rows[0].id ]);
        await client.query('COMMIT;')
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        client.query('ROLLBACK;');
        res.status(500).json({ error: 'Unknown Error' });
    } finally {
        client.release();
    }
});



module.exports = router;