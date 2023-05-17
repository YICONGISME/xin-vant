<!--h5端文件预览-遮罩形式，防止返回时清空填写内容-->
<template>
  <div class="van-file-preview" v-if="isShow">
    <div ref="filePreContainerRef" class="van-file-preview__container" :class="previewData ? 'show-preview' : ''">
    <iframe id='preview-frame' ref="filePreviewRef" scrolling='no' frameBorder='0' style="width: 100%; height: 100%"/>
    <div ref="closePreviewBtn" class="van-file-preview__close" @click="handleClose">
      <xin-icon xin-type="close"/>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Ref, Prop} from "vue-property-decorator";
import {XinVantService} from "src/utils/xin-vant-service";

//@ts-ignore
const vant = window.vant;
const PREVIEW_ORIGIN = 'https://.com/pdfpreview/preview_v2.html'

@Component({
  name: 'XinVtFilePreview',
})
export default class XinVtFilePreview extends Vue{
  @Ref('') readonly filePreContainerRef!: any
  @Ref('') readonly filePreviewRef!: any
  @Ref('') readonly closePreviewBtn!: any

  //预览接口
  @Prop({default: '/ajax-preview-v2file'})
  previewUrl!: string

  previewData = null;
  isShow = false;

  /**
   * 文件预览
   * @param file
   */
  previewFile(file: any){
    this.isShow = true;
    if (!file.key) {
      return vant.Toast('文件不存在')
    }
    let fileName = file.url || file.name;
    let fileFormat = fileName && fileName.substr(fileName.lastIndexOf('.')+1).toLowerCase();
    // 图片类附件直接预览
    if(['jpg', 'png', 'bmp', 'jpeg'].includes(fileFormat)) {
      this.imgFilePreview(file)
    }else {
      //文档类附件
      // 防止重复点击导致添加多次预览结构
      const previewDom = document.body.querySelector('.van-file-preview')
      if (previewDom) { return }
      document.body.appendChild(this.$el);
      // 调用接口获取预览文件数据
      this.openPreview(file)
    }
  }


  /**
   * 文件预览
   * @param file
   * @param cb
   */
  openPreview(file: any, cb?: Function){
    const t = this;
    let targetOrigin = PREVIEW_ORIGIN;
    // 轮询成功之后的打开预览
    const successPreviewCb = (preFile: any) => {
      XinVantService.post(
        this.previewUrl,
        { key: preFile.pdfKey || preFile.key }
      ).then((res: any)=>{
        if(!res.status){
          vant.Toast(res.message)
          return
        }
        const xhr = new XMLHttpRequest();
        xhr.open('GET', targetOrigin);
        xhr.responseType = 'blob';
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            // 设置预览数据
            t.previewData = res.data;
            t.getFile(res.data.accessToken, res.data.previewUrl)
            cb && cb()
          }
        }
        xhr.send()
      })
    }

    // 其他格式直接调用新版接口预览
    successPreviewCb(file)
  }

  getFile(accessToken: string, preUrl: string) {
    const t: any = this;
    const iframe = this.filePreviewRef;
    iframe.src = PREVIEW_ORIGIN;
    iframe.height = window.innerHeight;
    iframe.onload = function(e: any){
      iframe.contentWindow.postMessage({
        XRXS: true,
        previewUrl: preUrl || '',
        accessToken: accessToken || '',
        downloadUrl: t.previewData.downloadUrl || '',
        fileName: t.previewData.fileName || true,
      }, '*');
    }
  }


  /**
   * 图片预览
   * @param file
   */
  imgFilePreview(file: any){
    vant.ImagePreview([file.url])
  }

  handleClose(){
    this.previewData = null;
    this.isShow = false;
    const container = this.filePreContainerRef
    container && container.classList.remove('show-preview')
    // 关闭动画结束后移除预览 DOM
    setTimeout(() => {
      document.body.removeChild(this.$el)
    }, 1000)
  }
}
</script>

<style lang="scss">
.van-file-preview{
  &__container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 100vw;
    z-index: 9999;
    background-color: #FFFFFF;
    transition: left .6s ease-in-out;
    &.show-preview {
      left: 0;
    }
  }
  &__close{
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 10000;
    left: 40px;
    top: 0px;
    bottom: 16px;
    height: 40px;
    width: 25px;
  }
}
</style>
