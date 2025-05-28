export interface IAadharServices {
    parseData(frontImg: Buffer , backImg :Buffer):Promise<any>
}