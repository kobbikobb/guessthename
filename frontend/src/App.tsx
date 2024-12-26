import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Navigation from './Navigation';
import { getUserFingerprint } from './utils/clientUtils';
import GuessRoute from './guesses/GuessRoute';
import NameTargetOverview from './name-targets/NameTargetOverview';

const App = () => {
    const userId = getUserFingerprint();

    return (
        <>
            <Navigation />
            <Container style={{ marginTop: 50 }}>
                <HashRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<NameTargetOverview userId={userId} />}
                        />
                        <Route
                            path="guess"
                            element={<GuessRoute userId={userId} />}
                        />
                    </Routes>
                </HashRouter>
            </Container>
        </>
    );
};

export default App;
