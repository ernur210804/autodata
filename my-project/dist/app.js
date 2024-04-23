"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000; // Use the port specified in the environment variable or default to 3000
// Middleware
app.use(express_1.default.json()); // Parse JSON request bodies
// Routes
app.use('/', routes_1.default); // Mount your routes
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
