export default class ProductEntity {
  constructor(
    readonly id: number,
    readonly amount: string,
    readonly image_url: string,
    readonly name: string,
    readonly stock: number,
  ) {}
}
