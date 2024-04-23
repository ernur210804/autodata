"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWebsite = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
function parseWebsite(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(url);
            const $ = cheerio_1.default.load(response.data);
            // Extract address and city from the webpage using selectors
            const type = $('body > main > div.layout__container.a-item > div > div.offer__container > div.offer__sidebar > div.offer__advert-info > div.offer__short-description > div:nth-child(2) > div.offer__advert-short-info').text().trim();
            const city = $('body > main > div.layout__container.a-item > div > div.offer__container > div.offer__sidebar > div.offer__advert-info > div.offer__short-description > div:nth-child(1) > div.offer__location.offer__advert-short-info > span').text().trim();
            const year = $('body > main > div.layout__container.a-item > div > div.offer__container > div.offer__sidebar > div.offer__advert-info > div.offer__short-description > div:nth-child(4) > div.offer__advert-short-info').text().trim();
            const floor = $('body > main > div.layout__container.a-item > div > div.offer__container > div.offer__sidebar > div.offer__advert-info > div.offer__short-description > div:nth-child(5) > div.offer__advert-short-info').text().trim();
            return { type, city, year, floor };
        }
        catch (error) {
            console.error('Error parsing website:', error);
            throw error;
        }
    });
}
exports.parseWebsite = parseWebsite;
