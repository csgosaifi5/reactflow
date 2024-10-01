import FlowModel from "../models/flow";

export default {
  list: async function (data: any) {
    try {
      const allFlows = await FlowModel.find({flow_revision:1});

      return allFlows;
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  },
  addFlow: async function (body: any) {
    let result: any = {};

    try {
      const { flow_name, flow_data } = body;

      if (!flow_name || !flow_data) {
        return { error: "Flow name and data are required" };
      }

      result.data = await new FlowModel(body).save();
      if (result.data) {
        result.message = "Successfully Added Flow";
      } else {
        return { error: "failed to add" };
      }
    } catch (err) {
      result.err = err.message;
    }

    return result;
  },
};
