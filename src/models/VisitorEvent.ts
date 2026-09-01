import mongoose, { Document, Model, Schema } from "mongoose";

export interface IVisitorEvent extends Document {
  visitorId: string;
  sessionId: string;

  path: string;
  pageTitle?: string;

  referrer?: string;
  referrerDomain?: string;

  userAgent?: string;
  device?: "desktop" | "mobile" | "tablet" | "unknown";
  browser?: string;
  os?: string;

  country?: string;
  countryCode?: string;

  ipHash?: string;

  createdAt: Date;
  updatedAt: Date;
}

const VisitorEventSchema = new Schema<IVisitorEvent>(
  {
    visitorId: {
      type: String,
      required: true,
      index: true,
    },

    sessionId: {
      type: String,
      required: true,
      index: true,
    },

    path: {
      type: String,
      required: true,
      index: true,
    },

    pageTitle: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    referrer: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    referrerDomain: {
      type: String,
      trim: true,
      maxlength: 255,
      index: true,
    },

    userAgent: {
      type: String,
      maxlength: 1000,
    },

    device: {
      type: String,
      enum: ["desktop", "mobile", "tablet", "unknown"],
      default: "unknown",
      index: true,
    },

    browser: {
      type: String,
      maxlength: 100,
    },

    os: {
      type: String,
      maxlength: 100,
    },

    country: {
      type: String,
      maxlength: 100,
    },

    countryCode: {
      type: String,
      maxlength: 10,
    },

    ipHash: {
      type: String,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

VisitorEventSchema.index({ createdAt: -1 });
VisitorEventSchema.index({ path: 1, createdAt: -1 });
VisitorEventSchema.index({ visitorId: 1, createdAt: -1 });

const VisitorEvent: Model<IVisitorEvent> =
  mongoose.models.VisitorEvent ||
  mongoose.model<IVisitorEvent>("VisitorEvent", VisitorEventSchema);

export default VisitorEvent;