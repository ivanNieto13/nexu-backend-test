import {BrandEntityInterface} from '../entities/brand.entity';
import {BrandRepositoryInterface} from '../repositories/brand.repository';

export interface BrandServiceInterface {
  create(value: Partial<BrandEntityInterface>): Promise<BrandEntityInterface>;
  getBrands(): Promise<BrandEntityInterface[]>;
  getBrandById(value: number): Promise<BrandEntityInterface>;
  getBrandByName(value: string): Promise<BrandEntityInterface[]>;
}

export class BrandService implements BrandServiceInterface {
  private brandRepository: BrandRepositoryInterface;

  constructor(brandRepository: BrandRepositoryInterface) {
    this.brandRepository = brandRepository;
  }

  public create(
    value: Partial<BrandEntityInterface>
  ): Promise<BrandEntityInterface> {
    return this.brandRepository.create(value);
  }

  public getBrands(): Promise<BrandEntityInterface[]> {
    return this.brandRepository.getBrands();
  }

  public getBrandById(value: number): Promise<BrandEntityInterface> {
    return this.brandRepository.getBrandById(value);
  }

  public getBrandByName(value: string): Promise<BrandEntityInterface[]> {
    return this.brandRepository.getBrandByName(value);
  }
}
