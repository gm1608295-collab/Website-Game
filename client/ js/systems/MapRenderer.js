// ==================== MAP RENDERER ====================

class MapRenderer {
    constructor(scene) {
        this.scene = scene;
        this.groundLayer = null;
        this.laneLayer = null;
        this.riverLayer = null;
        this.jungleLayer = null;
        this.bushLayer = null;
        this.bushes = [];
    }

    create() {
        // Ground (dark green base)
        this.groundLayer = this.scene.add.graphics();
        this.groundLayer.fillStyle(0x1a2a1a, 1);
        this.groundLayer.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

        // Jungle areas (darker)
        this.jungleLayer = this.scene.add.graphics();
        JUNGLE.forEach(j => {
            this.jungleLayer.fillStyle(0x0f2f0f, 1);
            this.jungleLayer.fillRect(j.x, j.y, j.width, j.height);
        });

        // Lane paths (lighter green)
        this.laneLayer = this.scene.add.graphics();
        this.drawLane(LANES.TOP);
        this.drawLane(LANES.MID);
        this.drawLane(LANES.BOTTOM);

        // River (blue horizontal line)
        this.riverLayer = this.scene.add.graphics();
        this.riverLayer.fillStyle(0x1a5276, 0.6);
        this.riverLayer.fillRect(0, RIVER.y - RIVER.height / 2, MAP_WIDTH, RIVER.height);
        // River edges
        this.riverLayer.fillStyle(0x2980b9, 0.8);
        this.riverLayer.fillRect(0, RIVER.y - 2, MAP_WIDTH, 4);

        // Bushes (dark green circles with border)
        this.bushLayer = this.scene.add.graphics();
        BUSHES.forEach((bush, index) => {
            this.drawBush(bush.x, bush.y, bush.radius);
            this.bushes.push({
                x: bush.x,
                y: bush.y,
                radius: bush.radius,
                id: index
            });
        });

        // Tower markers
        this.drawTowerMarkers(TOWERS.ally, 0x3498db);
        this.drawTowerMarkers(TOWERS.enemy, 0xe74c3c);

        // Base markers
        this.drawBaseMarker(BASES.ally, 0x3498db, 'ALLY');
        this.drawBaseMarker(BASES.enemy, 0xe74c3c, 'ENEMY');

        // Minion paths (semi-transparent dots)
        this.drawPaths();
    }

    drawLane(lane) {
        const laneWidth = 200;
        const gradient = this.scene.add.graphics();
        
        // Lane fill
        gradient.fillStyle(lane.color, 0.3);
        gradient.fillRect(lane.xRange[0], lane.y - laneWidth / 2, lane.xRange[1], laneWidth);
        
        // Lane borders
        gradient.lineStyle(2, 0x3a5a3a, 0.5);
        gradient.strokeRect(lane.xRange[0], lane.y - laneWidth / 2, lane.xRange[1], laneWidth);
    }

    drawBush(x, y, radius) {
        // Outer shadow
        this.bushLayer.fillStyle(0x000000, 0.1);
        this.bushLayer.fillCircle(x + 3, y + 3, radius);
        
        // Main bush (dark green)
        this.bushLayer.fillStyle(0x0d5d0d, 0.8);
        this.bushLayer.fillCircle(x, y, radius);
        
        // Lighter spots
        for (let i = 0; i < 5; i++) {
            const bx = x + (Math.random() - 0.5) * radius * 1.2;
            const by = y + (Math.random() - 0.5) * radius * 1.2;
            const br = radius * 0.2 + Math.random() * radius * 0.3;
            this.bushLayer.fillStyle(0x1a7a1a, 0.6);
            this.bushLayer.fillCircle(bx, by, br);
        }
        
        // Border
        this.bushLayer.lineStyle(2, 0x1a6a1a, 0.4);
        this.bushLayer.strokeCircle(x, y, radius);
    }

    drawTowerMarkers(towerData, color) {
        const g = this.scene.add.graphics();
        g.fillStyle(color, 0.4);
        
        // Outer towers
        towerData.outer.forEach(t => {
            g.fillCircle(t.x, t.y, 15);
            g.lineStyle(2, 0xffffff, 0.3);
            g.strokeCircle(t.x, t.y, 15);
        });
        
        // Inner towers
        towerData.inner.forEach(t => {
            g.fillCircle(t.x, t.y, 12);
            g.lineStyle(2, 0xffffff, 0.3);
            g.strokeCircle(t.x, t.y, 12);
        });
        
        // Base towers
        towerData.base.forEach(t => {
            g.fillCircle(t.x, t.y, 18);
            g.lineStyle(2, 0xffdd00, 0.5);
            g.strokeCircle(t.x, t.y, 18);
        });
    }

    drawBaseMarker(base, color, label) {
        const g = this.scene.add.graphics();
        
        // Base circle
        g.fillStyle(color, 0.3);
        g.fillCircle(base.x, base.y, 40);
        g.lineStyle(3, 0xffdd00, 0.6);
        g.strokeCircle(base.x, base.y, 40);
        
        // Label
        const text = this.scene.add.text(base.x, base.y, label, {
            fontSize: '12px',
            fontFamily: 'Arial',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
    }

    drawPaths() {
        const g = this.scene.add.graphics();
        g.fillStyle(0xffffff, 0.05);
        
        Object.values(MINION_PATHS).forEach(path => {
            path.forEach((point, i) => {
                if (i < path.length - 1) {
                    g.fillCircle(point.x, point.y, 5);
                }
            });
        });
    }

    isInBush(worldX, worldY) {
        return this.bushes.some(bush => {
            const dist = Phaser.Math.Distance.Between(worldX, worldY, bush.x, bush.y);
            return dist <= bush.radius;
        });
    }

    getBushAt(worldX, worldY) {
        return this.bushes.find(bush => {
            const dist = Phaser.Math.Distance.Between(worldX, worldY, bush.x, bush.y);
            return dist <= bush.radius;
        });
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MapRenderer };
}
