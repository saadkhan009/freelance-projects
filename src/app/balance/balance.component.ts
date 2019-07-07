import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AllotteesService } from '../allottees.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  filesList = [];
  showFiles = [];
  dts: MatTableDataSource<any>;
  dops = {};

  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['sno', 'msno', 'name', 'cl', 'pcl', 'bcl', 'misc', 'mc', 'dues', 'surcharge15', 'grand', 'last_date', 'address'];

  constructor(
    private sanitizer: DomSanitizer,
    private allottees: AllotteesService,
    private snackbar: MatSnackBar,
    private ref: MatDialogRef<BalanceComponent>
  ) { }

  ngOnInit() {
    this.receiveAltes();
  }

  getPBRatio(s: any) {
    let ps = JSON.parse(s.paid);
    let total = 0;

    const keys = Object.keys(ps);
    ps = Object.values(ps);
    const tot: any = ps.reduce((t, a) => {
      return t + a;
    });

    keys.forEach(k => {
      total += s[k];
    });

    return tot / total;

  }

  receiveAltes() {
    this.allottees.getAll().subscribe(res => {
      if (res.error) {
        this.snackbar.open(res.message, 'close');
      } else {
        res.message = res.message.filter(r => {
          if (r.name !== null) {
            return r;
          }
        });
        this.filesList = res.message;
        this.showFiles = this.filesList.filter(f => {
          if (f.name !== null && this.getPBRatio(f) < 0.5) {
            this.dops[f.msno] = '-';
            return f;
          }
        });
        this.getLastDops();
        this.dts = new MatTableDataSource<any>(this.showFiles);
        this.dts.paginator = this.paginator;
      }
    });
  }

  get getWidthForMid() {
    let width: any = (window.innerWidth / 3) - 150;
    width = (width / window.innerWidth) * 100;
    width = width.toString().concat('%');
    return this.sanitizer.bypassSecurityTrustStyle(width);
  }

  getSno(f: any) {
    let ret = '';
    if (f.allotted === 1) {
      ret = 'Allotment';
    } else {
      const payments = JSON.parse(f.paid);
      const vals = Object.values(payments);
      const total: any = vals.reduce((t: any, a: any) => {
        return t + a;
      });

      const expesnes = f.cl + f.misc + f.mc + f.surcharge + f.int_dev + f.out_dev + f.misc + f.wcpr;
      const ratio = total / expesnes;

      if (ratio === 1) {
        ret = 'F/P';
      } else if (ratio < 1 && ratio > 0.5) {
        ret = 'Member';
      } else {
        ret = '50% Below';
      }
    }

    return ret;
  }

  getDate(d: string) {
    return new Date(d).toLocaleString().split(',')[0];
  }

  close() {
    this.ref.close();
  }

  print() {
    window.print();
  }

  get getDateToday() {
    return new Date().toLocaleString().split(',')[0];
  }

  getPcl(f: any) {
    return JSON.parse(f.paid).cl;
  }

  getTotal(e: any) {
    return e.cl - this.getPcl(e) + e.misc + e.mc;
  }

  getS15(e: any) {
    return this.getTotal(e) * 1.5;
  }

  getGrand(e: any) {
    return this.getS15(e) + this.getTotal(e);
  }

  getLastDops() {
    Object.keys(this.dops).forEach(k => {
      this.getLastDOP({ msno: k });
    });
  }

  getLastDOP(el: any) {
    this.allottees.getLastDOP(el).subscribe(res => {
      if (res.error) {
        this.snackbar.open(res.message);
      } else {
        if (res.message.length > 0) {
          const dt = new Date(res.message[0].dt).toDateString().split(' ');
          this.dops[el.msno] = dt[1].concat('-').concat(dt[2]);
        }
      }
    });
  }
}
