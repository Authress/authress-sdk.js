export interface Response<ResponseType> {
  /** Response data object on successful request */
  data: ResponseType;

  /** Response headers */
  headers: Record<string, string>;

  /** HTTP response status code for success responses */
  status: number;
}

/**
 *
 * @export
 * @interface Links
 */
export interface Links {
  /**
   *
   * @type {Link}
   * @memberof Links
   */
  self: Link;
}

/**
 * A url linking object that complies to application/links+json RFC. Either is an IANA approved link relation or has a custom rel specified.
 * @export
 * @interface Link
 */
export interface Link {
  /**
   * The absolute url pointing to the reference resource.
   * @type {string}
   * @memberof Link
   */
  href: string;
  /**
   * Optional property indicating the type of link if it is not a default IANA approved global link relation.
   * @type {string}
   * @memberof Link
   */
  rel?: string;
}

/**
 *
 * @export
 * @interface CollectionLinks
 */
export interface CollectionLinks {
  /**
   *
   * @type {Link}
   * @memberof CollectionLinks
   */
  self: Link;
  /**
   *
   * @type {Link}
   * @memberof CollectionLinks
   */
  next?: Link;
}

/**
 *
 * @export
 * @interface IPaginated<CollectionType>
 */
// @ts-ignore
export interface IPaginated<CollectionType> {
  /**
   *
   * @type {CollectionLinks}
   * @memberof IPaginated<CollectionType>
   */
  links: CollectionLinks;

  /**
   * @type {Pagination}
   * @memberof IPaginated<CollectionType>
   * @summary returns the next page of the collection
   */
  pagination?: Pagination;
}

/**
 *
 * @export
 * @interface Pagination
 */
export interface Pagination {
  /**
   *
   * @type {PageMetadata}
   * @memberof Pagination
   */
  next?: PageMetadata;
 }

/**
 *
 * @export
 * @interface PageMetadata
 */
export interface PageMetadata {
  /**
   *
   * @type {Cursor}
   * @memberof PageMetadata
   */
  cursor: Cursor;
}

export type Cursor = string;
