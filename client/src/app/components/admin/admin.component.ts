import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  myForm: any;
  editForm: any;
  success = false;
  items = [];
  show = false;
  error: String = '';
  toggleEdit: Boolean = false;
  id: String = '';
  listId: string[] = [];
  listShow: boolean[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: [''],
      sampleFile: [''],
      category: [''],
      price: [''],
    });

    this.editForm = this.formBuilder.group({
      editName: [''],
      editFile: [''],
      editCategory: [''],
      editPrice: [''],
    });

    this.adminService.getItems().subscribe((res) => {
      if (res.message) {
        this.error = JSON.parse(JSON.stringify(res)).message;
      } else {
        this.items = res;
      }
    });
  }

  onEditFileSelect(event: any) {
    const file = event.target.files[0];

    this.editForm.patchValue({
      editFile: file,
    });
    this.editForm.get('editFile').updateValueAndValidity();
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];

    this.myForm.patchValue({
      sampleFile: file,
    });
    this.myForm.get('sampleFile').updateValueAndValidity();
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.myForm.get('name').value);
    formData.append('sampleFile', this.myForm.get('sampleFile').value);
    formData.append('category', this.myForm.get('category').value);
    formData.append('price', this.myForm.get('price').value);

    this.adminService.addItem(formData).subscribe((res) => {
      if (res) {
        this.success = true;
        this.items = res;
      } else {
        this.error = JSON.parse(JSON.stringify(res)).message;
      }
    });
  }

  onEdit(itemId: string, oldImg: string ) {
    const formData = new FormData();

    console.log(itemId);
    formData.append('editName', this.editForm.get('editName').value);
    formData.append('editFile', this.editForm.get('editFile').value);
    formData.append('editCategory', this.editForm.get('editCategory').value);
    formData.append('editPrice', this.editForm.get('editPrice').value);
    formData.append('editId', itemId);
    formData.append('oldImg', oldImg);
    this.adminService.updateItem(formData).subscribe((res) => {
      this.items = res;
    });
  }

  toggle() {
    this.show = !this.show;
  }

  edit(e: string) {
    console.log(e);
    this.toggleEdit = !this.toggleEdit;
    for (let entry of this.items) {
      this.listId.push(entry['_id']);
      this.listShow.push(false);
      console.log(entry['_id']);
    }
    this.listShow[this.listId.indexOf(e)] =
      !this.listShow[this.listId.indexOf(e)];
  }

  delet(id: String, img: String) {
    this.adminService.deleteItem({ id: id, img: img }).subscribe((res) => {
      console.log(res);
    });
  }
}
