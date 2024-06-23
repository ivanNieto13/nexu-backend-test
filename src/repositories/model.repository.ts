import { Client } from 'pg';
import { getModelsFiltersDto } from '../dto/get-models-filters.dto';

export interface ModelRepositoryInterface {
  getModelById(value: number): Promise<ModelEntityInterface>;
  getModels(filters: getModelsFiltersDto): Promise<ModelEntityInterface[]>;
  updateAveragePrice(value: Partial<ModelEntityInterface>): Promise<ModelEntityInterface>;
}

export class ModelRepository implements ModelRepositoryInterface {
  private db: Client;

  constructor(db: Client) {
    this.db = db;
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

  public async getModels({ greater , lower }: getModelsFiltersDto): Promise<ModelEntityInterface[]> {
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
