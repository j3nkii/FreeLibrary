const axios = require('axios');


const headers = {
    'User-Agent': 'MyMusicApp/1.0',
    'Authorization': `Discogs token=${process.env.DISCOGS_TOKEN}`
};


const searchReleases = async (query) => {
        const response = await axios(`https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=release`, { headers });
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.data.results.map(x => ({
            thumbnail: x.thumb,
            format: x.format,
            title: x.title,
            resource_url: x.resource_url
        }));
}



module.exports = {
    searchReleases,
}