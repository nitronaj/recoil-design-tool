import React, {Suspense} from 'react';
import {createRoot} from 'react-dom/client';

import './index.css';
import Canvas from './Canvas';
import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import Atoms from './examples/Atoms';
import {Selectors} from './examples/Selectors';
import {Async} from './examples/Async';
import ErrorBoundary from './ErrorBoundary';

const container: HTMLElement = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <RecoilRoot>
            <ErrorBoundary>
                <ChakraProvider>
                    <Router>
                        <Routes>
                            <Route path="/examples/atoms" element={<Atoms />} />
                            <Route
                                path="/examples/selectors"
                                element={<Selectors />}
                            />

                            <Route
                                path="/examples/async"
                                element={
                                    <Suspense fallback={<div>Loading....</div>}>
                                        <Async />
                                    </Suspense>
                                }
                            />
                            <Route path="/" element={<Canvas />} />
                        </Routes>
                    </Router>
                </ChakraProvider>
            </ErrorBoundary>
        </RecoilRoot>
    </React.StrictMode>,
);
