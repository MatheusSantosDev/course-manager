import { Component, OnInit } from "@angular/core";
import { Course } from "./course";
import { CourseService } from "./course.service";

@Component({    
    templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {

filteredCourses: Course[] = [];

    _courses: Course[] = [];
    
    _filterBy!: string;

    constructor(private couseService: CourseService) { }

    ngOnInit(): void {
            this.retrieveAll();
    }

    retrieveAll(): void {
        this.couseService.retrieveAll().subscribe({
            next: courses => {
                this._courses = courses;
                this.filteredCourses = this._courses;
            },
            error: err => console.log('error',err)
        })
    }

    deleteById(courseId: number): void {
        this.couseService.deleteById(courseId).subscribe({
            next: () => {
                console.log('Deleted With Sucess');
                this.retrieveAll();       
                },
            error: err => console.log('Error', err)
        })       
        
    }

    set filter(value: string){
        this._filterBy = value;

        this.filteredCourses = this._courses.filter((Course: Course) => Course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
    }

    get filter(){
        return this._filterBy;
    }
}