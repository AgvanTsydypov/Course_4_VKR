import {Carousel} from '@mantine/carousel';
import {useMediaQuery} from '@mantine/hooks';
import {createStyles, Paper, Text, Title, Button, useMantineTheme, Badge, Stack} from '@mantine/core';
import React, {createContext, useState} from "react";
import { TitleText } from '../QuickRegisteration/QuickRegistration';
import i18n from "i18next";

const useStyles = createStyles((theme) => ({
    card: {
        height: 440,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: 32,
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));

interface CardProps {
    image: string;
    title: string;
    categoryRu: string;
    categoryEn: string;
}

function Card({image, title, categoryRu, categoryEn}: CardProps) {
    const {classes} = useStyles();
    const yourChoice = i18n.language === "en" ? "Your choice" : "Ваш выбор"
    const choose = i18n.language === "en" ? "Choose" : "Выбрать"

    // @ts-ignore
    const processClick = ({titleText, setTitleText}) => {
        // Снимаем отметку
        if (titleText === title) {
            setTitleText("")
        } else {
            setTitleText(title)
        }
    }

    return (
        <TitleText.Consumer>{
            value => <Paper
                shadow="md"
                p="xl"
                radius="md"
                sx={{backgroundImage: `url(${image})`}}
                className={classes.card}
            >
                <Stack>
                    <Badge>{i18n.language === "en" ? categoryEn : categoryRu}</Badge>
                    <Button disabled={categoryEn === "busy"} onClick={x => processClick(value)} variant="white"
                            color={title === value.titleText ? "blue" : "red"}>
                        {title === value.titleText ? yourChoice : choose}
                    </Button>
                </Stack>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
            </Paper>
        }
        </TitleText.Consumer>
    );
}

export const tutorsData = [
    {
        image:
            'img/jpg/Kammy.jpg',
        title: 'Kami was born in Alaska, then Studied in Minneapolis',
        categoryEn: 'free',
        categoryRu: 'свободна',
    },
    {
        image:
            'img/jpg/MichleDortwood.jpg',
        title: 'Michael Dortwood, Lived In City of Manchester, UK ',
        categoryEn: 'busy',
        categoryRu: 'занят',
    },
    {
        image:
            'img/jpg/TravoneBenson.jpg',
        title: 'Travone Benson, Lived In  New York City, USA',
        categoryEn: 'busy',
        categoryRu: 'занят',
    },
    {
        image:
            'img/jpg/KellyDean.jpg',
        title: 'Kelly Dean, Lived In  London, UK',
        categoryEn: 'busy',
        categoryRu: 'занят',
    },
];

export function OurTeachers() {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const slides = tutorsData.map((item) => (
        <Carousel.Slide key={item.title}>
            <Card {...item} />
        </Carousel.Slide>
    ));

    return (
        <Carousel
            slideSize="50%"
            breakpoints={[{maxWidth: 'sm', slideSize: '100%', slideGap: 2}]}
            slideGap="xl"
            align="start"
            slidesToScroll={mobile ? 1 : 2}
        >
            {slides}
        </Carousel>
    );
}