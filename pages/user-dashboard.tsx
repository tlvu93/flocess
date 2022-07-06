import Link from 'next/link';
import React, { useState } from 'react';

import { useAuth } from '@context/auth-context';
import Card from '@layouts/Card';
import Container, { ContainerStyle } from '@layouts/Container';

const createWorkflow = (id: string, name: string, taskNodes: SVGTaskNode[]) => {
  let workflow: Workflow = {
    id,
    name,
    taskNodes,
  };
  return workflow;
};

let wf1 = createWorkflow(
  '09d8ec07-f35c-448a-b799-387bfe561370',
  'workflow 1',
  []
);
let wf2 = createWorkflow(
  '19d8ec07-f35c-448a-b799-387bfe561371',
  'workflow 2',
  []
);

const Workflow = ({ data }: { data: Workflow }) => {
  return (
    <Link href={`/workflow-creator/${data.id}`}>
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
  const [workflows, setWorkflows] = useState<Workflow[]>([wf1, wf2]);
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
