import {IconCalendarTime, IconHomeEdit, IconSchool, IconTrendingUp, IconUserCircle} from "@tabler/icons";

interface TablerIconNameProp {
    tablerName: string
}

function TablerFactory(
    tablerNameProp: TablerIconNameProp
) {


    return (
        <>
            {
                tablerNameProp.tablerName === "IconUserCircle" &&
                <IconUserCircle/>
            }
            {
                tablerNameProp.tablerName === "IconSchool" &&
                <IconSchool/>
            }
            {
                tablerNameProp.tablerName === "IconHomeEdit" &&
                <IconHomeEdit/>
            }
            {
                tablerNameProp.tablerName === "IconCalendarTime" &&
                <IconCalendarTime/>
            }
            {
                tablerNameProp.tablerName === "IconTrendingUp" &&
                <IconTrendingUp/>
            }
        </>
    );
}

export default TablerFactory;

enum PossibleIconNames {
    IconUserCircle,
    IconSchool,
    IconHomeEdit,
    IconCalendarTime,
    IconTrendingUp
}
