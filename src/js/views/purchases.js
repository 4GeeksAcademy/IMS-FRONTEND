import React from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export class Purchases extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			order: "",
			scan: "",
			quantity: "",
			warehouse: 1
		};
	}
	componentDidMount() {
		this.nameInput.focus();
	}
	render() {
		return (
			<div className="row">
				<div className="col-10 mx-auto">
					<div className="text-center font">
						<h1>Purchases</h1>
					</div>
					<Context.Consumer>
						{({ store, actions }) => {
							return (
								<React.Fragment>
									<div className="row">
										<div className="col-3">August 15, 2019</div>
									</div>

									<div className="row">
										<div className="col-3">
											<input
												ref={input => {
													this.nameInput = input;
												}}
												id="input1"
												placeholder="Enter order number:"
												className="mb-2 border w-100"
												onChange={e => this.setState({ order: e.target.value })}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-3">
											<input
												id="input2"
												placeholder="Scan Barcode..."
												className="mb-2 border w-100"
												onChange={e => this.setState({ scan: e.target.value })}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-3">
											<input
												id="input3"
												placeholder="Enter Quantity..."
												className="mb-3 border w-100"
												onChange={e => this.setState({ quantity: e.target.value })}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-3">
											<label className="text-white" htmlFor="exampleFormControlSelect1">
												Available Warehouses
											</label>
											<select
												onChange={e => this.setState({ warehouse: e.target.value })}
												className="form-control col-sm-4"
												id="exampleFormControlSelect1">
												<option>1</option>
												<option>2</option>
												<option>3</option>
											</select>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-4 ">
											<button
												onClick={() => {
													this.nameInput.focus();
													actions.addANewPurchase(
														this.state.order,
														this.state.scan,
														this.state.quantity,
														this.state.warehouse
													);
												}}
												className="btn btn-info m-0">
												Add
											</button>
											<button
												onClick={() => {
													actions.submitNewPurchases();
												}}
												className="btn btn-success m-1">
												Submit
											</button>
										</div>
									</div>
								</React.Fragment>
							);
						}}
					</Context.Consumer>
					<table className="table table-bordered tableborder">
						<thead>
							<tr>
								<th scope="col">ID Number</th>
								<th scope="col">SKU</th>
								<th scope="col">Description</th>
								<th scope="col">Quantity</th>
								<th scope="col">Date</th>
								<th scope="col">Order Number</th>
								<th scope="col">{/*space for x's*/}</th>
							</tr>
						</thead>
						<tbody>
							<Context.Consumer>
								{({ store, actions }) => {
									return store.purchasesList.map((item, index) => {
										return (
											<tr key={index}>
												<td scope="row">{index + 1}</td>
												<td>{item.sku}</td>
												<td>{item.description}</td>
												<td>{item.quantity}</td>
												<td>08/27/2019</td>
												<td>{item.order}</td>
												<td>
													<i className="far fa-times-circle fa-2x pt-2 pl-1 text-danger" />
												</td>
											</tr>
										);
									});
								}}
							</Context.Consumer>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
