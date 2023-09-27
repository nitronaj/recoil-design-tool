import {
    InputGroup,
    InputRightElement,
    NumberInput,
    NumberInputField,
    Text,
    VStack,
} from '@chakra-ui/react';
import {produce} from 'immer';
import {selectorFamily, useRecoilState, useRecoilValue} from 'recoil';
import {selectedElementState} from './Canvas';
import {elementState} from './components/Rectangle/Rectangle';
import {get as getPath, set as setPath} from 'lodash';

const editProperySelector = selectorFamily<number, {path: string; id: number}>({
    key: 'editProperty',
    get:
        ({path, id}) =>
        ({get}) => {
            const element = get(elementState(id));

            return getPath(element, path);
        },
    set:
        ({path, id}) =>
        ({get, set}, newValue) => {
            const element = get(elementState(id));

            const newElement = produce(element, (draft) =>
                setPath(draft, path, newValue),
            );

            set(elementState(id), newElement);
        },
});

export const EditProperties = () => {
    const selectedElement = useRecoilValue(selectedElementState);
    if (selectedElement == null) return null;

    return (
        <Card>
            <Section heading="Position">
                <Property
                    label="Top"
                    path="style.position.top"
                    id={selectedElement}
                />
                {/* <Property
                    label="Left"
                    value={element.style.position.left}
                    onChange={(left) => setPosition('left', left)}
                /> */}
            </Section>
            {/* <Section heading="Position">
                <Property
                    label="Width"
                    value={element.style.size.width}
                    onChange={(width) => setSize('width', width)}
                />
                <Property
                    label="Height"
                    value={element.style.size.height}
                    onChange={(height) => setSize('height', height)}
                />
            </Section> */}
        </Card>
    );
};

const Section: React.FC<{heading: string}> = ({heading, children}) => {
    return (
        <VStack spacing={2} align="flex-start">
            <Text fontWeight="500">{heading}</Text>
            {children}
        </VStack>
    );
};

const Property = ({
    label,
    path,
    id,
}: {
    label: string;
    path: string;
    id: number;
}) => {
    const [value, setValue] = useRecoilState(editProperySelector({path, id}));

    return (
        <div>
            <Text fontSize="14px" fontWeight="500" mb="2px">
                {label}
            </Text>
            <InputGroup size="sm" variant="filled">
                <NumberInput
                    value={value}
                    onChange={(_, value) => setValue(value)}
                >
                    <NumberInputField borderRadius="md" />
                    <InputRightElement
                        pointerEvents="none"
                        children="px"
                        lineHeight="1"
                        fontSize="12px"
                    />
                </NumberInput>
            </InputGroup>
        </div>
    );
};

const Card: React.FC = ({children}) => (
    <VStack
        position="absolute"
        top="20px"
        right="20px"
        backgroundColor="white"
        padding={2}
        boxShadow="md"
        borderRadius="md"
        spacing={3}
        align="flex-start"
        onClick={(e) => e.stopPropagation()}
    >
        {children}
    </VStack>
);
