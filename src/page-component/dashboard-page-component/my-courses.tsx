import { FC } from 'react';
import { AllCoursesCard } from 'src/components';
import { MyCoursesProps } from './dashboard.props';

const MyCourses: FC<MyCoursesProps> = ({ myCourses }): JSX.Element => {
	if (!Array.isArray(myCourses)) {
		return <p>Курсы не найдены.</p>; 
	}

	return (
		<>
			{myCourses.length > 0 ? (
				myCourses.map(course => (
					<AllCoursesCard
						key={course._id}
						course={course}
						isMyCourse={true}
					/>
				))
			) : (
				<p>У вас пока нет курсов.</p>
			)}
		</>
	);
};

export default MyCourses;
