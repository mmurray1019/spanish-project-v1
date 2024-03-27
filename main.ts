namespace SpriteKind {
    export const Minimap = SpriteKind.create()
    export const player_2d = SpriteKind.create()
    export const Sprite_Helper = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`Pavillion_Enter_Location`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    Render.setViewMode(ViewMode.tilemapView)
    if (game.ask("Enter?")) {
        pavillion()
    } else {
        Render.setViewMode(ViewMode.raycastingView)
        tiles.setCurrentTilemap(tilemap`Paris`)
        tiles.placeOnRandomTile(player_3D, assets.tile`pavilion_exit_location`)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`Church_Enter_Location`, function (sprite, location) {
	
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (menu == 0) {
        Paula.setFlag(SpriteFlag.Invisible, true)
        if (Render.isViewMode(ViewMode.raycastingView)) {
            menu = 1
            Render.toggleViewMode()
            Render.move(Render.getRenderSpriteInstance(), 0, 0)
            scene.setBackgroundImage(assets.image`Blank_Background`)
            player_3D.setImage(assets.image`Luis`)
            Render.moveWithController(0, 0, 0)
            myMinimap = minimap.minimap(MinimapScale.Original, 2, 0)
            Minimap_sprite = sprites.create(minimap.getImage(minimap.minimap(MinimapScale.Quarter, 2, 0)), SpriteKind.Minimap)
            Minimap_sprite.setStayInScreen(true)
            myMinimap = minimap.minimap(MinimapScale.Quarter, 0, 0)
            minimap.includeSprite(myMinimap, player_3D, MinimapSpriteScale.Double)
            player_3D.setImage(assets.image`Hidden_Player_Sprite`)
            Minimap_sprite.setImage(minimap.getImage(myMinimap))
            tiles.setCurrentTilemap(tilemap`Blank_map`)
        } else if (Render.isViewMode(ViewMode.tilemapView)) {
            menu = 2
            Current_tilemap = tiles.getLoadedMap()
            controller.moveSprite(Player2d, 0, 0)
            Player2d.setImage(assets.image`Hidden_Player_Sprite`)
            tiles.setCurrentTilemap(tilemap`Blank_map`)
            Not_Avalible = textsprite.create("Map Not Avalible", 8, 2)
            tiles.placeOnTile(Not_Avalible, Player2d.tilemapLocation())
        }
    } else if (menu == 1) {
        Paula.setFlag(SpriteFlag.Invisible, false)
        player_3D.setImage(assets.image`Hidden_Player_Sprite`)
        tiles.setCurrentTilemap(tilemap`Paris`)
        scene.setBackgroundImage(assets.image`Paris_BG`)
        Render.move(player_3D, 60)
        Render.moveWithController(2)
        Render.toggleViewMode()
        sprites.destroy(Minimap_sprite)
        menu = 0
    } else if (menu == 2) {
        Paula.setFlag(SpriteFlag.Invisible, false)
        menu = 0
        sprites.destroy(Not_Avalible)
        tiles.loadMap(tiles.createMap(tilemap`Spanish_Pavillion`))
        controller.moveSprite(Player2d, 100, 100)
        Player2d.setImage(assets.image`Luis`)
    }
})
scene.onOverlapTile(SpriteKind.player_2d, assets.tile`wood_floor_exit_location`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`Blank_map`)
    if (game.ask("Exit?")) {
        _3Dify()
        tiles.placeOnRandomTile(player_3D, assets.tile`pavilion_exit_location`)
    } else {
        tiles.setCurrentTilemap(tilemap`Spanish_Pavillion`)
        tiles.placeOnRandomTile(Player2d, assets.tile`wood_floor_enter_location`)
    }
})
function Guernica_Pedistal_Cutscene () {
    cutscene_activator = 1
    tiles.loadMap(tiles.createMap(tilemap`Spanish_Pavillion`))
    story.startCutscene(function () {
        controller.moveSprite(Player2d, 0, 0)
        Speech_talking_indicator = textsprite.create("Paula", 6, 1)
        Speech = textsprite.create("Es Guernica!", 12, 1)
        Speech_talking_indicator.setStayInScreen(true)
        Speech.setStayInScreen(true)
        Speech_talking_indicator.setFlag(SpriteFlag.Ghost, true)
        Speech.setFlag(SpriteFlag.Ghost, false)
        Speech.z = -2
        tiles.placeOnTile(Speech_talking_indicator, tiles.getTileLocation(1, 3))
        tiles.placeOnTile(Speech, tiles.getTileLocation(1, 4))
        pause(2000)
        Speech.setText("Yo Veo Simbolos")
        pause(5000)
        Speech.setText("Guernica tiene information")
        Speech_line_2 = textsprite.create("de la lanza!", 12, 1)
        Speech_line_2.setStayInScreen(true)
        tiles.placeOnTile(Speech_line_2, tiles.getTileLocation(1, 5))
        pause(5000)
        Speech.setText("Donde esta una casa ")
        Speech_line_2.setText("grande?")
        pause(5000)
        Speech_talking_indicator.setText("Luis")
        Speech.setText("Es la Sante-Chapelle! ")
        Speech_line_2.setText("Vamos!")
        pause(5000)
        sprites.destroy(Speech_talking_indicator)
        sprites.destroy(Speech)
        sprites.destroy(Speech_line_2)
        controller.moveSprite(Player2d, 100, 100)
        cutscene_activator = 0
    })
}
function _3Dify () {
    tiles.placeOnTile(Player2d, tiles.getTileLocation(0, 0))
    Render.setViewMode(ViewMode.raycastingView)
    Player2d.setFlag(SpriteFlag.Invisible, true)
    sprites.destroy(Player2d)
    controller.moveSprite(Player2d, 0, 0)
    scene.setBackgroundImage(assets.image`Paris_BG`)
    tiles.setCurrentTilemap(tilemap`Paris`)
    scene.cameraFollowSprite(player_3D)
    Render.setSpriteAttribute(player_3D, RCSpriteAttribute.ZOffset, -11)
    tiles.placeOnTile(Paula, tiles.locationInDirection(tiles.locationOfSprite(player_3D), CollisionDirection.Left))
    Paula.setScale(0.5, ScaleAnchor.Bottom)
}
function pavillion () {
    Paula.setScale(1, ScaleAnchor.Bottom)
    Render.setViewMode(ViewMode.tilemapView)
    Player2d = sprites.create(assets.image`Luis`, SpriteKind.player_2d)
    controller.moveSprite(Player2d)
    cameraOffsetScene.cameraFollowWithOffset(Player2d, 0, -30)
    player_3D.setImage(assets.image`Hidden_Player_Sprite`)
    player_3D.setFlag(SpriteFlag.Invisible, true)
    // let mySprite20240315T170412053Z = sprites.create(img`fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccc
    // cfffffffffffffffffffffffffffffffffffcccffffffffffffffffffffffffffffffffffffffcffffffffffffffffffffffcbcffcbcccbbcccbccccccccccf
    // cccffffffffffffffffffffffffffffffffcfffffcbbbdddbbfffffffffffffffffffffffccccccccfcccccccffffffffffffcdbbcbbbccbbcbbcccccccccff
    // ccccffffffffffffffffffcfffffffffccfffffcd111dbbddddbcfffffffffffffffccccccccccccccccccccccffffffffffffccccffffffffffffccccccfff
    // ccccccfffffcffffcccfccccfffffffcccffffd11111ddddddddddcffffffffffffccccccccccccccccccccccfffffccccffffffffffffffffffffcccccffff
    // ddcccccffffdfffffdcccccccccfffccccccbdd111d1ddbddddddddbcccffffffbbcccccccccccccccccccccccccccffcccfffccfffffffccccccccccffffff
    // ddbbcccbcfcdfffffbbcccccccccccccccccbddddd1ddddddddddddbccccfcffcdd1dbbccccccccccccccccccccccccccffffffffcfffffcbbbbbfccfffffff
    // ddbdbcbbbccdfffffbdccbfcccccccccccccccbdbddddddddddddbffffbbfccccddd11111dbccccccbccbcffffffcbbbbffccfffccccfffc11ddbccffffffff
    // bdddddcbbccddcbbbdbcbbffccccccccccccccbcbcbdddddddddbbbbcfbdffcccdddd1111111ddbbccccccfffcbbdbbccfcccfffbcbccffc1dddbcfffffcfff
    // cddbdbbbbcfbddddddddbccfcccccccccccccccccffbbbbcdbdcbcffccddbffccddd1111111111111dbbbccbdddddccccfccccccdbbcccfc11ddbcffffcbfff
    // cbbbbbbdbccfcb11d11dbcddcccccccccccccccccccccffffffcfccffcdddfffcdd111111111111111ddddddddddccccbcccccfbddcccccc111dbcffffdcbff
    // bbbcbdddbccccc11d11dbb1d1bccccccccccccccccbccfffffffffccccbbcfffcdd11ddd11111ddddddddddddddccccbdffcccfddddddcccdddbcffccbbbbbf
    // bbbbdbdbbccccfbdbd11ddd1ddcccccccccccccccdcdccccccfcccccccbdbffffddddddddddddddddddddddddbcccbd1dccccccd1ddccccccffcfffbdddddcf
    // bbbdbbbbbcccccbddd1dbd1dd1cccccccccccccccbbbdbcccccccbccccd1dffffdddddddddddddddddddddbbbbdd1111ccccccccbbbccccddffcccffcbdddbf
    // bbdbbbbbbcccccdddd1dbdddd1bccccccccccccccbbbbdddbcccddbbccb1dffcdddddddddddddddddddd1d111d11111dccccccfcddccccd1dcccccfffcddccf
    // bbdbbbbbbcccccdddd1111dd11bcccbccccccccccbbbccbdddbbdddbccddccd11d1dddddddddddddddd111111d11111bccccccfcddbcccd11bccccfffbdbfff
    // bbdbbbbbbccccbbddd11111111bcccb1ddccccccccdbbbbddddddbddcbddd1111111dddddddddddddd1d1111111111dcdcbcccffd1bcccd1dccbbcffcddcfff
    // bbbcbbbbbccccbbddd11111d1dbcccccb1dcccccccbcbd1d11dddcbbbcdd1dddddd11ddddddddddbbd1d1111111111bbdcbcccffd1dcccd1ddbddbffbddffcc
    // bbbccbbbbcccccbbd1d111dd11bcccccffbdbcccccd1ddd1d1ddbbdbbcdddccccd1dddbbbbbbbbbbbd11111111111dbdbbbcccffbddcccd111111dcfddbcfff
    // bbccccccbcccccbbd1d11111d1ccccccffffccccccdddbdbbcbbbdddbbcdbccccd111ddbbbbbbbbbbd11111111111dbbcbbcccffbddcccd11111dbdcddccfff
    // bcccccccccccccdddbd11111d1ccccccffffccccccbbbdccfffccbddbbcdbccbcd1111ddbbbbbbbbbd1111111111dbcdcdbcccffcddcccb111dddddddbccfff
    // bfccccccccccbcbcdbcb111d11ccccccccccccccccb1dddbcfffbbbddbbfcccccd1111dddbbbbbbbbdd111111111cdccbbbcccfccd1cccbdd1dddddddcccfff
    // bffcccccccbd1cb1d1ccb1111dcccccccccccccccccbccccccffcbfdddbbfccccd1111ddddbbbbbbbbbd1111111bccccccbcccfddd1bccbdbdd11dcdbfccfff
    // bffcccccccb11dd111dccb1d1dcccccccccccccccccfffffffffcdfdddbdffcccd11111ddddbbbbbbbbbb11111dffffffcccccc11ddbccb1dddddbccccccfff
    // ccccccccccb1111111dcccd11bcccccccccccccccccfffffffffcdfbddbdbfcbbd11111dddddbbbbbbccb11111cfcccccccccccd11ddccdddbbbddccccccfff
    // ccfcccccccd11111dddccbc11bccccccccccccccccccccbbbbcfcdffdddd1cbbcb11111ddddddbbcccccb1111bcfffffffcccccd111dccd11ccccdcccfccffc
    // ccfcccccccd11d1ddddbbbcb1bcccccccccccccccbbbbbbbbdbbcdcfdddd1bcccb111111ddddddccccccb11dcccfffffffcccccd111dccdd1bccbddcbdbcfff
    // ccffcccccb11bd1ddbccbbbc1bccccccccccccccddbbbdbbdcdbbbdcdddd11cfcb111111dd1111dbbbccccccccccfffffcccccf1111dccd11dccddddddbcfff
    // cccccccccd1dcb111dccbbbcddcccccccccccccdbbbbbbbd1cbbbbddd1111dbccb1111111111111111dccccccccbfffffcddbcfd11ddccddddccdbbddcccfff
    // cccccccccd1dcb1111cfcbccbdccccbbccccccbdbbbbbbbb1fbbbbbdd11ccddccb11111111111111111dbccccccbcfffffddbcfb111dccddddcbdcddcfccfff
    // ccccccccd11bcb1111cfffcccdcccbdbccccccbbbbcffbbddfbdddb111dffffccb11111111111111111d1bcccccbbcfffcd1bcffd11dddddddbddcdcffccfff
    // cccccccc111dccd11bcffccccdccbddbccccccbbbccccbddbcddddd111cffcd1ddd11111111d1111111ddddccccbbbffffd1bcffcbdbddddbbbcccfcbcccfff
    // cccccccd1111ccdddccffccccdbbdddddbbccccbccccbbbdbcdddddd1dccc111dddd111111111111111dddddbcbbbbcfffd1bcffcccccccccccccccdbcbcccc
    // ccccccc11111bcddcccffccccdccc1dd111dd1dddbcfbbbdbcdddddbdbffd1dddddd111111111111111dddddddbbbbbfffd1bcffccccccccccccccccbbdcccc
    // ccccccb111d1dccbccccffcccdccd1dddddddbddbbcfbbbddcdddddddcfc1ddddddd1111111111111111ddbbbbbbbbbcff11bcffcccccccccccccccccbdcfff
    // ccccbb1d1dd11bccbcccccccc1cc1ddddd1ddbbbbbcfbbdddcdddddbdcfc1ddddddd11111111111111111dddbbbbbbbbffd1bcffccccccccccccccccccbcdcf
    // fcfbbb1ddd111ddbbbbcfcfcb1bcddddd1dcfbbbbbcfbddddbddddddbbcc11dddddd1111111111d1111111ddddddd1dbcf11bcffccccccccccccccccccccdcf
    // cfcbbd1dbd11dddbbbbcfccbbbccddddbcfcbdbbbbccddddddddddddbbbcd1dddddd1111111111111d11111dd1dddddbbcbdbcffccccccccccccccccccccccf
    // fccbb11dbd11d1dbbbbcffcbdcccdddbfffdddbbbbcd1ddddddddddddbdd1dddddd111111111111111111111dd1111dbbbbdbcffccccccccccccccccccccccf
    // cccbd11bbbbdd11dbbbbcccbddccdddbffbddbbbbbbdddddd11ddbbddd1111ddddd111111111111111ddd1ddddb111dbbbdddcffcccccccccccccccccccccbf
    // ccbbdddddddbdddd1ddbcccbddcccddcfccddbbbbbcdddddddddddddddddddddd11dd11dddd111111dddd11111db111dbbdddcffccccccccccccccccccccccf
    // ccd11111ddddddddd1ddcccbddbcfddcccfbdbbbdbcd1dddddddddddddd1dd1d1d11dddddd1d111ddbbdd111d11db111dbdddcffcccccccccccccfcccccccff
    // ccd111dddd11bddbd1dbcccbbdbccbbccffcddddddbddddddbdddddddddddddddd1ddddddddbd1ddbbddd1dddd1dccd11bdbd1dffcccccccccccffffcccccff
    // cc1d11bd1ddd11dddbddcccbbdbccbcccccccddddddddddbdddddddddddddddddddddddddddbbddbbbbdddddbbdbbbcd1dbd111bccccccccccccfffffcccfff
    // cb1111dd1ddd11ddd1dbcccbbbbcccccccbcbddddbbdddddddddbddddddbddddd11111111ddddddbbbbdddbbbbbbbdbcdddbd1d1ccccccccccccffffffccfff
    // cbddddbd1dd11ddd1d1bbccbbcbcccccddcd1ddcbdbcdddddddbcdddddd1ddddddd1111111dbdddbbbbbddbbbbcbbddccbddbdd1bccccccccccfffffffccfff
    // fc1d1dbdddd11ddbdddbbccbccccfbd1dbddddcfbbbcbbddbbdcccccffffbdddd11111111ddbdddbbbbddd1dbbbbbd1dccd1ddd1dcccccccccfcffffffccffc
    // ffcddbbddddddddddbdbbccbddcccdddbbdddbcfbddcbcccb1dbbfffffffddddd1111111dbbbddddbbbddd1dbbbbbbddbcbd1dddbbbbcccccfffffffffccfff
    // ccccccbddddd1dd1ddbbccbbdbcccdddbbddbbbfbddcbcccd1dbbfccffffbdddd111111dbbbdbbddbbbdddbbbdbbbddddbcd1dddbbdddcccccfffcffffccfff
    // cbbcccddbdbddddd1dbbbddbbbbbcddbcddbbbbcbddbcccbd1dddbcccfffbdddd1d111dbbbddbb1dbbbddbbbbddddddbbccbddddbdddddbccfffcfffffcbbcf
    // ccbcccddddbdddddbdb1bddcbbdddbdbbdbbbbbbcddbccbbd1dddddcccffbdddd1dddddbbbdddd1dbbbdddbbbbdbbbdbcccccccdbd1ddddddddbbcccccbdddf
    // cccccbccccccccccccddbbbbbbdd1ddbb1bbbbbbcddbccbbb1ddddddcccfbdddd1ddddbbbbdbddddbbbbbbbbbbdddddbccccccbdbd1d1dddddddddbddddddbc
    // fcccbdccccccccccccbbddbb1b1d11dcbdcbbbbbbbddccbbbbbcdddddbccbddddddddbbbbbdbddddbdbbbbbbbbddddbbccccccbbbdddddddddddbbbbdbdddcc
    // cbccb1dccbccccccccbb1ddb11d111dbbbccbbcbbdddfbbbbbbbbdddddbcbddddddddbbbbbbbbbddddbbbbbbbbbdddbbbcccccbbbdd1dddddddbbdddbddddcc
    // cddcbddbcdcfcccccccd1111111111111bcccccbcbddccbcbccccbddddddbdddddbbbbbbbbbbbbbddbdbbbbbbbbddbbbbcccccbcbddddddbbbccffffbddddcf
    // cbddbdddddcffcccbbb11111111111dd1bccbbbbbbddbccbbbbcffcbddddbddddbbbbcbbbddbbbdddbbbbbbbbbbddbbbbcccccbcbbdddddbccccccffbddbdbf
    // cfcdddbbddbbddd11dbdd11111111dddddcccccccbdddbcbbbbcfffffbddccbbbbbbbbbdddbcccddddbbbbbbcbbddbbbbbccccbcbbdddddccccccccfddddbdc
    // cddddddbddbddddd1dbddd11d1111dddcdcffccbbdbcddbcbdbbccffffcbccccccdbbbbddcccccdddbccbbbbddddddbbbbccccbccbddddbcccccccccddbbddd
    // cdddbbdbddddddd11dbddd11dd11bdddccccbbcbbdcdddbfcddddddbbbcbbbbbbbdbbdbbccccccdddbcccccbbdddbdbbbbccccbccbddddccccccccccbcdddbc
    // cbbddddbdcbdddddddbd1111dd1ddddddfcbbbcbbbbd1dbcfddddddbbddddddddddbddbccccccbdddbcccccbbdddbddbbbbccbbcfbdddcccccccccccdbdbcbf
    // cffbdbbcffffccbdddddd111d1dcbbddbcfccbccddbdddcfcbdddddddddddddddddbddfbffccccbdddcccccbbbdbcccccccccbbffcbbccccccccccccbbccfcf
    // cffcbcffffffffffccbbbd111dccdbbbbbffcccbdccbddcccfbdddddddddbbbbddbbdbffffffccfcbbccccccbbbccfffccccccccccccccccccccccccccccccc
    // ccccccccccccccccccccccddbcccfbddddfffcccbcccbdccffffcdddbcfffccbbccdfffffffffcccccccccccccccccccccccccccccccccccccccccccccccccc
    // cccccccccccccccccccccccccccbcccbbccccccccccccbcfffffffcccccccccbcffffffffffffffcccccccccccccccccccccccccccccccccccccccccccccccc
    // `, SpriteKind.Player)
    tiles.setCurrentTilemap(tilemap`Spanish_Pavillion`)
    tiles.placeOnRandomTile(player_3D, assets.tile`Guernica 0-2`)
    scene.setBackgroundImage(assets.image`Blank_Background`)
    tiles.placeOnRandomTile(Player2d, assets.tile`wood_floor_enter_location`)
    tiles.placeOnRandomTile(Paula, assets.tile`wood_floor_exit_location`)
    Pavillion_active = 1
}
function church () {
    Render.setViewMode(ViewMode.tilemapView)
    Player2d = sprites.create(assets.image`Luis`, SpriteKind.player_2d)
    scene.cameraFollowSprite(Player2d)
    player_3D.setImage(assets.image`Hidden_Player_Sprite`)
    tiles.setCurrentTilemap(tilemap`Spanish_Pavillion`)
}
let textSprite: TextSprite = null
let A_Press_Indicator = 0
let Pavillion_active = 0
let Speech_line_2: TextSprite = null
let Speech: TextSprite = null
let Speech_talking_indicator: TextSprite = null
let cutscene_activator = 0
let Not_Avalible: TextSprite = null
let Player2d: Sprite = null
let Current_tilemap: tiles.WorldMap = null
let Minimap_sprite: Sprite = null
let myMinimap: minimap.Minimap = null
let Paula: Sprite = null
let menu = 0
let player_3D: Sprite = null
story.startCutscene(function () {
    game.showLongText("Use WSAD or arrow keys to move.", DialogLayout.Bottom)
})
player_3D = Render.getRenderSpriteVariable()
Render.move(player_3D, 60, -250)
tiles.setCurrentTilemap(tilemap`Paris`)
menu = 0
scene.setBackgroundImage(assets.image`Paris_BG`)
let Paula_Follower = sprites.create(assets.image`Hidden_Player_Sprite`, SpriteKind.Sprite_Helper)
Paula = sprites.create(assets.image`Paula`, SpriteKind.Player)
Paula.follow(Paula_Follower, 40)
Paula.setScale(0.5, ScaleAnchor.Bottom)
game.onUpdate(function () {
    if (A_Press_Indicator == 0 && Render.isViewMode(ViewMode.tilemapView) && ((Player2d.tileKindAt(TileDirection.Left, assets.tile`Guernica_Info_stand`) || (Player2d.tileKindAt(TileDirection.Right, assets.tile`Guernica_Info_stand`) || Player2d.tileKindAt(TileDirection.Center, assets.tile`Guernica_Info_stand`) || Player2d.tileKindAt(TileDirection.Top, assets.tile`Guernica_Info_stand`))) && Pavillion_active == 1)) {
        A_Press_Indicator = 1
        textSprite = textsprite.create("")
        textSprite.setIcon(img`
            ..........666666666666..........
            ........6667777777777666........
            ......66677777777777777666......
            .....6677777779999777777766.....
            ....667777779966669977777766....
            ....677777799668866117777776....
            ...66777779966877861197777766...
            ...66777799668677686699777766...
            ...88777796688888888669777788...
            ...88777788888888888888777788...
            ...88977888679999997688877988...
            ...88977886777777777768877988...
            ...88997777777777777777779988...
            ...88799777777777777777711788...
            ...88679997777777777779117688...
            ..cc866679999999999999976668cc..
            .ccbc6666679999999999766666cbcc.
            .fcbcc66666666666666666666ccbcf.
            .fcbbcc666666666666666666ccbdcf.
            .f8bbbccc66666666666666cccbddcf.
            .f8cbbbbccccccccccccccccbdddbcf.
            .f8ccbbbbbccccccccccccb111ddccf.
            .f6ccccbbbddddddddddddd111dcccf.
            .f6ccccccbbddddddddddddddbbcccf.
            .f6cccccccccccccbbbbbbbbbdbcccf.
            ..f6cccccccccbbbbbbbbbbbddbccf..
            ..f6cccccccccbbbbbbbbbbbddbccf..
            ..ff6ccccccccbbbbbbbbbbbddbcff..
            ...ff6cccccccbbbbbbbbbbbddbff...
            ....ffcccccccbbbbbbbbbbbdbff....
            ......ffccccbbbbbbbbbbbbff......
            ........ffffffffffffffff........
            `)
        textSprite.setFlag(SpriteFlag.RelativeToCamera, true)
        textSprite.setPosition(143, 106)
    } else if (A_Press_Indicator == 1 && Render.isViewMode(ViewMode.tilemapView) && !((Player2d.tileKindAt(TileDirection.Left, assets.tile`Guernica_Info_stand`) || (Player2d.tileKindAt(TileDirection.Right, assets.tile`Guernica_Info_stand`) || Player2d.tileKindAt(TileDirection.Center, assets.tile`Guernica_Info_stand`) || Player2d.tileKindAt(TileDirection.Top, assets.tile`Guernica_Info_stand`))) && Pavillion_active == 1)) {
        textSprite.setIcon(assets.image`Hidden_Player_Sprite`)
        sprites.destroy(textSprite)
        A_Press_Indicator = 0
    }
    if (cutscene_activator == 0 && (A_Press_Indicator == 1 && controller.A.isPressed())) {
        Guernica_Pedistal_Cutscene()
    }
    if (Render.isViewMode(ViewMode.raycastingView)) {
        tiles.placeOnTile(Paula_Follower, tiles.locationInDirection(tiles.locationOfSprite(player_3D), CollisionDirection.Left))
    } else if (Render.isViewMode(ViewMode.tilemapView)) {
        tiles.placeOnTile(Paula_Follower, tiles.locationInDirection(tiles.locationOfSprite(Player2d), CollisionDirection.Bottom))
    }
})
