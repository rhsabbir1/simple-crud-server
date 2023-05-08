const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')

// user -----  rhsabbir090
// password -----  1ceXGukmb1NCTOkX

app.use(cors())
app.use(express.json())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://rhsabbir090:1ceXGukmb1NCTOkX@cluster0.vhijgnu.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    app.get('/users', async (req, res) => {
      const curcor = userCollection.find()
      const result = await curcor.toArray()
      res.send(result)
    })

    app.post('/users', async (req, res) => {
      const newUser = req.body;
      console.log(newUser)
      const result = await userCollection.insertOne(newUser);
      res.send(result)
    })

    app.delete('/users/:id', async(req, res) => {
      const id = req.params.id;
      console.log('delete id' , id)
      const query = { _id : new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(port, () => {
  console.log(`server on running port ${port}`)
})