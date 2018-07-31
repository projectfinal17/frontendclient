export class ProductForCustomer {
    productId: string;
    salePrice: number;
    amount: number;
    totalMoney: number;
  
    constructor() {
      this.productId = '';
      this.amount = 1;
    }
    setProductStorage(productId: string, 
      salePrice: number , toTalMoney: number) {
      this.productId = productId;
      this.salePrice = salePrice;
      this.totalMoney = toTalMoney;
    }
    setBeginProductStorage(productId: string, 
      amount: number, salePrice: number , toTalMoney: number) {
      this.productId = productId;
      this.amount = amount;
      this.salePrice = salePrice;
      this.totalMoney = toTalMoney;
  
  
    }
    setAmout() {
      this.amount = 1;
    }
  
  }
  