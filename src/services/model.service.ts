import { ModelRepositoryInterface } from '../repositories/model.repository';
import { getModelsFiltersDto } from '../dto/get-models-filters.dto';

export interface ModelServiceInterface {
  getModelById(value: number): Promise<ModelEntityInterface>;
  getModels(filters?: getModelsFiltersDto): Promise<ModelEntityInterface[]>;
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

  public getModels(filters: getModelsFiltersDto): Promise<ModelEntityInterface[]> {
    return this.modelRepository.getModels(filters);
  }

  public updateAveragePrice({ id, average_price }: UpdateAveragePriceDto): Promise<ModelEntityInterface> {
    const entity: Partial<ModelEntityInterface> = {
      id,
      average_price: average_price,
    };

    return this.modelRepository.updateAveragePrice(entity);
  }
}
