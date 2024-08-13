export interface ITileMap {
    compressionlevel: number,
    height: number,
    infinite: boolean,
    layers: ITileLayer[],
    nextlayerid: number,
    nextobjectid: number
    orientation: string
    renderorder: string
    tiledversion: string
    tileheight: number
    tilesets: [{}]
    tilewidth: number
    type: string
    version: string
    width: number
}

export interface ITileLayer {
    chunks: ITileChunks[]
    height: number,
    id: number,
    name: string,
    opacity: number,
    startx: number,
    starty: number,
    type: string,
    visible: boolean,
    width: number,
    x: number,
    y: number
}

export interface ITileChunks {
    data: number[],
    height: number,
    width: number,
    x: number,
    y: number
}

export interface ITileRef {
    firstgid: number,
    source: string
}