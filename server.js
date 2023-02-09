const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(port, () => {
      console.log(`API server running on port ${port}!`);
    });
  });
////////////////////////////////////////////////////////////////////////////////////////////////////
// const connectionStringURI = `mongodb://127.0.0.1:27017/socialDB`;


// mongodb.connect(connectionStringURI, { useNewUrlParser: true, useUnifiedTopology: true }, 
//     (err, client) => {
//         db = client.db();
//         db.collection('user').deleteMany({});
//         db.collection('thoughts').insertMany(data, (err, res) => {
//             if (err) {
//                 return console.error(err);
//             }
//             console.log('data inserted');
//         });
//         app.listen(port, () => {
//             console.log(`App listening on ${port}`);
//         });
//     });
  
// //.populate to joing data aka friends and thoughts