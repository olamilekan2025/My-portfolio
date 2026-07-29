import { Schema, model, models } from "mongoose";

const SettingsSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    title: String,

    bio: String,

    profileImage: String,

    resumeUrl: String,

    github: String,

    linkedin: String,

    twitter: String,

    email: String,

    phone: String,

    location: String,
  },
  {
    timestamps: true,
  }
);

export const Settings =
  models.Settings ||
  model("Settings", SettingsSchema);