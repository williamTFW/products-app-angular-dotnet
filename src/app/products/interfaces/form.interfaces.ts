export interface IFormField {
  element: string;
  name: string;
  type?: string;
  placeholder?: string;
}

export interface IBtnAtt {
  type: string;
  text: string;
  stile: string;
  entity?: string;
}

export interface IUrlForm {
  add: string;
  list: string;
}
