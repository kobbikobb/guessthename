import react from 'react';
import { useSearchParams } from 'react-router-dom';
import Guess from './Guess';

type GuessRouteProps = {
  userId: string;
};

const GuessRoute = ({ userId }: GuessRouteProps) => {
  const [search] = useSearchParams();

  const nameTargetId = search.get('nameTargetId');

  if (nameTargetId === null) {
    return null;
  }

  return <Guess userId={userId} nameTargetId={nameTargetId} />;
};

export default GuessRoute;
