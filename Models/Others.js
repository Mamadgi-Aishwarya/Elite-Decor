var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Admin:minnu@mongodb01.irdlb.mongodb.net/InteriorDB?retryWrites=true&w=majority",{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true},function(err,db){
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});
const Others={
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    size:{
        type: String,
    },
    color:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
};
 
module.exports = mongoose.model('Others', Others);