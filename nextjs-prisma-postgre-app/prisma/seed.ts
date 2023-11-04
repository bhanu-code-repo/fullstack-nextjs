const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  const users = [];
  const posts = [];
  const profiles = [];

  // Generate 10 User entries with random data
  for (let i = 0; i < 20; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i + 1}@example.com`,
        name: `User ${i + 1}`,
      },
    });
    users.push(user);

    // Generate a Profile entry for each user with random data
    const profile = await prisma.profile.create({
      data: {
        bio: `Bio for User ${i + 1}`,
        userId: user.id,
      },
    });
    profiles.push(profile);

    // Generate 1 to 3 Post entries for each user with random data
    for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
      const post = await prisma.post.create({
        data: {
          title: `Post ${j + 1} by User ${i + 1}`,
          content: `Content for Post ${j + 1} by User ${i + 1}`,
          published: Math.random() < 0.5,
          authorId: user.id,
        },
      });
      posts.push(post);
    }
  }

  console.log("Seed data generated successfully.");

  // Close the Prisma client
  await prisma.$disconnect();
}

seed().catch((error) => {
  console.error(error);
});
