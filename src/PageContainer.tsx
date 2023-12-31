import {Box, Flex} from '@chakra-ui/react';
import React from 'react';

export const PageContainer: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
}> = ({onClick, children}) => {
    return (
        <Flex direction="column" width="100vw" height="100vh" onClick={onClick}>
            <Box flex={1} position="relative">
                {children}
            </Box>
        </Flex>
    );
};
