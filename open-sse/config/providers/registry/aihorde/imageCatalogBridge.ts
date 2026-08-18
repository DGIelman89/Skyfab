export interface AiHordeImageCatalogEntry {
  id: string;
  name: string;
  provider: string;
  supportedSizes: string[];
  inputModalities: string[];
  description?: string;
}

type AiHordeImageCatalogResolver = () => AiHordeImageCatalogEntry[];

let resolveEntries: AiHordeImageCatalogResolver = () => [];

export function registerAiHordeImageCatalogResolver(resolver: AiHordeImageCatalogResolver): void {
  resolveEntries = resolver;
}

export function getRegisteredAiHordeImageCatalogEntries(): AiHordeImageCatalogEntry[] {
  return resolveEntries();
}
