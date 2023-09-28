import { Component } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-resquest.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  model: AddCategoryRequest;
  constructor(private categoryService: CategoryService) {
    this.model = {
      name: '',
      urlHandle: '',
    };
  }
  async onFormSubmit() {
    try {
      this.categoryService.addCategory(this.model).subscribe({
        next: (response) => {
          console.log('This was successfull!');
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
