import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-resquest.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
  model: AddCategoryRequest;
  addCategorySubscription?: Subscription;

  constructor(private categoryService: CategoryService) {
    this.model = {
      name: '',
      urlHandle: '',
    };
  }

  async onFormSubmit() {
    try {
      this.addCategorySubscription = this.categoryService
        .addCategory(this.model)
        .subscribe({
          next: (response) => {
            console.log('This was successfull!');
          },
        });
    } catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
