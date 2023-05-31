import { UnstyledButton, Checkbox, Text, Image, SimpleGrid, createStyles } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import i18n from "i18next";


const useStyles = createStyles((theme, { checked }: { checked: boolean }) => ({
    button: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        transition: 'background-color 150ms ease, border-color 150ms ease',
        border: `1px solid ${
            checked
                ? theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).border
                : theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[3]
        }`,
        borderRadius: theme.radius.sm,
        padding: theme.spacing.sm,
        backgroundColor: checked
            ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.white,
    },

    body: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
}));

interface ImageCheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?(checked: boolean): void;
    title: string;
    description: string;
    image: string;
}

export function ImageCheckbox({
                                  checked,
                                  defaultChecked,
                                  onChange,
                                  title,
                                  description,
                                  className,
                                  image,
                                  ...others
                              }: ImageCheckboxProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ImageCheckboxProps>) {
    const [value, handleChange] = useUncontrolled({
        value: checked,
        defaultValue: defaultChecked,
        finalValue: false,
        onChange,
    });

    const { classes, cx } = useStyles({ checked: value });

    return (
        <UnstyledButton
            {...others}
            onClick={() => handleChange(!value)}
            className={cx(classes.button, className)}
        >
            <Image src={image} alt={title} width={40} />

            <div className={classes.body}>
                <Text color="dimmed" size="xs" sx={{ lineHeight: 1 }} mb={5}>
                    {description}
                </Text>
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
                    {title}
                </Text>
            </div>

            <Checkbox
                checked={value}
                onChange={() => {}}
                tabIndex={-1}
                styles={{ input: { cursor: 'pointer' } }}
            />
        </UnstyledButton>
    );
}

const mockdataRu = [
    { description: 'Поможем переехать из страны', title: 'Переезд', image: "/img/icons/plane.jpg"},
    { description: 'Быстрый апгрейд уровня', title: 'Уровень', image: "/img/icons/level-up.jpg" },
    { description: 'TOEFL, IELTS, ЕГЭ, ОГЭ', title: 'Экзамены', image: "/img/icons/exam.jpg" },
    { description: 'Поможем поступить в вуз за границей', title: 'Колледж', image: "/img/icons/uni.jpg" },
];

const mockdataEn = [
    { description: 'Help leave Russia', title: 'Relocation', image: "/img/icons/plane.jpg"},
    { description: 'Fast grow-up', title: 'Level-up', image: "/img/icons/level-up.jpg" },
    { description: 'TOEFL, IELTS, State exams', title: 'Exams', image: "/img/icons/exam.jpg" },
    { description: 'Assistance with abroad collages', title: 'Collage', image: "/img/icons/uni.jpg" },
];

export function ImageCheckboxes() {
    const mockdata = i18n.language === "en" ? mockdataEn : mockdataRu
    const items = mockdata.map((item) => <ImageCheckbox {...item} key={item.title} />);
    return (
        <SimpleGrid
            cols={4}
            breakpoints={[
                { maxWidth: 'md', cols: 2 },
                { maxWidth: 'sm', cols: 1 },
            ]}
        >
            {items}
        </SimpleGrid>
    );
}