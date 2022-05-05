import React from 'react';
import { Card, Text, createStyles } from '@mantine/core';

const useStyles = createStyles(theme => ({
    card: {
        position: 'relative',
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        ':hover': {
            transform: 'translateY(-2px)',
        },
    },

    title: {
        display: 'block',
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.xs / 2,
    },
}));

interface ArticleCardProps {
    title: string;
    description: string;
}

function VideoTeaserCard({
    className,
    title,
    description,
    ...others
}: ArticleCardProps &
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof ArticleCardProps>) {
    const { classes, cx } = useStyles();

    return (
        <Card
            withBorder
            radius='md'
            className={cx(classes.card, className)}
            shadow='sm'
            {...others}
        >
            <Text
                className={classes.title}
                size='lg'
                weight={500}
                component='a'
            >
                {title}
            </Text>

            <Text size='sm' color='dimmed' lineClamp={4}>
                {description}
            </Text>
        </Card>
    );
}

export default VideoTeaserCard;
