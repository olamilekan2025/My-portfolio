import bcrypt from "bcryptjs";

async function main() {
  const pin = "OLA"; // Change this whenever you want

  const hash = await bcrypt.hash(pin, 12);

  console.log("\n");
  console.log(hash);
  console.log("\n");
}

main();