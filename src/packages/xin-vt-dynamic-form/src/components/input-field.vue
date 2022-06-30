<template>
  <van-field
    ref="fieldRef"
    :name="fieldProp"
    v-model="field.fieldValue"
    :placeholder="field.placeholder"
    :readonly="field.readonly"
    :disabled="field.disabled"
    :required="field.required"
    :label="field.label"
    :rules="field.rules"
    v-bind="field.componentAttr"
    :type="field.disabled ? 'textarea' : 'input'"
    :autosize="field.disabled"
    rows="1"
    @input="handleChange('input')"
    @blur="handleChange('blur')"
    @click="handleChange('click')"
  />
</template>

<script lang="ts">
import {Vue, Component, Prop, Ref} from "vue-property-decorator";

@Component({
  name: 'InputField'
})
export default class InputField extends Vue{
  @Ref('') readonly fieldRef!: any

  @Prop({default: () => []})
  field!: any

  @Prop({default: ""})
  fieldProp!: string;

  //label位置
  @Prop({default: ''})
  labelPosition!: string

  //change事件
  handleChange(type: string){
    this.field.change(type, this.field, this.fieldRef);
  }

}
</script>

<style scoped>

</style>
