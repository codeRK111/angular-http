import { Component, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-todo-details",
  templateUrl: "./todo-details.component.html",
  styleUrls: ["./todo-details.component.css"]
})
export class TodoDetailsComponent implements OnInit {
  id;
  title: any = "";
  body: any = "";
  url = "https://jsonplaceholder.typicode.com/posts/";
  errorMessage: string = "";
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    console.log(this.id);
    this.http.get(`${this.url}${this.id}`).subscribe(
      (data: any) => {
        this.zone.run(() => {
          this.title = data.title;
          this.body = data.body;
          this.errorMessage = "";
          this.loading = false;
          console.log(data);
        });
      },
      (err: any) => {
        console.log(err.message);
        this.errorMessage = err.message;
        this.loading = false;
      }
    );
  }
}
