export interface BookType {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  layerInfo: LayerInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
}
export interface VolumeInfo {
  title: string;
  authors?: string[] | null;
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers?: IndustryIdentifiersEntity[] | null;
  readingModes: ReadingModes;
  pageCount: number;
  printedPageCount: number;
  printType: string;
  categories?: string[] | null;
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: PanelizationSummary;
  imageLinks: ImageLinks;
  language: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}
export interface IndustryIdentifiersEntity {
  type: string;
  identifier: string;
}
export interface ReadingModes {
  text: boolean;
  image: boolean;
}
export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}
export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}
export interface LayerInfo {
  layers?: LayersEntity[] | null;
}
export interface LayersEntity {
  layerId: string;
  volumeAnnotationsVersion: string;
}
export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice: ListPriceOrRetailPrice;
  retailPrice: ListPriceOrRetailPrice;
  buyLink: string;
  offers?: OffersEntity[] | null;
}
export interface ListPriceOrRetailPrice {
  amount: number;
  currencyCode: string;
}
export interface OffersEntity {
  finskyOfferType: number;
  listPrice: ListPriceOrRetailPrice1;
  retailPrice: ListPriceOrRetailPrice1;
}
export interface ListPriceOrRetailPrice1 {
  amountInMicros: number;
  currencyCode: string;
}
export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: EpubOrPdf;
  pdf: EpubOrPdf;
  webReaderLink: string;
  accessViewStatus: string;
  quoteSharingAllowed: boolean;
}
export interface EpubOrPdf {
  isAvailable: boolean;
  acsTokenLink: string;
}
