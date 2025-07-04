import { Button, Card, CardBody, Grid, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FaJava } from 'react-icons/fa';
import { VscDebugStart } from 'react-icons/vsc';
import { useAuth } from 'src/hooks/useAuth';

const Hero = () => {
	const { t } = useTranslation();
	const { user } = useAuth();
	return (
		<Card mt={10}>
			<CardBody p={10}>
				<Grid
					minH={'50vh'}
					gridTemplateColumns={{ base: '100%', md: '50% 50%' }}
					gap={5}
					justifyContent={'center'}
					alignContent={'center'}
				>
					<Stack spacing={3}>
						<Heading>{t('hero_title', { ns: 'home' })}</Heading>
						<Text>{t('hero_description', { ns: 'home' })}</Text>
						<Grid gridTemplateColumns={{ base: '100%', md: '50% 50%' }} gap={5}>
							<Link href={"/courses"}>
							<Button h={14} colorScheme={'cyan'} w={"full"} rightIcon={<VscDebugStart />}>
								{t('hero_start_learning_btn', { ns: 'home' })}
							</Button>
							</Link>
							
							{ user?.email && (
                           	<Link href="/become-instructor">
		                       <Button w="full" h={14} colorScheme="facebook" variant="outline">
		                     	{t('hero_become_instructor_btn', { ns: 'home' })}
		                       </Button>
	                       </Link>
                            )}

						</Grid>
					</Stack>
					<Icon as={FaJava} w={400} h={240} justifySelf={'center'} opacity={'.8'} />
				</Grid>
			</CardBody>
		</Card>
	);
};

export default Hero;
