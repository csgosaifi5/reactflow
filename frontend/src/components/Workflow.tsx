"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  ReactFlowInstance,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Controls,
  useReactFlow,
  Background,
  type OnConnect,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import Sidebar from "./Sidebar";
import { DnDProvider, useDnD } from "../lib/DndContext";
import { initialEdges, initialNodes } from "../lib/constant";
import StartNode from "./StartNode";
import MessageNode from "./MessageNode";
import EndNode from "./EndNode";
import CommonService from "@/services/CommonService";
import { toast } from "sonner";
import "./index.css";
import { flowData } from "@/types";

const nodeTypes: NodeTypes = {
  startNode: StartNode,
  messageNode: MessageNode,
  endNode: EndNode,
};

interface Flow {
  _id: string;
  flow_name: string;
  flow_data: any;
  flow_revision: number;
}
let id = 1;
const getId = () => `node_${id++}`;

const commService = new CommonService();

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [selectedFlow, setSelectedFlow] = useState<flowData | null>(null);
  const { type } = useDnD();
  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { setViewport } = useReactFlow();
  const [flows, setFlows] = useState<Flow[]>([]);
  const onInit = (instance: ReactFlowInstance) => setFlowInstance(instance);
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect: OnConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      let nodeId = getId();

      const newNode = {
        id: nodeId,
        type: type === "Start" ? "startNode" : type === "Message" ? "messageNode" : "endNode",
        position,
        data: { label: `${type}`, id: nodeId, text: "" },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const onSave = async () => {
    console.log(selectedFlow);
    let flow_name;
    let revision;
    if (selectedFlow?.flow_name) {
      flow_name = selectedFlow?.flow_name;
      revision = selectedFlow?.flow_revision + 1;
    } else {
      flow_name = prompt("Please enter Flow name:");
      revision = 1;
    }
    if (flowInstance && flow_name) {
      const flow = flowInstance.toObject();

      const result = await commService.addFlow({ flow_name, flow_data: flow, flow_revision: revision });

      if (result.data) {
        getFlowsList();
        toast(result.message);
      }
    }
  };

  const onRestore = useCallback(
    (flow: any) => {
      const restoreFlow = async () => {
        if (flow) {
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
      };

      restoreFlow();
    },
    [setNodes, setViewport]
  );

  const getFlowsList = async () => {
    let result = await commService.listAll({}, "/flows", "GET");
    if (Array.isArray(result)) {
      setFlows(result);
    }
  };

  useEffect(() => {
    getFlowsList();
  }, []);

  return (
    <div className="dndflow">
      <Sidebar />
      <div className="reactflow-wrapper" style={{ width: "100%" }}>
        <div style={{ height: "600px", border: "1px solid black" }} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={onInit}
            nodeTypes={nodeTypes}
            // onClick={()=>{ console.log(nodes);
            // }}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
      <div className="text-center mt-3 w-64">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Save
        </button>

        <div className="mt-2">
          <h1>Saved Flows</h1>
          <ul>
            {flows.length > 0 &&
              flows.map((item, index) => (
                <li key={item._id}>
                  <strong
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      onRestore(item.flow_data), setSelectedFlow(item);
                    }}
                  >
                    {index + 1 + ". " + item.flow_name}
                  </strong>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
