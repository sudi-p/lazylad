import React, { Component } from "react";
import { StoreState } from "../../constants/StoreState";
import { Card } from "antd";
import "../styles/DeliveryHistory.module.css";

class DeliveryHistoryView extends Component {
	render() {
		if (this.props.status === StoreState.READY) {
			const delivered_weeklyorders_list = this.props
				.delivered_weeklyorders_list;
			const delivered_weeklyorders_list_view = delivered_weeklyorders_list.map(
				delivered_weeklyorder => {
					const menu_items_view = delivered_weeklyorder
						.get("menu_items")
						.map(menu_item => {
							if (menu_item.get("selected")) {
								return (
									<DishCard
										key={menu_item.get("id")}
										image_url={menu_item.get("image_url")}
										dish_name={menu_item.get("dish_name")}
										description={menu_item.get("description")}
									/>
								);
							} else {
								return null;
							}
						});
					let months = [
						"January",
						"February",
						"March",
						"April",
						"May",
						"June",
						"July",
						"August",
						"September",
						"October",
						"November",
						"December"
					];
					let delivered_weeklyorder_date = delivered_weeklyorder.get(
						"week_start_date"
					);
					let year = delivered_weeklyorder_date.slice(0, 4);
					let month = delivered_weeklyorder_date.slice(5, 7);
					let date = delivered_weeklyorder_date.slice(8, 10);
					month = months[parseInt(month, 10) - 1];
					return (
						<div
							className="delivery-history"
							key={delivered_weeklyorder.get("id")}
						>
							<h2 className="week">
								{month} {date}, {year}
							</h2>
							<div className="order">Order Total: $59.94</div>
							<div className="menu-items">{menu_items_view}</div>
						</div>
					);
				}
			);
			return <div>{delivered_weeklyorders_list_view}</div>;
		} else {
			return (
				<div className="delivery-history">
					You don't have any delivered history.
				</div>
			);
		}
	}
}

const DishCard = props => {
	const image_url = props.image_url;
	const dish_name = props.dish_name;
	const description = props.description;
	const card_cover = {
		backgroundImage: "url(" + image_url + ")"
	};
	return (
		<Card hoverable className="dish_card">
			<div style={card_cover} className="card-cover" />
			<div className="text-wrapper">
				<div className="dish">{dish_name}</div>
				<div className="description-wrapper">{description}</div>
			</div>
		</Card>
	);
};

export default DeliveryHistoryView;
