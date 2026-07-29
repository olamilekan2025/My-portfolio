// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Admin from "@/models/Admin";

// export async function GET() {
//   try {
//     await connectDB();

//     const admins = await Admin.find();

//     return NextResponse.json({
//       success: true,
//       count: admins.length,
//       admins,
//     });
//   } catch (error) {
//     console.error("HAS ADMIN ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         error: String(error),
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }



import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET() {
  try {
    await connectDB();

    const count = await Admin.countDocuments();

    return NextResponse.json({
      hasAdmin: count > 0,
    });
  } catch (error) {
    console.error("HAS ADMIN ERROR:", error);

    return NextResponse.json(
      {
        hasAdmin: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}