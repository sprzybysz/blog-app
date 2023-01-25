import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  company = {} as Company;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.company = history.state;
  }
}
