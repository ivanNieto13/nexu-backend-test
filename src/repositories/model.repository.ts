import { Client } from 'pg';

export interface ModelRepositoryInterface {
  getModelById(value: number): Promise<ModelEntityInterface>;
  updateAveragePrice(value: ModelEntityInterface): Promise<ModelEntityInterface>;
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
        input.averagePrice = model.averagePrice;
        input.name = model.name;
      } else {
        input.id = undefined;
      }
    } catch (err) {
      throw err;
    }

    return input as ModelEntityInterface;
  }

  public async updateAveragePrice(value: ModelEntityInterface): Promise<ModelEntityInterface> {
    const input: ModelEntityInterface = {
      id: value.id,
      averagePrice: value.averagePrice,
    };

    const query = String(process.env.QUERY_UPDATE_AVERAGE_PRICE);
    try {
      const result = await this.db.query(query, [input.averagePrice, input.id]);
      if (result.rowCount) {
        const row = result.rows[0];
        input.id = Number(row.id);
      }
    } catch (err) {
      throw err;
    }

    return input;
  }
}
