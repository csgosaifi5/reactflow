import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import { WorkflowNodeType } from "@/types";


const StartNode = ({ data }: { data: WorkflowNodeType }) => {
  return (
    <div className="bg-white h-12 w-12 border-2 rounded-md border-green-600 flex items-center justify-center">
      <div>
        <img style={{height:"35px"}} src="/assets/start-button.png" alt="Start" />
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default StartNode;
