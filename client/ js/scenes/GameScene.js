// ==================== MAIN GAME SCENE ====================

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Generate textures programmatically (no external images needed)
        this.createPlaceholderTextures();
    }

    create() {
        // World bounds
        this.physics.world.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);
        
        // Create map
        this.mapRenderer = new MapRenderer(this);
        this.mapRenderer.create();
        
        // Create player
        this.createPlayer();
        
        // Camera setup
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setBounds(0, 0, MAP_WIDTH, MAP_HEIGHT);
        this.cameras.main.setZoom(1);
        
        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey('W'),
            down: this.input.keyboard.addKey('S'),
            left: this.input.keyboard.addKey('A'),
            right: this.input.keyboard.addKey('D')
        };
        
        // Minimap
        this.createMinimap();
        
        // HUD
        this.createHUD();
        
        // Bush detection
        this.isHidden = false;
    }

    createPlaceholderTextures() {
        // Hero texture
        const heroGfx = this.make.graphics({ add: false });
        heroGfx.fillStyle(0x3498db);
        heroGfx.fillRect(0, 0, 32, 48);
        heroGfx.generateTexture('hero', 32, 48);
        heroGfx.destroy();

        // Minion texture
        const minionGfx = this.make.graphics({ add: false });
        minionGfx.fillStyle(0xe74c3c);
        minionGfx.fillRect(0, 0, 20, 28);
        minionGfx.generateTexture('minion', 20, 28);
        minionGfx.destroy();

        // Tower texture
        const towerGfx = this.make.graphics({ add: false });
        towerGfx.fillStyle(0x7f8c8d);
        towerGfx.fillRect(0, 0, 48, 64);
        towerGfx.generateTexture('tower', 48, 64);
        towerGfx.destroy();
    }

    createPlayer() {
        this.player = this.physics.add.sprite(BASES.ally.x, BASES.ally.y, 'hero');
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(10);
        this.player.speed = 200;
        
        // Player data
        this.player.heroData = {
            hp: 1000,
            maxHp: 1000,
            mana: 500,
            maxMana: 500,
            gold: 500,
            level: 1,
            kills: 0,
            deaths: 0,
            assists: 0
        };
    }

    createMinimap() {
        const minimapSize = 160;
        const minimapX = this.cameras.main.width - minimapSize - 10;
        const minimapY = 10;
        
        this.minimap = this.add.graphics();
        this.minimap.setScrollFactor(0);
        this.minimap.setDepth(100);
        
        // Background
        this.minimap.fillStyle(0x000000, 0.7);
        this.minimap.fillRect(minimapX, minimapY, minimapSize, minimapSize);
        this.minimap.lineStyle(2, 0xf39c12, 0.8);
        this.minimap.strokeRect(minimapX, minimapY, minimapSize, minimapSize);
        
        // Lanes on minimap
        this.minimap.fillStyle(0x3a5a3a, 0.5);
        this.minimap.fillRect(minimapX + 20, minimapY + 20, minimapSize - 40, minimapSize - 40);
    }

    createHUD() {
        // Top bar
        const hudBg = this.add.graphics();
        hudBg.setScrollFactor(0);
        hudBg.setDepth(90);
        hudBg.fillStyle(0x000000, 0.6);
        hudBg.fillRect(0, 0, this.cameras.main.width, 40);
        
        // Gold
        this.goldText = this.add.text(10, 10, '💰 500', {
            fontSize: '16px', fontFamily: 'Arial', color: '#ffdd00', fontStyle: 'bold'
        }).setScrollFactor(0).setDepth(91);
        
        // Timer
        this.timerText = this.add.text(this.cameras.main.width / 2, 10, '⏱️ 15:00', {
            fontSize: '16px', fontFamily: 'Arial', color: '#ffffff', fontStyle: 'bold'
        }).setScrollFactor(0).setDepth(91).setOrigin(0.5, 0);
        
        // KDA
        this.kdaText = this.add.text(this.cameras.main.width - 10, 10, '⚔️ 0/0/0', {
            fontSize: '14px', fontFamily: 'Arial', color: '#ffffff'
        }).setScrollFactor(0).setDepth(91).setOrigin(1, 0);
    }

    update(time, delta) {
        if (!this.player || !this.player.active) return;
        
        // Movement
        let vx = 0, vy = 0;
        
        if (this.cursors.left.isDown || this.wasd.left.isDown) vx = -1;
        if (this.cursors.right.isDown || this.wasd.right.isDown) vx = 1;
        if (this.cursors.up.isDown || this.wasd.up.isDown) vy = -1;
        if (this.cursors.down.isDown || this.wasd.down.isDown) vy = 1;
        
        // Normalize diagonal
        if (vx !== 0 && vy !== 0) {
            vx *= 0.707;
            vy *= 0.707;
        }
        
        this.player.setVelocity(vx * this.player.speed, vy * this.player.speed);
        
        // Bush detection
        this.isHidden = this.mapRenderer.isInBush(this.player.x, this.player.y);
        this.player.setAlpha(this.isHidden ? 0.4 : 1);
        
        // Update minimap
        this.updateMinimap();
        
        // Update HUD
        this.updateHUD();
    }

    updateMinimap() {
        const minimapSize = 160;
        const minimapX = this.cameras.main.width - minimapSize - 10;
        const minimapY = 10;
        const scale = minimapSize / MAP_WIDTH;
        
        // Clear minimap area
        this.minimap.fillStyle(0x000000, 0.7);
        this.minimap.fillRect(minimapX, minimapY, minimapSize, minimapSize);
        
        // Draw player on minimap
        const px = minimapX + this.player.x * scale;
        const py = minimapY + this.player.y * scale;
        this.minimap.fillStyle(0x3498db);
        this.minimap.fillCircle(px, py, 3);
        
        // Bush indicators
        this.minimap.fillStyle(0x0d5d0d, 0.5);
        BUSHES.forEach(bush => {
            const bx = minimapX + bush.x * scale;
            const by = minimapY + bush.y * scale;
            this.minimap.fillCircle(bx, by, bush.radius * scale);
        });
    }

    updateHUD() {
        if (this.goldText) {
            this.goldText.setText('💰 ' + this.player.heroData.gold);
        }
        if (this.kdaText) {
            const k = this.player.heroData.kills;
            const d = this.player.heroData.deaths;
            const a = this.player.heroData.assists;
            this.kdaText.setText(`⚔️ ${k}/${d}/${a}`);
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameScene };
}
