/* eslint-disable no-unused-vars */

export type AllNodeTypes = "Start" | "Message" | "Stop";

declare interface WorkflowNodeType {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
    id: string;
    text: string;
    type: AllNodeTypes;
  };
};


declare interface Data {
  [key: string]:any;
}
declare interface flowData {
  flow_name:string;
  flow_revision:number;
  flow_data:any;
}
