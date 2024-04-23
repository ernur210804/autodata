import axios from 'axios';
import cheerio from 'cheerio';

export async function parseWebsite(url: string): Promise<{ type: string; city: string; year: string; floor: string }> {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const type = $('body > main > div.layout__container.a-item > div > div.offer__container > div.offer__sidebar > div.offer__advert-info > div.offer__short-description > div:nth-child(2) > div.offer__advert-short-info').text().trim();
        const city = $('body > main > div.layout__container.a-item > div > div.offer__container > div.offer__sidebar > div.offer__advert-info > div.offer__short-description > div:nth-child(1) > div.offer__location.offer__advert-short-info > span').text().trim();
        const year = $('body > main > div.layout__container.a-item > div > div.offer__container > div.offer__sidebar > div.offer__advert-info > div.offer__short-description > div:nth-child(4) > div.offer__advert-short-info').text().trim();
        const floor = $('body > main > div.layout__container.a-item > div > div.offer__container > div.offer__sidebar > div.offer__advert-info > div.offer__short-description > div:nth-child(5) > div.offer__advert-short-info').text().trim();

        return { type, city,year,floor };
    } catch (error) {
        console.error('Error parsing website:', error);
        throw error;
    }
}
