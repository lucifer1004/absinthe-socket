/* eslint-disable @typescript-eslint/no-explicit-any */
import { Channel, Socket as PhoenixSocket } from "phoenix";

export enum RequestStatus {
  Canceled = "canceled",
  Canceling = "canceling",
  Pending = "pending",
  Sent = "sent",
  Sending = "sending",
}

export enum GqlOperationType {
  Mutation = "mutation",
  Query = "query",
  Subscription = "subscription",
}

export interface GqlErrorLocation {
  line: number;
  column: number;
}

export interface GqlError {
  message: string;
  locations?: Array<GqlErrorLocation>;
}

export interface GqlRequest<Variables = void> {
  operation: string;
  variables?: Variables;
}

export interface GqlRequestCompat<Variables = void> {
  query: string;
  variables?: Variables;
}

export interface GqlResponse<Data> {
  data?: Data;
  errors?: Array<GqlError>;
}

export interface Notifier<Result, Variables = void> {
  readonly activeObservers: Array<Observer<Result, Variables>>;
  readonly canceledObservers: Array<Observer<Result, Variables>>;
  isActive: boolean;
  operationType: GqlOperationType;
  request: GqlRequest<Variables>;
  requestStatus: RequestStatus;
  subscriptionId?: string;
}

export interface Observer<Result, Variables = void> {
  onAbort?: (error: Error) => any;
  onCancel?: () => any;
  onError?: (error: Error) => any;
  onStart?: (notifier: Notifier<Result, Variables>) => any;
  onResult?: (result: Result) => any;
}

export interface AbsintheSocket {
  channel: Channel;
  channelJoinCreated: boolean;
  notifiers: Array<Notifier<any>>;
  phoenixSocket: PhoenixSocket;
}

export interface PushHandler<Response extends object> {
  onError: (errorMessage: string) => any;
  onSucceed: (response: Response) => any;
  onTimeout: () => any;
}

export interface NotifierPushHandler<Response extends object> {
  onError: (
    absintheSocket: AbsintheSocket,
    notifier: Notifier<any, any>,
    errorMessage: string,
  ) => any;
  onSucceed: (
    absintheSocket: AbsintheSocket,
    notifier: Notifier<any, any>,
    response: Response,
  ) => any;
  onTimeout: (
    absintheSocket: AbsintheSocket,
    notifier: Notifier<any, any>,
  ) => any;
}
