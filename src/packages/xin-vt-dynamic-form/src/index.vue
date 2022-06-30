<template>
  <component
    :is="newField.type"
    :field="newField"
    v-bind="$attrs"
    :label-position="labelPosition"
    :class="{'field-label-top': labelPosition === 'top'}"
    :field-prop="fieldProp"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import InputField from "./components/input-field.vue";
import TextareaField from "./components/textarea-field.vue";
import NumberField from "./components/number-field.vue";
import DateField from "./components/date-field.vue";
import SelectField from "./components/select-field.vue";
import CityField from "./components/city-field.vue";
import ImgField from "./components/img-field.vue";
import FileField from "./components/file-field.vue";

import {TFieldItem} from "./index.types";
// import {VanBaseVerify, VanNumberVerify, VanStringVerify} from "@/module/external/utils/van-form-validator";

@Component({
  name: 'XinVtDynamicForm',
  components:{
    InputField,
    TextareaField,
    NumberField,
    DateField,
    SelectField,
    CityField,
    ImgField,
    FileField
  }
})
export default class XinVtDynamicForm extends Vue{

  @Prop({default: () => []})
  field!: any

  //表单校验字段标识
  @Prop({default: ""})
  fieldProp!: string;

  //label位置
  @Prop({default: ''})
  labelPosition!: string

  @Watch('field', { immediate: true })
  watchFieldChange(val: TFieldItem) {
    this.newField = val;
    this.newField.rules = this.setFieldRule();
  }

  newField: any = {};


  setFieldRule(){
    // let rules: any[] = this.newField.rules;
    // //必填
    // if (this.newField.required) {
    //   rules.unshift(...VanBaseVerify.vRequired());
    // }
    // const {maxlength, decimalDigits} = this.newField;
    //
    // if (maxlength) {
    //   if (['InputField','TextareaField'].includes(this.newField.type)) {
    //     rules = rules.concat(VanStringVerify.vTextNum({
    //       min: 0,
    //       max: maxlength
    //     }))
    //   }
    // }
    //
    // if(['NumberField'].includes(this.newField.type)){
    //   if (decimalDigits === 0) {
    //     rules = rules.concat(VanNumberVerify.vNumIntRangeCustom({ minVal: 0, maxVal: 100000000 }))
    //   } else {
    //     rules = rules.concat(VanNumberVerify.vCustomFloatNumRange({bit: decimalDigits}))
    //   }
    // }
    //
    // //文件和图片上传
    // if (['ImgField', 'FileField'].includes(this.field.type)) {
    //   const validates = {
    //     message: '正在上传中',
    //     validator: (val: any) => {
    //       return this.field.hasUploading;
    //     }
    //   }
    //   rules = rules.concat(validates);
    // }
    //
    // return rules;
  }


}
</script>

<style scoped lang="scss">

::v-deep.van-field, .date-field, .select-field, .city-field{
  position: relative;
  &::after{
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 16px;
    left: 16px;
    bottom: 0;
    border-bottom: 1px solid #ebedf0;
    transform: scaleY(0.5);
  }
}
::v-deep.select-field, ::v-deep.date-field, ::v-deep.city-field{
  input[readonly=readonly], textarea[readonly=readonly]{
    color: #333333;
  }
  .right-icon{
    width: 8px;
    height: 8px;
    transform: rotate(90deg);
  }
}
::v-deep.van-field__control{
  color: #333333;
}
</style>
