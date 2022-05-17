export interface Response<ResponseType> {
  /** Response data object on successful request */
  data: ResponseType;

  /** Response headers */
  headers: Record<string, string>;

  /** HTTP response status code for success responses */
  status: number;
}
