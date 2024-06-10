import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import store from "./store/store";
import { Provider } from "react-redux";
import ListBeneficiary from "./components/listBeneficiary";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import AddBeneficiary from "./components/addBeneficiary";
import EditBeneficiary from "./components/editBeneficiary";
import RemoveBeneficiary from "./components/removeBeneficiary";
/*
 */
const App: React.FC = () => {
	return (
		<FluentProvider theme={webLightTheme}>
			<Provider store={store}>
				<Router basename='/EnableStarPOC'>
					<div className='App'>
						<Routes>
							<Route path='/add' Component={AddBeneficiary} />
							<Route path='/edit/:beneficiaryId' Component={EditBeneficiary} />
							<Route
								path='/remove/:beneficiaryId'
								Component={RemoveBeneficiary}
							/>
							<Route path='/EnableStarPOC' Component={ListBeneficiary} />
						</Routes>
					</div>
				</Router>
			</Provider>
		</FluentProvider>
	);
};

export default App;
