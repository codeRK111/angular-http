import { Component, OnInit, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-todo",
  templateUrl: "./add-todo.component.html",
  styleUrls: ["./add-todo.component.css"]
})
export class AddTodoComponent implements OnInit {
  title: string = "";
  body: string = "";
  userId: number = 1;
  isEmpty: boolean = true;
  errorMessage: string = "";
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {}

  onInput() {
    if (this.title && this.body && this.userId) {
      this.isEmpty = false;
    } else {
      this.isEmpty;
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.loading = true;
    const headers = new HttpHeaders().set(
      "Content-type",
      "application/json; charset=UTF-8"
    );
    const { title, body, userId } = this;
    this.http
      .post(
        "https://jsonplaceholder.typicode.com/posts",
        { title, body, userId },
        { headers }
      )
      .subscribe(
        (data: any) => {
          this.zone.run(() => {
            console.log(data);
            this.errorMessage = "";
            this.loading = false;
            this.router.navigate([""]);
          });
        },
        (err: any) => {
          console.log(err.message);
          this.errorMessage = err.message;
          this.loading = false;
        },
        () => {}
      );
  }
}
