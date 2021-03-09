import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from 'src/app/models/hero.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

//TODO: pasar a un service
const ELEMENT_DATA: Hero[] = [
  {
    id: 1,
    name: 'Superman',
    description: 'The best hero',
    superPower: 'Laser vision',
  },
  {
    id: 1,
    name: 'Superman',
    description: 'The best hero',
    superPower: 'Laser vision',
  },
  {
    id: 1,
    name: 'Superman',
    description: 'The best hero',
    superPower: 'Laser vision',
  },
  {
    id: 1,
    name: 'Superman',
    description: 'The best hero',
    superPower: 'Laser vision',
  },
  {
    id: 1,
    name: 'Superman',
    description: 'The best hero',
    superPower: 'Laser vision',
  },
  {
    id: 1,
    name: 'Superman',
    description: 'The best hero',
    superPower: 'Laser vision',
  },
  {
    id: 1,
    name: 'Superman',
    description: 'The best hero',
    superPower: 'Laser vision',
  },
  {
    id: 1,
    name: 'Superman',
    description: 'The best hero',
    superPower: 'Laser vision',
  },
  {
    id: 1,
    name: 'Superman',
    description: 'The best hero',
    superPower: 'Laser vision',
  },
  {
    id: 1,
    name: 'Superman',
    description: 'The best hero',
    superPower: 'Laser vision',
  },
  {
    id: 1,
    name: 'Superman',
    description: 'The best hero',
    superPower: 'Laser vision',
  },
  {
    id: 1,
    name: 'Superman',
    description: 'The best hero',
    superPower: 'Laser vision',
  },
];

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'superPower'];
  dataSource = new MatTableDataSource<Hero>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
