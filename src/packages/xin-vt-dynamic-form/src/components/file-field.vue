<template>
  <van-field
    ref="fieldRef"
    :name="fieldProp"
    :label="field.label"
    :required="field.required"
    :rules="field.rules"
  >
    <template #input>
      <XinVtFileUploader
        v-model="field.fieldValue"
        v-bind="field.componentAttr"
        :disabled="field.readonly"
        @onUpload="handleUpload"
      />
    </template>
  </van-field>
</template>

<script lang="ts">
import {Component, Mixins, Prop, Ref, Vue} from "vue-property-decorator";
import XinVtFileUploader from "../../../xin-vt-file-uploader/index";

@Component({
  name: 'FileField',
  components:{
    XinVtFileUploader
  }
})
export default class FileField extends Vue{
  @Ref('') readonly fieldRef!: any

  @Prop({default: () => []})
  field!: any

  @Prop({default: ""})
  fieldProp!: string;

  //label位置
  @Prop({default: ''})
  labelPosition!: string


  handleUpload(uploaded: boolean){
    this.field.hasUploading = uploaded;
  }

}
</script>

<style lang="scss" scoped>
::v-deep.van-file-uploader{
  flex: 1;
}
</style>
