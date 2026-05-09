// ==================== MAP LAYOUT DATA ====================

const MAP_WIDTH = 4800;
const MAP_HEIGHT = 4800;

// Map viewport (camera follows player)
const VIEWPORT_WIDTH = 960;
const VIEWPORT_HEIGHT = 540;

// Lane definitions
const LANES = {
    TOP: {
        name: 'Top Lane',
        y: MAP_HEIGHT * 0.15,
        xRange: [0, MAP_WIDTH],
        color: 0x2ecc71
    },
    MID: {
        name: 'Mid Lane',
        y: MAP_HEIGHT * 0.5,
        xRange: [0, MAP_WIDTH],
        color: 0xf39c12
    },
    BOTTOM: {
        name: 'Bottom Lane',
        y: MAP_HEIGHT * 0.85,
        xRange: [0, MAP_WIDTH],
        color: 0x3498db
    }
};

// River (horizontal center divider)
const RIVER = {
    y: MAP_HEIGHT / 2,
    height: 80,
    color: 0x2980b9
};

// Jungle areas (between lanes)
const JUNGLE = [
    { // Top Jungle
        x: MAP_WIDTH * 0.1,
        y: MAP_HEIGHT * 0.28,
        width: MAP_WIDTH * 0.8,
        height: MAP_HEIGHT * 0.15,
        monsters: ['blue_buff', 'red_buff', 'wolf', 'golem']
    },
    { // Bottom Jungle
        x: MAP_WIDTH * 0.1,
        y: MAP_HEIGHT * 0.62,
        width: MAP_WIDTH * 0.8,
        height: MAP_HEIGHT * 0.15,
        monsters: ['blue_buff', 'red_buff', 'wolf', 'golem']
    },
    { // Top Side Jungle
        x: MAP_WIDTH * 0.05,
        y: MAP_HEIGHT * 0.05,
        width: MAP_WIDTH * 0.15,
        height: MAP_HEIGHT * 0.2,
        monsters: ['turtle', 'crab']
    },
    { // Bottom Side Jungle
        x: MAP_WIDTH * 0.8,
        y: MAP_HEIGHT * 0.75,
        width: MAP_WIDTH * 0.15,
        height: MAP_HEIGHT * 0.2,
        monsters: ['lord', 'crab']
    }
];

// Bush positions (x, y, radius)
const BUSHES = [
    // Top Lane Bushes
    { x: MAP_WIDTH * 0.15, y: MAP_HEIGHT * 0.10, radius: 60 },
    { x: MAP_WIDTH * 0.35, y: MAP_HEIGHT * 0.18, radius: 50 },
    { x: MAP_WIDTH * 0.65, y: MAP_HEIGHT * 0.12, radius: 55 },
    { x: MAP_WIDTH * 0.85, y: MAP_HEIGHT * 0.20, radius: 60 },
    
    // Mid Lane Bushes
    { x: MAP_WIDTH * 0.20, y: MAP_HEIGHT * 0.48, radius: 45 },
    { x: MAP_WIDTH * 0.50, y: MAP_HEIGHT * 0.52, radius: 40 },
    { x: MAP_WIDTH * 0.80, y: MAP_HEIGHT * 0.47, radius: 50 },
    
    // Bottom Lane Bushes
    { x: MAP_WIDTH * 0.15, y: MAP_HEIGHT * 0.80, radius: 60 },
    { x: MAP_WIDTH * 0.35, y: MAP_HEIGHT * 0.85, radius: 50 },
    { x: MAP_WIDTH * 0.65, y: MAP_HEIGHT * 0.88, radius: 55 },
    { x: MAP_WIDTH * 0.85, y: MAP_HEIGHT * 0.82, radius: 60 },
    
    // Jungle Bushes
    { x: MAP_WIDTH * 0.30, y: MAP_HEIGHT * 0.30, radius: 70 },
    { x: MAP_WIDTH * 0.60, y: MAP_HEIGHT * 0.35, radius: 65 },
    { x: MAP_WIDTH * 0.25, y: MAP_HEIGHT * 0.68, radius: 70 },
    { x: MAP_WIDTH * 0.70, y: MAP_HEIGHT * 0.65, radius: 65 },
];

// Tower positions
const TOWERS = {
    ally: {
        outer: [
            { x: MAP_WIDTH * 0.12, y: MAP_HEIGHT * 0.22 },  // Top T1
            { x: MAP_WIDTH * 0.50, y: MAP_HEIGHT * 0.40 },  // Mid T1
            { x: MAP_WIDTH * 0.88, y: MAP_HEIGHT * 0.22 },  // Bottom T1
        ],
        inner: [
            { x: MAP_WIDTH * 0.15, y: MAP_HEIGHT * 0.30 },  // Top T2
            { x: MAP_WIDTH * 0.50, y: MAP_HEIGHT * 0.35 },  // Mid T2
            { x: MAP_WIDTH * 0.85, y: MAP_HEIGHT * 0.30 },  // Bottom T2
        ],
        base: [
            { x: MAP_WIDTH * 0.18, y: MAP_HEIGHT * 0.38 },  // Top T3
            { x: MAP_WIDTH * 0.50, y: MAP_HEIGHT * 0.38 },  // Mid T3
            { x: MAP_WIDTH * 0.82, y: MAP_HEIGHT * 0.38 },  // Bottom T3
        ]
    },
    enemy: {
        outer: [
            { x: MAP_WIDTH * 0.12, y: MAP_HEIGHT * 0.78 },  // Top T1
            { x: MAP_WIDTH * 0.50, y: MAP_HEIGHT * 0.60 },  // Mid T1
            { x: MAP_WIDTH * 0.88, y: MAP_HEIGHT * 0.78 },  // Bottom T1
        ],
        inner: [
            { x: MAP_WIDTH * 0.15, y: MAP_HEIGHT * 0.70 },  // Top T2
            { x: MAP_WIDTH * 0.50, y: MAP_HEIGHT * 0.65 },  // Mid T2
            { x: MAP_WIDTH * 0.85, y: MAP_HEIGHT * 0.70 },  // Bottom T2
        ],
        base: [
            { x: MAP_WIDTH * 0.18, y: MAP_HEIGHT * 0.62 },  // Top T3
            { x: MAP_WIDTH * 0.50, y: MAP_HEIGHT * 0.62 },  // Mid T3
            { x: MAP_WIDTH * 0.82, y: MAP_HEIGHT * 0.62 },  // Bottom T3
        ]
    }
};

// Base positions
const BASES = {
    ally: { x: MAP_WIDTH / 2, y: MAP_HEIGHT * 0.95 },
    enemy: { x: MAP_WIDTH / 2, y: MAP_HEIGHT * 0.05 }
};

// Minion spawn points
const SPAWN_POINTS = {
    ally: [
        { x: MAP_WIDTH * 0.15, y: MAP_HEIGHT * 0.90 },  // Top spawn
        { x: MAP_WIDTH * 0.50, y: MAP_HEIGHT * 0.90 },  // Mid spawn
        { x: MAP_WIDTH * 0.85, y: MAP_HEIGHT * 0.90 }   // Bottom spawn
    ],
    enemy: [
        { x: MAP_WIDTH * 0.15, y: MAP_HEIGHT * 0.10 },  // Top spawn
        { x: MAP_WIDTH * 0.50, y: MAP_HEIGHT * 0.10 },  // Mid spawn
        { x: MAP_WIDTH * 0.85, y: MAP_HEIGHT * 0.10 }   // Bottom spawn
    ]
};

// Minion waypoints (path they follow)
const MINION_PATHS = {
    top: [
        { x: MAP_WIDTH * 0.12, y: MAP_HEIGHT * 0.90 },
        { x: MAP_WIDTH * 0.12, y: MAP_HEIGHT * 0.50 },
        { x: MAP_WIDTH * 0.12, y: MAP_HEIGHT * 0.10 }
    ],
    mid: [
        { x: MAP_WIDTH * 0.50, y: MAP_HEIGHT * 0.90 },
        { x: MAP_WIDTH * 0.50, y: MAP_HEIGHT * 0.50 },
        { x: MAP_WIDTH * 0.50, y: MAP_HEIGHT * 0.10 }
    ],
    bottom: [
        { x: MAP_WIDTH * 0.88, y: MAP_HEIGHT * 0.90 },
        { x: MAP_WIDTH * 0.88, y: MAP_HEIGHT * 0.50 },
        { x: MAP_WIDTH * 0.88, y: MAP_HEIGHT * 0.10 }
    ]
};

// Jungle monster spawn points
const MONSTER_SPAWNS = [
    { id: 'blue_buff_top', x: MAP_WIDTH * 0.22, y: MAP_HEIGHT * 0.28, type: 'blue_buff', respawnTime: 120 },
    { id: 'blue_buff_bot', x: MAP_WIDTH * 0.78, y: MAP_HEIGHT * 0.72, type: 'blue_buff', respawnTime: 120 },
    { id: 'red_buff_top', x: MAP_WIDTH * 0.78, y: MAP_HEIGHT * 0.28, type: 'red_buff', respawnTime: 120 },
    { id: 'red_buff_bot', x: MAP_WIDTH * 0.22, y: MAP_HEIGHT * 0.72, type: 'red_buff', respawnTime: 120 },
    { id: 'turtle', x: MAP_WIDTH * 0.10, y: MAP_HEIGHT * 0.50, type: 'turtle', respawnTime: 180 },
    { id: 'lord', x: MAP_WIDTH * 0.90, y: MAP_HEIGHT * 0.50, type: 'lord', respawnTime: 300 },
    { id: 'wolf_1', x: MAP_WIDTH * 0.35, y: MAP_HEIGHT * 0.30, type: 'wolf', respawnTime: 60 },
    { id: 'wolf_2', x: MAP_WIDTH * 0.65, y: MAP_HEIGHT * 0.30, type: 'wolf', respawnTime: 60 },
    { id: 'wolf_3', x: MAP_WIDTH * 0.35, y: MAP_HEIGHT * 0.70, type: 'wolf', respawnTime: 60 },
    { id: 'wolf_4', x: MAP_WIDTH * 0.65, y: MAP_HEIGHT * 0.70, type: 'wolf', respawnTime: 60 },
    { id: 'golem_1', x: MAP_WIDTH * 0.40, y: MAP_HEIGHT * 0.22, type: 'golem', respawnTime: 90 },
    { id: 'golem_2', x: MAP_WIDTH * 0.60, y: MAP_HEIGHT * 0.78, type: 'golem', respawnTime: 90 },
];

// Map colors
const MAP_COLORS = {
    GROUND: 0x1a3a1a,
    GROUND_ALT: 0x1a2a1a,
    LANE_TOP: 0x2a4a2a,
    LANE_MID: 0x2a3a2a,
    LANE_BOT: 0x2a4a2a,
    RIVER: 0x1a5276,
    BUSH: 0x0d3d0d,
    JUNGLE: 0x0f2f0f,
    TOWER_ALLY: 0x3498db,
    TOWER_ENEMY: 0xe74c3c,
    BASE_ALLY: 0x2980b9,
    BASE_ENEMY: 0xc0392b,
    MINIMAP_BG: 0x000000,
    MINIMAP_LANE: 0x333333,
    MINIMAP_ALLY: 0x3498db,
    MINIMAP_ENEMY: 0xe74c3c,
    MINIMAP_JUNGLE: 0x1a1a1a,
};

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MAP_WIDTH, MAP_HEIGHT, VIEWPORT_WIDTH, VIEWPORT_HEIGHT,
        LANES, RIVER, JUNGLE, BUSHES, TOWERS, BASES,
        SPAWN_POINTS, MINION_PATHS, MONSTER_SPAWNS, MAP_COLORS
    };
}
