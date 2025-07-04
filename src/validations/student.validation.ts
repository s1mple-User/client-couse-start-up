import * as Yup from 'yup';

export const StudentValidation = {
    applyStudentValue() {
        return {
            firstName: '',
            lastName: '',
            email: '',
        };
    },
    applyStudentValidation() {
        return Yup.object({
            email: Yup.string().email('email_is_invalid').required('email_is_required'),
            firstName: Yup.string().required('first_name_required'),
            lastName: Yup.string().required('last_name_required'),
        });
    },
};
