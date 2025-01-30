import { resultToCardModel } from "../../../utils/cardModelConverters";
export const getViewModel = (model, layout, opts, callback, context, intl) => {
  // Convert the entity or result to a card model
  let viewModel = resultToCardModel(model, layout, context, intl, opts);
  // If there is a callback, call it
  if (callback) {
    try {
      viewModel = callback(viewModel, layout, context, model);
    }
    catch (error) {
      // Just log it out but do not throw
      console.error(`getViewModel callback error: ${error}`);
    }
  }
  // return the model
  return viewModel;
};
