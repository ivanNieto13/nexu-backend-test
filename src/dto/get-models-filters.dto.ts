interface ParsedQs { }

export interface getModelsFiltersDto {
  greater: string | ParsedQs | string[] | ParsedQs[] | undefined;
  lower: string | ParsedQs | string[] | ParsedQs[] | undefined;
  brand_id: string;
}
