const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const questionRoutes = require('./routes/questionRoutes');
const setupSwagger = require('./swagger'); // Swagger 설정


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev')); // 요청 로깅

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Swagger 설정
setupSwagger(app);

app.use('/api/questions', questionRoutes);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
