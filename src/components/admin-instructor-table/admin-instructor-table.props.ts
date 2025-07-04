import { InstructorType, StudentType } from 'src/interfaces/instructor.interface';

export interface AdminInstructorTableProps {
	instructors: InstructorType[];
	approved: boolean;
}

export interface AdminStudentTableProps {
	students: StudentType[];
	approved: boolean;
}
