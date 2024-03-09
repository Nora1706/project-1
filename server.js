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

app.use(bodyParser.json());
app.use(express.static('public'));

// Login route
app.post('/login', async (req, res) => {

    const { username, password } = req.body;
    console.log(req.body,"hiii")    
    // const username  = "testuser"
    // const password ="testpassword"
    console.log(username,password,"username");
    try {
        const user = await User.findOne({ username, password }).exec();
        if (!user) {
            // res.redirect('/?login=failed');
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        } else {
           return  res.status(200).json({ success: true });
            // res.redirect('/dashboard.html?login=success');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
