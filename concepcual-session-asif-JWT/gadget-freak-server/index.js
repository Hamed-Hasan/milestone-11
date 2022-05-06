const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
app.use(express.json())
const jwt = require('jsonwebtoken');

require('dotenv').config()

const port = 5000


const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = `mongodb+srv://volunteer:xwkz8fi7TmybjNba@cluster0.jxqey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





/**
 * clien site collect email => send to backend 
 * abc@abc.com fl;sadkjlfkjdsa;lfkjdsa;lfkjdsa;lkjf;ldsakfj
 * fjlsajf;lkdsajf;lkdsaj <====== decode 
 */


async function run() {
    try {
        await client.connect();
        console.log('db connect')

        const productCollection = client.db("gadgetFreak").collection("products");
        const orderCollection = client.db("gadgetFreak").collection("orders");


        app.post('/login', async (req, res) => {
            const email = req.body
            const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
            res.send({ token })
        })
        app.post('/uploadPd', async (req, res) => {
            const product = req.body
            const tokenInfo = req.headers.authorization;
            const [email, accessToken] = tokenInfo.split(" ")
            const decoded = verifyToken(accessToken)
            if(email === decoded.email){
                const result =  await productCollection.insertOne(product)
                res.send({ success: 'Product Insert Successfully'})
            }else{
                res.send({ success: 'UnAuthoraized Access' })
            }
        })

      
        // app.get('/products', async (req, res) => {
        //     const products = await productCollection.find({}).toArray();
        //     res.send(products);
        // })
        app.get('/products', async (req,res) => {
            const products = await productCollection.find({}).toArray();
            res.send(products);
        })


        // app.post('/addOrder', async (req, res) => {
        //     const orderInfo = req.body
        //     const result = await orderCollection.insertOne(orderInfo)
        //     res.send({ success: 'order added successfully'})
        // })
        app.post('/addOrder', async (req, res) => {
            const orderInfo = req.body
            const result = await orderCollection.insertOne(orderInfo)
            res.send({ success: 'order added successfully'})
        })

        app.delete('/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await orderCollection.deleteOne(query);
            res.send(result);
        })

   
        app.get('/orderList' , async (req, res) => {
            const tokenInfo = req.headers.authorization
            const [email, accessToken] = tokenInfo.split(" ")
            const decoded = verifyToken(accessToken)
            if(email === decoded.email){
                const orders = await orderCollection.find({email: email}).toArray()
                res.send(orders)
            }else{
                res.send({success: 'UnAuthoraized Access'})
            }
        })
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// function verifyToken(token){
//     let email
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,function(err,decode){
//         if(err) {
//             email = 'invalid mail'
//         }
//         if(decode){
//             email = decode
//         }
//     })
//     return email
// }

function verifyToken(token){
    let email;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err,decode){
        if(err) {
            email = 'invalid email'
        }
        if(decode){
            email = decode
        }
    })
    return email
}