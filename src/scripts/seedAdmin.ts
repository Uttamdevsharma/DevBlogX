import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try {
    const adminData = {
      name: "Admin",
      email: "admin@gmail.com",   // ✅ fixed typo
      role: UserRole.ADMIN,
      password: "admin1234"
    };

    // 1️⃣ Check if admin already exists
    const existUser = await prisma.user.findUnique({
      where: { email: adminData.email }
    });

    if (existUser) {
      console.log("✅ Admin already exists");
      return;
    }

    // 2️⃣ Create admin via API (BetterAuth handles hashing)
    const res = await fetch("http://localhost:5000/api/auth/sign-up/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "http://localhost:4000"
      },
      body: JSON.stringify(adminData)
    });

    const data = await res.json();

    // 3️⃣ If API failed, throw error
    if (!res.ok) {
      console.error("❌ Signup failed:", data);
      throw new Error(data.message || "Admin signup failed");
    }

    // 4️⃣ Mark email verified manually
    await prisma.user.update({
      where: { email: adminData.email },
      data: { emailVerified: true }
    });

    console.log("🎉 Admin seeded successfully");

  } catch (error) {
    console.error("🚨 Seed Admin Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
