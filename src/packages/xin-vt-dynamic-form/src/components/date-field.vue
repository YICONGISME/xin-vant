<template>
  <div class="date-field">
    <van-field
      ref="fieldRef"
      :name="fieldProp"
      readonly
      :clickable="!field.disabled"
      :value="field.fieldValue"
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

    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        :type="field.dateType"
        :formatter="formatter"
        :minDate="minDate"
        :maxDate="maxDate"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, Ref} from "vue-property-decorator";
import moment from "moment";

@Component({
  name: 'DateField'
})
export default class DateField extends Vue{
  @Ref('') readonly fieldRef!: any

  @Prop({default: () => []})
  field!: any

  @Prop({default: ""})
  fieldProp!: string;

  //label位置
  @Prop({default: ''})
  labelPosition!: string

  showPicker = false;
  minDate= new Date(1800, 0, 1);
  maxDate= new Date(2100, 0, 1);
  currentDate: any = new Date();

  formatType: any = {
    'date': 'YYYY/MM/DD',
    'datetime': 'YYYY/MM/DD HH:mm'
  }

  @Watch('field', {immediate: true, deep: true})
  watchField(newVal: any){
    this.currentDate = newVal.fieldValue ? new Date(newVal.fieldValue) : new Date();
  }

  formatter(type: string, val: string) {
    if (type === 'year') {
      return val + '年';
    }
    if (type === 'month') {
      return val + '月';
    }
    if (type === 'day') {
      return val + '日';
    }
    if (type === 'hour') {
      return val + '时';
    }
    if (type === 'minute') {
      return val + '分';
    }
    return val;
  }

  onConfirm(date: Date) {
    this.field.fieldValue = moment(date).format(this.field.dateFormat || this.formatType[this.field.fieldType])
    this.showPicker = false;
  }
}
</script>

<style scoped lang="scss">
</style>
