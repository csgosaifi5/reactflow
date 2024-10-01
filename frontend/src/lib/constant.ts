import { Edge, Node } from "@xyflow/react";

export const initialEdges: Edge[] = [];

export const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Start" },
    type: "startNode",
  },
  // {
  //   id: "2",
  //   data: {},
  //   position: { x: 300, y: 20 },
  //   type: "messageNode",
  // },
  // {
  //   id: "3",
  //   data: { },
  //   position: { x: 300, y: 200 },
  //   type: "endNode",
  // },
];
