import {ModelRepositoryInterface} from '../repositories/model.repository';
import {getModelsFiltersDto} from '../dto/get-models-filters.dto';
import {modelPresentInBrandDto} from '../dto/model-present-in-brand.dto';
import {UpdateAveragePriceDto} from '../dto/update-average-price.dto';
import {ModelEntityInterface} from '../entities/model.entity';

export interface ModelServiceInterface {
  create(value: Partial<ModelEntityInterface>): Promise<ModelEntityInterface>;
  getModelById(value: number): Promise<ModelEntityInterface>;
  getModels(filters?: getModelsFiltersDto): Promise<ModelEntityInterface[]>;
  modelPresentInBrand(value: modelPresentInBrandDto): Promise<Boolean>;
  updateAveragePrice(
    value: UpdateAveragePriceDto
  ): Promise<ModelEntityInterface>;
}

export class ModelService implements ModelServiceInterface {
  private modelRepository: ModelRepositoryInterface;

  constructor(modelRepository: ModelRepositoryInterface) {
    this.modelRepository = modelRepository;
  }

  public create(
    value: Partial<ModelEntityInterface>
  ): Promise<ModelEntityInterface> {
    return this.modelRepository.create(value);
  }

  public getModelById(value: number): Promise<ModelEntityInterface> {
    return this.modelRepository.getModelById(value);
  }

  public getModels(
    filters: getModelsFiltersDto
  ): Promise<ModelEntityInterface[]> {
    return this.modelRepository.getModels(filters);
  }

  public modelPresentInBrand(value: modelPresentInBrandDto): Promise<Boolean> {
    return this.modelRepository.modelPresentInBrand(value);
  }

  public updateAveragePrice({
    id,
    average_price,
  }: UpdateAveragePriceDto): Promise<ModelEntityInterface> {
    const entity: Partial<ModelEntityInterface> = {
      id,
      average_price: average_price,
    };

    return this.modelRepository.updateAveragePrice(entity);
  }
}
