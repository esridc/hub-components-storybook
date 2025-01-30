import { HUB_RELEASE } from '../utils/hub-release';
export default function HubRelease(status: HUB_RELEASE): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
