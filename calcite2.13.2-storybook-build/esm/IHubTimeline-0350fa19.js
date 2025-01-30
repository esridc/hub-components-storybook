var TIMELINE_STAGE_STATUSES;
(function (TIMELINE_STAGE_STATUSES) {
    TIMELINE_STAGE_STATUSES["notStarted"] = "notStarted";
    TIMELINE_STAGE_STATUSES["inProgress"] = "inProgress";
    TIMELINE_STAGE_STATUSES["skipped"] = "skipped";
    TIMELINE_STAGE_STATUSES["onHold"] = "onHold";
    TIMELINE_STAGE_STATUSES["complete"] = "complete";
})(TIMELINE_STAGE_STATUSES || (TIMELINE_STAGE_STATUSES = {}));

export { TIMELINE_STAGE_STATUSES as T };
