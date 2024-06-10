import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Beneficiary } from "../store/types/types";
import { useForm } from "react-hook-form";
import {
	Button,
	Drawer,
	DrawerHeader,
	DrawerHeaderTitle,
	makeStyles,
	DrawerBody,
	DrawerFooter,
	MessageBar,
	MessageBarBody,
	MessageBarTitle,
} from "@fluentui/react-components";
import { Dismiss24Regular, PersonDeleteRegular } from "@fluentui/react-icons";
const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
	},
	wrapper: {
		height: "40vh",
		position: "relative",
		maxHeight: "inherit",
	},
});
const RemoveBeneficiary: React.FC = () => {
	const [initialValues, setInitialValues] = useState<Beneficiary>();
	const [messages, setMessages] = React.useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const navigate = useNavigate();
	const { beneficiaryId } = useParams<{ beneficiaryId: string }>(); // Get ID from URL
	const beneficiaries = useSelector(
		(state: { beneficiaries: Beneficiary[] }) => state.beneficiaries
	);
	const dispatch = useDispatch();
	const { handleSubmit } = useForm({ defaultValues: initialValues });

	useEffect(() => {
		if (beneficiaryId) {
			const foundBeneficiary = beneficiaries.find(
				(beneficiary) => beneficiary.id === beneficiaryId
			);
			if (foundBeneficiary) {
				setInitialValues(foundBeneficiary);
			} else {
				// Handle case where beneficiary with ID is not found (e.g., show error message)
				console.error(`Beneficiary with ID ${beneficiaryId} not found`);
				navigate("/"); // Redirect to beneficiaries list if not found
			}
		}
	}, [beneficiaries, beneficiaryId, dispatch, navigate]); // Add dependencies
	const onSubmit = (data: Beneficiary) => {
		setIsOpen(true);
	};
	const handleConfirmation = () => {
		setIsSaving(true);
		dispatch({
			type: "REMOVE_BENEFICIARY",
			payload: { ...initialValues },
		});

		setIsSaving(true);
		setTimeout(() => {
			setIsSaving(false);
			setMessages(true);
		}, 2000);
		setTimeout(() => {
			navigate("/");
		}, 4000);
	};
	const handleCancle = () => {
		setIsOpen(false);
	};
	const handleClickCancel = () => {
		navigate("/");
	};
	const classes = useStyles();
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<div className={classes.root}>
			<div className='ms-Grid' dir='ltr' style={{ padding: 10, margin: 10 }}>
				<Drawer
					type={"overlay"}
					separator
					open={isOpen}
					onOpenChange={(_, { open }) => setIsOpen(open)}>
					<DrawerHeader>
						<DrawerHeaderTitle
							action={
								<Button
									appearance='subtle'
									aria-label='Close'
									icon={<Dismiss24Regular />}
									onClick={() => setIsOpen(false)}
								/>
							}>
							Are you sure?
						</DrawerHeaderTitle>
					</DrawerHeader>

					<DrawerBody>
						<p>Do you want to remove this beneficiary?</p>
					</DrawerBody>
					<DrawerFooter>
						<Button appearance='primary' onClick={handleConfirmation}>
							Yes
						</Button>
						<Button appearance='subtle' onClick={handleCancle}>
							No
						</Button>
					</DrawerFooter>
				</Drawer>
				<div>
					{isSaving && (
						<MessageBar shape='rounded' intent={"info"}>
							<MessageBarBody>
								<MessageBarTitle>Info :</MessageBarTitle>
								Please wait while submitting data.
							</MessageBarBody>
						</MessageBar>
					)}
					{messages && (
						<MessageBar shape='rounded' intent={"success"}>
							<MessageBarBody>
								<MessageBarTitle>Success : </MessageBarTitle>
								Beneficiary deleted Successfully.
							</MessageBarBody>
						</MessageBar>
					)}
				</div>
				<div className='ms-Grid-row'>
					<h1>Remove beneficiary</h1>
				</div>
				<div>
					{initialValues ? (
						<div className='ms-Grid-row'>
							<form
								onSubmit={handleSubmit(onSubmit)}
								style={{ padding: 5, margin: 5 }}>
								<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
									<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
										<label>Full Name </label>
									</div>
									<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
										<input
											type='text'
											value={initialValues.fullName}
											disabled={true}
										/>
									</div>
								</div>

								<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
									<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
										<label>Address</label>
									</div>
									<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
										<input
											type='text'
											value={initialValues.address}
											disabled={true}
										/>
									</div>
								</div>
								<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
									<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
										<label>Country :</label>
									</div>
									<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
										<input
											type='text'
											value={initialValues.country}
											disabled={true}
										/>
									</div>
								</div>
								<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
									<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
										<label>Pincode</label>
									</div>
									<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
										<input
											type='text'
											value={initialValues.pincode}
											disabled={true}
										/>
									</div>
								</div>
								<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
									<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
										<label>Account Number</label>
									</div>
									<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
										<input
											type='text'
											value={initialValues.accountNumber}
											disabled={true}
										/>
									</div>
								</div>
								<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
									<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
										<label>Bank Name</label>
									</div>
									<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
										<input
											type='text'
											value={initialValues.bankName}
											disabled={true}
										/>
									</div>
								</div>
								<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
									<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
										<Button
											appearance='primary'
											type='submit'
											icon={<PersonDeleteRegular />}>
											Remove
										</Button>
									</div>
									<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
										<Button onClick={handleClickCancel}>Cancel</Button>
									</div>
								</div>
							</form>
						</div>
					) : (
						<p>Loading beneficiary data...</p>
					)}
				</div>
			</div>
		</div>
	);
};
export default RemoveBeneficiary;
