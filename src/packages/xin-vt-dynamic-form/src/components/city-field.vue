<template>
  <div class="city-field">
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

    <van-popup v-model="showPicker" position="bottom">
      <van-cascader
        v-model="field.fieldValue"
        title="请选择所在地区"
        :field-names="fieldNames"
        :options="cities"
        @close="showPicker = false"
        @finish="onFinish"
      />
    </van-popup>
  </div>

</template>

<script lang="ts">
import {Vue, Component, Prop, Watch, Mixins, Ref} from "vue-property-decorator";

@Component({
  name: 'CityField'
})
export default class CityField extends Vue{
  @Ref('') readonly fieldRef!: any

  @Prop({default: () => []})
  field!: any

  @Prop({default: ""})
  fieldProp!: string;

  //label位置
  @Prop({default: ''})
  labelPosition!: string


  @Watch('field', {immediate: true, deep: true})
  watchField(newVal: any){
    //回填值
    this.handlerGetParentsId(newVal.fieldValue)
  }

  //选项的字段名称
  fieldNames = {
    text: 'name',
    value: 'value',
    children: 'children',
  }
  showPicker = false;
  //城市
  cities: any = [];
  //选择的值的描述
  selectValue = '';
  //当前选择的城市
  curCity: any = [];

  created() {
    this.handlerGetCity();
  }

  handlerGetCity(){
    this.$http.get('/support/ajax-get-area-tree').then((reply: any) =>{
      const res: any = reply.data;
      if(!res.status) return
      this.handlerFormatCityData(res.data)
    })
  }

  handlerFormatCityData(cityInfo: any){
    this.cities = cityInfo
    //只能选到市
    if(!this.field.hasCounty){
      this.cities.forEach((province: any)=>{
        province.children.forEach((city: any)=>{
          Reflect.deleteProperty(city, 'children')
        })
      })
    }
  }

  // 通过id，递归找到父级的id
  handlerGetParentsId(id: string|number){
    this.cities.find((item: any)=>{
      return this.getParentId(item, +id)
    })
  }

  // 递归
  getParentId(city: any, id: string|number){
    if(city.value == id) {
      this.curCity.unshift(city)
      return true
    } else if(city.children && city.children.length){
      if (city.children.find((item: any) => this.getParentId(item, id))){
        this.curCity.unshift(city)
        return true
      }
    }
  }

  onFinish({ selectedOptions }: any) {
    this.showPicker = false;
    this.field.fieldValueDesc = selectedOptions.map((option: any) => option.name).join('/');
  }

}
</script>

<style scoped lang="scss">
</style>
