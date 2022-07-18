import react from 'react';
import { Container } from 'react-bootstrap';
import NameTargetList from './NameTargetList';
import CreateNameTargetModal from './CreateNameTargetModal';

type Props = {
  userId: string;
};

const NameTargetOverview = ({ userId }: Props) => {
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
        <CreateNameTargetModal userId={userId} />
      </div>
      <NameTargetList />
    </Container>
  );
};

export default NameTargetOverview;
