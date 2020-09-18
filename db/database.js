const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://riturajanand:riturajanand@cluster0-tzdl4.mongodb.net/login-register?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})