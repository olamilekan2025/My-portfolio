// import "server-only";

// import { v2 as cloudinary } from "cloudinary";

// const cloudinaryConfig = {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// };

// if (
//   !cloudinaryConfig.cloud_name ||
//   !cloudinaryConfig.api_key ||
//   !cloudinaryConfig.api_secret
// ) {
//   throw new Error(
//     "Cloudinary environment variables are not configured. " +
//       "Required: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET."
//   );
// }

// cloudinary.config(cloudinaryConfig);

// export default cloudinary;




import { v2 as cloudinary } from "cloudinary";

const cloudName =
  process.env.CLOUDINARY_CLOUD_NAME;

const apiKey =
  process.env.CLOUDINARY_API_KEY;

const apiSecret =
  process.env.CLOUDINARY_API_SECRET;

if (
  !cloudName ||
  !apiKey ||
  !apiSecret
) {
  throw new Error(
    "Missing Cloudinary environment variables."
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export default cloudinary;