import { CourseType } from 'src/interfaces/course.interface';
import { InstructorType } from 'src/interfaces/instructor.interface';

export interface InstructorIntialStateType {
	isLoading: boolean;
	error: string | null | unknown;
	courses: CourseType[];
	course: CourseType | null;
	instructors: InstructorType[];
	student:[];
}

export interface InstructorApplyBody {
	email: string;
	socialMedia: string;
	callback: () => void;
}