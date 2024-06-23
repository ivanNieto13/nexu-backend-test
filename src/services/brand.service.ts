import { BrandEntityInterface } from '../entities/brand.entity';
import { BrandRepositoryInterface } from '../repositories/brand.repository';

export interface BrandServiceInterface {
  getBrands(): Promise<BrandEntityInterface[]>;
}

export class BrandService implements BrandServiceInterface {
  private brandRepository: BrandRepositoryInterface;

  constructor(brandRepository: BrandRepositoryInterface) {
    this.brandRepository = brandRepository;
  }

  public getBrands(): Promise<BrandEntityInterface[]> {
    return this.brandRepository.getBrands();
  }

}
