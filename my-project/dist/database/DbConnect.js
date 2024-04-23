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
exports.saveDataToMongoDB = exports.connectToMongoDB = void 0;
const mongodb_1 = require("mongodb");
const connectionString = 'mongodb://localhost:27017/parser';
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = yield mongodb_1.MongoClient.connect(connectionString, {
                // @ts-ignore
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB');
            const db = client.db();
            return { client, db };
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw new Error('Failed to connect to MongoDB');
        }
    });
}
exports.connectToMongoDB = connectToMongoDB;
function saveDataToMongoDB(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { client, db } = yield connectToMongoDB();
        try {
            const collection = db.collection('savedData');
            const result = yield collection.insertOne(data);
            console.log('Data inserted:', result.insertedId);
        }
        catch (error) {
            console.error('Error saving data to MongoDB:', error);
            throw new Error('Failed to save data to MongoDB');
        }
        finally {
            yield client.close();
        }
    });
}
exports.saveDataToMongoDB = saveDataToMongoDB;
