import { ModelRepositoryInterface } from '../repositories/model.repository';

export interface ModelServiceInterface {
  updateAveragePrice(value: UpdateAveragePriceDto): Promise<ModelEntityInterface>;
}

export class ModelService implements ModelServiceInterface {
  private modelRepository: ModelRepositoryInterface;

  constructor(modelRepository: ModelRepositoryInterface) {
    this.modelRepository = modelRepository;
  }

  public updateAveragePrice({ id, averagePrice }: UpdateAveragePriceDto): Promise<ModelEntityInterface> {
    const entity: ModelEntityInterface = {
      id,
      averagePrice,
    };

    return this.modelRepository.updateAveragePrice(entity);
  }
}
