import react, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getNameTargets } from '../utils/apiUtils';
import NameTargetTable from './NameTargetTable';

const NameTargetList = () => {
  const [nameTargets, setNameTargets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const targets = await getNameTargets();
      console.log('targets', targets);

      setNameTargets(targets);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <NameTargetTable data={nameTargets} />
    </Container>
  );
};

export default NameTargetList;
