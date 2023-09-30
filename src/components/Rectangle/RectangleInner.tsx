import {Box} from '@chakra-ui/react';
import {useEffect} from 'react';
import {selectorFamily, useRecoilValue, useSetRecoilState} from 'recoil';
import {editPropertySelector} from '../../EditProperties';
import {getBorderColor, getImageDimensions} from '../../util';
import {elementState} from './Rectangle';

// const imageSrcState = selectorFamily({
// 	key: 'imageSrc',
// 	get: (id: number) => ({get}) => {
// 		const element = get(elementState(id));

// 		if(element) {
// 			return element.image?.src
// 		}

// 		return null

// 	}
// })

const imageSizeState = selectorFamily({
    key: 'imageSize',
    get:
        (src?: string | undefined) =>
        ({get}) => {
            // const src = get(imageSrcState(id))
            if (!src) return null;
            return getImageDimensions(src);
        },
});

export const RectangleInner = ({
    selected,
    id,
}: {
    selected: boolean;
    id: number;
}) => {
    const element = useRecoilValue(elementState(id));

    // console.log('element', element);
    const src = element.image?.src;
    const imageSize = useRecoilValue(imageSizeState(src));
    const setSize = useSetRecoilState(
        editPropertySelector({id, path: 'style.size'}),
    );

    useEffect(() => {
        if (imageSize) setSize(imageSize);
    }, [imageSize, setSize]);

    return (
        <Box
            position="absolute"
            border={`1px solid ${getBorderColor(selected)}`}
            transition="0.1s border-color ease-in-out"
            width="100%"
            height="100%"
            display="flex"
            padding="2px"
        >
            <Box
                flex="1"
                border="3px dashed #101010"
                borderRadius="255px 15px 225px 15px/15px 225px 15px 255px"
                backgroundColor="white"
                backgroundImage={`url('${src}')`}
                backgroundSize="cover"
            />
        </Box>
    );
};
