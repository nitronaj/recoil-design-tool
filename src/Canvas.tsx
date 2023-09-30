import {atom, useRecoilValue, useSetRecoilState} from 'recoil';
import {Rectangle} from './components/Rectangle/Rectangle';
import {EditProperties} from './EditProperties';
import {PageContainer} from './PageContainer';
import {elementsState, Toolbar} from './Toolbar';

export const selectedElementState = atom<number | null>({
    key: 'selectedElement',
    default: null,
});



function Canvas() {
    const setSelectedElement = useSetRecoilState(selectedElementState);
    const elements = useRecoilValue(elementsState);

    return (
        <PageContainer
            onClick={() => {
                setSelectedElement(null);
            }}
        >
            <Toolbar />
            {elements.map((id) => (
                <Rectangle key={id} id={id} />
            ))}
            <EditProperties />
        </PageContainer>
    );
}

export default Canvas;
