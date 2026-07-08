import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const db = new PrismaClient();

const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, disableSignUp: false },
});

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@skyluxeroofing.com";
  const password = process.env.ADMIN_PASSWORD ?? "changeme123!";
  const name = process.env.ADMIN_NAME ?? "Admin";

  console.log(`Creating admin user: ${email}`);

  try {
    await auth.api.signUpEmail({
      body: { email, password, name },
    });
    console.log("✅ Admin user created successfully");
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log("\n⚠️  Change the password after first login!");
  } catch (error) {
    if ((error as Error).message?.includes("already exists")) {
      console.log("ℹ️  Admin user already exists");
    } else {
      throw error;
    }
  }

  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
