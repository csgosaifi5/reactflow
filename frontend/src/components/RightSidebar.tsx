import React, { forwardRef, useState} from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useReactFlow } from "@xyflow/react";

interface RightSidebarProps {
  selectedNode: any;

}

const RightSidebar = forwardRef<HTMLButtonElement, RightSidebarProps>(({ selectedNode }, ref) => {
  const [text, setText] = useState("")
  const { setNodes } = useReactFlow();

  const handleSave = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {

          return {
            ...node,
            data: { ...node.data, text: text },
          };
        }
       
        return node;
      })
    );
  };
  return (
    <Sheet>
      {/* Attach the ref to the SheetTrigger */}
      <SheetTrigger ref={ref}></SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{selectedNode?.id}</SheetTitle>
          <SheetDescription>
            <Textarea
              defaultValue={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <Button className="mt-2" onClick={handleSave}>
              save
            </Button>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
});

export default RightSidebar;
