const axios = require('axios');


class DiscogsAPI {
    constructor() {
        this.baseURL = 'https://api.discogs.com';
        this.headers = {
            'User-Agent': 'MyMusicApp/1.0',
            'Authorization': `Discogs token=${process.env.DISCOGS_TOKEN}`
        };
    }

    async search(query, type = 'release') {
        const url = `${this.baseURL}/database/search?q=${encodeURIComponent(query)}&type=${type}`;
        const response = await fetch(url, { headers: this.headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async getRelease(id) {
        const response = await fetch(`${this.baseURL}/releases/${id}`, { 
        headers: this.headers 
        });
        return await response.json();
    }

    async getArtist(id) {
        const response = await fetch(`${this.baseURL}/artists/${id}`, { 
        headers: this.headers 
        });
        return await response.json();
    }

    async getMaster(id) {
        const response = await fetch(`${this.baseURL}/masters/${id}`, { 
        headers: this.headers 
        });
        return await response.json();
    }
}

// Usage
// const discogs = new DiscogsAPI('YOUR_TOKEN_HERE');

// // Search example
// const searchResults = await discogs.search('Beatles Abbey Road');
// console.log(searchResults.results[0]);

// // Get specific release
// const release = await discogs.getRelease(searchResults.results[0].id);
// console.log(release.title, release.year, release.genres);

module.exports = {
    DiscogsAPI,
}