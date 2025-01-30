var HubEventAttendanceType;
(function (HubEventAttendanceType) {
    HubEventAttendanceType["InPerson"] = "inPerson";
    HubEventAttendanceType["Online"] = "online";
    HubEventAttendanceType["Both"] = "both";
})(HubEventAttendanceType || (HubEventAttendanceType = {}));
var HubEventCapacityType;
(function (HubEventCapacityType) {
    HubEventCapacityType["Unlimited"] = "unlimited";
    HubEventCapacityType["Fixed"] = "fixed";
})(HubEventCapacityType || (HubEventCapacityType = {}));

export { HubEventAttendanceType as H, HubEventCapacityType as a };
