import React from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";

const EndNode = () => {
  return (
    <div className="bg-white h-12 w-12 border-2 rounded-md border-red-600 flex items-center justify-center">
     <div>
        <img style={{height:"35px"}} src="/assets/stop-button.png" alt="Start" />
      </div>
    <Handle type="target" position={Position.Left} />
  </div>
  );
};

export default EndNode