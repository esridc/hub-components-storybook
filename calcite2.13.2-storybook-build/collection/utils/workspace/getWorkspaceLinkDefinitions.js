import { ContentWorkspaceLinks, DiscussionWorkspaceLinks, SurveyWorkspaceLinks, GroupWorkspaceLinks, InitiativeTemplateWorkspaceLinks, InitiativeWorkspaceLinks, PageWorkspaceLinks, ProjectWorkspaceLinks, SiteWorkspaceLinks, TemplateWorkspaceLinks, EventWorkspaceLinks, UserWorkspaceLinks } from './entityLinks';
/**
 * returns the workspace link definitions based on the entity type
 */
export function getWorkspaceLinkDefinitions(entityType) {
  const entityTypeToWorkspaceLinksDefinition = {
    project: ProjectWorkspaceLinks,
    initiative: InitiativeWorkspaceLinks,
    site: SiteWorkspaceLinks,
    discussion: DiscussionWorkspaceLinks,
    content: ContentWorkspaceLinks,
    page: PageWorkspaceLinks,
    template: TemplateWorkspaceLinks,
    group: GroupWorkspaceLinks,
    initiativeTemplate: InitiativeTemplateWorkspaceLinks,
    survey: SurveyWorkspaceLinks,
    event: EventWorkspaceLinks,
    user: UserWorkspaceLinks
  };
  return entityTypeToWorkspaceLinksDefinition[entityType] || [];
}
