import { IArcGISContext, IFilter, IHubInitiative } from "@esri/hub-common";
/** mock initiative to render in the view */
export declare const MOCK_ENTITY: IHubInitiative;
/** mock results from hubSearch */
export declare const RESULTS: {
  results: {
    links: {
      siteRelative: string;
    };
  }[];
};
/** mock query for finding associated projects */
export declare const MOCK_ASSOC_PROJECTS_QUERY: {
  filters: IFilter[];
  targetEntity: "item" | "event" | "group" | "user" | "portalUser" | "communityUser" | "groupMember" | "channel" | "discussionPost" | "eventAttendee";
};
export declare const MOCK_INITIATIVE_QUERY: {
  filters: {
    predicates: {
      id: string;
    }[];
  }[];
  targetEntity: "item" | "event" | "group" | "user" | "portalUser" | "communityUser" | "groupMember" | "channel" | "discussionPost" | "eventAttendee";
};
export declare const MOCK_CONTEXT: IArcGISContext;
