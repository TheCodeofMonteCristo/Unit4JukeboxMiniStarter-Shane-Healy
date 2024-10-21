// Imports the Prisma client to interact with the database
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Route to fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany(); // Retrieves all users from the database
    res.json(users); // Sends the users as JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Route to fetch a single user by ID, including their playlists
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { playlists: true }, // Includes the user's playlists in the response
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user); // Sends the user and their playlists as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Route to create a new playlist for a user
router.post('/:id/playlists', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    // Finds the user by ID
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Creates a new playlist for the user
    const newPlaylist = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerId: user.id, // Associates the playlist with the user
      },
    });

    res.status(201).json(newPlaylist); // Returns the created playlist
  } catch (error) {
    res.status(500).json({ message: 'Error creating playlist' });
  }
});

// Exports the router for use in other files
module.exports = router;
