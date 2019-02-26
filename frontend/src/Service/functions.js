
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
