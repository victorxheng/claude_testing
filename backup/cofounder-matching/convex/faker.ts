import { faker } from '@faker-js/faker';
import { internalMutation } from "./_generated/server";

export const createFake = internalMutation(async (ctx) => {
  faker.seed();

  for (let i = 0; i < 20; i++) {
    const userId = await ctx.db.insert("users", {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      linkedin: faker.internet.url(),
      description: faker.lorem.paragraph(),
      isTechnical: faker.datatype.boolean(),
      isAvailable: faker.datatype.boolean(),
      tokenIdentifier: faker.person.zodiacSign()
    });

    const numMatches = faker.number.int({ min: 0, max: 5 });
    // get all users
    const users = (await ctx.db.query("users").filter((q) => q.neq(q.field("_id"), userId)).collect())
    for (let j = 0; j < numMatches; j++) {
      // select random user to match with
      const toUserId = users[Math.floor(Math.random() * users.length)]._id
      
      // create match request
      await ctx.db.insert("matches", {
        from: userId,
        to: toUserId,
        status: faker.helpers.arrayElement(["pending", "accepted", "rejected"]),
        requestMessage: faker.lorem.sentence(),
        acceptMessage: faker.datatype.boolean() ? faker.lorem.sentence() : undefined
      });
    }
  }
});
