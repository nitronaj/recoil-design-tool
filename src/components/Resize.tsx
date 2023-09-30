import React from 'react';
import {Resizable, ResizeHandle} from 'react-resizable';
import {Handle} from './Handle';
import {ElementStyle} from './Rectangle/Rectangle';

const handlePlacements: ResizeHandle[] = [
    'n',
    's',
    'e',
    'w',
    'ne',
    'nw',
    'se',
    'sw',
];

type ResizeProps = {
    selected: boolean;
    onResize: (style: ElementStyle) => void;
    children: React.ReactNode;
} & ElementStyle;

export const Resize: React.FC<ResizeProps> = ({
    selected,
    children,
    position,
    size,
    onResize,
}) => {
    return (
        <Resizable
            width={size.width}
            height={size.height}
            onResize={(_, {size: newSize, handle}) => {
                let topDiff = 0;
                if (handle.includes('n')) {
                    topDiff = size.height - newSize.height;
                }

                let leftDiff = 0;
                if (handle.includes('w')) {
                    leftDiff = size.width - newSize.width;
                }

                onResize({
                    size: {
                        width: Math.round(newSize.width),
                        height: Math.round(newSize.height),
                    },
                    position: {
                        top: position.top + topDiff,
                        left: position.left + leftDiff,
                    },
                });
            }}
            resizeHandles={handlePlacements}
            handle={<Handle visible={selected} />}
        >
            <div>{children}</div>
        </Resizable>
    );
};
