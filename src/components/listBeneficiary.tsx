import { ScrollablePane } from "@fluentui/react";
import {
	Button,
	Field,
	Persona,
	SearchBox,
	makeStyles,
} from "@fluentui/react-components";
import {
	AddSquare24Filled,
	Delete24Regular,
	EditPerson24Regular,
	PersonRegular,
} from "@fluentui/react-icons";
import { List, ListItem } from "@fluentui/react-list-preview";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Beneficiary } from "../store/types/types";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
	},
	buttonWrapper: {
		alignSelf: "center",
	},
	item: {
		cursor: "pointer",
		padding: "2px 6px",
		justifyContent: "space-between",
	},
	fieldWrapper: {
		padding: "2px 6px",
	},
	wrapper: {
		height: "40vh",
		position: "relative",
		maxHeight: "inherit",
	},
});
const ListBeneficiary: React.FC = () => {
	const beneficiaries = useSelector(
		(state: { beneficiaries: Beneficiary[] }) => state.beneficiaries
	);
	const [beneficiariesList, setBeneficiaries] = useState<Beneficiary[]>([]);
	const [filterBeneficiariesList, setFilterBeneficiariesList] = useState<
		Beneficiary[]
	>([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch({
			type: "LIST_BENEFICIARY",
		}); // Fetch beneficiaries on component mount
		setBeneficiaries(beneficiaries);
	}, [dispatch]);
	const handleClickAdd = () => {
		navigate("/add");
	};
	const handleClickEdit = (id: string) => {
		navigate("/edit/" + id);
	};
	const handleClickRemove = (id: string) => {
		navigate("/remove/" + id);
	};
	const handleSearch = (newValue: any) => {
		let searchTerm = newValue.target.value;
		if (searchTerm.length > 0) {
			let _beneficiary = beneficiariesList.filter((beneficiary) =>
				beneficiary.fullName.includes(searchTerm)
			);
			_beneficiary = _beneficiary.length > 0 ? _beneficiary : beneficiariesList;
			setFilterBeneficiariesList(_beneficiary);
		} else {
			setFilterBeneficiariesList([]);
		}
	};
	const classes = useStyles();
	const _bl =
		filterBeneficiariesList.length > 0
			? filterBeneficiariesList
			: beneficiariesList;
	return (
		<>
			<div className={classes.root}>
				<div className='ms-Grid' dir='ltr' style={{ padding: 10, margin: 10 }}>
					<div className='ms-Grid-row'>
						<h1>All beneficiary</h1>
					</div>
					<div className='ms-Grid-row' style={{ padding: 5 }}>
						<div className='ms-Grid-col ms-sm6 ms-md6 ms-lg6'>
							<Button
								appearance='primary'
								icon={<AddSquare24Filled />}
								onClick={handleClickAdd}>
								Add Beneficiary
							</Button>
						</div>
					</div>
					<div className='ms-Grid-row' style={{ padding: 5 }}>
						<div className='ms-Grid-col ms-sm6 ms-md6 ms-lg6'>
							<Field>
								<SearchBox
									placeholder='Search Beneficiary Name'
									contentBefore={<PersonRegular />}
									size='medium'
									onChange={handleSearch}
								/>
							</Field>
						</div>
					</div>
					{_bl.length > 0 ? (
						<div className='ms-Grid-row'>
							<div className='ms-Grid-col ms-sm4 ms-md4 ms-lg4'>
								<div className={classes.wrapper}>
									<ScrollablePane scrollbarVisibility='auto'>
										<List navigationMode='composite'>
											{_bl.map((beneficiary) => (
												<ListItem
													key={beneficiary.id}
													value={beneficiary.fullName}
													className={classes.item}>
													<Persona
														name={beneficiary.fullName}
														className={classes.item}
														role='gridcell'
														secondaryText={`Account Number : ${beneficiary.accountNumber}`}
														tertiaryText={beneficiary.bankName}
														quaternaryText={`${beneficiary.address},${beneficiary.pincode},${beneficiary.country}`}
													/>

													<div
														role='gridcell'
														className={classes.buttonWrapper}>
														<Button
															size='medium'
															icon={<EditPerson24Regular />}
															onClick={() => handleClickEdit(beneficiary.id)}
															style={{ margin: 5 }}
														/>
														<Button
															size='medium'
															icon={<Delete24Regular />}
															onClick={() => handleClickRemove(beneficiary.id)}
															style={{ margin: 5 }}
														/>
													</div>
												</ListItem>
											))}
										</List>
									</ScrollablePane>
								</div>
							</div>
						</div>
					) : (
						<div className='ms-Grid-row'>
							<div className='ms-Grid-col ms-sm4 ms-md4 ms-lg4'>
								<div className={classes.wrapper}>
									<p>No Records Found.</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};
export default ListBeneficiary;
