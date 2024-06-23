import { Client } from 'pg';
import { BrandEntityInterface } from '../entities/brand.entity';

export interface BrandRepositoryInterface {
  getBrands(): Promise<BrandEntityInterface[]>;
}

export class BrandRepository implements BrandRepositoryInterface {
  private db: Client;

  constructor(db: Client) {
    this.db = db;
  }

  public async getBrands(): Promise<BrandEntityInterface[]> {
    const query = String(process.env.QUERY_GET_BRANDS);
    const brands: BrandEntityInterface[] = [];
    try {
      const result = await this.db.query(query);
      if (result.rows.length) {
        for(const i of result.rows) {
          brands.push({
            ...i,
            id: Number(i.id),
            average_price: Number(i.average_price),
          });
        }
      }
    } catch (err) {
      throw err;
    }

    return brands;
  }

}
