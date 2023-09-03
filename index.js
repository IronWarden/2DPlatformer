

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = screen.width //1024
canvas.height = screen.height //576


const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}
const gravity = 0.2

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i+=36) {
    floorCollisions2D.push(floorCollisions.slice(i, i + 36))

}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        console.log(symbol)
        if(symbol === 202) {
            console.log('draw a block here')
            collisionBlocks.push( 
                new CollisionBlock({
                position: {
                x: x * 16,
                y: y * 16,

            },
        }))
        }
    })
})
//console.log(collisionBlocks)


const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i+=36) {
    platformCollisions2D.push(platformCollisions.slice(i, i + 36))

}

console.log(platformCollisions2D)


const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        console.log(symbol)
        if(symbol === 202) {
            console.log('draw a block here')
            platformCollisionBlocks.push( 
                new CollisionBlock({
                position: {
                x: x * 16,
                y: y * 16,

            },
            height: 4 
        }))
        }
    })
})

const player = new Player({
    position:{
    x: 100,
    y: 300,
    },
    collisionBlocks: collisionBlocks,
    platformCollisionBlocks: platformCollisionBlocks,
    imageSrc: './Chris Courses - Vertical Platformer/warrior/Idle.png',
    frameRate: 8,
    animations:{
        Idle: {
            imageSrc: './Chris Courses - Vertical Platformer/warrior/Idle.png',
            frameRate: 8,
            frameBuffer: 3,
        },
        Run: {
            imageSrc: './Chris Courses - Vertical Platformer/warrior/Run.png',
            frameRate: 8,
            frameBuffer: 6,

        },
        Jump: {
            imageSrc: './Chris Courses - Vertical Platformer/warrior/Jump.png',
            frameRate: 2,
            frameBuffer: 3,

        },
        Fall: {
            imageSrc: 'Chris Courses - Vertical Platformer/warrior/Fall.png',
            frameRate: 2,
            frameBuffer: 3,

        },
        FallLeft: {
            imageSrc: 'Chris Courses - Vertical Platformer/warrior/FallLeft.png',
            frameRate: 2,
            frameBuffer: 3,

        },
        RunLeft: {
            imageSrc: 'Chris Courses - Vertical Platformer/warrior/RunLeft.png',
            frameRate: 8,
            frameBuffer: 6,

        },
        IdleLeft: {
            imageSrc: 'Chris Courses - Vertical Platformer/warrior/IdleLeft.png',
            frameRate: 8,
            frameBuffer: 3,

        },
        JumpLeft: {
            imageSrc: 'Chris Courses - Vertical Platformer/warrior/JumpLeft.png',
            frameRate: 2,
            frameBuffer: 3,

        },



        
    },

})


const keys = {
    d: {
        pressed: false,  
    },
    a: {
        pressed: false,
    },


}

const background = new Sprite({
    position: {
        x: 0, 
        y: 0,

    },

    imageSrc: 'Chris Courses - Vertical Platformer/background.png'

})


const backgroundImageHeight = 432


const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height,

    },

}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    c.save()
    c.scale(4, 4)
    c.translate(camera.position.x, camera.position.y)
    background.update()
    // collisionBlocks.forEach(collisionBlock => {
    //     collisionBlock.update()

    // })  
    // platformCollisionBlocks.forEach((block) => {
    //     block.update()
    // })  
    player.checkForHorizontalCanvasCollisions()
    player.update()

    player.velocity.x = 0
    if(keys.d.pressed) {
        player.switchSprite('Run')
        player.velocity.x = 2
        player.lastDirection = 'right'
        player.shouldPanCameraToTheLeft({canvas, camera})

    }
    else if (keys.a.pressed){
        player.switchSprite('RunLeft')
       player.lastDirection = 'left'
       player.velocity.x = -2 
       player.shouldPanCameraToTheRight({canvas, camera})
    } 
    else if(player.velocity.y === 0){
        if(player.lastDirection === 'right')player.switchSprite('Idle')
        else player.switchSprite('IdleLeft')
        
    }

    if(player.velocity.y < 0) {
        player.shouldPanCameraDown({canvas, camera})
        if(player.lastDirection === 'right')player.switchSprite('Jump')
        else player.switchSprite('JumpLeft')
    }
   else if(player.velocity.y > 0) {
    player.shouldPanCameraUp({camera, canvas})
    if(player.lastDirection === 'right') player.switchSprite('Fall')
    else player.switchSprite('FallLeft')
   }



    c.restore()

}


animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'w':
            player.velocity.y = -4
            break
        
        
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        
    }
})
