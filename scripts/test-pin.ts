import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});
import bcrypt from "bcryptjs";

async function main() {
  console.log("PIN:", "OLA");

  console.log(
    "HASH:",
    process.env.ADMIN_PIN_HASH
  );

  const valid = await bcrypt.compare(
    "OLA",
    process.env.ADMIN_PIN_HASH!
  );

  console.log("VALID =", valid);
}

main();