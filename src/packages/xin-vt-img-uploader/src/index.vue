<template>
  <div class="van-img-uploader">
    <div class="van-img-uploader__wrapper">
      <div class="van-img-uploader__preview" v-for="(file, index) in files" @click="previewImg(index)">
        <div class="van-img-uploader__preview-image">
          <img :src="file.url || file.content"/>
        </div>
        <div class="van-img-uploader__preview-mask" v-if="progress[file.id] < 100">
          {{progress[file.id]}}%
        </div>
        <div v-if="!disabled" class="van-img-uploader__preview-delete" @click.stop="handleDeleteImg(file, index)">
          <xin-icon xin-type="icon_delete_standard"/>
        </div>
      </div>

      <van-uploader
        v-if="files.length < maxNum && !disabled"
        ref="vanFileUploaderRef"
        :multiple="multiple"
        accept="image/*"
        :preview-image="false"
        :before-read="beforeRead"
        :after-read="afterRead"
        upload-text="上传图片"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Model, Prop, Watch, Vue} from "vue-property-decorator";

//@ts-ignore
const vant = window.vant;
@Component({
  name: 'VanImgUploader',
})
export default class XinVtImgUploader extends Vue{

  @Prop({default: ''})
  uploadUrl!: string

  @Prop({default: () => []})
  fileTypes!: any

  @Prop({default: 1})
  maxNum!: any

  @Prop({default: 5})
  maxSize!: any

  @Prop({default: false})
  multiple!: boolean

  @Prop({default: false})
  disabled!: boolean

  @Model("change", {
    default: () => {
      //@ts-ignore
      return this.multiple ? [] : {};
    }
  })
  defaultFiles!: any;

  @Watch('defaultFiles',{deep: true, immediate: true})
  watchDefaultFiles(newVal: any){
    this.files = newVal;
    if (Array.isArray(newVal)) {
      this.files = newVal;
    } else {
      this.files = Object.keys(newVal).length ? [newVal] : [];
    }
  }

  //上传的文件列表
  files: any = [];
  //上传进度
  progress: any = {};
  //上传失败
  errors: any = {};

  //读取前的校验
  beforeRead(files: any){
    const rawFiles = files instanceof Array ? files : [files];
    return this.checkSelectedFiles(rawFiles);
  }

  /**
   * 检查选中文件数量和大小
   */
  checkSelectedFiles(sFiles: any[]){
    // 校验文件数量
    if (sFiles.length + this.files.length > this.maxNum) {
      vant.Toast('图片总数已超过最大限制')
      return false
    }
    // 校验文件大小
    if (sFiles.some(f => f.size > this.maxSize * 1024 * 1024)) {
      vant.Toast(`图片过大，最大允许的单个图片大小为${this.maxSize}M`)
      return false
    }

    // 校验文件类型
    let invalidType = '';
    const hasInvalidType = sFiles.some(f => {
      invalidType = f.type?.split('/')[1].toUpperCase()
      return f.type && !this.fileTypes?.includes(invalidType);
    });
    if (hasInvalidType) {
      vant.Toast(`暂不支持上传 ${invalidType} 格式图片`)
      return false
    }
    return true
  }

  //文件读取完成，上传到服务器
  afterRead(data: any){
    const rawData = data instanceof Array ? data : [data];
    const rawFiles = rawData.map((item: any, index: number) => {
      return {
        id: String(new Date().getTime()) + index, //唯一id
        content: item.content, //图片内容
        file: item.file,//图片详细信息
      }
    })
    this.uploadFiles(rawFiles);
  }

  //删除图片
  handleDeleteImg(file: any, index: number){
    this.files.splice(index, 1);
    this.$emit("change", this.formatToPost(this.files));
    this.$emit('onDelete', file);
  }

  //预览图片
  previewImg(index: number){
    const images = this.files.map((i: any) => i.url)
    vant.ImagePreview({
      images,
      startPosition: index,
    });
  }

  /**
   * 上传选择的文件列表
   * @param selFiles
   */
  uploadFiles(selFiles: any[]){
    this.isUploadFinish = false;
    this.$emit('onUpload', false);
    this.files = [...this.files, ...selFiles];
    //每个文件创建一个上传进程
    const tasks = selFiles.map(f => this.singleFileUpload(f));
    //处理上传进程回调
    const allPromises = tasks.map((promise) =>
      promise.then((res: any) => {
        //上传好的文件处理后赋值给文件列表
        this.files = this.files.map((f: any) => {
          return res[f.id] ? {...f, ...res[f.id], content: ''} : f;
        })
      }).catch(err => {
        //有文件上传失败，删除此文件
        this.files = this.files.filter((i: any) => !this.errors[i.id])
        vant.Toast(err, 2000)
      })
    )
    //所有的请求完之后
    Promise.all(allPromises).then(() =>{
      //抛出数据和事件
      this.$emit("change", this.formatToPost(this.files));
      this.$emit('onUpload', true);
    }).finally(() => {
      this.isUploadFinish = true;
    })
  }

  /**
   * 单个文件上传逻辑
   * @param uf
   */
  singleFileUpload(uf: any){
    return new Promise((resolve, reject) => {
      const { id, file } = uf
      const formData = new FormData()
      formData.append('file', file as File)
      const xhr = new XMLHttpRequest()
      // 进度监听
      xhr.upload.addEventListener('progress', e => this.handleProgress(id,e), false);
      //进度初始化
      this.progress[id] = 0;

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4 || ![200, 201].includes(xhr.status)) { return }
        const result = JSON.parse(xhr.responseText)
        //接口返回失败
        if (result.hasOwnProperty('status') && !result.status || result.hasOwnProperty('success') && !result.success) {
          this.errors[id] = true;
          return reject(result.message)
        }
        this.errors[id] = false;
        this.progress[id] = 100;
        //返回上传结果
        resolve({
          [id]: Object.assign({}, result.data || result.result)
        })
      }
      xhr.open('POST', this.uploadUrl + '&isPermanent=true', true)
      //接口请求超时
      xhr.ontimeout = (e)=>{
        this.errors[id] = true;
        return reject('timeout 上传失败')
      }
      //接口请求失败
      xhr.onerror = (e)=>{
        this.errors[id] = true;
        return reject('error 上传失败')
      }
      xhr.send(formData)
    })
  }

  // 监听上传进度 显示进度
  handleProgress(id: string, e:any){
    //@ts-ignore
    const number:number = Number.parseInt(e.loaded / e.total * 100);
    if(number >= 100) return
    this.progress[id] = number;
  }

  //格式化为接口保存的格式
  formatToPost(files: any){
    console.error('files',this.multiple)
    if(this.multiple){
      return files.map((file: any) => {
        const {key, url, name} = file;
        return {
          key,
          url,
          name
        }
      })
    }else{
      if(!files.length){
        return {}
      }else{
        const {key, url, name} = files[0];
        return {
          key,
          url,
          name
        }
      }
    }
  }


}
</script>

<style lang="scss">
@import "./index.scss";
</style>
