export class ProductCart {
  productId: string;
  salePrice: number;
  amount: number;
  totalMoney: number;
  name: string;
  imageUrlList: string;

  constructor() {
    this.productId = '';
    this.amount = 1;
  }
  setProductStorage(productId: string, 
    salePrice: number , toTalMoney: number,name: string,
    imageUrlList: string) {
    this.productId = productId;
    this.salePrice = salePrice;
    this.totalMoney = toTalMoney;
    this.name = name;
    this.imageUrlList = imageUrlList;
  }
  setBeginProductStorage(productId: string, 
    amount: number, salePrice: number , toTalMoney: number,name: string,
    imageUrlList: string) {
    this.productId = productId;
    this.amount = amount;
    this.salePrice = salePrice;
    this.totalMoney = toTalMoney;
    this.name = name;
    this.imageUrlList = imageUrlList;


  }
  setAmout() {
    this.amount = 1;
  }

}
