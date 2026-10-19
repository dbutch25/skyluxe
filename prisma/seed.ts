import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const db = new PrismaClient();

// A minimal better-auth instance whose only job here is to create a user with a
// correctly-hashed password. (You can't INSERT a user directly — better-auth
// owns the password hashing, stored on the linked Account row.)
const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, disableSignUp: false },
});

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@skyluxeroofing.com";
  const password = process.env.ADMIN_PASSWORD ?? "changeme123!";
  const name = process.env.ADMIN_NAME ?? "Admin";

  // ─── 1. Delete ALL existing users ──────────────────────────────────────────
  // Session and Account rows cascade-delete with their User (onDelete: Cascade
  // in the schema). Verification isn't tied to a user, so we clear it too to
  // drop any stale signup/reset tokens.
  const existing = await db.user.count();
  console.log(`Found ${existing} existing user(s). Deleting...`);

  await db.verification.deleteMany({});
  const deleted = await db.user.deleteMany({});
  console.log(`🗑️  Deleted ${deleted.count} user(s) (sessions & accounts cascaded).`);

  // ─── 2. Create the new admin ─────────────────────────────────────────────────
  console.log(`Creating admin user: ${email}`);
  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
    });
    console.log("✅ Admin user created successfully");
    console.log(`   Email:    ${email}`);
    console.log(`   Password: ${password}`);
    console.log("\n⚠️  Change the password after first login.");
  } catch (error) {
    console.error("❌ Failed to create admin user:", (error as Error).message);
    throw error;
  }

  await db.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});