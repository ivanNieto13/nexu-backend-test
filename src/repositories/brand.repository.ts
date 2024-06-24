import {Client} from 'pg';
import {BrandEntityInterface} from '../entities/brand.entity';

export interface BrandRepositoryInterface {
  create(value: Partial<BrandEntityInterface>): Promise<BrandEntityInterface>;
  getBrands(): Promise<BrandEntityInterface[]>;
  getBrandById(value: number): Promise<BrandEntityInterface>;
  getBrandByName(value: string): Promise<BrandEntityInterface[]>;
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
        for (const i of result.rows) {
          brands.push({
            ...i,
            id: Number(i.id),
            average_price: Number(i.average_price),
          });
        }
      }
    } catch (err) {
      console.error(err);
      throw err;
    }

    return brands;
  }

  public async getBrandById(value: number): Promise<BrandEntityInterface> {
    const input: Partial<BrandEntityInterface> = {
      id: value,
    };

    const query = String(process.env.QUERY_GET_BRAND_BY_ID);
    try {
      const result = await this.db.query(query, [input.id]);
      if (result.rows.length) {
        input.name = result.rows[0].name;
      } else {
        input.id = undefined;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }

    return input as BrandEntityInterface;
  }

  public async getBrandByName(value: string): Promise<BrandEntityInterface[]> {
    const input: Partial<BrandEntityInterface> = {
      name: value,
    };
    const brands: BrandEntityInterface[] = [];

    const query = String(process.env.QUERY_GET_BRAND_BY_NAME);
    try {
      const result = await this.db.query(query, [input.name]);
      if (result.rows.length) {
        for (const i of result.rows) {
          brands.push({
            ...i,
            id: Number(i.id),
          });
        }
      }
    } catch (err) {
      console.error(err);
      throw err;
    }

    return brands;
  }

  public async create(
    value: Partial<BrandEntityInterface>
  ): Promise<BrandEntityInterface> {
    const input: Partial<BrandEntityInterface> = {
      name: value.name,
    };

    const query = String(process.env.QUERY_CREATE_BRAND);
    try {
      const result = await this.db.query(query, [input.name]);
      if (result.rows.length) {
        input.id = Number(result.rows[0].id);
      }
    } catch (err) {
      console.error(err);
      throw err;
    }

    return input as BrandEntityInterface;
  }
}
