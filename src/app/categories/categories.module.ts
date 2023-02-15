import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ProductsModule} from '../products/products.module';
import {SortModule} from '../sort/sort.module';
import {ButtonModule} from '../button/button.module';
import {CategoryListComponent} from './category-list/category-list.component';
import {CategoryListItemComponent} from './category-list-item/category-list-item.component';
import {CategoryComponent} from './category/category.component';
import {CategoryAddComponent} from './category-add/category-add.component';
import {CategoryService} from './shared/category.service';
import {ProductsCategoryService} from './shared/products-category.service';
import {ProductService} from '../products/shared/product.service';

@NgModule({
  imports: [
    CommonModule,
    ProductsModule,
    RouterModule,
    SortModule,
    ButtonModule
  ],
  declarations: [
    CategoryListComponent,
    CategoryListItemComponent,
    CategoryComponent,
    CategoryAddComponent
  ],
  providers: [
    CategoryService,
    ProductsCategoryService,
    ProductService
  ],
  exports: [
    CategoryListComponent,
    CategoryListItemComponent,
    CategoryComponent,
    CategoryAddComponent
  ]
})
export class CategoriesModule {
}
