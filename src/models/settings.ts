import { Schema, model, models } from "mongoose";

const SettingsSchema = new Schema(
  {
    // Profile Settings
    firstName: String,
    lastName: String,
    displayName: String,
    email: {
      type: String,
      required: true,
    },
    phone: String,
    location: String,
    bio: String,
    website: String,
    profileImage: String,

    // Site Settings
    siteName: String,
    tagline: String,
    siteDescription: String,
    contactEmail: String,
    github: String,
    linkedin: String,
    twitter: String,
    dribbble: String,

    // Notification Settings
    emailNotifications: {
      newMessages: { type: Boolean, default: true },
      weeklySummary: { type: Boolean, default: false },
      securityAlerts: { type: Boolean, default: true },
    },
    inAppNotifications: {
      projectUpdates: { type: Boolean, default: true },
      messageReminders: { type: Boolean, default: true },
      systemUpdates: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

export const Settings =
  models.Settings ||
  model("Settings", SettingsSchema);