export class ProductCart {
    id: string;
    productCategoryId: string;
    name: string;
    description: string;
    salePrice: number;
    amount: number;

    constructor() {
        this.id = '';
        this.productCategoryId = '';
        
      this.amount = 1;
    }
    setProductStorage(id: string, productCategoryId: string,
       amount: number,name: string,
      description: string,salePrice: number) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.salePrice = salePrice;
        this.productCategoryId = productCategoryId;
    }
    setBeginProductStorage(id: string, productCategoryId: string,
     name: string,
     description: string,salePrice: number) {
       this.id = id;
       this.name = name;
       this.description = description;
       this.salePrice = salePrice;
       this.productCategoryId = productCategoryId;

    }
    setAmout() {
      this.amount = 1;
    }

}
