// Imports the Prisma client to interact with the database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Main function to seed the database with users and their playlists
async function main() {
  // Create 3 users, each with 5 playlists
  for (let i = 1; i <= 3; i++) {
    await prisma.user.create({
      data: {
        username: `User ${i}`, // Creates users with names User 1, User 2, User 3
        playlists: {
          create: [
            { name: `Playlist 1`, description: `Description for Playlist 1` },
            { name: `Playlist 2`, description: `Description for Playlist 2` },
            { name: `Playlist 3`, description: `Description for Playlist 3` },
            { name: `Playlist 4`, description: `Description for Playlist 4` },
            { name: `Playlist 5`, description: `Description for Playlist 5` },
          ], // Each user is seeded with 5 playlists
        },
      },
    });
  }
}

// Executes the main function, then disconnects Prisma from the database
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
