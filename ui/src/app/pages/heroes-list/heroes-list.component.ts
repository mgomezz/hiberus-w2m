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
  emptyDataMessage: string = 'Loading heroes...';

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
        if (heroes.length == 0) {
          this.emptyDataMessage = 'No heroes to show! Add a new one!';
        }

        this.dataSource.data = heroes;
      },
      (error: HttpErrorResponse) => {
        //TODO: implementar alerta para que el usuario se entere
        this.emptyDataMessage =
          'A problem happens when fetching heroes from the server. Try to refresh the page';
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public deleteHero(heroId: string) {
    this.heroesService.deleteHero(heroId).subscribe(
      (response: ApiResponse) => {},
      (error: HttpErrorResponse) => {}
    );
  }
}
