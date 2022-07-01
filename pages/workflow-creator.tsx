import React, { useState } from "react";
import ModalState from "src/context/modal-context";
import TaskState from "src/context/task-context";

import ComponentList from "@components/component-list/component-list";
import EditModal from "@components/modals/edit-modal";
import { SVGArea } from "@components/svg-area";
import AddModal from "@components/modals/add-modal";
import WorkflowState from "@context/workflow-context";
import Modals from "@components/modals/modals";

function WorkflowCreator() {
  return (
    <div className="App">
      <ModalState>
        <TaskState>
          <WorkflowState>
            {/* SVG Area / Canvas where the nodes will be rendered */}
            <SVGArea />

            {/* Dashboard with Components, which are draggable */}
            <ComponentList />
            <Modals />
          </WorkflowState>
        </TaskState>
      </ModalState>
    </div>
  );
}

export default WorkflowCreator;
