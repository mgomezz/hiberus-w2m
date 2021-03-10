import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HeroesService } from 'src/app/services/heroes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from 'src/app/models/api-response.model';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit, AfterViewInit {
  loading: boolean = true;
  emptyDataMessage: string = 'No heroes to show! Add a new one!';

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'superPower',
    'action',
  ];
  heroes: Hero[] = [];
  dataSource = new MatTableDataSource<Hero>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(
      (heroes: Hero[]) => {
        this.dataSource.data = heroes;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;

        this.emptyDataMessage =
          'A problem happened when fetching the heroes from the server. Try to refresh the page';
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public deleteHero(heroId: string) {
    this.heroesService.deleteHero(heroId).subscribe(
      (response: ApiResponse) => {
        this.dataSource.data = this.dataSource.data.filter(
          (hero) => hero.id !== heroId
        );
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }
}
