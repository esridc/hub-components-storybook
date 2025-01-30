import { AddExistingMachine } from './add-existing-machine';
import { CreateNewMachine } from './create-new-machine';
import { NotImplementedMachine } from './not-implemented-machine';
export async function initMachine(workflowConfig, context, options) {
  switch (workflowConfig.workflow) {
    case 'existing':
      return new AddExistingMachine(workflowConfig, context, options);
    case 'create':
      return new CreateNewMachine(workflowConfig, context, options);
    default:
      return new NotImplementedMachine(null, context, options);
  }
}
