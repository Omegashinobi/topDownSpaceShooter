export interface IManifest {
    base: string,
    sprites: {
        atlas: string[],
        images: string[]
    }
    tilemaps: string[],
    tilesprites: string[],
    layout: string[],
    enemyGroups: string[],
    bitmapFont: string[]
}

export interface IProperty {
    name : string,
    type : string,
    value : string,
}