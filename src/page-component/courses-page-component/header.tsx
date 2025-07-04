import {
	Box,
	Button,
	Divider,
	Flex,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	useColorMode,
	useColorModeValue,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { Form, Formik, FormikValues } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { FaRegCommentDots, FaTelegram } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi';
import { RiLogoutBoxLine } from 'react-icons/ri';
import ReactStars from 'react-stars';
import TextAreaField from 'src/components/text-area-field/text-area-field';
import TextFiled from 'src/components/text-filed/text-filed';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { DarkLogo, LightLogo } from 'src/icons';
import { CourseService } from 'src/services/course.service';

const Header = () => {
	const [reviewVal, setReviewVal] = useState(val);
	const [reviewId, setReviewId] = useState<string>();

	const { colorMode, toggleColorMode } = useColorMode();
	const { course } = useTypedSelector(state => state.course);
	const { user } = useTypedSelector(state => state.user);
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const onReviewSubmit = async (formikValues: FormikValues) => {
		try {
			if (reviewId) {
				const data = {
					summary: formikValues.summary,
					rating: formikValues.rating,
				};

				await CourseService.editReview(data, reviewId);
				toast({ title: 'Successfully edited', status: 'success' });
				setReviewId('');
				onClose();
			} else {
				const response = await CourseService.getReviewByUser({
					course: course?._id,
					user: user?.id,
				});

				if (response._id) {
					setReviewVal({
						...reviewVal,
						summary: response.summary,
						rating: response.rating,
					});
					setReviewId(response._id);
					toast({
						title: 'Already have review, you can change it now',
						status: 'warning',
					});
				} else {
					const data = {
						course: course?._id,
						author: user?.id,
						rating: formikValues.rating,
						summary: formikValues.summary,
					};
					await CourseService.createReview(data);
					toast({
						title: 'Successfully created new review',
						status: 'success',
					});
					onClose();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setReviewVal({
			...reviewVal,
			name: user?.fullName as string,
			email: user?.email as string,
		});
	}, [user]);

	return (
		<Box
			position={'fixed'}
			top={0}
			left={0}
			zIndex={99}
			right={0}
			h={'10vh'}
			bg={useColorModeValue('gray.50', 'gray.900')}
			color={useColorModeValue('gray.700', 'gray.200')}
		>
			<Stack
				h={'10vh'}
				w={'90%'}
				mx={'auto'}
				direction={'row'}
				align={'center'}
				justify={'space-between'}
			>
				<Stack gap={{ base: 0, md: 2 }} direction={'row'}>
					<Link href='/'>
						{colorMode === 'light' ? <DarkLogo /> : <LightLogo />}
					</Link>
				</Stack>

				<Stack direction={'row'} align={'center'}>
					<IconButton
						colorScheme={'green'}
						variant={'ghost'}
						onClick={toggleColorMode}
						icon={
							colorMode == 'light' ? (
								<BsFillMoonStarsFill />
							) : (
								<FiSun />
							)
						}
						aria-label={'moon'}
					/>
				</Stack>
			</Stack>
		</Box>
	);
};

export default Header;

const val = {
	email: '',
	name: '',
	rating: 0,
	summary: '',
};
