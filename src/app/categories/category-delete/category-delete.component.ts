import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryService} from '../shared/category.service';
import {NavigationService} from '../../shared/navigation.service';
import {Category} from '../shared/category.model';
import {CategoryValidator} from '../shared/category.validator';
import {CategoryDto} from '../shared/category.dto';

@Component({
  selector: 'shop-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {
  categoryName: string;
  private categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private navigation: NavigationService,
    private validator: CategoryValidator
  ) {
    this.navigation = new NavigationService(this.router);
  }

  ngOnInit(): void {
    this.setCategories();
  }

  onDelete(): void {
    if (!this.isValidCategoryData()) {
      return;
    }

    this.deleteCategory();
    this.navigation.goToEndpoint('/categories', true);
  }

  onClickCancel(): void {
    this.navigation.goToEndpoint('/categories');
  }

  private setCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => this.categories = categories
    );
  }

  private isValidCategoryData(): boolean {
    return this.validator.validate(
      new CategoryDto(this.categoryName),
      this.categories,
      true
    );
  }

  private deleteCategory(): void {
    this.categoryService.getCategories().subscribe(
      (categories: Category[]) => {
        for (const category of categories) {
          if (category.name === this.categoryName) {
            this.categoryService.deleteCategory(category);
            break;
          }
        }
      }
    );
  }
}
