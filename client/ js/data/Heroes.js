
// ==================== HERO DATA ====================

const HEROES = [
    {
        id: 'warrior',
        name: 'Warrior',
        role: 'Fighter',
        icon: '🦸‍♂️',
        color: '#3498db',
        stats: {
            hp: 1000,
            maxHp: 1000,
            mana: 500,
            maxMana: 500,
            attack: 60,
            defense: 30,
            speed: 200,
            attackSpeed: 0.8,
            attackRange: 60
        },
        skills: [
            {
                name: 'Slash',
                icon: '⚔️',
                damage: 150,
                cooldown: 8,
                manaCost: 80,
                range: 70,
                description: 'Slash enemies in front'
            },
            {
                name: 'Spin Attack',
                icon: '🌀',
                damage: 250,
                cooldown: 12,
                manaCost: 120,
                range: 100,
                description: 'Spin and damage all nearby enemies'
            },
            {
                name: 'Rage',
                icon: '💥',
                damage: 500,
                cooldown: 30,
                manaCost: 200,
                range: 200,
                description: 'Ultimate: Massive damage in area'
            }
        ]
    },
    {
        id: 'mage',
        name: 'Mage',
        role: 'Mage',
        icon: '🧙‍♂️',
        color: '#9b59b6',
        stats: {
            hp: 700,
            maxHp: 700,
            mana: 800,
            maxMana: 800,
            attack: 80,
            defense: 15,
            speed: 180,
            attackSpeed: 0.6,
            attackRange: 120
        },
        skills: [
            {
                name: 'Fireball',
                icon: '🔥',
                damage: 200,
                cooldown: 6,
                manaCost: 100,
                range: 150,
                description: 'Launch a fireball'
            },
            {
                name: 'Ice Storm',
                icon: '❄️',
                damage: 300,
                cooldown: 14,
                manaCost: 150,
                range: 120,
                description: 'Freeze enemies in area'
            },
            {
                name: 'Meteor',
                icon: '☄️',
                damage: 600,
                cooldown: 35,
                manaCost: 250,
                range: 250,
                description: 'Ultimate: Call meteor from sky'
            }
        ]
    },
    {
        id: 'archer',
        name: 'Archer',
        role: 'Marksman',
        icon: '🏹',
        color: '#2ecc71',
        stats: {
            hp: 600,
            maxHp: 600,
            mana: 400,
            maxMana: 400,
            attack: 70,
            defense: 10,
            speed: 220,
            attackSpeed: 1.0,
            attackRange: 180
        },
        skills: [
            {
                name: 'Arrow Shot',
                icon: '🏹',
                damage: 180,
                cooldown: 5,
                manaCost: 60,
                range: 200,
                description: 'Shoot a powerful arrow'
            },
            {
                name: 'Multi Shot',
                icon: '🎯',
                damage: 120,
                cooldown: 10,
                manaCost: 100,
                range: 150,
                description: 'Shoot multiple arrows'
            },
            {
                name: 'Rain of Arrows',
                icon: '🌧️',
                damage: 400,
                cooldown: 28,
                manaCost: 180,
                range: 300,
                description: 'Ultimate: Arrows rain from sky'
            }
        ]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HEROES };
}
