import { Schema, model, Document } from "mongoose";

// Define an interface representing a document in MongoDB
interface flow extends Document {
  flow_name: string;
  flow_revision:number;
  flow_data: Object;
}

// Create the schema
const flowSchema = new Schema<flow>(
  {
    flow_name: String,
    flow_revision:Number,
    flow_data: Object,
  },
  { timestamps: { createdAt: "createdAt" } }
);

// Create the model
const FlowModel = model<flow>("Flows", flowSchema);

// Export the model
export default FlowModel;
