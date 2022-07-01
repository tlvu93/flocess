import React from "react";
import AddModal from "./add-task-modal";
import EditModal from "./edit-task-modal";
import EditTaskNodeModal from "./edit-task-node-modal";

const Modals = () => {
  return (
    <>
      <EditModal />
      <EditTaskNodeModal />
      <AddModal />
    </>
  );
};

export default Modals;
