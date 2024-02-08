import { GoogleSpreadsheet } from 'google-spreadsheet'
import { jwtGoogle } from '@/configs/googleSpreadsheet'
import { IProduct } from '@/service/products/product.interface'
import { getRandomInt } from '@/utils/helpers/getRandomInt'
import { GOOGLE_SHEET_ID } from '@/utils/constants'

export class ProductsService {
    private readonly doc: GoogleSpreadsheet
    constructor(docId: string) {
        this.doc = new GoogleSpreadsheet(docId, jwtGoogle)
    }

    private async init(): Promise<void>{
        await this.doc.loadInfo(true)
    }

    public async getByProducts(): Promise<IProduct[]>{
        await this.init()
        const sheet = this.doc.sheetsByIndex[3]
        const rows = await sheet.getRows()
        const result: IProduct[] = []

        for (const row of rows){
            const id = await row.get('id') as string
            const name = await row.get('Товарные позиции') as string
            const description = await row.get('описание') as string
            result.push({ id: Number(id), name, description, count: 0 })
        }

        return result
    }

    public async getFakeCount(ids: number[]){
        await this.init()
        const sheet = this.doc.sheetsByIndex[3]
        const rows = await sheet.getRows()
        const result: IProduct[] = []
        for (const row of rows){
            const id = await row.get('id') as string
            const check = ids.includes(+id)
            if (!check){
                continue
            }
            const name = await row.get('Товарные позиции') as string
            const description = await row.get('описание') as string
            result.push({ id: Number(id), name, description, count: getRandomInt(1, 20) })
        }

        return result
    }

}

export const productsService = new ProductsService(GOOGLE_SHEET_ID)