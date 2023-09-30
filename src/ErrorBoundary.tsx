'use client';
import React, {Component, ErrorInfo, ReactNode} from 'react';

import {CloseIcon} from '@chakra-ui/icons';
import {Box, Flex, Heading, Text} from '@chakra-ui/react';

function ErrorUI() {
    return (
        <Box textAlign="center" py={10} px={6}>
            <Box display="inline-block">
                <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    bgColor={'red.500'}
                    rounded={'50px'}
                    w={'55px'}
                    h={'55px'}
                    textAlign="center"
                >
                    <CloseIcon boxSize={'20px'} color={'white'} />
                </Flex>
            </Box>
            <Heading as="h2" size="xl" mt={6} mb={2}>
                Oops, something went wrong!
            </Heading>
            <Text color={'gray.500'}>
                We apologize for the inconvenience, but an error occurred.
            </Text>

            <Text>
                Please try refreshing the page or contact support if the issue
                persists.
            </Text>
            {/* You can also display error details if needed */}
            {/* {this.state.error && (
                <details style={{whiteSpace: 'pre-wrap'}}>
                    {this.state.error.toString()}
                    <br />
                    {this.state.error.componentStack}
                </details>
            )} */}
        </Box>
    );
}

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return <ErrorUI />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
