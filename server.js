const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password }).exec();
        if (!user) {
            res.redirect('/?login=failed');
        } else {
            res.redirect('/dashboard.html?login=success');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
