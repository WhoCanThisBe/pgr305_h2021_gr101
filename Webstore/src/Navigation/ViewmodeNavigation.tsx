import {FC, SyntheticEvent, useState} from "react";
import {useHistory} from "react-router-dom";
import {Nav} from "react-bootstrap";

export type Viewmode = {
    name: string;
    destination: string;
};

type Props = {
    modes: Viewmode[];
    onSelectViewmode: (viewmodeName: Viewmode["name"]) => void;
};

const ViewmodeNavigation: FC<Props> = ({modes, onSelectViewmode}) => {
    const [selectedMode, setSelectedMode] = useState(modes[0].name);

    const history = useHistory();

    const handleViewmodeSelect = (
        eventKey: string | null,
        _: SyntheticEvent<unknown>
    ) => {
        const mode = eventKey as string;

        setSelectedMode(mode);

        // Change rendered navigationbar in `NavigationBar.tsx`
        onSelectViewmode(mode);

        const foundMode = modes.find((m) => m.name === mode);

        if (!foundMode) {
            return console.error(`The selected view-mode: ${mode}, is not supported`);
        }

        history.push(foundMode.destination);
    };

    return (
        // Used "paddingLeft" with this value to align the "nav-buttons" with the "gender-nav-buttons"
        <Nav
            style={{paddingLeft: "9rem"}}
            variant={"pills"}
            onSelect={handleViewmodeSelect}
            activeKey={selectedMode}
        >
            {modes.map((viewmode, index: number) => (
                <ViewmodeNavigationItem key={index} viewmode={viewmode}/>
            ))}
        </Nav>
    );
};

const ViewmodeNavigationItem: FC<{
    viewmode: { name: string; destination: string };
}> = ({viewmode}) => {
    return (
        <Nav.Item className={"capitalize"}>
            <Nav.Link eventKey={viewmode.name}>{viewmode.name}</Nav.Link>
        </Nav.Item>
    );
};

export default ViewmodeNavigation;
