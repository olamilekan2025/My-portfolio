import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Admin =
  mongoose.models.Admin ||
  mongoose.model("Admin", AdminSchema);

async function main() {
  await mongoose.connect(process.env.MONGODB_URI!);

  const exists = await Admin.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (exists) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const password = await bcrypt.hash(
    process.env.ADMIN_PASSWORD!,
    12
  );

  await Admin.create({
    email: process.env.ADMIN_EMAIL,
    password,
  });

  console.log("✅ Admin created successfully");

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});