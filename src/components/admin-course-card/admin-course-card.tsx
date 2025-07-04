import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	Flex,
	Heading,
	HStack,
	Input,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsTrash } from 'react-icons/bs';
import { VscOpenPreview } from 'react-icons/vsc';
import { loadImage } from 'src/helpers/image.helper';
import { useActions } from 'src/hooks/useActions';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { AdminCourseCardProps } from './admin-course-card.prop';

const AdminCourseCard: FC<AdminCourseCardProps> = ({ course }): JSX.Element => {
	const { deleteAdminCourse,pushStudentCourse } = useActions();
	const { isLoading } = useTypedSelector(state => state.admin);
	const toast = useToast();
	const { t } = useTranslation();
	const [email,setEmail] = useState<string>('')

	const pushStudent = () =>{
		pushStudentCourse({
			email,
			courseId:course._id,
				callback: () => {
					toast({
						title:"student pushed",
						status: 'success',
						position: 'top-right',
						isClosable: true,
					});
				},
		})
	}

	const deleteCourseHandler = () => {
		const isAgree = confirm('Are you sure?');
		if (isAgree) {
			deleteAdminCourse({
				courseId: course._id,
				callback: () => {
					toast({
						title: t('successfully_deleted', { ns: 'instructor' }),
						status: 'success',
						position: 'top-right',
						isClosable: true,
					});
				},
			});
		}
	};

	return (
		<Box p={5} boxShadow={'dark-lg'} mt={5} borderRadius={'lg'}>
			<Stack spacing={2}>
				<Box pos={'relative'} w={'100%'} h={'200px'}>
					<Image
						fill
						src={loadImage(course.previewImage)}
						style={{ objectFit: 'cover', borderRadius: '10px' }}
						alt={course.title}
					/>
				</Box>
				<Heading fontSize={'xl'}>{course.title}</Heading>
				<Divider />
				<Flex align={'center'} gap={2} fontSize={'16px'} color={'facebook.200'} fontWeight={'bold'}>
					{t('language', { ns: 'instructor' })}: {course.language}
				</Flex>
				<Text fontWeight={'bold'} color={'cyan'}>
					{t('status', { ns: 'instructor' })}:{' '}
					<Box as={'span'} color={course.isActive ? 'green.500' : 'red.500'}>
						{course.isActive ? 'Active' : 'Draft'}
					</Box>
				</Text>
				<ButtonGroup>
					<HStack flexDirection={'column'} spacing={'4'} borderColor={'blue.700'}>
					<Input
                      w={'full'}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter student email"
                    />
					<Button
						w={'full'}	
						onClick={pushStudent}
						colorScheme={'green'}
						rightIcon={<BsTrash />}
						isLoading={isLoading}
					>
						Push
					</Button>
					<Button
						w={'full'}
						onClick={deleteCourseHandler}
						colorScheme={'red'}
						rightIcon={<BsTrash />}
						isLoading={isLoading}
					>
						{t('delete_course', { ns: 'instructor' })}
					</Button>
					</HStack>
				</ButtonGroup>
			</Stack>
		</Box>
	);
};

export default AdminCourseCard;

