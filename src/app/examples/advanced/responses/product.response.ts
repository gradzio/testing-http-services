export interface ProductResponse {
  readonly id: number;
  readonly title: string;
  readonly price: number;
}

export interface HasData<T> {
  data: T;
}
