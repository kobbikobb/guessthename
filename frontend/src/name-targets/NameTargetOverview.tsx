import react, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CreateNameTargetModal from './CreateNameTargetModal';
import NameTargetTable from './NameTargetTable';
import { getNameTargets } from '../utils/apiUtils';

type Props = {
  userId: string;
};

const NameTargetOverview = ({ userId }: Props) => {
  const [nameTargets, setNameTargets]: any[] = useState([]);

  // TODO: Consider custom webhook f.x:
  // https://betterprogramming.pub/clean-api-call-with-react-hooks-3bd6438a375a
  useEffect(() => {
    const fetchData = async () => {
      const targets = await getNameTargets();
      setNameTargets(targets);
    };
    fetchData();
  }, []);

  const nameTargetAdded = (nameTarget: any) => {
    const newTargets: any[] = [...nameTargets];
    newTargets.push(nameTarget);
    setNameTargets(newTargets);
  };

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: '16px'
        }}
      >
        <h2>Name Targets</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CreateNameTargetModal
            userId={userId}
            onNewNameTarget={nameTargetAdded}
          />
        </div>
      </div>
      <NameTargetTable data={nameTargets} />
    </Container>
  );
};

export default NameTargetOverview;
