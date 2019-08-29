import PropTypes from "prop-types";

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			products: [],
			warehouses: [],
			sales: [],
			purchases: [],
			purchasesList: []
		},

		actions: {
			addToProducts: object => {
				console.log(object);
				fetch("https://imsapiproject.herokuapp.com/products/all", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(object)
				})
					.then(response => {
						if (response.status == 200) return response.json;
						else console.error("BAD RESPONSE code: " + response.status);
					})
					.then(response => {
						setStore({ products: response }); // OJO, OBJECT ASSIGN IS ALREADY ON APPCONTEXBOILER PLATE
					})
					.catch(function(error) {
						console.error(error);
					});
			},
			products: () => {
				fetch("https://imsapiproject.herokuapp.com/products/all")
					.then(response => response.json())
					.then(data => {
						setStore({ products: data }); // OJO, OBJECT ASSIGN IS ALREADY ON APPCONTEXBOILER PLATE
					});
			},
			addToSales: object => {
				console.log(object);
				fetch("https://imsapiproject.herokuapp.com/sales/all", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(object)
				})
					.then(response => {
						if (response.status == 200) return response.json;
						else console.error("BAD RESPONSE code: " + response.status);
					})
					.then(response => {
						setStore({ sales: response }); // OJO, OBJECT ASSIGN IS ALREADY ON APPCONTEXBOILER PLATE
					})
					.catch(function(error) {
						console.error(error);
					});
			},
			sales: () => {
				fetch("https://imsapiproject.herokuapp.com/sales/all")
					.then(response => response.json())
					.then(data => {
						setStore({ sales: data }); // OJO, OBJECT ASSIGN IS ALREADY ON APPCONTEXBOILER PLATE
					});
			},
			addToPurchases: object => {
				console.log(object);
				fetch("https://imsapiproject.herokuapp.com/purchases/all", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(object)
				})
					.then(response => {
						if (response.status == 200) return response.json;
						else console.error("BAD RESPONSE code: " + response.status);
					})
					.then(response => {
						setStore({ tabla2: response }); // OJO, OBJECT ASSIGN IS ALREADY ON APPCONTEXBOILER PLATE
					})
					.catch(function(error) {
						console.error(error);
					});
			},
			purchases: () => {
				fetch("https://imsapiproject.herokuapp.com/purchases/all")
					.then(response => response.json())
					.then(data => {
						setStore({ purchases: data }); // OJO, OBJECT ASSIGN IS ALREADY ON APPCONTEXBOILER PLATE
					});
			},
			purchasesList: () => {
				fetch("https://imsapiproject.herokuapp.com/purchases/all")
					.then(response => response.json())
					.then(data => {
						setStore({ tabla1: purchases }); // OJO, OBJECT ASSIGN IS ALREADY ON APPCONTEXBOILER PLATE
					});
			},
			salesList: () => {
				fetch("https://imsapiproject.herokuapp.com/sales/all")
					.then(response => response.json())
					.then(data => {
						setStore({ tabla1: purchases }); // OJO, OBJECT ASSIGN IS ALREADY ON APPCONTEXBOILER PLATE
					});
			},

			scanNewCode: (order, scan, quantity) => {
				let store = getStore();
				let num = store.purchases.length;
				let input1 = document.querySelector("#input1");
				input1.value = "";
				let input2 = document.querySelector("#input2");
				input2.value = "";
				let input3 = document.querySelector("#input3");
				input3.value = "";

				console.log("scan: " + num);
				setStore({
					purchases: store.purchases.concat({
						order: order,
						title: `Item ${num + 1}`,
						sku: scan,
						description: "Product description",
						quantity: quantity
					})
				});
			},

			orderNewCode: (order, scan, quantity) => {
				let store = getStore();
				let num = store.purchases.length;
				let input1 = document.querySelector("#input1");
				input1.value = "";
				let input2 = document.querySelector("#input2");
				input2.value = "";
				let input3 = document.querySelector("#input3");
				input3.value = "";

				console.log("scan: " + num);
				setStore({
					sales: store.sales.concat({
						order: order,
						title: `Item ${num + 1}`,
						sku: scan,
						description: "Product description",
						quantity: quantity
					})
				});
			},
			logout: () => {
				const store = getStore();
				setStore({ token: null });
			},
			login: (usernameParameter, passwordParameter, props) => {
				fetch("https://imsapiproject.herokuapp.com/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},

					body: JSON.stringify({
						username: usernameParameter,
						password: passwordParameter
					})
				})
					.then(resp => {
						if (!resp.ok) throw Error();
						return resp.json();
					})
					.then(tokenRecieved => {
						setStore({ token: tokenRecieved.jwt });
						props.history.push("/private/dashboard");
					})
					.catch(err => console.error(err));
			},

			scanNewQty: qty => {
				let store = getStore();
				let num = store.purchases.length;

				console.log("qty: " + num);
				setStore({
					purchases: store.purchases.concat({
						title: `Item ${num + 1}`,
						sku: qty,
						description: "wow almost leaving",
						quantity: 4889
					})
				});
			}
		}
	};
};

getState.propTypes = {
	history: PropTypes.object
};

export default getState;
