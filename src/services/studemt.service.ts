import axios from 'axios';
import $axios from 'src/api/axios';
import { API_URL, getInstructorurl, getUrlStudent } from 'src/config/api.config';
import { CourseType } from 'src/interfaces/course.interface';

export const StudentService = {
    async applyStudent(body:any ) {
        const response = await axios.post<'Success'>(`${API_URL}${getUrlStudent('apply')}`, body);

        return response.data;
    },

    async getAllCourses(token?: string) {
        const response = await axios.get<CourseType[]>(`${API_URL}${getInstructorurl('course-all')}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    },

    async getDetailedCourse(token?: string, slug?: string) {
        const response = await $axios.get(`${getInstructorurl(`course/${slug}`)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    },
};
