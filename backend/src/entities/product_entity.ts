export default class ProductEntity {
  constructor(
    readonly id: number,
    readonly amount: string,
    readonly name: string,
    readonly stock: number,
  ) {}
}
