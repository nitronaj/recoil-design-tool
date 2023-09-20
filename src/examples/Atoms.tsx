import {atom, useRecoilState, useRecoilValue} from 'recoil';

const darkModeState = atom({
    key: 'darkMode',
    default: false,
});

const DarkModeSwitch = () => {
    const [darkMode, setDarkMode] = useRecoilState(darkModeState);

    console.log('darkmode', darkMode);

    return (
        <input
            type="checkbox"
            checked={darkMode}
            onChange={(event) => {
                setDarkMode(event.currentTarget.checked);
            }}
        />
    );
};

const Button = () => {
    const darkMode = useRecoilValue(darkModeState);
    return (
        <button
            style={{
                backgroundColor: darkMode ? 'black' : 'white',
                color: darkMode ? 'white' : 'black',
            }}
        >
            My UI Button
        </button>
    );
};

const Atoms = () => {
    return (
        <div>
            <div>
                <DarkModeSwitch />
            </div>
            <div>
                <Button />
            </div>
        </div>
    );
};

export default Atoms;
