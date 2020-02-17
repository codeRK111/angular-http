import { Component, OnInit, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  getUrl = "https://jsonplaceholder.typicode.com/posts";
  posts: any = [];
  errorMessage: string = "";
  loading: boolean = true;

  constructor(private http: HttpClient, private zone: NgZone) {
    this.http.get(this.getUrl).subscribe(
      data => {
        this.zone.run(() => {
          this.posts = data;
          console.log(data);
          this.errorMessage = "";
          this.loading = false;
        });
      },
      (err: any) => {
        console.log(err.message);
        this.errorMessage = err.message;
        this.loading = false;
      }
    );
  }

  ngOnInit() {}
}
