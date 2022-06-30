<template>
  <div class="select-field">
    <van-field
      ref="fieldRef"
      :name="fieldProp"
      readonly
      :clickable="!field.disabled"
      :value="field.fieldValueDesc"
      :label="field.label"
      :placeholder="field.placeholder || '请选择'"
      :class="{'field-label-top': labelPosition === 'top'}"
      :required="field.required"
      :rules="field.rules"
      :disabled="field.disabled"
      @click="field.readonly ? () => {} : showPicker = true"
    >
      <template #right-icon>
        <xin-icon class="right-icon" xin-type="xiangshang"/>
      </template>
    </van-field>

    <van-action-sheet v-model="showPicker" title="请选择">
      <van-radio-group v-model="selectItem">
        <template v-for="item in field.dataSource">
          <van-radio
            :name="item.value"
            @click="handleClickRadio($event,item)"
          >
            {{item.key}}
          </van-radio>
        </template>
      </van-radio-group>
    </van-action-sheet>
  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, Ref} from "vue-property-decorator";

@Component({
  name: 'SelectField'
})
export default class SelectField extends Vue{
  @Ref('') readonly fieldRef!: any

  @Prop({default: () => []})
  field!: any

  @Prop({default: ""})
  fieldProp!: string;

  //label位置
  @Prop({default: ''})
  labelPosition!: string

  showPicker = false;
  selectValue = '';
  selectItem = 0;

  created(){
    const target = this.field.dataSource.filter((i: any) => i.value == this.field.fieldValue)[0];
    this.selectItem = target ? target.value : '';
    this.field.fieldValueDesc = target ? target.key : '';
  }

  handleClickRadio($event: any, item: any){
    this.field.fieldValueDesc = item.key;
    this.field.fieldValue = item.value;
    this.showPicker = false;
  }

}
</script>

<style scoped lang="scss">
.select-field{
  .van-action-sheet__content{
    padding: 16px;
    height: 300px;
    .van-radio{
      padding: 8px 0;
      &:first-child{
        padding-top: 0;
      }
      &:last-child{
        padding-bottom: 0;
      }
    }
  }
}

</style>
