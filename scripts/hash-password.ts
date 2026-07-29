import bcrypt from "bcryptjs";

async function main() {
  const password = "@Olamilekandev2025"; // Change this to your desired password

  const hash = await bcrypt.hash(password, 12);

  console.log("\nYour password hash:\n");
  console.log(hash);
}

main();