export interface Datum {
  id: number;
  stage_id: number;
  title: string;
  value: number;
  currency: string;
  add_time: string;
  update_time: string;
  stage_change_time?: any;
  active: boolean;
  deleted: boolean;
  status: string;
  visible_to: string;
  close_time: string;
  pipeline_id: number;
  won_time: string;
  first_won_time: string;
  participants_count: number;
  expected_close_date: string;
  person_name: string;
  org_name: string;
  weighted_value: number;
  owner_name: string;
  products_count: number;
}

export interface Pagination {
  start: number;
  limit: number;
  more_items_in_collection: boolean;
}

export interface AdditionalData {
  pagination: Pagination;
}

export interface IuserRecords {
  id: number;
  name: string;
  email: string;
  has_pic: number;
  pic_hash?: any;
  active_flag: boolean;
}

export interface User {
  [key: number]: Record<string, IuserRecords>;
}

export interface IorganizationRecord {
  id: number;
  name: string;
  people_count: number;
  owner_id: number;
  address?: any;
  active_flag: boolean;
  cc_email: string;
}

export interface Organization {
  [key: number]: Record<string, IorganizationRecord>;
}

export interface Email {
  value: string;
  primary: boolean;
}

export interface Phone {
  value: string;
  primary: boolean;
}

export interface IpersonRecord {
  active_flag: boolean;
  id: number;
  name: string;
  email: Email[];
  phone: Phone[];
}

export interface Person {
  [key: number]: Record<string, IpersonRecord>;
}

export interface RelatedObjects {
  user: User;
  organization: Organization;
  person: Person;
}

export interface IDeals {
  success: boolean;
  data: Datum[];
  additional_data: AdditionalData;
  related_objects: RelatedObjects;
}
