import { useRouter } from 'next/router';

const Workflow = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>Workflow {id}</div>;
};

export default Workflow;
