import react, { useEffect, useState } from 'react';
import { getNameTargets } from '../utils/apiUtils';
import NameTargetTable from './NameTargetTable';

const NameTargetList = () => {
  const [nameTargets, setNameTargets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const targets = await getNameTargets();
      setNameTargets(targets);
    };
    fetchData();
  }, []);

  return <NameTargetTable data={nameTargets} />;
};

export default NameTargetList;
