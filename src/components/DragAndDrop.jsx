import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Folder = ({ folder, index, moveFolder }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [{}, drag] = useDrag({
    type: "CARD",
    item: { id: folder.name, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "CARD",
    hover: (item, monitor) => {
      console.log(item, monitor);

      if (item.index !== index) {
        moveFolder(item.index, index);
        item.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="folder"
      style={{ padding: 16}}
    >
      <p ref={(node) => drag(drop(node))} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        drag
      </p>
      {folder.name}
    </div>
  );
};

function DragAndDrop() {
  const [folders, setFolders] = useState([
    { id: 1, name: "Folder 1" },
    { id: 2, name: "Folder 2" },
    { id: 3, name: "Folder 3" },
  ]);

  const moveFolder = (fromIndex, toIndex) => {
    const newFolders = [...folders];
    const folderToMove = newFolders[fromIndex];
    newFolders.splice(fromIndex, 1);
    newFolders.splice(toIndex, 0, folderToMove);
    setFolders(newFolders);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="DragAndDrop">
        <h1>Folder Drag and Drop</h1>
        <div className="folders">
          {folders.map((folder, index) => (
            <Folder
              key={folder.id}
              folder={folder}
              index={index}
              moveFolder={moveFolder}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default DragAndDrop;
