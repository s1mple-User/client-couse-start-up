import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BsTrash } from 'react-icons/bs';
import { VscOpenPreview } from 'react-icons/vsc';
import { loadImage } from 'src/helpers/image.helper';
import { useActions } from 'src/hooks/useActions';
import { useTypedSelector } from 'src/hooks/useTypedSelector';


const AdminCourseCardPush = ({ course }): JSX.Element => {
    const { deleteAdminCourse } = useActions();
    const { isLoading } = useTypedSelector(state => state.admin);
    const toast = useToast();
    const { t } = useTranslation();


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
                <Text fontWeight={'bold'} color={'facebook.500'}>
                    {t('status', { ns: 'instructor' })}:{' '}
                    <Box as={'span'} color={course.isActive ? 'green.500' : 'red.500'}>
                        {course.isActive ? 'Active' : 'Draft'}
                    </Box>
                </Text>
                <ButtonGroup>
                    <Input placeholder='push user with email ' w={'full'} />
                </ButtonGroup>
                <ButtonGroup width="full">
                  <Button
                     width="full"
                     colorScheme="cyan"
                     variant="solid"
                     _hover={{ bg: 'cyan.600' }}
                     _active={{ bg: 'cyan.700' }}
                      _focus={{ boxShadow: 'outline' }}>
                           Post
                    </Button>
                 </ButtonGroup>
            </Stack>
        </Box>
    );
};

export default AdminCourseCardPush;
