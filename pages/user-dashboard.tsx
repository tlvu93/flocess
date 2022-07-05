import Link from 'next/link';
import React, { useState } from 'react';

import { useAuth } from '@context/auth-context';
import { useTaskContext } from '@context/task-context';
import Card from '@layouts/Card';
import Container, { ContainerStyle } from '@layouts/Container';

interface Workflow {
  id: string;
  name: string;
  taskList: SVGTaskNode[];
}

interface User {
  name: string;
  tasks: Task[];
  workflows: Workflow[];
}

let task1: Task = {
  id: 't1',
  name: 't1',
  color: '#FFFF00',
};

let node1: SVGTaskNode = {
  id: 'n1',
  originTask: task1,
  x: 0,
  y: 0,
  completed: false,
};

let wf1: Workflow = {
  id: 'w1',
  name: 'workflow 1',
  taskList: [node1, node1],
};

let wf2: Workflow = {
  id: 'w2',
  name: 'workflow 2',
  taskList: [node1, node1],
};

const exampleUser: User = {
  name: 'testUser 2',
  tasks: [task1],
  workflows: [wf1, wf2],
};

const Workflow = ({ data }: { data: Workflow }) => {
  return (
    <Link href={`/workflow/${data.id}`}>
      <a>
        <Card>
          <h2> {data.name}</h2>
        </Card>
      </a>
    </Link>
  );
};

const UserDashboard = () => {
  const { isAuthenticated } = useAuth();
  const { tasks } = useTaskContext();
  const [workflows, setWorkflows] = useState<Workflow[]>([wf1, wf2, wf1, wf2]);
  return (
    <>
      {isAuthenticated && (
        <>
          <Container style={ContainerStyle.Light}>
            <h1 className='my-4 text-3xl font-semibold'>User Workflows</h1>
            <div className='flex items-center'>
              {workflows &&
                workflows.map((w) => <Workflow key={w.id} data={w} />)}

              <button className='rounded-xl bg-yellow-500 py-6 px-4 text-xl font-bold text-gray-800 hover:bg-yellow-600'>
                <p className='select-none'>+ New Workflow</p>
              </button>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default UserDashboard;
