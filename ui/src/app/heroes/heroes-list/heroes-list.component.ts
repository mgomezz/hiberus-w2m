import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HeroesService } from 'src/app/heroes/services/heroes/heroes.service';
import { MessageNotificationService } from 'src/app/shared/services/message-notification/message-notification.service';
import { Hero } from 'src/app/shared/models/hero.model';
import { ApiResponse } from 'src/app/shared/models/api-response.model';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit, AfterViewInit {
  searchTerms = new Subject<string>();

  loading: boolean = true;
  emptyDataMessage: string = 'No heroes to show!';

  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'superPower',
    'action',
  ];
  dataSource = new MatTableDataSource<Hero>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private heroesService: HeroesService,
    private messageNotificationService: MessageNotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllHeroes();
    this.initializeSearch();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  initializeSearch() {
    this.searchTerms
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term: string) =>
          this.heroesService.searcHeroesByPartialName(term)
        )
      )
      .subscribe((heroes: Hero[]) => {
        this.dataSource.data = heroes;
      });
  }

  clearInput(searchInput: any) {
    searchInput.value = '';
    this.getAllHeroes();
  }

  onSearchHero(value: string) {
    if (value.length === 0) {
      this.getAllHeroes();
    } else {
      this.searchTerms.next(value);
    }
  }

  getAllHeroes() {
    this.heroesService.getHeroes().subscribe(
      (heroes: Hero[]) => {
        this.dataSource.data = heroes;
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        //TODO: manejar errores desde una sola clase para mostrar mensajes mas amigables para el usuario
        this.emptyDataMessage = error.message;
        this.messageNotificationService.notifyError(error.message);
      }
    );
  }

  deleteHero(heroId: string) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.beforeClosed().subscribe((result: boolean) => {
      if (result) {
        this.heroesService.deleteHero(heroId).subscribe(
          (response: ApiResponse) => {
            this.dataSource.data = response.data;
            this.messageNotificationService.notifySuccess(response.message);
          },
          (error: HttpErrorResponse) => {
            this.messageNotificationService.notifyError(error.message);
          }
        );
      }
    });
  }
}
