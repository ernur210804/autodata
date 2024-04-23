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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractAndSave = exports.ExtractAndShow = void 0;
const parser_1 = require("../data/parser");
const DbConnect_1 = require("../database/DbConnect");
function ExtractAndShow(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { type, city, year, floor } = yield (0, parser_1.parseWebsite)(url);
            console.log('Type:', type);
            console.log('City:', city);
            console.log('Year:', city);
            console.log('Floor:', city);
            return { type, city, year, floor }; // Return the extracted data
        }
        catch (error) {
            console.error('Error extracting and showing data:', error);
            throw error;
        }
    });
}
exports.ExtractAndShow = ExtractAndShow;
function ExtractAndSave(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, DbConnect_1.connectToMongoDB)();
            const { type, city, year, floor } = yield (0, parser_1.parseWebsite)(url);
            console.log('Type:', type, 'City:', city, 'Year:', year, 'Floor:', floor);
        }
        catch (error) {
            console.error('Error extracting and saving data:', error);
            throw error;
        }
    });
}
exports.ExtractAndSave = ExtractAndSave;
