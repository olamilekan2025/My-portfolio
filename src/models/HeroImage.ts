import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IHeroImage extends Document {
  title: string;
  alt: string;

  imageUrl: string;
  publicId: string;

  cloudinaryAssetId?: string;

  isActive: boolean;
  order: number;

  createdAt: Date;
  updatedAt: Date;
}

const HeroImageSchema = new Schema<IHeroImage>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      default: "Portfolio Hero",
    },

    alt: {
      type: String,
      required: true,
      trim: true,
      default: "Oladunjoye Abduljeleel — Full Stack Developer",
    },

    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },

    publicId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    cloudinaryAssetId: {
      type: String,
      default: "",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models.HeroImage as Model<IHeroImage>) ||
  mongoose.model<IHeroImage>(
    "HeroImage",
    HeroImageSchema
  );