import { EntityType, IArcGISContext } from "@esri/hub-common";
import { IPredicateConfig, PredicateProperty } from "../types";
import { ComponentIntl } from "../../../../../../../../utils/stencil-intl";
/**
 * returns the full predicate configuration for a given
 * predicate property
 *
 * NOTE: we will continue to add more predicate configs
 * here as we extend the predicate builder field
 *
 * @param {PredicateProperty} property predicate property
 * @param {EntityType} targetEntity type of entity the predicate is targeting
 * @param {IArcGISContext} context contextual portal & auth information
 */
export declare const getPredicateConfig: (property: PredicateProperty, targetEntity: EntityType, context: IArcGISContext, intl: ComponentIntl) => Promise<IPredicateConfig>;
