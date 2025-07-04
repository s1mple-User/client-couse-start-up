import { BooksType } from 'src/interfaces/books.interface';
import { CourseType } from 'src/interfaces/course.interface';
import { BalanceType } from 'src/interfaces/instructor.interface';

export const getTotalPrice = (courses: CourseType[]): number => {

	const coursesPrice = courses.reduce((total, item) => total + item.price, 0);
	return coursesPrice;
};

export const getBalanceObject = (balance: BalanceType) => {
	const payouts = balance.pending.reduce((total, item) => (total = item.amount), 0);

	return {
		payouts: payouts / 100,
	};
};
	