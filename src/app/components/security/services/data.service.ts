import {Injectable, OnInit} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {DayPilot} from '@daypilot/daypilot-lite-angular';
import {HttpClient} from '@angular/common/http';
import {TimeTableModelDayCellService} from '../../school/study/services/time-table-model-day-cell.service';
import {TimeTableModelDayCell} from '../../school/study/interface/time-table-model-day-cell';
import {map} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Injectable()
export class DataService{

    public timeTableModelDayCells!: TimeTableModelDayCell[];
    temp = [];
    rows = [];
    items: DayPilot.EventData[] = [];
    loadingIndicator = true;
    id: number;
    test: any;

    // constructor(
    //     private http: HttpClient,
    //     public timeTableDayCellService: TimeTableModelDayCellService,
    //     public router: ActivatedRoute, private route: Router) {
    //     console.log(DayPilot.Date.today().addHours(2));
    //     console.log(this.events);
    //     console.log(this.router);
    //     this.id = this.router.snapshot.params.id;
    //     this.getTimeTableModelDayCelllist()

    //     this.setId(this.id)

    // }

    // ngOnInit(){
    //     console.log(this.setId)
    // }

    // setId(id: number) {
    //     console.log(id)
    //     this.id = id;
    //     console.log(this.id)
    //     return this.id
    // }

    constructor(
    private http: HttpClient,
    public timeTableDayCellService: TimeTableModelDayCellService,
    public router: ActivatedRoute,
    private route: Router
) {
    // this.getTimeTableModelDayCelllist()
}



    // getTimeTableModelDayCelllist(): any
    // {
    //   this.timeTableDayCellService.getCollection().subscribe({
    //     next: (res: any) => {
    //       console.log(res);
    //       this.timeTableModelDayCells = res['hydra:member'];
    //
    //       // cache our list
    //       // this.temp = [...res['hydra:member']];
    //       this.temp = [...res['hydra:member']];
    //
    //       this.rows = this.timeTableModelDayCells;
    //       console.log(this.rows);
    //
    //       const objt: any = {};
    //
    //       this.items = this.rows.map((v) => {
    //         return {
    //           id : v.id,
    //           start : v.startAt,
    //           end : v.endAt,
    //           block : 1,
    //           duration : 2,
    //           text : v.course.nameuvc,
    //           tags : {
    //             color: '#f9cb9c'
    //           }
    //         }
    //       })
    //       console.log(this.items);
    //
    //       // Assign this.items to events here
    //       // this.events = this.items;
    //       // console.log(this.events);
    //
    //       this.loadingIndicator = false;
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       console.log(error.message);
    //       console.log('Error while fetching the records');
    //       this.loadingIndicator = false;
    //     }
    //   });
    // }




    // Change the return type of your method to Observable<any[]>
    getTimeTableModelDayCelllist(modelId): Observable<any[]> {
        // Return the Observable directly instead of subscribing here
        // let url = this.route.routerState.snapshot.url;
        // let corest = url.match(/\d/g);
        // this.test = corest[0];
        // console.log(this.test);
        return this.timeTableDayCellService.getCalendar(modelId).pipe(
            map((res: any) => {
                console.log(res);
                this.timeTableModelDayCells = res['hydra:member'];

                // cache our list
                this.temp = [...res['hydra:member']];
                this.items = [];
                this.rows = this.timeTableModelDayCells;

                console.log(this.items);

                const eventData = this.rows.map((v) => {
                    const dates: Date[] = getDatesByDayOfWeek(v.modelStartDate.date, v.modelEndDate.date, v.modelDay);
                    console.log(dates);
                    return dates.map((d) => {
                        return {
                            id: v.id,
                            start: setTime(d, v.startAt.date),
                            end: setTime(d, v.endAt.date),
                            text: `Course : ${v.course},
                             Teacher : ${ v.teacher},
                             Room : ${ v.room},
                             Start Time : ${ new Date(v.startAt.date).toLocaleTimeString()},
                             End Time : ${ new Date(v.endAt.date).toLocaleTimeString()}`,
                            tags: {
                                color: '#f9cb9c'
                            }
                        };
                    });
                });

                for (const eventDatum of eventData) {
                    this.items.push(...eventDatum);
                }
                console.log(this.items);

                // Return this.items as the result of the Observable
                return this.items;
            }),
        );
    }

// Now events is an Observable
    // events: Observable<any[]> = this.getTimeTableModelDayCelllist();
    // events: Observable<any[]> = this.getTimeTableModelDayCelllist();


    // events: any[] = this.items;

    // events: any[] = [
    //   {
    //     block: 1,
    //     duration: 2,
    //     end: "2023-11-12T07:50:00+00:00",
    //     id: 47,
    //     start: "2023-11-12T06:30:00+00:00",
    //     tags: {
    //       color:
    //           "#f9cb9c"
    //     },
    // text: "MATHEMATICS ANALYSIS",
    //   }
    // ];

    // [
    // {
    //   id: 1,
    //   start: DayPilot.Date.today(),
    //   end: DayPilot.Date.today().addHours(2),
    //   block: 1,
    //   duration: 2,
    //   text: 'Event 1',
    //   tags: {
    //     color: '#f9cb9c'
    //   }
    // },
    // {
    //   id: 2,
    //   start: '2023-11-14 03:00:00',
    //   end: '2023-11-14 06:00:00',
    //   block: 3,
    //   duration: 3,
    //   text: 'Event 2',
    //   tags: {
    //     color: '#ffe599'
    //   }
    // }
    // {
    //   id: 3,
    //   start: DayPilot.Date.today(),
    //   end: DayPilot.Date.today().addHours(2),
    //   block: 4,
    //   duration: 1,
    //   text: 'Event 3',
    //   tags: {
    //     color: '#b6d7a8'
    //   }
    // }
    // this.items
    // ];


    // getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    //
    //   // simulating an HTTP request
    //   return new Observable(observer => {
    //     setTimeout(() => {
    //       observer.next(this.events);
    //       observer.complete();
    //     }, 200);
    //   });
    //
    // }

    getEvents(from: DayPilot.Date, to: DayPilot.Date, modelId: number): Observable<any[]> {
        // Create a new Subject
        const subject = new Subject<any[]>();
        // Subscribe to this.events
        this.getTimeTableModelDayCelllist(modelId).subscribe(events => {
            // Emit the events through the Subject
            setTimeout(() => {
                subject.next(events);
                subject.complete();
            }, 2000);
        });

        // Return the Subject as an Observable
        return subject.asObservable();
    }


    // addEvent(data: any) {
    //   this.events.push(data);
    // }

}

// tslint:disable-next-line:typedef
function getDatesByDayOfWeek(startDate, endDate, dayOfWeek: string) {
    const dateArray: Date[] = [];
    const currentDate = new Date(startDate);
    // Days of the week in JavaScript are 0 (Sunday) - 6 (Saturday)
    const daysOfWeek = {
        SUNDAY: 0,
        MONDAY: 1,
        TUESDAY: 2,
        WEDNESDAY: 3,
        THURSDAY: 4,
        FRIDAY: 5,
        SATURDAY: 6
    };

    while (currentDate <= new Date(endDate)) {
        if (currentDate.getDay() === daysOfWeek[dayOfWeek.toUpperCase()]) {
            console.log(currentDate);
            dateArray.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(dateArray);
    return dateArray;
}

// tslint:disable-next-line:typedef
function setTime(date: Date, time) {
    console.log(date);
    time = new Date(time);
    const [hours, mins, sec] = time.toTimeString().split(':');
    date.setHours(hours);
    date.setMinutes(mins);
    date.setSeconds(0);
    date.setMilliseconds(0);
    const datePipe = new DatePipe('en-US');
    const dateFormat =  datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
    console.log(dateFormat);
    return dateFormat;
}
