import {
	Card,
	CardBody,
	Center,
	Spinner,
	Tab,
	TabList,
	TabPanels,
	Tabs,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useTypedSelector } from 'src/hooks/useTypedSelector';
import { CardType } from 'src/interfaces/constants.interface';
import { CourseType } from 'src/interfaces/course.interface';
import { TransactionsType } from 'src/interfaces/user.interface';
import { AuthService } from 'src/services/auth.service';
import Account from './account';
import MyCourses from './my-courses';
import SavedCards from './saved-cards';
import Settings from './settings';
import Transactions from './transactions';

const DashboardPageComponent = () => {
	const [tabIndex, setTabIndex] = useState(0);
	const { user } = useTypedSelector(state => state.user);
	const [isLoading, setIsLoading] = useState(false);
	const [transactions, setTransactions] = useState<
		TransactionsType[]
	>([]);
	const [myCourses, setMyCourses] = useState<CourseType[]>([]);
	const [savedCards, setSavedCards] = useState<CardType[]>([]);

	const tabHandler = async (idx: number) => {
		setIsLoading(true);
		setTabIndex(idx);
		try {
			if (idx == 2 && !transactions.length) {
				const response = await AuthService.getTransactions();
				setTransactions(response);
			} else if (idx == 3 && !myCourses.length) {
				const response = await AuthService.getMyCourses();
				setMyCourses(response);
			} else if (idx == 4 && !savedCards.length) {
				const response = await AuthService.getSavedCards();
				setSavedCards(response);
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	return (
		<>
			<Card>
				<CardBody>
					<Tabs
						isFitted
						variant='enclosed-colored'
						colorScheme={'facebook'}
						orientation={'vertical'}
						onChange={tabHandler}
						defaultValue={tabIndex}
					>
						<TabList mb='1em' h={'300'}>
							<Tab>Account</Tab>
							<Tab>Settings</Tab>
							<Tab>My Courses</Tab>
							<Tab>Danger Zone</Tab>
						</TabList>
						<TabPanels px={10}>
							{isLoading ? (
								<Center>
									<Spinner />
								</Center>
							) : (
								<>
									{tabIndex === 0 && user && <Account />}
									{tabIndex === 1 && <Settings />}
									{tabIndex === 2 && (
										<MyCourses myCourses={myCourses} />
									)}
								</>
							)}
						</TabPanels>
					</Tabs>
				</CardBody>
			</Card>
		</>
	);
};

export default DashboardPageComponent;