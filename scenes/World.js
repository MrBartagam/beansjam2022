import Player from '../objects/Player.js'
import Coffee from '../objects/Coffee.js'
import Obstacle from '../objects/Obstacle.js'

const client = new tmi.Client({
    channels: ['dropmaniagaming','mrbartagam']
})

client.connect()

export default class Level extends Phaser.Scene {
    constructor(game) {
        super()
        this.game = game
        Phaser.Scene.call(this, { key: 'World' })
        
    }
    preload() {
        this.load.image('bohne', '/assets/img/bohne.png')
        this.load.aseprite(
            'player',
            '/assets/img/player.png',
            '/assets/img/player.json'
        )
        this.load.image('bg', '/assets/img/bg.png')
        this.load.image('table1', '/assets/img/table1.png')
    }
    create() {

        // this.uiSceneScene = this.scene.get('UIScene')
        // this.uiSceneScene.scene.setActive(true)
        this.keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        })
        this.add.image(0, 0, 'bg').setOrigin(0, 0)
        this.player = new Player(
            this,
            this.game.config.width / 2,
            this.game.config.height / 2,
            'player'
        )
        this.physics.world.setBounds(
            0,
            0,
            this.game.config.width,
            this.game.config.height
        )

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setBounds(
            0,
            0,
            this.game.config.width,
            this.game.config.height
        )
        this.cameras.main.setZoom(2.5)
        this.generateObstacles()
        for (let i = 0; i < 10; i++) {
            this.generateCoffee()
        }
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.generateCoffee()
            },
            loop: true
        })
        client.on('message', (channel, tags, message, self) => {
            if (message === '!coffee') {
                for (let i = 0; i < 100; i++) {
                    this.generateCoffee()
                }
            }
        })
    }
    generateCoffee() {
        let x = Math.floor(Math.random() * this.game.config.width)
        let y = Math.floor(Math.random() * this.game.config.height)
        let bohne = new Coffee(this, x, y, 'bohne')
        let collider = this.physics.add.collider(this.player, bohne, () => {
            this.player.tiredness += 5
            if (this.player.tiredness > 30) {
                this.player.tiredness = 30
            }

            this.events.emit(
                'updateTiredness',
                this.player.tiredness,
            )
            this.events.emit(
                'updateHighscore',
                bohne.baseValue,
            )

            bohne.destroy()
            collider.destroy()
        })
    }
    generateObstacles() {
        for (let i = 0; i < 100; i++) {
            let x = Math.floor(Math.random() * this.game.config.width)
            let y = Math.floor(Math.random() * this.game.config.height)
            let obstacle = new Obstacle(this, x, y, 'table1')
            let collider = this.physics.add.collider(this.player, obstacle)
        }
    }
    update() {
        this.player.update()
    }
}
