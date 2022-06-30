
export interface TFieldItem {
  type: keyof ComType
  label: string
  name: string
  fieldValue: any
  required: boolean
  disabled: boolean
  placeholder: string
  maxLength: number
  dateType: string //选择日期形式
  format: string //日期格式化
  dataSource: {key: string, value: string}[]
  hasCounty: boolean //是否有县级城市
}

export enum ComType {
  InputField,
  TextareaField,
  DateField,
  SelectField,
  ImgField,
  FileField,
  CityField,
  NumberField
}
