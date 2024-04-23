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
const express_1 = __importDefault(require("express"));
const extract_1 = require("../controllers/extract");
const DbConnect_1 = require("../database/DbConnect");
const parser_1 = require("../data/parser");
const router = express_1.default.Router();
router.post('/extract-and-show', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        const data = yield (0, extract_1.ExtractAndShow)(url);
        res.json(data);
    }
    catch (error) {
        console.error('Error extracting and showing data:', error);
        res.status(500).json({ error: 'An error occurred while extracting and showing data' });
    }
}));
router.post('/save-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        const { type, city, year, floor } = yield (0, parser_1.parseWebsite)(url);
        yield (0, DbConnect_1.saveDataToMongoDB)({ type, city, year, floor });
        res.json({ message: 'Data saved to MongoDB' });
    }
    catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'An error occurred while saving data to MongoDB' });
    }
}));
exports.default = router;
