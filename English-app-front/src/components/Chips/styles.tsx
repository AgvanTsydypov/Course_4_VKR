import {createStyles} from "@mantine/core";

export const useStyles = createStyles((theme, _params, getRef) => ({
    label: {
        '&[data-checked]': {
            '&, &:hover': {
                backgroundColor: "#2E186A",
                color: theme.white,
            },

            [`& .${getRef('iconWrapper')}`]: {
                color: theme.white,
            },
        },
    },

    iconWrapper: {
        ref: getRef('iconWrapper'),
    },
}));
