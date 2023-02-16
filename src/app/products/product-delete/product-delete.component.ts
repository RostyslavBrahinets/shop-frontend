import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../shared/product.service';
import {ProductsCategoryService} from '../../categories/shared/products-category.service';
import {NavigationService} from '../../shared/navigation.service';
import {Product} from '../shared/product.model';
import {ProductBarcodeValidator} from '../../shared/validators/product-barcode.validator';
import {ProductsCategoryDto} from '../../categories/shared/products-category.dto';

@Component({
  selector: 'shop-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  productBarcode: string;
  private products: Product[];

  constructor(
    private router: Router,
    private productService: ProductService,
    private productsCategoryService: ProductsCategoryService,
    private navigation: NavigationService,
    private validator: ProductBarcodeValidator
  ) {
    this.navigation = new NavigationService(this.router);
  }

  ngOnInit(): void {
    this.setProducts();
  }

  onDelete(): void {
    if (!this.isValidProductBarcode()) {
      return;
    }

    this.deleteProduct();
    this.navigation.goToEndpoint('/products', true);
  }

  private setProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products
    );
  }

  private isValidProductBarcode(): boolean {
    return this.validator.validate(
      this.productBarcode,
      this.products,
      true
    );
  }

  private deleteProduct(): void {
    for (const product of this.products) {
      if (product.barcode === this.productBarcode) {
        this.productService.deleteProduct(product);
        this.deleteProductFromCategory(product);
        return;
      }
    }
  }

  private deleteProductFromCategory(product: Product) {
    this.productsCategoryService.getProductsCategory().subscribe(
      (productsCategories: ProductsCategoryDto[]) => {
        for (const productsCategory of productsCategories) {
          if (productsCategory.productId === product.id) {
            this.productsCategoryService.deleteProductFromCategory(
              productsCategory
            );
          }
        }
      }
    );
  }
}
