import "dotenv/config";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

const ADMIN = {
  name: "Olamilekan Abduljeleel",
  email: process.env.ADMIN_EMAIL!,
  password: process.env.ADMIN_PASSWORD!,
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("✅ Connected to MongoDB");

    const AdminSchema = new mongoose.Schema(
      {
        name: String,
        email: {
          type: String,
          unique: true,
        },
        password: String,
      },
      {
        timestamps: true,
      }
    );

    const Admin =
      mongoose.models.Admin ||
      mongoose.model("Admin", AdminSchema);

    const existing = await Admin.findOne({
      email: ADMIN.email,
    });

    if (existing) {
      console.log("⚠️ Admin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      ADMIN.password,
      12
    );

    await Admin.create({
      name: ADMIN.name,
      email: ADMIN.email,
      password: hashedPassword,
    });

    console.log("🎉 Admin created successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();