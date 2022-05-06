const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = 5000;
const cors = require("cors");
//ssagar
//BsRNksvawiGGMTD8
app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://concept:AQXTNFUYX42t3hz4@cluster0.jxqey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   console.log('db conncect');
//   const collection = client.db("notesTaker").collection("notes");
//   // perform actions on the collection object

// });

async function run() {
  try {
    await client.connect();
    const notesCollection = client.db("notesTaker").collection("notes");
console.log('db connected !!');
    // get api to read all notes
    //http://localhost:4000/notes
 

app.get('/notes', async (req, res) => {
  const query = req.query
  const cursor = notesCollection.find( query );
  const result = await cursor.toArray();
  res.send(result);
})
 
    //create notesTaker
    //http://localhost:4000/note

    /*
  body  {
"userName":"oshan",
"textData":"hello world 2"
}
    */

    app.post("/notes", async (req, res) => {
      const data = req.body;
      console.log("from post api", data);
      const result = await notesCollection.insertOne(data);
      res.send(result);
    });

  

    // // update notesTaker
    // //http://localhost:4000/note/6262dcd73f629a282aaba2e6
   app.put("/notes/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      console.log("from update api", data);
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          userName: data.userName,
          textData: data.textData,
        },
      };
      const result = await notesCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });


    // // delete note
    // //http://localhost:4000/note/6262dcd73f629a282aaba2e6

  app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id
    const query = {_id: ObjectId(id)}
    const result = await notesCollection.deleteOne(query)
    res.send(result);
  })
    // console.log("connected to db");
  } finally {
  }
}

run().catch(console.dir);

// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
// console.log('connected to db')

// //   client.close();
// });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
