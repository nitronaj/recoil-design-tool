import {Suspense, useDeferredValue} from 'react';
import {atomFamily, useRecoilState} from 'recoil';
import {selectedElementState} from '../../Canvas';
import {Drag} from '../Drag';
import {Resize} from '../Resize';
import {RectangleContainer} from './RectangleContainer';
import {RectangleInner} from './RectangleInner';
import {RectangleLoading} from './RectangleLoading';

export type ElementStyle = {
    position: {top: number; left: number};
    size: {width: number; height: number};
};

export type Element = {
    style: ElementStyle;
    image?: {src: string; id: number};
};

export const defaultStyle = {
    position: {top: 100, left: 100},
    size: {width: 200, height: 200},
};

export const elementState = atomFamily<Element, number>({
    key: 'element',
    default: {
        style: defaultStyle,
    },
});

export const Rectangle = ({id}: {id: number}) => {
    const [selectedElement, setSelectedElement] =
        useRecoilState(selectedElementState);

    const [element, setElement] = useRecoilState(elementState(id));
    const deferredElement = useDeferredValue(element);
    const selected = id === selectedElement;

    return (
        <RectangleContainer
            position={element.style.position}
            size={element.style.size}
            onSelect={() => {
                setSelectedElement(id);
            }}
        >
            <Resize
                selected={selected}
                position={element.style.position}
                size={element.style.size}
                onResize={(style) => {
                    setElement({
                        ...deferredElement,
                        style,
                    });
                }}
            >
                <Drag
                    position={element.style.position}
                    onDrag={(position) => {
                        setElement({
                            ...element,
                            style: {
                                ...element.style,
                                position,
                            },
                        });
                    }}
                >
                    <div>
                        <Suspense
                            fallback={<RectangleLoading selected={selected} />}
                        >
                            <RectangleInner selected={selected} id={id} />
                        </Suspense>
                    </div>
                </Drag>
            </Resize>
        </RectangleContainer>
    );
};
