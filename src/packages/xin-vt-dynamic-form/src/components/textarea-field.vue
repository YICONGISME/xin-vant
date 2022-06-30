<template>
  <van-field
    ref="fieldRef"
    :name="fieldProp"
    type="textarea"
    rows="1"
    autosize
    v-model="field.fieldValue"
    :placeholder="field.placeholder"
    :disabled="field.disabled"
    :readonly="field.readonly"
    :required="field.required"
    :label="field.label"
    :rules="field.rules"
    v-bind="field.componentAttr"
    @input="handleChange('input')"
    @blur="handleChange('blur')"
  />
</template>

<script lang="ts">
import {Vue, Component, Prop, Mixins, Ref} from "vue-property-decorator";

@Component({
  name: 'TextareaField'
})
export default class TextareaField extends Vue{
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
