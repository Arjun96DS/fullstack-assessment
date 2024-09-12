const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use('/todos', todosRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
