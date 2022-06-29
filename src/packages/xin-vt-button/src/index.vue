<template>
  <div class="xin-vt-button">
    xin-vt-button
  </div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator";

@Component({
  name: 'XinVtButton'
})
export default class XinVtButton extends Vue{


}
</script>

<style lang="scss" scoped>
.xin-vt-button{
  width: 200px;
  background: pink;
}
</style>