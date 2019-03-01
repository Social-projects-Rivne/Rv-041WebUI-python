import { format, formatDistance, subDays } from  "date-fns";

export function GetCurrentRouteLocation(CurrentPath, ParentPath) {
    let currentRouteLocation = CurrentPath.replace(ParentPath, "");
    currentRouteLocation = currentRouteLocation.replace("/", "");
    return (currentRouteLocation.trim());
};

export function AddAllCategory(statuses) {
    //add default "All" status Tab to tab statuses array (to the beginning)
    if (!statuses.includes("")) {
        statuses = [""].concat(statuses);
    };
    return statuses;
};

export function convertIntToDate(dateTime) {

	if (!dateTime) {
		return "--.--.---- : --:--";
	}

	let orderDate = dateTime;
	const now = new Date();

	orderDate = orderDate === null ? new Date() : orderDate;

	const motht = (orderDate.getMonth() + 1) < 10 ? "0" + (orderDate.getMonth() + 1) : (orderDate.getMonth() + 1);
	const date = orderDate.getDate() < 10 ? "0" + orderDate.getDate() : orderDate.getDate();
	const hours = orderDate.getHours() < 10 ? "0" + orderDate.getHours() : orderDate.getHours();
	const minutes = orderDate.getMinutes() < 10 ? "0" + orderDate.getMinutes() : orderDate.getMinutes();

	let result;

	if (now.getFullYear() === orderDate.getFullYear() && (now.getMonth() === orderDate.getMonth())) {
		const dateDifference = orderDate.getDate() - now.getDate();
		if (dateDifference === 0) {
			result = "Today at";
		} else if (dateDifference === 1) {
			result = "Tomorrow at";
		} else if (dateDifference === -1) {
			result = "Yesterday at";
		} else {
			result = "" + date + "." + motht
				+ "." + orderDate.getFullYear();
		}
	}

	result += " " + hours + ":" + minutes;

	return result;
    
};

export function makeDate(dateTime, variant = "simple european date with time") {

	if (!dateTime) {
		return "--.--.---- : --:--";
	}

	if (typeof(dateTime) === "number") {
		dateTime = dateTime*1000;
	}
	else if (typeof(dateTime) === "string") {
		dateTime = Date.parse(dateTime);
	}
	
	let result = "";
	switch (variant) {
		case ("simple european date with time"):
			result = format(dateTime, 'dd.MM.yyyy HH:mm');
			//result = formatDistance(subDays(new Date(), 1), dateTime);
			break;
		case ("simple european date"):
			result = format(dateTime, 'dd.MM.yyyy');
			break;
		default:
			result = "";
			break;
	}
	
	return result;
    
};

