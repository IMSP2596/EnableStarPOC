import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Beneficiary } from "../store/types/types";
import { useForm } from "react-hook-form";
import {
	Button,
	Drawer,
	DrawerHeader,
	MessageBar,
	MessageBarBody,
	MessageBarTitle,
	makeStyles,
	DrawerHeaderTitle,
	DrawerBody,
	DrawerFooter,
	Spinner,
} from "@fluentui/react-components";
import { PersonAdd20Regular, Dismiss24Regular } from "@fluentui/react-icons";
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
const EditBeneficiary: React.FC = () => {
	const [initialValues, setInitialValues] = useState<Beneficiary>();
	const [isSaving, setIsSaving] = useState(false);
	const navigate = useNavigate();
	const { beneficiaryId } = useParams<{ beneficiaryId: string }>(); // Get ID from URL
	const beneficiaries = useSelector(
		(state: { beneficiaries: Beneficiary[] }) => state.beneficiaries
	);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitSuccessful, isSubmitting },
	} = useForm<Beneficiary>({
		mode: "onChange",
		defaultValues: initialValues,
	});

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

		setInitialValues(data);
	};
	const handleConfirmation = () => {
		setIsOpen(false);
		dispatch({
			type: "EDIT_BENEFICIARY",
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
	const [messages, setMessages] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { target } = event;
		if (target.name === "accountNumber")
			setValue("accountNumber", target.value, {
				shouldValidate: true,
				shouldDirty: true,
			});
		if (target.name === "bankName")
			setValue("bankName", target.value, { shouldValidate: true });
	};
	useEffect(() => {
		setValue("fullName", initialValues?.fullName || "", {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue("address", initialValues?.address || "", {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue("country", initialValues?.country || "", {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue("pincode", initialValues?.pincode || "", {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue("id", initialValues?.id || "", {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue("accountNumber", initialValues?.accountNumber || "", {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue("bankName", initialValues?.bankName || "", {
			shouldValidate: true,
			shouldDirty: true,
		});
		setValue("fullName", initialValues?.fullName || "", {
			shouldValidate: true,
			shouldDirty: true,
		});
	}, [initialValues]);
	return (
		<div className={classes.root}>
			<div className='ms-Grid' dir='ltr' style={{ padding: 10, margin: 10 }}>
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
								Beneficiary updated Successfully.
							</MessageBarBody>
						</MessageBar>
					)}
					{(errors.accountNumber || errors.bankName) && (
						<MessageBar shape='rounded' intent={"warning"}>
							<MessageBarBody>
								<MessageBarTitle>Warning : </MessageBarTitle>
								Please fill out necessary details.
							</MessageBarBody>
						</MessageBar>
					)}
				</div>
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
						<p>Do you want to update this beneficiary?</p>
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
				<div className='ms-Grid-row'>
					<h1>Edit beneficiary</h1>
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
											disabled={true}
											{...register("fullName", { required: false })}
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
											disabled={true}
											{...register("address", { required: false })}
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
											disabled={true}
											{...register("country", { required: false })}
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
											disabled={true}
											{...register("pincode", { required: false })}
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
											{...register("accountNumber", {
												required: {
													value: true,
													message: "Account number is required.",
												},
												maxLength: {
													value: 12,
													message:
														"Account number should be less than 12 characters.",
												},
												onBlur: (event) => handleChange(event),
											})}
										/>
									</div>
									<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
										{errors.accountNumber && (
											<span className='errorMsg'>
												{errors?.accountNumber?.message}
											</span>
										)}
									</div>
								</div>
								<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
									<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
										<label>Bank Name</label>
									</div>
									<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
										<input
											type='text'
											{...register("bankName", {
												required: {
													value: true,
													message: "Name of Bank is required.",
												},
												maxLength: {
													value: 20,
													message:
														"Bank name should be less than 20 characters.",
												},
												onBlur: (event) => handleChange(event),
											})}
										/>
									</div>
									<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
										{errors.bankName && (
											<span className='errorMsg'>
												{errors?.bankName?.message}
											</span>
										)}
									</div>
								</div>
								<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
									<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
										<Button
											appearance='primary'
											type='submit'
											icon={<PersonAdd20Regular />}>
											Update
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
export default EditBeneficiary;
