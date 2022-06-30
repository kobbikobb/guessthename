import react, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NameTargetList from './NameTargetList';
import CreateNameTarget from './CreateNameTarget';

type NameTargetOverviewProps = {
  userId: string;
};

const NameTargetOverview = ({ userId }: NameTargetOverviewProps) => {
  return (
    <Container>
      <CreateNameTarget userId={userId}></CreateNameTarget>
      <NameTargetList />
    </Container>
  );
};

export default NameTargetOverview;
