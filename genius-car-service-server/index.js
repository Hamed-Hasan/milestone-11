const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());



// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vwx9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jxqey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({ message: 'unauthorized access'})
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded) => {
        if(err){
            return res.status(403).send({ message: ' access'})
        }
        req.decoded = decoded;
        next();
    })
}
async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('geniusCar').collection('service');
        const orderCollection = client.db('geniusCar').collection('order');

          // module 68/ step 3 JWT Authorization with login & signup
        // AUTH
   
        app.post('/login', async (req, res) => {
            const user = req.body
            const accessToken = jwt.sign(user,  process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            })
            res.send({ accessToken });
        })
        // backend display multiple data 

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const result = await cursor.toArray()
            res.send(result);
        })

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query={_id: ObjectId(id)}
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

        // POST
    

        app.post('/service', async (req, res) =>{
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        })
        // DELETE
   

        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        })

          // module 68/ step 2 people email check
        // order collection api 
      
     app.get('/order', verifyJWT,async (req, res) => {
         const decodedEmail = req.decoded.email
         const email = req.query.email
        if(email === decodedEmail){
            const query = {email: email}
            const cursor = orderCollection.find(query)
            const order = await cursor.toArray()
            res.send(order)
        }else{
            res.status(404).send({message: 'forbidden access'})
        }
     })

        // module 68/ step 1 post info to server another way
        app.post('/order', async (req, res) => {
            const order = req.body
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })

    }
    finally {

    }
}

run().catch(console.dir);

app.get('/hero', (req, res) => {
    res.send('Running heroku Server');
});
app.get('/', (req, res) => {
    res.send('Running voluntee Server');
});

app.listen(port, () => {
    console.log('Listening to port', port);
})

