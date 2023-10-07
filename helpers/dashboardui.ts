export const LevelData = () => {
    return [
        {
            img: '/assets/dashboard/star.svg',
            level: 'Beginner',
            score: 45,
            desc: 'Score 0 to 49 points to attain this badge.',
            locked: false
        },
        {
            img: '/assets/dashboard/star.svg',
            level: 'Intermediate',
            score: 0,
            desc: 'Score 50 to 79 points to attain this badge.',
            locked: true
        },
        {
            img: '/assets/dashboard/star.svg',
            level: 'Expert',
            score: 0,
            desc: 'Score 80 to 100 points to attain this badge.',
            locked: true
        },
    ]
}

export const AssesMentData = () => {
    return [
        {
            img: '/assets/dashboard/task.svg',
            title: '10 multiple choice questions',
        },
        {
            img: '/assets/dashboard/timer.svg',
            title: '45 seconds per assessment',
        },
        {
            img: '/assets/dashboard/medal-star.svg',
            title: 'Score points to earn a badge',
        }
    ]
}
