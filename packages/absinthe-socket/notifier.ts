import { GqlOperationType, GqlRequest, Notifier, RequestStatus } from "./types";
import { getOperationType } from "./utils";

export const cancel = <Result, Variables>({
  activeObservers,
  canceledObservers,
  ...rest
}: Notifier<Result, Variables>): Notifier<Result, Variables> => ({
  ...rest,
  isActive: false,
  canceledObservers: [...canceledObservers, ...activeObservers],
  activeObservers: [],
});

const createUsing = <Variables>(
  request: GqlRequest<Variables>,
  operationType: GqlOperationType,
): Notifier<any, Variables> => ({
  operationType,
  request,
  activeObservers: [],
  canceledObservers: [],
  isActive: true,
  requestStatus: RequestStatus.Pending,
  subscriptionId: undefined,
});

export const create = <Variables>(
  request: GqlRequest<Variables>,
): Notifier<any, Variables> =>
  createUsing(request, getOperationType(request.operation));
