import React, { useState, useEffect, useRef } from "react";
import { Handle, NodeProps, Position } from "@xyflow/react";
import RightSidebar from "./RightSidebar";

const MessageNode = ({ data }: { data: any }) => {
  const sheetTriggerRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    // Ensure ref exists and trigger the click event
    if (sheetTriggerRef.current) {
      sheetTriggerRef.current.click();
    }
  };
  return (
    <>
      <div
        className="bg-white border-2 rounded-md border-blue-600"
        style={{ height: "100px", width: "100px" }}
        onClick={handleClick}
      >
        <div className="flex justify-center">
          <div>
            <img src="/assets/message.png" style={{ height: "20px" }} alt="message" />
          </div>
        </div>
        <div className="p-1">
          <p className="font-serif text-xs overflow-hidden break-words">{data?.text}</p>
        </div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
      <RightSidebar ref={sheetTriggerRef} selectedNode={data} />
    </>
  );
};

export default MessageNode;
