import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  selectedItem: any;

  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ id: number, title: string; note: string; icon: string }> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        id: (i - 1),
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      pluck('id')
    ).subscribe((id: number) => {
      console.log(id);
      this.selectedItem = this.items[id];
      console.log(this.selectedItem);
    });
  }

  // add back when alpha.4 is out
  navigate(item) {
    this.router.navigate(['/list', item.id]);
  }
}
