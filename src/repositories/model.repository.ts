import { Client } from 'pg';
import { getModelsFiltersDto } from '../dto/get-models-filters.dto';
import { modelPresentInBrandDto } from '../dto/model-present-in-brand.dto';

export interface ModelRepositoryInterface {
  create(value: Partial<ModelEntityInterface>): Promise<ModelEntityInterface>;
  getModelById(value: number): Promise<ModelEntityInterface>;
  modelPresentInBrand(value: modelPresentInBrandDto): Promise<Boolean>;
  getModels(filters: getModelsFiltersDto): Promise<ModelEntityInterface[]>;
  updateAveragePrice(value: Partial<ModelEntityInterface>): Promise<ModelEntityInterface>;
}

export class ModelRepository implements ModelRepositoryInterface {
  private db: Client;

  constructor(db: Client) {
    this.db = db;
  }

  public async create(value: ModelEntityInterface): Promise<ModelEntityInterface> {
    const query = String(process.env.QUERY_CREATE_MODEL);
    try {
      const result = await this.db.query(query, [value.name, value.average_price, value.brand_id]);
      if (result.rows.length) {
        value.id = Number(result.rows[0].id);
      }
    } catch (err) {
      throw err;
    }

    return value as ModelEntityInterface;
  }

  public async getModelById(value: number): Promise<ModelEntityInterface> {
    const input: Partial<ModelEntityInterface> = {
      id: value,
    };

    const query = String(process.env.QUERY_GET_MODEL_BY_ID);
    try {
      const result = await this.db.query(query, [input.id]);
      if (result.rows.length) {
        const model: ModelEntityInterface = result.rows[0];
        input.average_price = model.average_price;
        input.name = model.name;
      } else {
        input.id = undefined;
      }
    } catch (err) {
      throw err;
    }

    return input as ModelEntityInterface;
  }

  public async modelPresentInBrand(value: modelPresentInBrandDto): Promise<Boolean> {
    const query = String(process.env.QUERY_GET_MODEL_NOT_IN_BRAND);
    let present = false;
    try {
      const result = await this.db.query(query, [value.model_name, value.brand_id]);
      if (result.rows.length) {
        const count = Number(result.rows[0].count);
        if (count > 0) {
          present = true;
        }
      }
    } catch (err) {
      throw err;
    }

    return present;
  }

  public async getModels({ greater, lower, brand_id }: getModelsFiltersDto): Promise<ModelEntityInterface[]> {
    let query = String(process.env.QUERY_GET_MODELS);
    let models: ModelEntityInterface[] = [];
    const values: number[] = [];
    if (greater || lower) {
      if (greater && lower) {
        query += String(process.env.QUERY_GET_MODELS_GREATER_LOWER);
        values.push(Number(greater));
        values.push(Number(lower));
      } else if (greater) {
        query += String(process.env.QUERY_GET_MODELS_GREATER);
        values.push(Number(greater));
      } else if (lower) {
        query += String(process.env.QUERY_GET_MODELS_LOWER);
        values.push(Number(lower));
      }
    }
    if (brand_id) {
      query += String(process.env.QUERY_GET_MODELS_BY_BRAND);
      values.push(Number(brand_id));
    }

    try {
      const result = await this.db.query(query, values);
      if (result.rows.length) {
        for(const i of result.rows) {
          models.push({
            ...i,
            id: Number(i.id),
            average_price: Number(i.average_price),
          });
        }
      }
    } catch (err) {
      throw err;
    }

    return models;
  }

  public async updateAveragePrice(value: Partial<ModelEntityInterface>): Promise<ModelEntityInterface> {
    const input: Partial<ModelEntityInterface> = {
      id: value.id,
      average_price: value.average_price,
    };

    const query = String(process.env.QUERY_UPDATE_AVERAGE_PRICE);
    try {
      const result = await this.db.query(query, [input.average_price, input.id]);
      if (result.rowCount) {
        const row = result.rows[0];
        input.average_price = row.average_price;
        input.name = row.name;
        input.id = Number(row.id);
      }
    } catch (err) {
      throw err;
    }

    return input as ModelEntityInterface;
  }
}
