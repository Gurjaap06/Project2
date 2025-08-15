import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, min: 10, max: 60 },
    role: {
      type: String,
      enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"],
      required: true,
    },
    battingStyle: { type: String, enum: ["RHB", "LHB"], default: "RHB" },
    bowlingStyle: {
      type: String,
      enum: [
        "Off-spin",
        "Leg-spin",
        "Left-arm Orthodox",
        "Right-arm Fast",
        "Left-arm Fast",
        "None",
      ],
      default: "None",
    },
    team: { type: String, trim: true, default: "Free Agent" },
    matches: { type: Number, default: 0 },
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    average: { type: Number, default: 0 },
    strikeRate: { type: Number, default: 0 },
    economy: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Player", PlayerSchema);
