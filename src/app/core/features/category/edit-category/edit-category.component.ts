import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-resquest.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-resquest.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  category?: Category;
  model?: AddCategoryRequest;
  editCategorySubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private service: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.service.getCategoryById(this.id).subscribe({
            next: (res) => {
              this.category = res;
            },
          });
        }
      },
    });
  }

  onFormSubmit(): void {
    const updateCategory: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };
    if (this.id)
      this.editCategorySubscription = this.service
        .updateCategory(this.id, updateCategory)
        .subscribe({
          next: (res) => {
            this.router.navigateByUrl('/admin/categories');
          },
          error: (err) => {
            console.log(err);
          },
        });
  }

  onDelete() {
    if (this.id) {
      let deleteSubscription: Subscription = this.service
        .deleteCategory(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          },
        });
      // deleteSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
