export interface MockData {
  item_code: number;
  material_code: string;
  legacy: string;
  short_discription: string;
  long_discription: LongDiscription;
  noun: string;
  modifier: string;
  status: boolean;
}

export enum LongDiscription {
  ErrorUndefinedMethodForNilNilClass = "error: undefined method `/' for nil:NilClass",
}

export interface PostCreateFieldData {
  id: string;
  dataType: string;
  identity?: string;
  fieldName: string;
  pattern?: string[];
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  extraField?: boolean;
  readable?: boolean;
  writable?: boolean;
  showAsColumn?: boolean;
  enums?: string[];
  required: boolean;
  dropDownValues?: Option[];
}

export interface usestatemailTemplateProps {
  ccText: string;
  toText: string;
  subject: string;
  body: string;
}

export interface FieldLabel {
  label?: string;
}

export interface Option {
  id?: string;
  value: string;
}

export type LogicStateObjFld = {
  name: string;
  selectField: string;
  logic: string;
  formulea: boolean;
  fieldName?: string;
};
export type PreviewFileUploadProps = {
  type: string;
  url: string;
  name?: string;
  fieldName?: string;
};
export type DynamicFormsProps = {
  id: number;
  formName: string;
};
