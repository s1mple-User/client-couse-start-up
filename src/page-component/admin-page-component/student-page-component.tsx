import {
    Box,
    Card,
    CardBody,
    Flex,
    Grid,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { AdminCourseCard, AdminCourseCardInput, AdminInstructorTable, AdminStudentTable, ErrorAlert } from 'src/components';
import SectionTitle from 'src/components/section-title/section-title';
import { useActions } from 'src/hooks/useActions';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { RecordVideoIcon } from 'src/icons';

const StudentPageComponent = () => {
    const { student } = useTypedSelector(state => state.student);
    const { t } = useTranslation();
    const { courses,error } = useTypedSelector(state => state.admin);
    const { clearAdminError } = useActions();
    console.log(student);
    
    return (
        <>
            <Card mt={10}>
                <CardBody>
                    <HStack>
                        <Box w={'30%'}>
                            <SectionTitle
                                title={t('student_section_title', { ns: 'admin' })}
                                subtitle={t('', { ns: 'admin' })}
                            />
                        </Box>
                        <Flex w={'70%'} justify={'flex-end'}>
                            <RecordVideoIcon />
                        </Flex>
                    </HStack>
                </CardBody>
            </Card>

            <Box mt={10} mx={'auto'}>
             <>{error && <ErrorAlert title={error as string} clearHandler={clearAdminError} />}</>
			 <Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={4}>
				{courses.map(c => (
					<AdminCourseCardInput key={c._id} course={c} />
				))}
			 </Grid>
            </Box>
        </>
    );
};

export default StudentPageComponent;
