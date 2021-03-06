import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.scss";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import PropTypes from "prop-types";

export class MapContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					return (
						<Map
							google={this.props.google}
							zoom={15}
							style={{ width: "250px", height: "290px" }}
							initialCenter={{ lat: this.props.lat, lng: this.props.lng }}>
							<Marker position={{ lat: this.props.lat, lng: this.props.lng }} name={"Current location"} />
						</Map>
					);
				}}
			</Context.Consumer>
		);
	}
}

MapContainer.propTypes = {
	google: PropTypes.node,
	lat: PropTypes.number,
	lng: PropTypes.number
};
export default GoogleApiWrapper({
	apiKey: "AIzaSyDvjTJltCmANem-Wbxwmuy0gllfS-drXwM"
})(MapContainer);
