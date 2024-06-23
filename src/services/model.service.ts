import { ModelRepositoryInterface } from '../repositories/model.repository';

export interface ModelServiceInterface {
  getModelById(value: number): Promise<ModelEntityInterface>;
  updateAveragePrice(value: UpdateAveragePriceDto): Promise<ModelEntityInterface>;
}

export class ModelService implements ModelServiceInterface {
  private modelRepository: ModelRepositoryInterface;

  constructor(modelRepository: ModelRepositoryInterface) {
    this.modelRepository = modelRepository;
  }

  public getModelById(value: number): Promise<ModelEntityInterface> {
    return this.modelRepository.getModelById(value);
  }

  public updateAveragePrice({ id, average_price }: UpdateAveragePriceDto): Promise<ModelEntityInterface> {
    const entity: ModelEntityInterface = {
      id,
      average_price: average_price,
    };

    return this.modelRepository.updateAveragePrice(entity);
  }
}
