
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

export function convertIntToData(timeTime) {

    const multipliedDateTime = new Date(timeTime * 1000);
    const motht = (multipliedDateTime.getMonth() + 1) < 10 ? "0" + (multipliedDateTime.getMonth() + 1) : (multipliedDateTime.getMonth() + 1);
    const dateTimeString = "" + multipliedDateTime.getDate() + "." + motht
          + "." + multipliedDateTime.getFullYear() + " " + multipliedDateTime.getHours() + ":" +  multipliedDateTime.getMinutes();
    return dateTimeString;
    
};
