import React from 'react';
import { useDnD } from '../lib/DndContext';

export default () => {
  const { setType} = useDnD();

  const onDragStart = (event:any, nodeType:any) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'Start')} draggable>
        Start Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'Message')} draggable>
        Message Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'End')} draggable>
        End Node
      </div>
    </aside>
  );
};
