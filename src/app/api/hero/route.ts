import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import HeroImage from "@/models/HeroImage";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

/* =========================================================
   GET
   Public endpoint
   Returns the active hero image
========================================================= */

export async function GET() {
  try {
    await connectDB();

    const hero = await HeroImage.findOne({
      isActive: true,
    })
      .sort({
        order: 1,
        createdAt: -1,
      })
      .lean();

    if (!hero) {
      return NextResponse.json(
        {
          hero: null,
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json({
      hero: {
        id: String(hero._id),
        title: hero.title,
        alt: hero.alt,
        imageUrl: hero.imageUrl,
        publicId: hero.publicId,
      },
    });
  } catch (error) {
    console.error(
      "GET /api/hero error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to load hero image.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   POST
   Admin only
   Upload new hero image
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {
    const session = await auth();

    const role = (
      session?.user as {
        role?: string;
      } | undefined
    )?.role;

    if (!session?.user || role !== "admin") {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const formData =
      await request.formData();

    const file =
      formData.get("image");

    const title =
      String(
        formData.get("title") ||
          "Portfolio Hero"
      ).trim();

    const alt =
      String(
        formData.get("alt") ||
          "Oladunjoye Abduljeleel — Full Stack Developer"
      ).trim();

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          message:
            "Please select an image.",
        },
        {
          status: 400,
        }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          message:
            "Only image files are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * 10MB maximum
     */

    const MAX_FILE_SIZE =
      10 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          message:
            "Image must be smaller than 10MB.",
        },
        {
          status: 400,
        }
      );
    }

    await connectDB();

    /*
     * Convert File -> Buffer
     */

    const arrayBuffer =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(arrayBuffer);

    /*
     * Upload to Cloudinary
     */

    const uploadResult =
      await new Promise<{
        secure_url: string;
        public_id: string;
        asset_id?: string;
      }>(
        (resolve, reject) => {
          const uploadStream =
            cloudinary.uploader.upload_stream(
              {
                folder:
                  "portfolio/hero",

                resource_type:
                  "image",

                transformation: [
                  {
                    quality: "auto",
                    fetch_format: "auto",
                  },
                ],
              },

              (error, result) => {
                if (error) {
                  reject(error);
                  return;
                }

                if (!result) {
                  reject(
                    new Error(
                      "Cloudinary upload failed."
                    )
                  );
                  return;
                }

                resolve({
                  secure_url:
                    result.secure_url,

                  public_id:
                    result.public_id,

                  asset_id:
                    result.asset_id,
                });
              }
            );

          uploadStream.end(buffer);
        }
      );

    /*
     * Find existing active hero
     */

    const existingHero =
      await HeroImage.findOne({
        isActive: true,
      });

    /*
     * Disable old hero
     */

    if (existingHero) {
      existingHero.isActive =
        false;

      await existingHero.save();
    }

    /*
     * Create new hero
     */

    const hero =
      await HeroImage.create({
        title:
          title ||
          "Portfolio Hero",

        alt:
          alt ||
          "Oladunjoye Abduljeleel — Full Stack Developer",

        imageUrl:
          uploadResult.secure_url,

        publicId:
          uploadResult.public_id,

        cloudinaryAssetId:
          uploadResult.asset_id || "",

        isActive: true,

        order: 0,
      });

    /*
     * Remove previous Cloudinary
     * image after successful upload.
     *
     * This prevents unused hero images
     * from accumulating.
     */

    if (
      existingHero?.publicId
    ) {
      try {
        await cloudinary.uploader.destroy(
          existingHero.publicId,
          {
            resource_type: "image",
          }
        );
      } catch (deleteError) {
        /*
         * Do not fail the entire request.
         * The new hero has already been
         * successfully uploaded.
         */

        console.error(
          "Failed to delete previous hero from Cloudinary:",
          deleteError
        );
      }
    }

    return NextResponse.json(
      {
        message:
          "Hero image uploaded successfully.",

        hero: {
          id: String(hero._id),
          title: hero.title,
          alt: hero.alt,
          imageUrl: hero.imageUrl,
          publicId: hero.publicId,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/hero error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to upload hero image.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE
   Admin only
========================================================= */

export async function DELETE() {
  try {
    const session = await auth();

    const role = (
      session?.user as {
        role?: string;
      } | undefined
    )?.role;

    if (!session?.user || role !== "admin") {
      return NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const hero =
      await HeroImage.findOne({
        isActive: true,
      });

    if (!hero) {
      return NextResponse.json(
        {
          message:
            "No active hero image found.",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Delete Cloudinary asset
     */

    if (hero.publicId) {
      try {
        await cloudinary.uploader.destroy(
          hero.publicId,
          {
            resource_type: "image",
          }
        );
      } catch (error) {
        console.error(
          "Cloudinary delete error:",
          error
        );
      }
    }

    /*
     * Delete database record
     */

    await HeroImage.deleteOne({
      _id: hero._id,
    });

    return NextResponse.json({
      message:
        "Hero image deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE /api/hero error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to delete hero image.",
      },
      {
        status: 500,
      }
    );
  }
}