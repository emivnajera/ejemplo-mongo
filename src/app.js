const express = require('express');
const app = express();
const port = 3000;

const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://user:1234@practica3.cvkcafu.mongodb.net/practica3'; // Asegúrate de que la URL sea correcta y apunte a la base de datos

app.use(express.json());

// Conéctate a MongoDB y obtén la colección de libros
async function connectToMongo() {
  try {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db('practica3');
    const collection = db.collection('libros');

    // Método GET para obtener todos los productos
    app.get('/books', async (req, res) => {
      try {
        const books = await collection.find({}).toArray();
        res.json(books);
      } catch (err) {
        console.error('Error al obtener los libros:', err);
        res.status(500).send('Error al obtener los libros');
      }
    });

    app.listen(port, () => {
      console.log(`API escuchando en http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
  }
}

connectToMongo();
