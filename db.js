const mongoose = require('mongoose');

// connect to database
async function connect() {
    try{await mongoose.connect(process.env.URI)}catch(err){console.log(err)};
}

module.exports = { connect };
