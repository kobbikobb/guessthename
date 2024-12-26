import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import CreateNameTargetModal from './CreateNameTargetModal';
import NameTargetTable from './NameTargetTable';
import { getNameTargets } from '../utils/apiUtils';

type Props = {
    userId: string;
};

const NameTargetOverview = ({ userId }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [nameTargets, setNameTargets]: any[] = useState([]);

    // TODO: Use react-query
    useEffect(() => {
        const fetchData = async () => {
            const targets = await getNameTargets();
            setNameTargets(targets);
        };
        fetchData();
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nameTargetAdded = (nameTarget: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
