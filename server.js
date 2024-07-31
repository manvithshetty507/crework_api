const express = require('express')
const cors = require('cors');
const connectDB = require('./db');
const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskrouter');
const verifyToken = require('./middlewares/veriftToken')
require('dotenv').config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//connect to DB
connectDB()

// Routes
app.use('/api/auth', userRouter);
app.use('/api/task', verifyToken ,taskRouter)

app.get('/get', verifyToken, (req, res) => {
    res.status(200).json({msg:"Verified token"});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));