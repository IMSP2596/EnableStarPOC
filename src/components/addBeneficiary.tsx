import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Beneficiary } from "../store/types/types";
import {
	Button,
	MessageBar,
	MessageBarBody,
	MessageBarTitle,
} from "@fluentui/react-components";
import { PersonAdd20Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

const AddBeneficiary: React.FC = () => {
	const [messages, setMessages] = React.useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Beneficiary>();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const genUUID = () => {
		return "10x".replace(/[xy]/g, function (c) {
			let r = (Math.random() * 4) | 0,
				v = c === "x" ? r : c;
			return v.toString(2);
		});
	};
	const onSubmit = (data: any) => {
		const id = genUUID();
		dispatch({ type: "ADD_BENEFICIARY", payload: { id, ...data } });
		setMessages(true);
		setTimeout(() => {
			navigate("/");
		}, 4000);
	};
	const handleClickCancel = () => {
		navigate("/");
	};
	const options = ["India", "U.S.A.", "France", "U.K.", "U.A.E.", "Spain"];
	return (
		<>
			<div className='ms-Grid' dir='ltr' style={{ padding: 10, margin: 10 }}>
				<div>
					{messages && (
						<MessageBar shape='rounded' intent={"success"}>
							<MessageBarBody>
								<MessageBarTitle>Success : </MessageBarTitle>
								New Beneficiary Addedd Successfully.
							</MessageBarBody>
						</MessageBar>
					)}
					{(errors.fullName ||
						errors.address ||
						errors.pincode ||
						errors.country ||
						errors.accountNumber ||
						errors.bankName) && (
						<MessageBar shape='rounded' intent={"warning"}>
							<MessageBarBody>
								<MessageBarTitle>Warning : </MessageBarTitle>
								Please fill out necessary details.
							</MessageBarBody>
						</MessageBar>
					)}
				</div>
				<div className='ms-Grid-row'>
					<h1>Add new beneficiary</h1>
				</div>
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
									{...register("fullName", {
										required: {
											value: true,
											message: "Full name is required",
										},
										maxLength: {
											value: 20,
											message: "Full name should be less than 20 characters",
										},
									})}
								/>
							</div>
							<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
								{errors.fullName && (
									<span className='errorMsg'>{errors?.fullName?.message}</span>
								)}
							</div>
						</div>

						<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
							<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
								<label>Address</label>
							</div>
							<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
								<input
									type='text'
									multiple={true}
									height={10}
									width={200}
									{...register("address", {
										required: {
											value: true,
											message: "Address is required.",
										},
										maxLength: {
											value: 20,
											message: "Address should be less than 20 characters.",
										},
									})}
								/>
							</div>
							<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
								{errors.address && (
									<span className='errorMsg'>{errors?.address?.message}</span>
								)}
							</div>
						</div>
						<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
							<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
								<label>Country :</label>
							</div>
							<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
								<select
									{...register("country", {
										required: {
											value: true,
											message: "Country should be selected.",
										},
									})}>
									{options.map((option) => (
										<option key={option}>{option}</option>
									))}
								</select>
							</div>
							<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
								{errors.country && (
									<span className='errorMsg'>{errors?.country?.message}</span>
								)}
							</div>
						</div>
						<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
							<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
								<label>pincode</label>
							</div>
							<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
								<input
									type='text'
									{...register("pincode", {
										required: {
											value: true,
											message: "Pincode is required.",
										},
										maxLength: {
											value: 6,
											message: "Pincode should be less than 6 characters.",
										},
									})}
								/>
							</div>
							<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
								{errors.pincode && (
									<span className='errorMsg'>{errors?.pincode?.message}</span>
								)}
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
											message: "Bank name should be less than 20 characters.",
										},
									})}
								/>
							</div>
							<div className='ms-Grid-col ms-sm3 ms-md3 ms-lg3'>
								{errors.bankName && (
									<span className='errorMsg'>{errors?.bankName?.message}</span>
								)}
							</div>
						</div>
						<div className='ms-Grid-row' style={{ padding: 5, margin: 5 }}>
							<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
								<Button
									appearance='primary'
									type='submit'
									icon={<PersonAdd20Regular />}>
									Submit
								</Button>
							</div>
							<div className='ms-Grid-col ms-sm1 ms-md1 ms-lg1'>
								<Button onClick={handleClickCancel}>Cancel</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
export default AddBeneficiary;
