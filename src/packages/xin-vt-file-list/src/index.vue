<template>
  <div class="van-file-list">
    <div class="file-list-item" v-for="(file,index) in files" :key="file.id">
      <xin-icon class="f_s30" :xin-type=" 'icon_'+file.type.toUpperCase() || 'NO' " />
      <div class="file-info p_l20">
        <!-- 文件名、删除操作 -->
        <div class="flex-between">
          <span class="file-name" @click="handlePreviewFile(file)">{{file.name}}</span>
        </div>
      </div>
    </div>
    <!-- 文件预览 -->
    <XinVtFilePreview ref="vanFilePreviewRef"/>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Ref} from "vue-property-decorator";
import XinVtFilePreview from "../../xin-vt-file-preview/index";

//@ts-ignore
const vant = window.vant;
@Component({
  name: 'XinVtFileList',
  components:{
    XinVtFilePreview
  }
})
export default class XinVtFileList extends Vue{
  @Ref('') readonly vanFilePreviewRef!: any

  @Prop({default: ()=> []})
  files!: any

  @Prop({default: false })
  isUploadList!: boolean


  //预览文件
  handlePreviewFile(file: any){
    if (!file.url) {return}
    if (['zip', 'rar'].includes(file.type)) {
      return vant.Toast('暂不支持下载，请前往电脑或app端下载')
    }
    this.vanFilePreviewRef.previewFile(file);
  }


}
</script>

<style scoped lang="scss">
.van-file-list{
  .file-list-item{
    height: 67px;
    border-top: 1px solid #F8F8F8;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &:first-child{
      border-top:none;
    }
    .file-info {
      width: calc(100% - 72px);
      .file-name {
        flex:1;
        margin-right: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

</style>
