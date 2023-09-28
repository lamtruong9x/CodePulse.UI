import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-resquest.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  addCategory(model: AddCategoryRequest): Observable<void> {
    return this.http.post<void>('https://localhost:7179/api/Categories', model);
  }
}
